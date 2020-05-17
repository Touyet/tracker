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
	["requiem"]: { name: "Requiem", default: "../normal/requiem.png", tagnia: "", soli: "", }
};

const locationData = {

	// Fairies
	["dins"]: { default: "../normal/dinsfairy.png", tagnia: "", soli: "" },
	["defense"]: { default: "../normal/gfairy.png", tagnia: "", soli: "" },

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

const CheckType = {
	ITEM: 0,
	SONG: 1
};

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
	}
};