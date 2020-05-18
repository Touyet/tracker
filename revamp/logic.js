var Logic = (function () {
	var self = {};
	/**
	 * Init logic with items
	 * @param {Item[]} item 
	 * @param {Area[]} area 
	 */
	self.init = (item, area) => {
		if (item && item.length) {
			item.forEach(v => { self[v.id] = false; });
		}
		if (area && area.length) {
			area.forEach(v => {
				if (!v.sk) return;
				let id = `${v.id}_${v.sk}`
				self[id] = false;
			})
		}
		self.brackets = false;
	}

	self.updateWithItemGet = (itemId) => {
		self[itemId] = true;
	}

	//#region Logic shortcuts
	self.can_enter_jabu = () => { return self.letter && ((self.lullaby && self.bomb) || self.scale1) && (self.boomerang || self.bomb || self.slingshot); }
	self.child_can_enter_river = () => { return self.bomb || self.scale1; }
	self.fortress_access = () => { return self.epona || self.hookshot2; }
	self.can_save_carpenters = () => { return self.fortress_access(); }
	self.can_cross_quicksand = () => { return self.fortress_access() && (self.hookshot2 || self.hovers); }
	self.can_enter_colossus = () => { return (self.can_cross_quicksand() && (self.brackets || self.can_see())) || self.requiem; }
	self.can_use_fire = () => { return (self.dins || (self.bow && self.firearrows)) && self.magic; }
	self.can_use_dins = () => { return self.dins && self.magic; }
	self.can_use_farores = () => { return self.farores && self.magic; }
	self.can_see = () => { return self.lens && self.magic; }
	self.can_blast_or_smash = () => { return self.bomb || self.hammer; }
	self.can_enter_dodongos = () => { return self.can_blast_or_smash() || self.str1; }
	self.dodongos_climb = () => { return self.can_enter_dodongos() && (self.bomb || self.str1 || self.can_use_dins()); }
	self.can_enter_shadow = () => { return self.nocturne && self.can_use_dins() && (self.hovers || self.hookshot1); }
	self.can_cross_shadow_gap = () => { return self.can_enter_shadow() && self.hovers; }
	self.can_bomb_shadow_wall = () => { return self.can_cross_shadow_gap() && self.bomb; }
	self.can_pass_shadow_hookshot_door = () => { return self.can_bomb_shadow_wall() && self.hookshot1; }
	self.can_ride_shadow_boat = () => { return self.can_pass_shadow_hookshot_door() && self.lullaby; }
	self.can_beat_shadow_boss = () => { return self.can_ride_shadow_boat() && (self.bow || self.hookshot2); }
	self.can_stop_link_the_goron = () => { return self.bomb || self.bow || self.str1; }
	self.ice_access = () => { return self.letter && self.lullaby && self.child_can_enter_river(); }
	self.reverse_crater = () => { return (self.hovers || self.hookshot1 || self.child_can_enter_river) && self.bolero; }
	self.can_enter_fire_temple = () => { return (self.crater_by_city() && (self.hookshot1 || self.hovers)) || self.bolero }
	self.crater_by_city = () => { return self.bow || self.bomb || self.str1 || self.reverse_crater() || (self.hammer && self.hovers) || (self.hookshot2 && self.goron_tunic && self.hammer); }
	self.crater_top = () => { return self.crater_by_city() || self.hammer; }
	self.can_enter_adult_spirit = () => { return self.can_enter_colossus() && self.str2; }
	self.can_enter_ganons = () => { return self.forest_medallion && self.fire_medallion && self.water_medallion && self.shadow_medaillon && self.spirit_medaillon && self.light_medaillon; }
	self.can_climb_fire_temple = () => { return self.can_enter_fire_temple() && self.fire_keys >= 3 && self.can_wear_goron_tunic() && self.str1 && (self.bow || self.hookshot1 || self.bomb); }
	self.can_enter_water = () => { return self.hookshot1 && self.irons; }
	self.middle_water = () => { return self.can_enter_water() && self.lullaby && (self.bow || self.can_use_dins()); }
	self.projectile_both = () => { return self.bomb || ((self.slingshot || self.boomerang) && (self.bow || self.hookshot1)); }
	self.projectile_child = () => { return self.bomb || self.slingshot || self.boomerang; }
	self.projectile_adult = () => { return self.bomb || self.bow || self.hookshot1; }
	self.can_wear_goron_tunic = () => { return self.goron_tunic || (self.wallet1 && (self.bomb || self.str1 || self.bow)); }
	self.can_wear_zora_tunic = () => { return self.zora_tunic || (self.wallet2 && (self.lullaby && self.bottle)); }
	//#endregion

	//#region Song Check Logic
	self.alwaysAccessible = () => { return true; }
	self.sunsSpot = () => { return self.lullaby; }
	self.boleroSpot = () => { return self.can_enter_fire_temple(); }
	self.minuetSpot = () => { return self.minuet || self.sarias; }
	self.requiemSpot = () => { return self.can_enter_colossus(); }
	self.serenadeSpot = () => { return self.ice_access(); }
	self.preludeSpot = () => { return self.forest_medallion; }
	self.nocturneSpot = () => { return self.forest_medallion && self.fire_medallion && self.water_medallion; }
	self.oot = () => { return self.emerald && self.ruby && self.sapphire; }
	//#endregion

	return self;
}());