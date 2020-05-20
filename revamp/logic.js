var Logic = (function () {
	var self = {};
	/**
	 * logic of each check
	 * @type Object.<string,()=>boolean>
	 */
	var checkLogic = {};
	/**
	 * Init logic with items
	 * @param {Item[]} item 
	 * @param {Area[]} area 
	 */
	self.init = (item, area) => {
		if (item && item.length) {
			item.forEach(v => { self[v.id] = LogicStatus.NONE; });
		}
		if (area && area.length) {
			area.forEach(v => {
				if (!v.isDungeon) return;
				let id = `${v.id}_${v.sk}`
				self[id] = 0;
			})
		}
		self.brackets = false;
	}

	/**
	 * @param {Item} item
	 */
	self.updateWithItemGet = (item) => {
		if (item) self[item.id] = item.gotten;
	}


	//Here, my goal is to add alternate logic alongside the intended logic(ie : Minuet access with Mido Skip)

	/**
	 * Breaks on OUT_LOGIC status since we know we wont go further
	 * @param {(()=>LogicStatus)[] | LogicStatus[] } criterions
	 * @returns {LogicStatus}
	 */
	function andCriterion(...criterions) {
		let res = LogicStatus.IN_LOGIC;
		for (const criterion of criterions) {
			if (typeof criterion === "function") {
				res = criterion();
			} else res = criterion;
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
			if (typeof criterion === "function") {
				res = criterion();
			} else res = criterion;
			if (res == LogicStatus.IN_LOGIC) {
				break;
			}
		}
		return res;
	}

	function hasKey(current, target) {
		return current >= target ? LogicStatus.IN_LOGIC : LogicStatus.OUT_LOGIC;
	}



	//#region Logic shortcuts
	self.can_enter_jabu = () => { return andCriterion(self.letter, orCriterion(andCriterion(self.lullaby, self.bomb), self.scale1), orCriterion(self.boomerang, self.bomb, self.slingshot)); }
	self.child_can_enter_river = () => { return orCriterion(self.bomb, self.scale1); }
	self.fortress_access = () => { return orCriterion(self.epona, self.hookshot2); }
	self.can_save_carpenters = () => { return self.fortress_access(); }
	self.can_cross_quicksand = () => { return andCriterion(self.fortress_access, orCriterion(self.hookshot2, self.hovers)); }
	self.can_enter_colossus = () => { return orCriterion(andCriterion(self.can_cross_quicksand, orCriterion(self.brackets, self.can_see)), self.requiem); }
	self.can_use_fire = () => { return andCriterion(orCriterion(self.dins, andCriterion(self.bow, self.firearrows)), self.magic); }
	self.can_use_dins = () => { return andCriterion(self.dins, self.magic); }
	self.can_use_farores = () => { return andCriterion(self.farores, self.magic); }
	self.can_see = () => { return andCriterion(self.lens, self.magic); }
	self.can_blast_or_smash = () => { return orCriterion(self.bomb, self.hammer); }
	self.can_enter_dodongos = () => { return orCriterion(self.can_blast_or_smash, self.str1); }
	self.dodongos_climb = () => { return andCriterion(self.can_enter_dodongos, orCriterion(self.bomb, self.str1, self.can_use_dins)); }
	self.can_enter_shadow = () => { return andCriterion(self.nocturne, self.can_use_dins, orCriterion(self.hovers, self.hookshot1)); }
	self.can_cross_shadow_gap = () => { return andCriterion(self.can_enter_shadow, self.hovers); }
	self.can_bomb_shadow_wall = () => { return andCriterion(self.can_cross_shadow_gap, self.bomb); }
	self.can_pass_shadow_hookshot_door = () => { return andCriterion(self.can_bomb_shadow_wall, self.hookshot1); }
	self.can_ride_shadow_boat = () => { return andCriterion(self.can_pass_shadow_hookshot_door, self.lullaby); }
	self.can_beat_shadow_boss = () => { return andCriterion(self.can_ride_shadow_boat, orCriterion(self.bow, self.hookshot2)); }
	self.can_stop_link_the_goron = () => { return orCriterion(self.bomb, self.bow, self.str1); }
	self.ice_access = () => { return andCriterion(self.letter, self.lullaby, self.child_can_enter_river); }
	self.reverse_crater = () => { return andCriterion(orCriterion(self.hovers, self.hookshot1, self.child_can_enter_river), self.bolero); }
	self.can_enter_fire_temple = () => { return orCriterion(andCriterion(self.crater_by_city, orCriterion(self.hookshot1, self.hovers)), self.bolero); }
	self.crater_by_city = () => { return orCriterion(self.bow, self.bomb, self.str1, self.reverse_crater, andCriterion(self.hammer, self.hovers), andCriterion(self.hookshot2, self.goron_tunic, self.hammer)); }
	self.crater_top = () => { return orCriterion(self.crater_by_city, self.hammer); }
	self.can_enter_adult_spirit = () => { return andCriterion(self.can_enter_colossus, self.str2); }
	self.can_enter_ganons = () => { return andCriterion(self.forest_medallion, self.fire_medallion, self.water_medallion, self.shadow_medaillon, self.spirit_medaillon, self.light_medaillon); }
	self.can_climb_fire_temple = () => { return andCriterion(self.can_enter_fire_temple, hasKey(self.fire_keys, 3), self.can_wear_goron_tunic, self.str1, orCriterion(self.bow, self.hookshot1, self.bomb)); }
	self.can_enter_water = () => { return andCriterion(self.hookshot1, self.irons); }
	self.middle_water = () => { return andCriterion(self.can_enter_water, self.lullaby, orCriterion(self.bow, self.can_use_dins)); }
	self.projectile_both = () => { return orCriterion(self.bomb, andCriterion(orCriterion(self.slingshot, self.boomerang), orCriterion(self.bow, self.hookshot1))); }
	self.projectile_child = () => { return orCriterion(self.bomb, self.slingshot, self.boomerang); }
	self.projectile_adult = () => { return orCriterion(self.bomb, self.bow, self.hookshot1); }
	self.can_wear_goron_tunic = () => { return orCriterion(self.goron_tunic, andCriterion(self.wallet1, orCriterion(self.bomb, self.str1, self.bow))); }
	self.can_wear_zora_tunic = () => { return orCriterion(self.zora_tunic, andCriterion(self.wallet2, self.lullaby, self.bottle)); }
	self.alwaysAccessible = () => { return LogicStatus.IN_LOGIC; }
	//#endregion

	//#region Song Check Logic
	checkLogic.zelda = () => { return self.alwaysAccessible(); }
	checkLogic.epona = () => { return self.alwaysAccessible(); }
	checkLogic.saria = () => { return self.alwaysAccessible(); }
	checkLogic.storms = () => { return self.alwaysAccessible(); }
	checkLogic.sun = () => { return self.lullaby; }
	checkLogic.bolero = () => { return self.can_enter_fire_temple(); }
	checkLogic.minuet = () => { return orCriterion(self.minuet, self.saria, LogicStatus.OUT_LOGIC); }
	checkLogic.requiem = () => { return self.can_enter_colossus(); }
	checkLogic.serenade = () => { return self.ice_access(); }
	checkLogic.prelude = () => { return self.forest_medallion; }
	checkLogic.nocturne = () => { return andCriterion(self.forest_medallion, self.fire_medallion, self.water_medallion); }
	checkLogic.time = () => { return andCriterion(self.emerald, self.ruby, self.sapphire); }
	//#endregion

	/**
	 * @param {string} id check id
	 * @returns {()=>LogicStatus} logic callback
	 */
	self.getLogicForCheck = (id) => {
		let res = checkLogic[id];
		if (!res) res = self.alwaysAccessible;
		return res;
	}

	return self;
}());