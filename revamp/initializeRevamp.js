class Check {
	/**
	 * @param {HTMLElement} $container Container to draw into
	 * @param {number} type Type of check 
	 * @param {string} name Check name
	 * @param {string} id Check Id
	 */
	constructor($container, type, name, id) {
		this.$container = $container;
		this.type = type;
		this.name = name;
		this.id = id;
		this.logic = Logic.getLogicForCheck(id);
		this.checkStatus = LogicStatus.NONE;

		this.$html = $(`<div></div>`)
		$container.append(this.$html);

		this.buildHtml();
	}

	/**
	 * @returns {Item}
	 */
	get item() { return this.itemProp; }
	set item(v) { this.itemProp = v; }


	/**
	 * @returns {LogicStatus}
	 */
	get checkStatus() { return this.checkStatusProp; }
	set checkStatus(v) { this.checkStatusProp = v; }

	updateWithLogic() {
		this.checkStatus = this.logic()
		if (this.item) {
			this.item.gotten = this.checkStatus;
		}
		this.updateHtml();
	}

	buildHtml() {
		if (this.$container && this.$html) {
			this.$html.empty();
			let $form = $(`
  				<input type="text" maxlength="3">
    			<span class="input-group-text">${this.name}</span>
			`);
			this.$html.append($form);
			this.updateWithLogic();

			let abbrevArray = Abbrev[this.type];
			let $input = this.$html.find('input');
			let self = this;
			$input.on("input", (ev) => {
				let value = $input.val();
				if (value.length === 3) {
					let uncaps = value.toLowerCase();
					let result = abbrevArray[uncaps]
					if (result) {
						self.item = items.filter(v => v.id === result && v.gotten != LogicStatus.IN_LOGIC)[0];
						if (!self.item) return;
						self.item.gotten = this.checkStatus;
						self.updateHtml();
						updateSection();
					}
				}
			});
		}
	}

	updateHtml() {
		if (this.type == CheckType.SONG && this.item) {
			this.$html.empty();
			this.$html.append(`<span>${this.name} : ${this.item.name}</span>`);
		}

		if (this.checkStatus == LogicStatus.IN_LOGIC) {
			if (hideInaccessible) {
				this.$html.show();
			}
			this.$html.find("span").css({ color: "lime", opacity: 1 });
		} else if (this.checkStatus == LogicStatus.OUT_LOGIC) {
			if (hideInaccessible) {
				this.$html.show();
			}
			this.$html.find("span").css({ color: "yellow", opacity: 0.5 });
		} else {
			if (hideInaccessible) {
				this.$html.hide();
			}
			this.$html.find("span").css("color", "black");
		}
	}
}

class Item {
	/**
	 * 
	 * @param {string} name item name
	 * @param {string} id item id
	 * @param {boolean} inUI present in interface
	 * @param {number} [count=1] number of item present in pool
	 */
	constructor(name, id, inUI, count) {
		this.name = name;
		this.id = id;
		this.inUI = inUI;
		this.gotten = LogicStatus.NONE;
		this.$container = [];
		this.count = count | 1;
	}

	/**@type {LogicStatus} 
	 * The only way to put gotten to IN_LOGIC is through a check
	 */
	get gotten() { return this.gottenProp; }
	set gotten(val) {
		if (this.gottenProp == val) return;
		this.gottenProp = val;
		if (this.gotten != LogicStatus.NONE && this.count > 0) this.count--;
		else if (this.gotten == LogicStatus.NONE) this.count++;

		this.highlightItemIfNeeded();
		Logic.updateWithItemGet(this);
	}

	highlightItemIfNeeded() {
		if (this.inUI) {
			let opacity = this.gotten ? 1 : .2;
			let htmlId = this.id + 'img';
			this.$container.forEach(e => {
				let img = e.find('#' + htmlId);
				if (img) {
					img.css('opacity', opacity);
				}
			});
		}
	}

	buildHtmlIfNeeded() {
		if (this.inUI) {
			let path = itemsData[this.id].default;
			let htmlId = this.id + 'img';
			let self = this;
			if (this.$container) {
				let $html = $(`<img class="itempics" src="${path}" id="${htmlId}" alt=${this.name}></img>`);
				this.$container.forEach(e => {
					e.empty();
					let $clone = $html.clone();
					$clone.on("click", () => {
						if (self.gotten == LogicStatus.IN_LOGIC) return;
						if (self.gotten == LogicStatus.NONE) {
							self.gotten = LogicStatus.OUT_LOGIC;
						} else { self.gotten = LogicStatus.NONE; }
						//Handle scenario of item with progressives upgrades.
						if ((self.id.startsWith("hookshot") || self.id.startsWith("scale") || self.id.startsWith("str"))) {
							let prefix = self.id.substring(0, self.id.length - 1);
							let index = +(self.id.substring(self.id.length - 1)); // Cast number
							if (index > 1) {
								for (let i = index - 1; i >= 1; i--) {
									let item = items.filter(v => v.id == prefix + i)[0];
									if (item) {
										item.gotten = LogicStatus.OUT_LOGIC;
									}
								}
							}
							if (index <= 2) {
								for (let i = index + 1; i <= 3; i++) {
									let item = items.filter(v => v.id == prefix + i)[0];
									if (!item) break;
									if (self.gotten == LogicStatus.NONE) {
										item.gotten = LogicStatus.NONE;
									}
								}
							}
						}
						self.highlightItemIfNeeded();
					});
					e.append($clone);
					self.highlightItemIfNeeded();
				})
			}
		}
	}
}

class Area {
	/**
	 * Create and build an Area.
	 * @param {JQuery} $container Container to draw into
	 * @param {string} name Area Name
	 * @param {string} id Area id
	 * @param {number} checks number of check in said area
	 * @param {number} [sk=0] sk small key number, when > 0, determine if it's a dungeon
	 * @param {number} [bk=null] boss key, when null, determine if it's a sub dungeon or not (alongside sk parameter)
	 */
	constructor($container, name, id, checks, sk, bk) {
		this.$container = $container;
		this.name = name;
		this.id = id;
		this.checks = checks;
		this.sk = sk;
		this.bk = bk;
		this.isDungeon = this.sk > 0;
		this.isSubDungeon = this.bk == null && this.sk > 0;
		this.reward = null;

		this.buildHtmlIfNeeded()
	}

	buildHtmlIfNeeded() {
		this.$html = $(`<div></div>`);
		if (this.isDungeon || this.isSubDungeon) {
			let $header = $(`<div></div>`);
			this.$html.append($header);
			let cssId = this.isSubDungeon ? this.id : this.id + 'Dungeon';
			let $spanName = $(`<span class="dungeon" id=${cssId}>${this.name}</span>`)
			let $spanItem = $(`<span class="badge badge-pill badge-primary relevantItems">${this.checks}</span>`)
			let $spanSk = $(`<span class="badge badge-pill badge-secondary sk">${this.sk}</span>`)
			this.$html.append($spanName, $spanItem, $spanSk);
			if (!this.isSubDungeon) {
				let $spanBk = $(`<span class="badge badge-pill badge-danger bk">${this.bk}</span>`)
				this.$html.append($spanBk);
			}
		}
		this.$container.append(this.$html);
	}
}

var hideInaccessible = false;
/**
 * @type Check[]
 */
var songs = [];
/**
 * @type Item[]
 */
var items = [];

/**
 * @type Area[]
 */
var areas = [];

$(document).ready(() => {
	let $document = $(document);
	initItemList();
	initSongSection($document);
	initItemListSection($document, ".items", 4, itemListId);
	initItemListSection($document, ".songList", 6, songListId);
	initDungeonSection($document);
	initDungeonRequirementSection($document, ["forest", "fire", "water", "shadow", "spirit", "pocket"], ["deku", "dodongo", "jabu"]);
	// Logic.init(items, areas);
})

/**
 * 
 * @param {HTMLElement} $document current document
 * @param {string} id html class to add to
 * @param {number} mod number of item to display before going onto the next line
 * @param {string[]} list item list
 */
function initItemListSection($document, id, mod, list) {
	let $itemsSection = $document.find(id);
	if ($itemsSection) {
		let $row = $(`<div class="row"></div>`);
		let $col = $(`<div class="col-sm"></div>`);
		let $cloneRow = null;
		for (let index = 0; index < list.length; index++) {
			const element = list[index];
			let item = items.filter(v => v.id === element)[0];
			if (item) {
				item.inUI = true;
				let $cloneCol = $col.clone();
				item.$container.push($cloneCol);
				if (index % mod == 0) {
					$cloneRow = $row.clone();
				}
				$cloneRow.append($cloneCol);
				$itemsSection.append($cloneRow);
				item.buildHtmlIfNeeded();
			}
		}
	}
}

function initSongSection($document) {
	var $songSection = $document.find(".songs");
	if ($songSection) {
		songs.push(new Check($songSection, CheckType.SONG, "Zelda", "lullaby"));
		songs.push(new Check($songSection, CheckType.SONG, "Saria", "saria"));
		songs.push(new Check($songSection, CheckType.SONG, "Epona", "epona"));
		songs.push(new Check($songSection, CheckType.SONG, "Sun", "sun"));
		songs.push(new Check($songSection, CheckType.SONG, "OoT", "time"));
		songs.push(new Check($songSection, CheckType.SONG, "Storms", "storms"));
		songs.push(new Check($songSection, CheckType.SONG, "Minuet", "minuet"));
		songs.push(new Check($songSection, CheckType.SONG, "Bolero", "bolero"));
		songs.push(new Check($songSection, CheckType.SONG, "Serenade", "serenade"));
		songs.push(new Check($songSection, CheckType.SONG, "Nocturne", "nocturne"));
		songs.push(new Check($songSection, CheckType.SONG, "Requiem", "requiem"));
		songs.push(new Check($songSection, CheckType.SONG, "Prelude", "prelude"));
	}
}

/**
 * Fill dungeon requirement section
 * @param {HTMLElement} $document current document
 * @param {string[]} medDungeon medaillon dungeon. In the following order : forest, fire, water, shadow,spirit,pocket
 * @param {string[]} stoneDungeons stone dungeon. In the following order : deku, dodongo, jabu
 */
function initDungeonRequirementSection($document, medDungeon, stoneDungeons) {
	var $requirementSection = $document.find(".requirements");
	if ($requirementSection) {
		$requirementSection.empty();
		let $div = $(`<div></div>`);

		let i = 0;
		for (let index = 0; index < medDungeon.length; index++) {
			let key = medDungeon[index];
			let requirements = dungeonRequirements[key];
			if (requirements) {
				let $cloneDiv = $div.clone();
				$requirementSection.append($cloneDiv);
				buildRequirementHtml($cloneDiv, requirements, key, dungeonStyle[i++]);
			}
		}
		for (let index = 0; index < stoneDungeons.length; index++) {
			let key = stoneDungeons[index];
			let requirements = dungeonRequirements[key];
			if (requirements) {
				let $cloneDiv = $div.clone();
				$requirementSection.append($cloneDiv);
				buildRequirementHtml($cloneDiv, requirements, key, dungeonStyle[i++]);
			}
		}
	}

}

function buildRequirementHtml($cloneDiv, element, key, style) {
	let $name = $(`<span>${key.slice(0, 3)}</span>`);
	$name.css(style.css);
	$cloneDiv.append($name);
	if (element.alternateRequirement) {
		for (let index = 0; index < element.alternateRequirement.length; index++) {
			const req = element.alternateRequirement[index];
			let item = items.filter(v => v.id == req)[0];
			let $span = $(`<span></span>`);
			$cloneDiv.append($span);
			if (item) {
				item.$container.push($span);
				item.inUI = true;
				item.buildHtmlIfNeeded();
			}
			if (index < element.alternateRequirement.length - 1) {
				$cloneDiv.append("/");
			}
		}
		if (element.requirements.length) {
			$cloneDiv.append("+");
		}
	}
	if (element.requirements.length) {
		for (const iterator of element.requirements) {
			let item = items.filter(v => v.id == iterator)[0];
			let $span = $(`<span></span>`);
			$cloneDiv.append($span);
			if (item) {
				item.$container.push($span);
				item.inUI = true;
				item.buildHtmlIfNeeded();
			}
		}
	}
}

function initDungeonSection($document) {
	let column1 = $document.find("#dungeonColumn1");
	let column2 = $document.find("#dungeonColumn2");
	let column3 = $document.find("#dungeonColumn3");

	areas.push(new Area(column1, "For", "forest", 8, 5, 1));
	addSeparation(column1);
	areas.push(new Area(column1, "Fir", "fire", 6, 8, 1));
	addSeparation(column1);
	areas.push(new Area(column1, "Wat", "water", 4, 6, 1));
	areas.push(new Area(column2, "Spi", "spirit", 14, 5, 1));
	addSeparation(column2);
	areas.push(new Area(column2, "Sha", "shadow", 12, 5, 1));
	addSeparation(column2);
	areas.push(new Area(column2, "Gan", "ganon", 14, 2, 0));
	areas.push(new Area(column3, "GTG", "gtg", 13, 9));
	addSeparation(column3);
	areas.push(new Area(column3, "BoTW", "botw", 11, 3));
}

function addSeparation($div) {
	$div.append("<hr>");
}

/**
 * Check if a string contains at least one capital character
 * @param {string} str 
 * @returns index of string, -1 if not found
 */
function stringContainsCapital(str) {
	if (str) {
		for (let i = 0; i < str.length; i++) {
			const char = str[i];
			if (char === char.toUpperCase()) return i;
		}
	}
	return -1;
}

function initItemList() {
	for (const key in itemsData) {
		if (itemsData.hasOwnProperty(key)) {
			const element = itemsData[key];
			items.push(new Item(element.name, key, false, element.count));
		}
	}
}

/**
 * 
 */
function updateSection() {
	songs.filter(v => !v.item || (v.item && v.item.gotten != LogicStatus.IN_LOGIC)).forEach(v => {
		v.updateWithLogic();
	})
}
