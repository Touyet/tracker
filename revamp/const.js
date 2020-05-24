/**
 * @typedef {Object} ItemData
 * @property {string} name
 * @property {string} [default=""] 
 * @property {string} [tagnia=""] 
 * @property {string} [soli=""] 
 * @property {number} [count] 
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
 * @type Object.<string,ItemData>
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
 * @type Object.<string,ItemData>
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
	["forest"]: { default: "../normal/kokiri.png", tagnia: "", soli: "" },
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
 * @type Object.<string,Requirement>
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
 * @type Array.<DungeonStyle>
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