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
	 * Init logic with items
	 * @param {Item[]} items 
	 * @param {Area[]} areas 
	 */
	self.init = (items, areas) => {
		if (items && items.length) {
			items.forEach(v => { self.items[v.id] = LogicStatus.NONE; });
		}
		if (areas && areas.length) {
			areas.forEach(v => {
				if (!v.isDungeon) return;
				let id = `${v.id}_keys`;
				self.items[id] = 0;
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
	//To do so, I've added a tri-state for each item/check telling us if we got it, in logic or not. 
	//It has the advantage to propagate outside logic checks in every other item it's needed.

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

	/**
	 * 
	 * @param {number} current current number of key
	 * @param {number} target target number of key
	 * @returns {LogicStatus}
	 */
	function hasKeyQty(current, target) {
		return current >= target ? LogicStatus.IN_LOGIC : LogicStatus.OUT_LOGIC;
	}



	//#region Logic shortcuts
	self.can_enter_jabu = () => { return andCriterion(self.items.letter, orCriterion(andCriterion(self.items.lullaby, self.items.bomb), self.items.scale1), orCriterion(self.items.boomerang, self.items.bomb, self.items.slingshot)); }
	self.child_can_enter_river = () => { return orCriterion(self.items.bomb, self.items.scale1); }
	self.fortress_access = () => { return orCriterion(self.items.epona, self.items.hookshot2); }
	self.can_save_carpenters = () => { return self.fortress_access(); }
	self.can_cross_quicksand = () => { return andCriterion(self.fortress_access, orCriterion(self.items.hookshot2, self.items.hovers)); }
	self.can_enter_colossus = () => { return orCriterion(andCriterion(self.can_cross_quicksand, orCriterion(self.brackets, self.can_see)), self.items.requiem); }
	self.can_use_fire = () => { return andCriterion(orCriterion(self.items.dins, andCriterion(self.items.bow, self.firearrows)), self.items.magic); }
	self.can_use_dins = () => { return andCriterion(self.items.dins, self.items.magic); }
	self.can_use_farores = () => { return andCriterion(self.farores, self.items.magic); }
	self.can_see = () => { return andCriterion(self.lens, self.items.magic); }
	self.can_blast_or_smash = () => { return orCriterion(self.items.bomb, self.items.hammer); }
	self.can_enter_dodongos = () => { return orCriterion(self.can_blast_or_smash, self.items.str1); }
	self.dodongos_climb = () => { return andCriterion(self.can_enter_dodongos, orCriterion(self.items.bomb, self.items.str1, self.can_use_dins)); }
	self.can_enter_shadow = () => { return andCriterion(self.items.nocturne, self.can_use_dins, orCriterion(self.items.hovers, self.items.hookshot1)); }
	self.can_cross_shadow_gap = () => { return andCriterion(self.can_enter_shadow, self.items.hovers); }
	self.can_bomb_shadow_wall = () => { return andCriterion(self.can_cross_shadow_gap, self.items.bomb); }
	self.can_pass_shadow_hookshot_door = () => { return andCriterion(self.can_bomb_shadow_wall, self.items.hookshot1); }
	self.can_ride_shadow_boat = () => { return andCriterion(self.can_pass_shadow_hookshot_door, self.items.lullaby); }
	self.can_beat_shadow_boss = () => { return andCriterion(self.can_ride_shadow_boat, orCriterion(self.items.bow, self.items.hookshot2)); }
	self.can_stop_link_the_goron = () => { return orCriterion(self.items.bomb, self.items.bow, self.items.str1); }
	self.ice_access = () => { return andCriterion(self.items.letter, self.items.lullaby, self.child_can_enter_river); }
	self.reverse_crater = () => { return andCriterion(orCriterion(self.items.hovers, self.items.hookshot1, self.child_can_enter_river), self.items.bolero); }
	self.can_enter_fire_temple = () => { return orCriterion(andCriterion(self.crater_by_city, orCriterion(self.items.hookshot1, self.items.hovers)), self.items.bolero); }
	self.crater_by_city = () => { return orCriterion(self.items.bow, self.items.bomb, self.items.str1, self.reverse_crater, andCriterion(self.items.hammer, self.items.hovers), andCriterion(self.items.hookshot2, self.items.goron_tunic, self.items.hammer)); }
	self.crater_top = () => { return orCriterion(self.crater_by_city, self.items.hammer); }
	self.can_enter_adult_spirit = () => { return andCriterion(self.can_enter_colossus, self.items.str2); }
	self.can_enter_ganons = () => { return andCriterion(self.items.forest_medallion, self.items.fire_medallion, self.items.water_medallion, self.items.shadow_medaillon, self.items.spirit_medaillon, self.items.light_medaillon); }
	self.can_climb_fire_temple = () => { return andCriterion(self.can_enter_fire_temple, hasKeyQty(self.fire_keys, 3), self.can_wear_goron_tunic, self.items.str1, orCriterion(self.items.bow, self.items.hookshot1, self.items.bomb)); }
	self.can_enter_water = () => { return andCriterion(self.items.hookshot1, self.items.irons); }
	self.middle_water = () => { return andCriterion(self.can_enter_water, self.items.lullaby, orCriterion(self.items.bow, self.can_use_dins)); }
	self.projectile_both = () => { return orCriterion(self.items.bomb, andCriterion(orCriterion(self.items.slingshot, self.items.boomerang), orCriterion(self.items.bow, self.items.hookshot1))); }
	self.projectile_child = () => { return orCriterion(self.items.bomb, self.items.slingshot, self.items.boomerang); }
	self.projectile_adult = () => { return orCriterion(self.items.bomb, self.items.bow, self.items.hookshot1); }
	self.can_wear_goron_tunic = () => { return orCriterion(self.items.goron_tunic, andCriterion(self.items.wallet1, orCriterion(self.items.bomb, self.items.str1, self.items.bow))); }
	self.can_wear_zora_tunic = () => { return orCriterion(self.items.zora_tunic, andCriterion(self.items.wallet2, self.items.lullaby, self.items.bottle)); }
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