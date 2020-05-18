class Check {
	/**
	 * @param {HTMLElement} $container Container to draw into
	 * @param {number} type Type of check 
	 * @param {string} name Check name
	 * @param {string} id Check Id
	 * @param {()=>boolean} [logic] callback representing check logic
	 */
	constructor($container, type, name, id, logic) {
		this.$container = $container;
		this.type = type;
		this.name = name;
		this.id = id;
		this.logic = logic ? logic : () => { return true };
		this.buildHtml();
	}

	updateWithLogic() {
		if (this.logic()) {
			if (hideInaccessible) {
				this.$html.show();
			}
			this.$html.find("span").css("color", "lime");
		} else {
			if (hideInaccessible) {
				this.$html.hide();
			}
			this.$html.find("span").css("color", "black");

		}
	}

	buildHtml() {
		if (this.$container && !this.$html) {
			this.$html = $(`
			<div>
  				<input type="text" maxlength="3">
    			<span class="input-group-text">${this.name}</span>
			</div>
			`);

			this.$container.append(this.$html);
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
						self.item = items.filter(v => v.id === result && !v.gotten)[0];
						if (!self.item) return;
						self.item.gotten = true;
						self.item.highlightItemIfNeeded();
						Logic.updateWithItemGet(self.item.id);
						self.updateHtml();
						if (this.type == CheckType.SONG) {
							updateSection(songs);
						}
					}
				}
			});
		}
	}

	updateHtml() {
		if (this.item.gotten) {
			if (this.type === CheckType.SONG) {
				this.$html.empty();
				this.$html.append(`${this.name} : ${this.item.name}`);
				this.$html.css({ color: "lime" });
			} else if (this.type === CheckType.ITEM) {

			}
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
		this.gotten = false;
		this.$container = [];
		this.count = count | 1;
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
						self.gotten = !self.gotten;
						if (self.gotten) self.count--;
						else self.count++;
						//Handle scenario of item with progressives upgrades.
						if ((self.id.startsWith("hookshot") || self.id.startsWith("scale") || self.id.startsWith("str"))) {
							let prefix = self.id.substring(0, self.id.length - 1);
							let index = +(self.id.substring(self.id.length - 1)); // Cast number
							if (index > 1) {
								for (let i = index - 1; i >= 1; i--) {
									let item = items.filter(v => v.id == prefix + i)[0];
									if (item) {
										item.gotten = true;
										item.count--;
										item.highlightItemIfNeeded();
									}
								}
							}
							if (index <= 2) {
								for (let i = index + 1; i <= 3; i++) {
									let item = items.filter(v => v.id == prefix + i)[0];
									if (!item) break;
									if (self.gotten == false) {
										item.gotten = false;
										item.count++;
										item.highlightItemIfNeeded();
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
var areas = [];

$(document).ready(() => {
	let $document = $(document);
	initItemList();
	initSongSection($document);
	initItemListSection($document, ".items", 4, itemListId);
	initItemListSection($document, ".songList", 6, songListId);
	initDungeonSection($document);
	initDungeonRequirementSection($document, ["forest", "fire", "water", "shadow", "spirit", "pocket"], ["deku", "dodongo", "jabu"]);
	Logic.init(items, areas);
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
		songs.push(new Check($songSection, CheckType.SONG, "Zelda", "lullaby", Logic.alwaysAccessible));
		songs.push(new Check($songSection, CheckType.SONG, "Saria", "saria", Logic.alwaysAccessible));
		songs.push(new Check($songSection, CheckType.SONG, "Epona", "epona", Logic.alwaysAccessible));
		songs.push(new Check($songSection, CheckType.SONG, "Sun", "sun", Logic.sunsSpot));
		songs.push(new Check($songSection, CheckType.SONG, "OoT", "time", Logic.oot));
		songs.push(new Check($songSection, CheckType.SONG, "Storms", "storms", Logic.alwaysAccessible));
		songs.push(new Check($songSection, CheckType.SONG, "Minuet", "minuet", Logic.minuetSpot));
		songs.push(new Check($songSection, CheckType.SONG, "Bolero", "bolero", Logic.boleroSpot));
		songs.push(new Check($songSection, CheckType.SONG, "Serenade", "serenade", Logic.serenadeSpot));
		songs.push(new Check($songSection, CheckType.SONG, "Nocturne", "nocturne", Logic.nocturneSpot));
		songs.push(new Check($songSection, CheckType.SONG, "Requiem", "requiem", Logic.requiemSpot));
		songs.push(new Check($songSection, CheckType.SONG, "Prelude", "prelude", Logic.preludeSpot));
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
 * @param {Check[]} sectionChecks Checks in section.
 */
function updateSection(sectionChecks) {
	if (sectionChecks && sectionChecks.length) {
		sectionChecks.forEach(v => {
			v.updateWithLogic();
		})
	}
}
