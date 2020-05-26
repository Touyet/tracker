/**
 * @typedef {Object} ItemData
 * @property {string} name
 * @property {string} [default=""] 
 * @property {string} [tagnia=""] 
 * @property {string} [soli=""] 
 * @property {number} [count] 
 */

/**
  * @typedef {Object} AreaData
  * @property {string} name
  * @property {CheckData[]} checks List of checks in the area
  * @property {number} [small_keys]
  * @property {number} [boss_key]
  * @property {boolean} [isHinted]
  * @property {boolean} [isPeaked]
  */

/**
 * @typedef {Object} CheckData
 * @property {string} name Name displayed for check
 * @property {string} id Id corresponding to logic
 * @property {boolean} [giveReward] Set to true if check is a Boss
 */

/**
 * @typedef {number} Dungeon
 */
/**
 * @typedef {number} LogicStatus
 */
/**
 * @typedef {number} CheckType
 */

/**
 * @typedef {Object} Requirement
 * @property {string[]} requirements
 * @property {string[]} [alternateRequirement=[]] 
 */

/**
 * @typedef {Object} DungeonStyle
 * @property {string} path
 * @property {Object} css
 */


/**
 * @type {Object.<string,ItemData>}
 */
const itemsData = {
	// Single Items
	["bomb"]: { name: "Bomb Bag", default: "../normal/bombbag.png", tagnia: "", soli: "", count: 3 },
	["boomerang"]: { name: "Boomerang", default: "../normal/boomerang.png", tagnia: "", soli: "", },
	["bow"]: { name: "Bow", default: "../normal/bow.png", tagnia: "", soli: "", count: 3 },
	["hammer"]: { name: "Hammer", default: "../normal/hammer.png", tagnia: "", soli: "", },
	["irons"]: { name: "Iron Boots", default: "../normal/ironboots.png", tagnia: "", soli: "", },
	["slingshot"]: { name: "Slingshot", default: "../normal/slingshot.png", tagnia: "", soli: "", count: 3 },
	["bombchu"]: { name: "Bombchus", default: "../normal/bombchu.png", tagnia: "", soli: "", },
	["lens"]: { name: "Lens", default: "../normal/lens.png", tagnia: "", soli: "", },
	["magic"]: { name: "Magic", default: "../normal/magic.png", tagnia: "", soli: "", count: 2 },
	["hovers"]: { name: "Hover Boots", default: "../normal/hoverboots.png", tagnia: "", soli: "", },
	["mirror"]: { name: "Mirror Shield", default: "../normal/mirrorshield.png", tagnia: "", soli: "", },

	// Bottles
	["letter"]: { name: "Ruto's Letter", default: "../normal/letter.png", tagnia: "", soli: "", },
	["bottle"]: { name: "Bottle", default: "../normal/bottle.png", tagnia: "", soli: "", count: 3 },

	// Hookshots
	["hookshot1"]: { name: "Hookshot", default: "../normal/hookshot.png", tagnia: "", soli: "", },
	["hookshot2"]: { name: "Longshot", default: "../normal/longshot.png", tagnia: "", soli: "", },

	// Strength
	["str1"]: { name: "Strength", default: "../normal/strength1.png", tagnia: "", soli: "", },
	["str2"]: { name: "Strength", default: "../normal/strength2.png", tagnia: "", soli: "", },
	["str3"]: { name: "Strength", default: "../normal/strength3.png", tagnia: "", soli: "", },

	// Scales
	["scale1"]: { name: "Scale", default: "../normal/silverscale.png", tagnia: "", soli: "", },
	["scale2"]: { name: "Scale", default: "../normal/goldenscale.png", tagnia: "", soli: "", },

	// Fairy spell
	["farores"]: { name: "Farore's Wind", default: "../normal/farores.png", tagnia: "", soli: "", },
	["dins"]: { name: "Din's Fire", default: "../normal/dinsfire.png", tagnia: "", soli: "", },

	// Elemental Arrows
	["firearrows"]: { name: "Fire Arrows", default: "../normal/firearrows.png", tagnia: "", soli: "", },
	["lightarrows"]: { name: "Light Arrows", default: "../normal/lightarrows.png", tagnia: "", soli: "", },

	// Child Songs
	["lullaby"]: { name: "Lullaby", default: "../normal/lullaby.png", tagnia: "", soli: "", },
	["epona"]: { name: "Epona's", default: "../normal/eponas.png", tagnia: "", soli: "", },
	["saria"]: { name: "Saria's", default: "../normal/sarias.png", tagnia: "", soli: "", },
	["sun"]: { name: "Sun's", default: "../normal/suns.png", tagnia: "", soli: "", },
	["time"]: { name: "Time", default: "../normal/sot.png", tagnia: "", soli: "", },
	["storms"]: { name: "Storms", default: "../normal/sos.png", tagnia: "", soli: "", },

	// Adult Songs
	["prelude"]: { name: "Prelude", default: "../normal/prelude.png", tagnia: "", soli: "", },
	["minuet"]: { name: "Minuet", default: "../normal/minuet.png", tagnia: "", soli: "", },
	["bolero"]: { name: "Bolero", default: "../normal/bolero.png", tagnia: "", soli: "", },
	["serenade"]: { name: "Serenade", default: "../normal/serenade.png", tagnia: "", soli: "", },
	["nocturne"]: { name: "Nocturne", default: "../normal/nocturne.png", tagnia: "", soli: "", },
	["requiem"]: { name: "Requiem", default: "../normal/requiem.png", tagnia: "", soli: "", },

	// Wallets
	["wallet1"]: { name: "Adult's Wallet", default: "", tagnia: "", soli: "", },
	["wallet2"]: { name: "Giant's Wallet", default: "", tagnia: "", soli: "", },

	// Tunics
	["goron_tunic"]: { name: "Goron Tunic", default: "", tagnia: "", soli: "", },
	["zora_tunic"]: { name: "Zora Tunic", default: "", tagnia: "", soli: "", },

	// Medaillons
	["forest_medaillon"]: { name: "Forest Medaillon", default: "", tagnia: "", soli: "" },
	["fire_medaillon"]: { name: "Fire Medaillon", default: "", tagnia: "", soli: "" },
	["water_medaillon"]: { name: "Water Medaillon", default: "", tagnia: "", soli: "" },
	["shadow_medaillon"]: { name: "Shadow Medaillon", default: "", tagnia: "", soli: "" },
	["spirit_medaillon"]: { name: "Spirit Medaillon", default: "", tagnia: "", soli: "" },
	["light_medaillon"]: { name: "Light Medaillon", default: "", tagnia: "", soli: "" },

	// Stones
	["emerald"]: { name: "Kokiri's Emerald", default: "", tagnia: "", soli: "" },
	["ruby"]: { name: "Goron's Ruby", default: "", tagnia: "", soli: "" },
	["sapphire"]: { name: "Zora's Sapphire", default: "", tagnia: "", soli: "" },
};

/**
 * @type {Object.<string,ItemData>}
 */
const locationData = {

	// Fairies
	["dins"]: { default: "../normal/dinsfairy.png", tagnia: "", soli: "" },
	["dd"]: { default: "../normal/gfairy.png", tagnia: "", soli: "" },

	// Cutscene
	["lacs"]: { default: "../normal/la.png", tagnia: "", soli: "" },

	// Dungeons
	["deku"]: { default: "../normal/deku.png", tagnia: "", soli: "" },
	["dodongo"]: { default: "../normal/revamp/dodongo.png", tagnia: "", soli: "" },
	["jabu"]: { default: "../normal/jabu.jpg", tagnia: "", soli: "" },
	["ice"]: { default: "../normal/ice.png", tagnia: "", soli: "" },

	// Towns
	["kokiri"]: { default: "../normal/kokiri.png", tagnia: "", soli: "" },
	["ranch"]: { default: "../normal/cow.png", tagnia: "", soli: "" },
	["market"]: { default: "../normal/market.png", tagnia: "", soli: "" },
	["kak"]: { default: "../normal/kakariko.png", tagnia: "", soli: "" },
	["graveyard"]: { default: "../normal/graveyard.png", tagnia: "", soli: "" },
	["goron"]: { default: "../normal/goron.png", tagnia: "", soli: "" },
	["domain"]: { default: "../normal/revamp/domain.png", tagnia: "", soli: "" },
	["fortress"]: { default: "../normal/fortress.jpg", tagnia: "", soli: "" },

	// Overworld
	["dmt"]: { default: "../normal/revamp/dmt.png", tagnia: "", soli: "" },
	["crater"]: { default: "../normal/crater.png", tagnia: "", soli: "" },
	["fountain"]: { default: "../normal/fountain.png", tagnia: "", soli: "" },
	["lostwoods"]: { default: "../normal/lostWoods.png", tagnia: "", soli: "" },
	["sfm"]: { default: "../normal/sfm.png", tagnia: "", soli: "" },
	["river"]: { default: "../normal/river.jpg", tagnia: "", soli: "" },
	["colossus"]: { default: "../normal/DesertColossus2.jpg", tagnia: "", soli: "" },
	["wasteland"]: { default: "../normal/Haunted_Wasteland.jpg", tagnia: "", soli: "" },
	["hyrule"]: { default: "../normal/revamp/hyruleField.png", tagnia: "", soli: "" },
	["valley"]: { default: "../normal/Gerudo_Valley.png", tagnia: "", soli: "" },
	["lake"]: { default: "../normal/revamp/lake.png", tagnia: "", soli: "" },
};

/**
 * Area Map
 * Will be used to generate all checks in their respective area
 * @type {Object.<string,AreaData>}
 */
const areaData = {
	// Fairies
	["dins"]: { name: "Din's Fairy", checks: [{ name: "Din's Fairy", id: "dinsfairy" }] },
	["dd"]: { name: "Double Defense", checks: [{ name: "Ganon's Fairy", id: "ganonsfairy" }] },

	// Cutscene
	["lacs"]: { name: "LACS", checks: [{ name: "LACS", id: "lacs" }] },

	// Dungeons
	["deku"]: {
		name: "Deku",
		checks: [
			{ name: "Lobby", id: "deku_lobby" },
			{ name: "Sling 1", id: "deku_slinshot" },
			{ name: "Sling 2", id: "deku_slingshot_room_side" },
			{ name: "Compass 1", id: "deku_compass" },
			{ name: "Compass 2", id: "deku_compass_room_side" },
			{ name: "Basement", id: "deku_basement" },
			{ name: "Queen", id: "deku_queen_gohma", giveReward: true }]
	},
	["dodongo"]: {
		name: "Dodongo",
		checks: [
			{ name: "Map", id: "dodongos_map" },
			{ name: "Compass", id: "dodongos_compass" },
			{ name: "Platform", id: "dodongos_bomb_flower_platform" },
			{ name: "Bomb Bag", id: "dodongos_bomb_bag" },
			{ name: "Bridge", id: "dodongos_end_of_bridge" },
			{ name: "Above King", id: "dodongos_above_king" },
			{ name: "King", id: "dodongos_king_dodongo", giveReward: true }
		]
	},
	["jabu"]: {
		name: "Jabu",
		checks: [
			{ name: "Boomerang", id: "jabu_boomerang" },
			{ name: "Map", id: "jabu_map" },
			{ name: "Compass", id: "jabu_compass" },
			{ name: "Barinade", id: "jabu_barinade", giveReward: true }
		]
	},
	["forest"]: {
		name: "Forest",
		small_keys: 5,
		boss_key: 1,
		checks: [
			{ name: "First", id: "forest1" },
			{ name: "2 Stalfos", id: "forest2" },
			{ name: "Court. Hookshot", id: "forest3" },
			{ name: "Court. High", id: "forest4" },
			{ name: "Court. Low", id: "forest5" },
			{ name: "Shoot", id: "forest6" },
			{ name: "BK", id: "forest7" },
			{ name: "Floormasta", id: "forest8" },
			{ name: "Red", id: "forest9" },
			{ name: "Bow", id: "forest10" },
			{ name: "Blue", id: "forest11" },
			{ name: "Falling", id: "forest12" },
			{ name: "Near Boss", id: "forest13" },
			{ name: "Phantom Ganon", id: "forest14", giveReward: true },
		]
	},
	["fire"]: {
		name: "Fire",
		small_keys: 8,
		boss_key: 1,
		checks: [
			{ name: "Near Boss", id: "fire1" },
			{ name: "Hammer 1", id: "fire2" },
			{ name: "Hammer 2", id: "fire3" },
			{ name: "Lava Open", id: "fire4" },
			{ name: "Lava Bomb", id: "fire5" },
			{ name: "Volva", id: "fire6", giveReward: true },
			{ name: "Boulda Low", id: "fire7" },
			{ name: "Boulda Side", id: "fire8" },
			{ name: "Map", id: "fire9" },
			{ name: "Boulda Uppa", id: "fire10" },
			{ name: "Boulda Bomb", id: "fire11" },
			{ name: "Scarecrow", id: "fire12" },
			{ name: "Compass", id: "fire13" },
			{ name: "SoT Goron", id: "fire14" },
			{ name: "MEGA", id: "fire15" },
		]
	},
	["water"]: {
		name: "Water",
		small_keys: 6,
		boss_key: 1,
		checks: [
			{ name: "Compass", id: "water1" },
			{ name: "Map", id: "water2" },
			{ name: "Cracked", id: "water3" },
			{ name: "Torches", id: "water4" },
			{ name: "Bow Block", id: "water5" },
			{ name: "Pillar", id: "water6" },
			{ name: "Dark Link", id: "water7" },
			{ name: "Riva", id: "water8" },
			{ name: "Dragin'", id: "water9" },
			{ name: "BK", id: "water10" },
			{ name: "Morpha", id: "water11", giveReward: true },
		]
	},
	["shadow"]: {
		name: "Shadow",
		small_keys: 5,
		boss_key: 1,
		checks: [
			{ name: "Map", id: "shadow1" },
			{ name: "Hover Boots", id: "shadow2" },
			{ name: "Compass", id: "shadow3" },
			{ name: "Early Silvs", id: "shadow4" },
			{ name: "Spinning 1", id: "shadow5" },
			{ name: "Spinning 2", id: "shadow6" },
			{ name: "Spike Lower", id: "shadow7" },
			{ name: "Spike Uppa", id: "shadow8" },
			{ name: "Spike Switch", id: "shadow9" },
			{ name: "Mid Silvs", id: "shadow10" },
			{ name: "Freestanding", id: "shadow11" },
			{ name: "Wind", id: "shadow12" },
			{ name: "AW Bomb", id: "shadow13" },
			{ name: "AW Enemies", id: "shadow14" },
			{ name: "Dins 1", id: "shadow15" },
			{ name: "Dins 2", id: "shadow16" },
			{ name: "Floormasta", id: "shadow17" },
			{ name: "Bongo", id: "shadow18", giveReward: true },
		]
	},
	["spirit"]: {
		name: "Spirit",
		small_keys: 5,
		boss_key: 1,
		checks: [
			{ name: "Child Left", id: "spirit1" },
			{ name: "Child Right", id: "spirit2" },
			{ name: "Child Climb 1", id: "spirit3" },
			{ name: "Child Climb 2", id: "spirit4" },
			{ name: "Map", id: "spirit5" },
			{ name: "Sun Room", id: "spirit6" },
			{ name: "Right Hand", id: "spirit7" },
			{ name: "Adult Left", id: "spirit8" },
			{ name: "Adult Right", id: "spirit9" },
			{ name: "Mirror 1", id: "spirit10" },
			{ name: "Mirror 2", id: "spirit11" },
			{ name: "Lullaby Hand", id: "spirit12" },
			{ name: "Lullaby High", id: "spirit13" },
			{ name: "Mirror Room", id: "spirit14" },
			{ name: "Invisi 1", id: "spirit15" },
			{ name: "Invisi 2", id: "spirit16" },
			{ name: "Left Hand", id: "spirit17" },
			{ name: "BK", id: "spirit18" },
			{ name: "Tippy Top", id: "spirit19" },
			{ name: "Twinrova", id: "spirit20", giveReward: true },
		]
	},
	["ganon"]: {
		name: "Ganon",
		small_keys: 2,
		boss_key: 0,
		checks: [
			{ name: "Light 1", id: "ganon1" },
			{ name: "Light 2", id: "ganon2" },
			{ name: "Light 3", id: "ganon3" },
			{ name: "Light 4", id: "ganon4" },
			{ name: "Light 5", id: "ganon5" },
			{ name: "Light 6", id: "ganon6" },
			{ name: "Light Enemies", id: "ganon7" },
			{ name: "Light Lullaby", id: "ganon8" },
			{ name: "Spirit 1", id: "ganon9" },
			{ name: "Spirit 2", id: "ganon10" },
			{ name: "Forest", id: "ganon11" },
			{ name: "Water 1", id: "ganon12" },
			{ name: "Water 2", id: "ganon13" },
			{ name: "Shadow 1", id: "ganon14" },
			{ name: "Shadow 2", id: "ganon15" },
			{ name: "BK", id: "ganon16" }
		]
	},
	["ice"]: {
		name: "Ice Cavern",
		checks: [
			{ name: "Map", id: "ice_map" },
			{ name: "Compass", id: "ice_compass" },
			{ name: "HP", id: "ice_hp" },
			{ name: "Irons", id: "ice_irons" },
		]
	},
	["botw"]: {
		name: "BotW",
		small_keys: 3,
		checks: [
			{ name: "Fake Right", id: "well1" },
			{ name: "Center Small", id: "well5" },
			{ name: "Back Bomb", id: "well2" },
			{ name: "Water Left", id: "well3" },
			{ name: "Freestanding", id: "well4" },
			{ name: "Center Big", id: "well6" },
			{ name: "Fake Left", id: "well11" },
			{ name: "Front Bomb", id: "well7" },
			{ name: "Water Front", id: "well10" },
			{ name: "Dead Hand", id: "well8" },
			{ name: "Invisible", id: "well9" },
			{ name: "Locked 1", id: "well12" },
			{ name: "Locked 2", id: "well13" },
			{ name: "Basement", id: "well14" }
		]
	},
	["gtg"]: {
		name: "GTG",
		small_keys: 9,
		checks: [
			{ name: "Lobby Left", id: "gtg1" },
			{ name: "Lobby Right", id: "gtg2" },
			{ name: "Stalfos", id: "gtg3" },
			{ name: "Wolfos", id: "gtg4" },
			{ name: "Silvers 1", id: "gtg5" },
			{ name: "Silvers 2", id: "gtg6" },
			{ name: "Silvers 3", id: "gtg7" },
			{ name: "Silvers 4", id: "gtg8" },
			{ name: "Eyes", id: "gtg9" },
			{ name: "Above Eyes", id: "gtg10" },
			{ name: "Keese + Slugs", id: "gtg12" },
			{ name: "Hammer", id: "gtg11" },
			{ name: "Freestanding", id: "gtg13", isPeaked: true },
			{ name: "Right 1", id: "gtg14" },
			{ name: "Right 2", id: "gtg15" },
			{ name: "Beamos", id: "gtg16" },
			{ name: "Left 1", id: "gtg17" },
			{ name: "Left 2", id: "gtg18" },
			{ name: "Left 3", id: "gtg19" },
			{ name: "Left 4", id: "gtg20" },
			{ name: "Final", id: "gtg21" },
			{ name: "Toilet", id: "gtg22" }
		]
	},

	// Towns
	["kokiri"]: {
		name: "Kokiri",
		checks: [
			{ name: "Mido's 1", id: "mido_1" },
			{ name: "Mido's 2", id: "mido_2" },
			{ name: "Mido's 3", id: "mido_3" },
			{ name: "Mido's 4", id: "mido_4" },
			{ name: "Sword", id: "kokiri_sword" },
			{ name: "SoS", id: "kokiri_song_of_storms" }
		]
	},
	["ranch"]: {
		name: "Lon Lon Ranch",
		checks: [
			{ name: "T's Chicks", id: "talons_chickens" },
			{ name: "Back", id: "back_of_ranch" }
		]
	},
	["market"]: {
		name: "Market",
		checks: [
			{ name: "Slingin'", id: "market_slingshot_game" },
			{ name: "Big Rich", id: "richard" },
			{ name: "Bowlin' 1", id: "market_bowling_1" },
			{ name: "Bowlin' 2", id: "market_bowling_2" },
			{ name: "Chest Game", id: "market_lens_game" },
			{ name: "Poes", id: "poes" }
		]
	},
	["kak"]: {
		name: "Kakariko",
		checks: [
			{ name: "Roof", id: "man_on_roof" },
			{ name: "Back Grotto", id: "kakariko_grotto" },
			{ name: "Windmill", id: "windmill" },
			{ name: "Anju", id: "anju" },
			{ name: "Cow", id: "cow_house" },
			{ name: "Archery", id: "archery_game" },
			{ name: "Redead Gr.", id: "redead_grotto" },
			{ name: "Chickens", id: "anjus_chickens" },
			{ name: "10", id: "tokens_10" },
			{ name: "20", id: "tokens_20" },
			{ name: "30", id: "tokens_30", isHinted: true },
			{ name: "40", id: "tokens_40", isHinted: true },
			{ name: "50", id: "tokens_50", isHinted: true }
		]
	},
	["graveyard"]: {
		name: "Graveyard",
		checks: [
			{ name: "Shield", id: "shield_grave" },
			{ name: "Digging", id: "gravedigging_tour" },
			{ name: "Suns", id: "suns_grave" },
			{ name: "Fire", id: "fire_grave" },
			{ name: "Box", id: "graveyard_box", isPeaked: true },
			{ name: "Race 1", id: "race_1" },
			{ name: "Race 2", id: "race_2" }
		]
	},
	["goron"]: {
		name: "Goron City",
		checks: [
			{ name: "Big Rollin'", id: "rolling_goron" },
			{ name: "Dancin'", id: "goron_dance" },
			{ name: "Chuckin'", id: "goron_pot" },
			{ name: "Maze 1", id: "goron_maze_1" },
			{ name: "Maze 2", id: "goron_maze_2" },
			{ name: "Maze 3", id: "goron_maze_3" },
			{ name: "Lil Rollin'", id: "goron_link" }
		]
	},
	["domain"]: {
		name: "Zora's Domain",
		checks: [
			{ name: "Divin'", id: "zora_diving" },
			{ name: "Lit", id: "zora_torches" },
			{ name: "King", id: "thaw_king" },
		]
	},
	["fortress"]: {
		name: "Fortress",
		checks: [
			{ name: "Roof", id: "gerudo_roof" },
			{ name: "Archery 1", id: "gerudo_archery_1" },
			{ name: "Archery 2", id: "gerudo_archery_2" },
		]
	},

	// Overworld
	["dmt"]: {
		name: "DMT",
		checks: [
			{ name: "Wall", id: "trail_bombable" },
			{ name: "Top", id: "trail_dodongos_top" },
			{ name: "SoS", id: "trail_song_of_storms" },
			{ name: "Fairy", id: "crater_peak_fairy" },
			{ name: "Biggoron", id: "trade_quest", isHinted: true }
		]
	},
	["crater"]: {
		name: "DMC",
		checks: [
			{ name: "Bean", id: "crater_bean", isPeaked: true },
			{ name: "Fairy", id: "crater_hammer_fairy" },
			{ name: "Grotto", id: "crater_grotto" },
			{ name: "Nook", id: "crater_nook_hp" }
		]
	},
	["fountain"]: {
		name: "Fountain",
		checks: [
			{ name: "Fairy", id: "fountain_fairy" },
			{ name: "Glacier", id: "ice_glacier_hp" },
			{ name: "Divin'", id: "ice_bottom_of_fountain", isPeaked: true }
		]
	},
	["lostwoods"]: {
		name: "Lost Woods",
		checks: [
			{ name: "Ocarina", id: "ocarina_game" },
			{ name: "Generic", id: "lost_woods_grotto" },
			{ name: "Scrub Gr.", id: "lost_woods_scrub_grotto" },
			{ name: "Br. Scrub", id: "bridge_scrub" },
			{ name: "Target", id: "target" },
			{ name: "Saria Kid", id: "skull_kid" },
			{ name: "Skull Mask", id: "theater", isHinted: true }
		]
	},
	["sfm"]: { name: "Meadow", checks: [{ name: "Wolfos Gr.", id: "wolfos_grotto" }] },
	["river"]: {
		name: "River",
		checks: [
			{ name: "Pillar", id: "river_pillar" },
			{ name: "Grotto", id: "river_grotto" },
			{ name: "Ledge", id: "river_ledge" },
			{ name: "Frogs 1", id: "frogs_1" },
			{ name: "Frogs 2", id: "frogs_2", isHinted: true },
		]
	},
	["colossus"]: {
		name: "Colossus",
		checks: [
			{ name: "Bean", id: "colossus_bean", isPeaked: true },
			{ name: "Fairy", id: "colossus_fairy" },
		]
	},
	["wasteland"]: { name: "Wasteland", checks: [{ name: "Wasteland", id: "wasteland" }] },
	["hyrule"]: {
		name: "Hyrule Field",
		checks: [
			{ name: "Remote Gr.", id: "hyrule_forest_boulder" },
			{ name: "Open Gr.", id: "hyrule_open_grotto" },
			{ name: "Scrub Gr.", id: "hyrule_hp_scrub" },
			{ name: "Near Market", id: "hyrule_boulder_of_destiny" },
			{ name: "Tektite(ATZ)", id: "hyrule_tektite_grotto", isPeaked: true },
		]
	},
	["valley"]: {
		name: "Valley",
		checks: [
			{ name: "Box", id: "gerudovalley_box" },
			{ name: "Waterfall", id: "gerudovalley_waterfall" },
			{ name: "Rocks", id: "gerudo_hammer" },
		]
	},
	["lake"]: {
		name: "Lake",
		checks: [
			{ name: "Ch. Fishing", id: "hylia_child_fishing" },
			{ name: "Bottle", id: "hylia_bottle", isPeaked: true },
			{ name: "Ad. Fishing", id: "hylia_adult_fishing" },
			{ name: "LabTop", id: "hylia_lab_top" },
			{ name: "Divin'", id: "hylia_lab_dive" },
			{ name: "Shootin'", id: "hylia_sun_shoot", isPeaked: true },
		]
	},

	//Song area
	["songs"]: {
		name: "Songs",
		checks: [
			{ name: "Zelda", id: "zelda" },
			{ name: "Malon", id: "epona" },
			{ name: "Saria", id: "saria" },
			{ name: "Windmill", id: "storms" },
			{ name: "Grave", id: "sun" },
			{ name: "Crater", id: "bolero" },
			{ name: "Meadow", id: "minuet" },
			{ name: "Colossus", id: "requiem" },
			{ name: "Ice", id: "serenade" },
			{ name: "1 Medallion", id: "prelude" },
			{ name: "3 Medallion", id: "nocturne" },
			{ name: "Ocarina of Time", id: "time", isHinted: true },
		]
	}
}

/**
 * @enum {CheckType}
 */
const CheckType = {
	ITEM: 0,
	SONG: 1,
	MED: 2
};

/**
 * @enum {LogicStatus}
 */
const LogicStatus = {
	NONE: 0,
	IN_LOGIC: 1,
	OUT_LOGIC: 2
};

/**
 * @enum {Dungeon}
 */
const Dungeon = {
	POCKET: 0,

	DEKU: 1,
	DC: 2,
	JABU: 3,

	FOREST: 4,
	FIRE: 5,
	WATER: 6,
	SHADOW: 7,
	SPIRIT: 8,

	GANON: 9
};

/**
 * @type {Object.<number, Object.<string,string>}
 */
const Abbrev = {
	[CheckType.SONG]: {
		"lul": "lullaby",
		"epo": "epona",
		"sar": "saria",
		"sot": "time",
		"sun": "sun",
		"sos": "storms",
		"min": "minuet",
		"bol": "bolero",
		"ser": "serenade",
		"req": "requiem",
		"noc": "nocturne",
		"pre": "prelude",
	},
	[CheckType.ITEM]: {
		"hoo": "hookshot"
	},
	[CheckType.MED]: {
		"de": "deku",
		"do": "dodongo",
		"ja": "jabu",
		"kk": "pocket",
		"fr": "pocket",
		"fo": "forest",
		"fi": "fire",
		"wa": "water",
		"sp": "spirit",
		"sh": "shadow",
	}
};

//Always displayed items
const itemListId = ['farores', 'firearrows', 'lens', 'bombchu', 'scale1', 'bottle', 'slingshot', 'str3'];
const songListId = ['lullaby', 'epona', 'saria', 'time', 'sun', 'storms', 'minuet', 'bolero', 'serenade', 'requiem', 'nocturne', 'prelude'];

/**
 * @type {Object.<string,Requirement>}
 */
const dungeonRequirements = {
	["forest"]: {
		requirements: ["hookshot1", "bow", "str1"],
	},
	["fire"]: {
		requirements: ["hammer"],
	},
	["water"]: {
		requirements: ["hookshot2"],
		alternateRequirement: ["irons", "scale2"],
	},
	["spirit"]: {
		requirements: ["str2", "mirror", "bomb", "hookshot1"],
	},
	["shadow"]: {
		requirements: ["dins", "magic", "hovers", "bomb", "hookshot1"],
	},
	["pocket"]: {
		requirements: [],
	},
	["ganon"]: {
		requirements: ["magic", "lightarrows", "bow"],
	},
	["deku"]: {
		requirements: [],
	},
	["dodongo"]: {
		requirements: ["bomb"],
	},
	["jabu"]: {
		requirements: ["boomerang", "letter"],
	}
}

/**
 * @type {DungeonStyle[]}
 */
const dungeonStyle = [
	{ path: "", css: { color: "lightgreen" } },
	{ path: "", css: { color: "red" } },
	{ path: "", css: { color: "blue" } },
	{ path: "", css: { color: "yellow" } },
	{ path: "", css: { color: "yellow" } },
	{ path: "", css: { color: "yellow", opacity: 0.2 } },
	{ path: "", css: { color: "lightgreen", opacity: 0.6 } },
	{ path: "", css: { color: "red", opacity: 0.6 } },
	{ path: "", css: { color: "blue", opacity: 0.6 } }
];