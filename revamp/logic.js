var Logic = (function () {
	var self = {};
	/**
	 * logic of each check
	 * @type {Object.<string,()=>LogicStatus>}
	 */
	self.checks = {};

	/**
	 * status of each item
	 * @type {Object.<string,LogicStatus|number>}
	 */
	self.items = {};

	/**
	* status of each dungeon
	* @type {Object.<string,LogicStatus>}
	*/
	self.beaten = {
		deku: LogicStatus.NONE,
		dodongo: LogicStatus.NONE,
		jabu: LogicStatus.NONE,
		forest: LogicStatus.NONE,
		fire: LogicStatus.NONE,
		water: LogicStatus.NONE,
		shadow: LogicStatus.NONE,
		spirit: LogicStatus.NONE,
	};

	/**
	 * Init logic with items
	 * @param {Item[]} items 
	 * @param {Area[]} areas 
	 */
	self.init = (items, areas) => {
		if (items && items.length) {
			items.forEach(v => { self.items[v.id] = LogicStatus.NONE; });
		}
		self.items.big_poe = LogicStatus.NONE;
		self.items.prescription = LogicStatus.NONE;
		self.items.claim_check = LogicStatus.NONE;
		self.items.gold_skulltulas = 0;
		if (areas && areas.length) {
			areas.forEach(v => {
				if (!v.isDungeon) return;
				let id = `${v.id}_keys`;
				self.items[id] = 0;
				if (v.isOptionnalDungeon) {
					id = `${v.id}_boss_key`;
					self.items[id] = 0;
				}
			})
		}
		self.brackets = false;
	}

	/**
	 * @param {Item} item
	 */
	self.updateWithItemGet = (item) => {
		if (self.items[item.id] != null || self.items[item.id] != undefined) { self.items[item.id] = item.status; }
	}

	/**
	* @param {Area} item
	*/
	self.addDungeonKey = (area) => {
		let id = `${area.id}_keys`;
		if (self.items[id] != null || self.items[id] != undefined) self.items[id]++;
	}


	//Here, my goal is to add alternate logic alongside the intended logic(ie : Minuet access with Mido Skip)
	//To do so, I've added a tri-state enumeration for each item/check telling us if we got it, in logic or not. 
	//It has the advantage to propagate outside logic checks in every other item it's needed.

	//I'm pretty sure some logic can be simplified but I dont have the motivation nor the time to look into it.
	//Some checks might not have all of their access (outside logic-wise) but previous implemented logic is still here
	//I've tried to add more outside logic tricks such as reverse wasteland

	//#region Logic Computing functions
	/**
	 * Breaks on NONE status since we know we wont go further
	 * @param {(()=>LogicStatus)[] | LogicStatus[] } criterions
	 * @returns {LogicStatus}
	 */
	function andCriterion(...criterions) {
		let res = LogicStatus.IN_LOGIC;
		for (const criterion of criterions) {
			let tempRes = res;
			if (typeof criterion === "function") {
				tempRes = criterion();
			} else tempRes = criterion;
			//Do not propagate IN_LOGIC if we are out of logic
			if (res == LogicStatus.OUT_LOGIC && tempRes == LogicStatus.IN_LOGIC) continue;
			res = tempRes;
			if (res == LogicStatus.NONE) {
				break;
			}
		}
		return res;
	}
	/**
	 * Breaks on IN_LOGIC status since we know we wont go further
	 * @param {(()=>LogicStatus)[] | LogicStatus[] } criterions
	 * @returns {LogicStatus}
	 */
	function orCriterion(...criterions) {
		let res = LogicStatus.NONE;
		for (const criterion of criterions) {
			let tempRes = res;
			if (typeof criterion === "function") {
				tempRes = criterion();
			} else tempRes = criterion;
			//Do not propagate NONE if we have access in some way
			if (res == LogicStatus.OUT_LOGIC && tempRes == LogicStatus.NONE) continue;
			res = tempRes;
			if (res == LogicStatus.IN_LOGIC) {
				break;
			}
		}
		return res;
	}
	/**
	 * 
	 * @param {number} current current number of key
	 * @param {number} target target number of key
	 * @returns {LogicStatus}
	 */
	function hasItemQty(current, target) {
		return current >= target ? LogicStatus.IN_LOGIC : LogicStatus.NONE;
	}

	/**
	 * Force item as outside logic if it has been obtained
	 * @param {LogicStatus} itemLogic 
	 */
	function outsideLogicAccess(itemLogic) {
		return itemLogic != LogicStatus.NONE ? LogicStatus.OUT_LOGIC : LogicStatus.NONE;
	}
	//#endregion

	//#region Logic shortcuts
	self.can_enter_jabu = () => { return andCriterion(self.items.letter, self.can_child_enter_domain, orCriterion(self.items.boomerang, self.has_explosive, self.items.slingshot)); }
	self.can_child_enter_domain = () => { return orCriterion(andCriterion(self.child_can_enter_river, orCriterion(self.items.lullaby, LogicStatus.OUT_LOGIC)), self.items.scale1) }
	self.can_adult_enter_domain = () => { return orCriterion(self.items.lullaby, outsideLogicAccess(self.items.hovers)); };
	self.child_can_enter_river = () => { return orCriterion(self.items.scale1, self.has_explosive); }
	self.fortress_access = () => { return orCriterion(self.items.epona, self.items.hookshot2, self.can_reverse_wasteland); }
	self.can_reverse_wasteland = () => { return outsideLogicAccess(self.items.requiem); };
	self.can_save_carpenters = () => { return self.fortress_access(); }
	self.can_cross_quicksand = () => { return andCriterion(self.fortress_access, orCriterion(self.items.hookshot2, self.items.hovers)); }
	self.can_enter_colossus = () => { return orCriterion(andCriterion(self.can_cross_quicksand, orCriterion(self.brackets, self.can_see)), self.items.requiem); }
	self.can_use_fire = () => { return andCriterion(orCriterion(self.items.dins, andCriterion(self.items.bow, self.firearrows)), self.items.magic); }
	self.can_use_dins = () => { return andCriterion(self.items.dins, self.items.magic); }
	self.can_use_farores = () => { return andCriterion(self.farores, self.items.magic); }
	self.can_see = () => { return andCriterion(self.lens, self.items.magic); }
	self.can_blast_or_smash = () => { return orCriterion(self.items.hammer, self.has_explosive); }
	self.can_enter_dodongos = () => { return orCriterion(self.can_blast_or_smash, self.items.str1); }
	self.dodongos_climb = () => { return andCriterion(self.can_enter_dodongos, orCriterion(self.has_explosive, self.items.str1, self.can_use_dins)); }
	self.can_enter_shadow = () => { return andCriterion(self.items.nocturne, self.can_use_dins, orCriterion(self.items.hovers, self.items.hookshot1)); }
	self.can_cross_shadow_gap = () => { return andCriterion(self.can_enter_shadow, self.items.hovers); }
	self.can_bomb_shadow_wall = () => { return andCriterion(self.can_cross_shadow_gap, self.has_explosive); }
	self.can_pass_shadow_hookshot_door = () => { return andCriterion(self.can_bomb_shadow_wall, self.items.hookshot1); }
	self.can_ride_shadow_boat = () => { return andCriterion(self.can_pass_shadow_hookshot_door, self.items.lullaby); }
	self.can_beat_shadow_boss = () => { return andCriterion(self.can_ride_shadow_boat, orCriterion(self.items.bow, self.items.hookshot2, outsideLogicAccess(bombchu))); }
	self.can_stop_link_the_goron = () => { return orCriterion(self.has_explosive, self.items.bow, self.items.str1); }
	self.ice_access = () => { return andCriterion(self.items.letter, self.can_adult_enter_domain, self.can_child_enter_domain); }
	self.reverse_crater = () => { return andCriterion(orCriterion(self.items.hovers, self.items.hookshot1, self.child_can_enter_river), self.items.bolero); }
	self.can_enter_fire_temple = () => { return orCriterion(andCriterion(self.crater_by_city, orCriterion(self.items.hookshot1, self.items.hovers)), self.items.bolero); }
	self.crater_by_city = () => { return orCriterion(self.can_stop_link_the_goron, self.reverse_crater, andCriterion(self.items.hammer, self.items.hovers), andCriterion(self.items.hookshot2, self.items.goron_tunic, self.items.hammer)); }
	self.crater_top = () => { return orCriterion(self.crater_by_city, self.items.hammer); }
	self.can_enter_adult_spirit = () => { return andCriterion(self.can_enter_colossus, self.items.str2); }
	self.can_enter_ganons = () => { return andCriterion(self.items.forest_medallion, self.items.fire_medallion, self.items.water_medallion, self.items.shadow_medaillon, self.items.spirit_medaillon, self.items.light_medaillon); }
	self.can_climb_fire_temple = () => { return andCriterion(self.can_enter_fire_temple, hasItemQty(self.fire_keys, 3), self.can_wear_goron_tunic, self.items.str1, orCriterion(self.items.bow, self.items.hookshot1, self.has_explosive)); }
	self.can_enter_water = () => { return orCriterion(andCriterion(self.items.hookshot1, self.items.irons), outsideLogicAccess(andCriterion(self.items.hookshot2, self.items.scale2))); }
	self.middle_water = () => { return andCriterion(self.can_enter_water, self.items.lullaby, orCriterion(self.items.bow, self.can_use_dins)); }
	self.projectile_both = () => { return orCriterion(self.has_explosive, andCriterion(self.projectile_adult, self.projectile_child)); }
	self.projectile_child = () => { return orCriterion(self.has_explosive, self.items.slingshot, self.items.boomerang); }
	self.projectile_adult = () => { return orCriterion(self.has_explosive, self.items.bow, self.items.hookshot1); }
	self.can_wear_goron_tunic = () => { return orCriterion(self.items.goron_tunic, andCriterion(self.items.wallet1, self.can_stop_link_the_goron), LogicStatus.OUT_LOGIC); }
	self.can_wear_zora_tunic = () => { return orCriterion(self.items.zora_tunic, andCriterion(self.items.wallet2, self.items.lullaby, self.items.bottle), LogicStatus.OUT_LOGIC); }
	self.can_climb_gtg_hole = () => { return orCriterion(self.items.hookshot1, outsideLogicAccess(self.items.hovers), outsideLogicAccess(self.items.bomb)); };
	self.has_explosive = () => { return orCriterion(self.items.bomb, outsideLogicAccess(self.items.bombchu)); }
	self.can_access_blue_fire = () => { return orCriterion(self.ice_access, andCriterion(orCriterion(self.items.wallet2, self.can_enter_ganons), self.items.bottle)); };
	self.can_enter_forest_temple = () => { return andCriterion(self.checks.minuet, self.item.hookshot1); };
	self.alwaysAccessible = () => { return LogicStatus.IN_LOGIC; }
	//#endregion

	//#region Song Check Logic
	self.checks.zelda = () => { return self.alwaysAccessible(); }
	self.checks.epona = () => { return self.alwaysAccessible(); }
	self.checks.saria = () => { return self.alwaysAccessible(); }
	self.checks.storms = () => { return self.alwaysAccessible(); }
	self.checks.sun = () => { return self.items.lullaby; }
	self.checks.bolero = () => { return self.can_enter_fire_temple(); }
	self.checks.minuet = () => { return orCriterion(self.items.minuet, self.items.saria, LogicStatus.OUT_LOGIC); }
	self.checks.requiem = () => { return self.can_enter_colossus(); }
	self.checks.serenade = () => { return self.ice_access(); }
	self.checks.prelude = () => { return self.items.forest_medallion; }
	self.checks.nocturne = () => { return andCriterion(self.items.forest_medallion, self.items.fire_medallion, self.items.water_medallion); }
	self.checks.time = () => { return andCriterion(self.items.emerald, self.items.ruby, self.items.sapphire); }
	//#endregion

	//#region Kokiri Region Logic
	self.checks.mido_1 = () => { return self.alwaysAccessible(); }
	self.checks.mido_2 = () => { return self.alwaysAccessible(); }
	self.checks.mido_3 = () => { return self.alwaysAccessible(); }
	self.checks.mido_4 = () => { return self.alwaysAccessible(); }
	self.checks.kokiri_sword = () => { return self.alwaysAccessible(); }
	self.checks.kokiri_song_of_storms = () => { return self.items.storms; }
	//#endregion

	//#region Hyrule Field Region Logic
	self.checks.talons_chickens = () => { return self.alwaysAccessible(); };
	self.checks.back_of_ranch = () => { return self.alwaysAccessible(); };
	self.checks.hyrule_forest_boulder = () => () => { return self.can_blast_or_smash(); }
	self.checks.hyrule_open_grotto = () => { return self.alwaysAccessible(); };
	self.checks.hyrule_hp_scrub = () => { return self.can_blast_or_smash(); }
	self.checks.hyrule_boulder_of_destiny = () => { return self.can_blast_or_smash(); }
	self.checks.hyrule_tektite_grotto = () => { return andCriterion(self.can_blast_or_smash, orCriterion(self.items.scale2, self.items.irons)); }
	//#endregion

	//#region Gerudo Valley Region Logic
	self.checks.gerudovalley_box = () => { return self.alwaysAccessible(); };
	self.checks.gerudovalley_waterfall = () => { return self.alwaysAccessible(); };
	self.checks.gerudo_hammer = () => { return andCriterion(self.fortress_access, self.items.hammer); }
	//#endregion

	//#region Lake Region Logic
	self.hylia_child_fishing = () => { return self.alwaysAccessible(); };
	self.hylia_bottle = () => { return self.items.scale1; }
	self.hylia_adult_fishing = () => { return orCriterion(self.items.hookshot1, self.child_can_enter_river); }
	self.hylia_lab_top = () => { return orCriterion(self.items.hookshot1, self.child_can_enter_river); }
	self.hylia_lab_dive = () => { return orCriterion(self.items.scale2, outsideLogicAccess(andCriterion(self.items.irons, self.items.hookshot1))); }
	self.hylia_sun_shoot = () => { return orCriterion(andCriterion(self.items.hookshot2, self.items.bow), andCriterion(self.items.bow, self.beaten.water)); }
	//#endregion

	//#region Market Region Logic
	self.checks.market_slingshot_game = () => { return self.alwaysAccessible(); };
	self.checks.richard = () => { return self.alwaysAccessible(); };
	self.checks.market_bowling_1 = () => { return self.items.bomb; }
	self.checks.market_bowling_2 = () => { return self.items.bomb; }
	self.checks.market_lens_game = () => { return orCriterion(self.can_see(), LogicStatus.OUT_LOGIC); };
	self.checks.poes = () => { return orCriterion(andCriterion(self.items.bow, self.items.epona, orCriterion(self.items.bottle, self.items.can_enter_jabu)), self.items.big_poe) };
	self.checks.dinsfairy = () => { return andCriterion(self.has_explosive, self.items.lullaby); }
	self.checks.ganonsfairy = () => { return andCriterion(self.items.str3 && self.items.lullaby) };
	self.checks.lacs = () => { return andCriterion(self.items.shadow_medaillon, self.items.spirit_medaillon); };
	//#endregion

	//#region Zora's Fountain Region Logic
	self.checks.fountain_fairy = () => { return andCriterion(self.ice_access, self.has_explosive); }
	self.checks.ice_glacier_hp = () => { return self.ice_access(); };
	self.checks.ice_bottom_of_fountain = () => { return andCriterion(self.ice_access, self.items.irons); }
	self.checks.ice_map = () => { return self.ice_access(); };
	self.checks.ice_compass = () => { return self.ice_access(); };
	self.checks.ice_hp = () => { return self.ice_access(); };
	self.checks.ice_irons = () => { return self.ice_access(); };
	//#endregion

	//#region Deku Logic
	self.checks.deku_slingshot = () => { return self.alwaysAccessible(); };
	self.checks.deku_slingshot_room_side = () => { return self.alwaysAccessible(); };
	self.checks.deku_compass = () => { return self.alwaysAccessible(); };
	self.checks.deku_compass_room_side = () => { return self.alwaysAccessible(); };
	self.checks.deku_basement = () => { return self.alwaysAccessible(); };
	self.checks.deku_queen_gohma = () => { return orCriterion(self.items.slingshot, LogicStatus.OUT_LOGIC); }
	//#endregion

	//#region Lost Woods Region Logic
	self.checks.ocarina_game = () => { return self.alwaysAccessible(); };
	self.checks.bridge_scrub = () => { return self.alwaysAccessible(); };
	self.checks.theater = () => { return self.alwaysAccessible(); };
	self.checks.lost_woods_grotto = () => { return self.can_blast_or_smash(); }
	self.checks.lost_woods_scrub_grotto = () => { return orCriterion(self.has_explosive, andCriterion(self.checks.minuet, Logic.hammer)); }
	self.checks.target = () => { return self.items.slingshot; };
	self.checks.skull_kid = () => { return self.items.saria; };
	self.checks.wolfos_grotto = () => { return orCriterion(self.has_explosive, andCriterion(self.checks.minuet, Logic.hammer)); };
	//#endregion

	//#region Goron City Region Logic
	self.checks.rolling_goron = () => { return self.has_explosive(); };
	self.checks.goron_dance = () => { return andCriterion(self.items.lullaby, self.items.saria); };
	self.checks.goron_pot = () => { return andCriterion(orCriterion(self.items.bomb, self.items.str1), orCriterion(self.items.lullaby, self.can_use_dins)); };
	self.checks.goron_maze_1 = () => { return orCriterion(self.can_blast_or_smash, self.items.str2); };
	self.checks.goron_maze_2 = () => { return orCriterion(self.can_blast_or_smash, self.items.str2); };
	self.checks.goron_maze_3 = () => { return orCriterion(self.items.hammer, self.items.str2, outsideLogicAccess(andCriterion(self.checks.goron_maze_1, self.items.hovers))); };
	self.checks.goron_link = () => { return self.can_stop_link_the_goron(); }
	//#endregion

	//#region Dodongo Logic
	self.checks.dodongos_map = () => { return self.can_enter_dodongos(); }
	self.checks.dodongos_compass = () => { return self.can_enter_dodongos(); }
	self.checks.dodongos_bomb_flower_platform = () => { return self.dodongos_climb(); }
	self.checks.dodongos_bomb_bag = () => { return self.dodongos_climb(); }
	self.checks.dodongos_end_of_bridge = () => { return andCriterion(self.dodongos_climb, self.can_blast_or_smash); }
	self.checks.dodongos_above_king = () => { return self.has_explosive(); }
	self.checks.dodongos_king_dodongo = () => { return self.has_explosive(); }
	//#endregion

	//#region DMT Region Logic
	self.checks.trail_bombable = () => { return self.can_blast_or_smash(); };
	self.checks.trail_dodongos_top = () => { return self.alwaysAccessible(); };
	self.checks.trail_song_of_storms = () => { return self.items.storms; };
	self.checks.crater_peak_fairy = () => { return andCriterion(self.can_blast_or_smash(), self.items.lullaby); };
	self.checks.trade_quest = () => { return andCriterion(orCriterion(andCriterion(self.can_access_blue_fire, orCriterion(self.items.lullaby, outsideLogicAccess(self.items.hovers)), self.items.prescription), self.items.claim_check), self.crater_top); };
	//#endregion

	//#region Kak Region Logic
	self.checks.man_on_roof = () => { return self.alwaysAccessible(); };//Logic.hookshot;
	self.checks.kakariko_grotto = () => { return self.alwaysAccessible(); };
	self.checks.windmill = () => { return self.alwaysAccessible(); };//Logic.boomerang ||self.items.time;
	self.checks.anju = () => { return self.alwaysAccessible(); };
	self.checks.cow_house = () => { return self.alwaysAccessible(); };
	self.checks.archery_game = () => { return self.items.bow; };
	self.checks.redead_grotto = () => { return self.can_blast_or_smash(); };
	self.checks.anjus_chickens = () => { return self.alwaysAccessible(); };
	self.checks.tokens_10 = () => { return hasItemQty(self.items.gold_skulltulas, 10); };
	self.checks.tokens_20 = () => { return hasItemQty(self.items.gold_skulltulas, 20); };
	self.checks.tokens_30 = () => { return hasItemQty(self.items.gold_skulltulas, 30); };
	self.checks.tokens_40 = () => { return hasItemQty(self.items.gold_skulltulas, 40); };
	self.checks.tokens_50 = () => { return hasItemQty(self.items.gold_skulltulas, 50); };
	self.checks.shield_grave = () => { return self.alwaysAccessible(); };
	self.checks.gravedigging_tour = () => { return self.alwaysAccessible(); };
	self.checks.suns_grave = () => { return self.items.sun; };
	self.checks.fire_grave = () => { return andCriterion(self.items.lullaby, orCriterion(self.can_use_fire, LogicStatus.OUT_LOGIC)); };
	self.checks.graveyard_box = () => { return orCriterion(self.child_can_enter_river, self.items.hookshot2, outsideLogicAccess(self.items.boomerang)); };
	self.checks.race_1 = () => { return self.alwaysAccessible(); };
	self.checks.race_2 = () => { return self.alwaysAccessible(); };
	//#endregion

	//#region River Region Logic
	self.checks.river_pillar = () => { return orCriterion(self.child_can_enter_river, self.hovers, LogicStatus.OUT_LOGIC); };
	self.checks.river_grotto = () => { return self.alwaysAccessible(); };
	self.checks.river_ledge = () => { return orCriterion(self.child_can_enter_river, self.hovers, LogicStatus.OUT_LOGIC); };
	self.checks.frogs_1 = () => { return andCriterion(self.child_can_enter_river, self.items.storms); };
	self.checks.frogs_2 = () => { return andCriterion(self.child_can_enter_river, self.items.storms, self.items.lullaby, self.items.epona, self.items.saria, self.items.sun, self.items.time); };
	//#endregion

	//#region Domain Region Logic
	self.checks.zora_diving = () => { return self.can_child_enter_domain(); };
	self.checks.zora_torches = () => { return self.can_child_enter_domain(); };
	self.checks.thaw_king = () => { return andCriterion(self.can_access_blue_fire, self.can_adult_enter_domain); };
	//#endregion

	//#region Colossus Region Logic
	self.checks.colossus_bean = () => { return andCriterion(self.items.requiem, self.child_can_enter_river); };
	self.checks.colossus_fairy = () => { return andCriterion(self.items.requiem, self.has_explosive, self.items.lullaby); };
	self.checks.wasteland = () => { return andCriterion(self.can_cross_quicksand, self.can_use_fire) };
	//#endregion

	//#region Fortress Region Logic
	self.checks.gerudo_roof = () => { return andCriterion(self.fortress_access, orCriterion(self.items.hookshot1, self.items.hovers)); };
	self.checks.gerudo_archery_1 = () => { return andCriterion(self.items.epona, self.items.bow); };
	self.checks.gerudo_archery_2 = () => { return andCriterion(self.items.epona, self.items.bow); };
	//#endregion

	//#region Jabu Logic
	self.checks.jabu_boomerang = () => { return self.can_enter_jabu(); };
	self.checks.jabu_map = () => { return andCriterion(self.can_enter_jabu, self.items.boomerang); };
	self.checks.jabu_compass = () => { return andCriterion(self.can_enter_jabu, self.items.boomerang); };
	self.checks.jabu_barinade = () => { return andCriterion(self.can_enter_jabu, self.items.boomerang); };
	//#endregion

	//#region Forest Temple Logic
	self.checks.forest1 = () => { return andCriterion(self.can_enter_forest_temple); }
	self.checks.forest2 = () => { return andCriterion(self.can_enter_forest_temple); }
	self.checks.forest3 = () => { return andCriterion(self.can_enter_forest_temple, orCriterion(self.items.time, self.items.bow, andCriterion(self.items.hovers, hasItemQty(self.items.forest_keys, 1)))); }
	self.checks.forest4 = () => { return andCriterion(self.can_enter_forest_temple, orCriterion(self.items.time, self.items.bow, andCriterion(self.items.hovers, hasItemQty(self.items.forest_keys, 1)))); }
	self.checks.forest5 = () => { return andCriterion(self.can_enter_forest_temple, orCriterion(self.items.time, self.items.bow, andCriterion(self.items.hovers, hasItemQty(self.items.forest_keys, 1)))); }
	self.checks.forest6 = () => { return andCriterion(self.can_enter_forest_temple, hasItemQty(self.items.forest_keys, 1), self.items.bow, self.items.str1); }
	self.checks.forest7 = () => { return andCriterion(self.can_enter_forest_temple, hasItemQty(self.items.forest_keys, 2), self.items.bow, self.items.str1); }
	self.checks.forest8 = () => { return andCriterion(self.can_enter_forest_temple, orCriterion(andCriterion(self.items.bow, self.items.str1, hasItemQty(self.items.forest_keys, 2)), andCriterion(orCriterion(self.items.hovers, LogicStatus.OUT_LOGIC), hasItemQty(self.items.forest_keys, 1)))); }
	self.checks.forest9 = () => { return andCriterion(self.can_enter_forest_temple, self.items.str1, self.items.bow, hasItemQty(self.items.forest_keys, 3)); }
	self.checks.forest10 = () => { return andCriterion(self.can_enter_forest_temple, self.items.str1, hasItemQty(self.items.forest_keys, 3)); }
	self.checks.forest11 = () => { return andCriterion(self.can_enter_forest_temple, self.items.str1, self.items.bow, hasItemQty(self.items.forest_keys, 3)); }
	self.checks.forest12 = () => { return andCriterion(self.can_enter_forest_temple, self.items.str1, orCriterion(self.items.bow, self.can_use_dins), hasItemQty(self.items.forest_keys, 5)); }
	self.checks.forest13 = () => { return andCriterion(self.can_enter_forest_temple, self.items.str1, self.items.bow, hasItemQty(self.items.forest_keys, 5)); }
	self.checks.forest14 = () => { return andCriterion(self.can_enter_forest_temple, self.items.str1, self.items.bow, hasItemQty(self.items.forest_keys, 5), hasItemQty(self.items.forest_boss_key, 1)); }
	//#endregion

	//#region Fire Temple Logic
	self.checks.fire1 = () => { return self.can_enter_fire_temple(); }
	self.checks.fire2 = () => { return andCriterion(self.can_enter_fire_temple, self.items.hammer); }
	self.checks.fire3 = () => { return andCriterion(self.can_enter_fire_temple, self.items.hammer); }
	self.checks.fire4 = () => { return andCriterion(self.can_enter_fire_temple, hasItemQty(self.items.fire_keys, 1)); };
	self.checks.fire5 = () => { return andCriterion(self.can_enter_fire_temple, hasItemQty(self.items.fire_keys, 1), self.has_explosive); }
	self.checks.fire6 = () => { return andCriterion(self.can_enter_fire_temple, hasItemQty(self.items.fire_boss_key, 1), self.items.hammer, self.can_wear_goron_tunic, orCriterion(self.items.hovers, andCriterion(hasItemQty(self.items.fire_keys, 7), orCriterion(self.items.time, self.has_explosive)), LogicStatus.OUT_LOGIC)); }
	self.checks.fire7 = () => { return self.can_climb_fire_temple(); }
	self.checks.fire8 = () => { return self.can_climb_fire_temple(); }
	self.checks.fire9 = () => { return andCriterion(self.can_climb_fire_temple, orCriterion(andCriterion(hasItemQty(self.items.fire_keys, 4), self.items.bow), hasItemQty(self.items.fire_keys, 5))); }
	self.checks.fire10 = () => { return andCriterion(self.can_climb_fire_temple, hasItemQty(self.items.fire_keys, 5)); }
	self.checks.fire11 = () => { return andCriterion(self.can_climb_fire_temple, hasItemQty(self.items.fire_keys, 5), self.has_explosive); }
	self.checks.fire12 = () => { return andCriterion(self.can_climb_fire_temple, hasItemQty(self.items.fire_keys, 5), self.items.hookshot1); }
	self.checks.fire13 = () => { return andCriterion(self.can_climb_fire_temple, hasItemQty(self.items.fire_keys, 6)); }
	self.checks.fire14 = () => { return andCriterion(self.can_climb_fire_temple, orCriterion(hasItemQty(self.items.fire_keys, 7), andCriterion(hasItemQty(self.items.fire_keys, 6), orCriterion(self.items.hovers, LogicStatus.OUT_LOGIC)), self.items.hammer, orCriterion(self.items.time, self.has_explosive))); }
	self.checks.fire15 = () => { return andCriterion(self.can_climb_fire_temple, orCriterion(hasItemQty(self.items.fire_keys, 7), andCriterion(hasItemQty(self.items.fire_keys, 6), orCriterion(self.items.hovers, LogicStatus.OUT_LOGIC)), self.has_explosive)); }
	//#endregion

	//#region Water Temple Logic
	self.checks.water1 = () => { return self.can_enter_water(); }
	self.checks.water2 = () => { return self.can_enter_water(); }
	self.checks.water3 = () => { return andCriterion(self.middle_water, self.items.bomb); };
	self.checks.water4 = () => { return andCriterion(self.can_enter_water, self.items.lullaby, orCriterion(self.items.bow, self.can_use_dins)); }
	self.checks.water5 = () => { return andCriterion(self.can_enter_water, self.items.lullaby, self.items.bow, self.items.str1, orCriterion(self.items.hovers, self.items.hookshot2)); }
	self.checks.water6 = () => { return andCriterion(self.middle_water, self.can_wear_zora_tunic); }
	self.checks.water7 = () => { return andCriterion(hasItemQty(self.items.water_keys, 5), self.items.lullaby); }
	self.checks.water8 = () => { return andCriterion(hasItemQty(self.items.water_keys, 5), self.items.lullaby, self.items.time, self.items.bow); }
	self.checks.water9 = () => { return andCriterion(self.can_enter_water, self.items.lullaby, orCriterion(andCriterion(hasItemQty(self.items.water_keys, 5), self.items.time, self.items.bow), self.items.str1)); }
	self.checks.water10 = () => { return andCriterion(self.can_enter_water, self.items.lullaby, self.items.hookshot2, hasItemQty(self.items.water_keys, 5), orCriterion(andCriterion(self.items.bomb, self.items.str1), self.items.hovers); }
	self.checks.water11 = () => { return andCriterion(self.can_enter_water, hasItemQty(self.items.water_boss_key, 1), self.items.hookshot2); }
	//#endregion
	/**
	 * @param {string} id check id
	 * @returns {()=>LogicStatus} logic callback
	 */
	self.getLogicForCheck = (id) => {
		let res = self.checks[id];
		if (!res) res = self.alwaysAccessible;
		return res;
	}

	/**
	 * Update logic for check outside logic
	 * If logic changes (aka on checks status change)
	 * @param {Check[]} checks
	 */
	self.updateLogicRecursively = (checks) => {
		let logicHasChanged = false;
		if (checks && checks.length) {
			checks.forEach(v => {
				let previousValue = v.status;
				v.updateStatus();
				let newValue = v.status;
				if (previousValue != newValue) logicHasChanged = true;
			});
		}
		if (logicHasChanged) self.updateLogicRecursively(checks.filter(v => v.status == LogicStatus.OUT_LOGIC));
	}

	return self;
}());