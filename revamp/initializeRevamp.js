class Check {
	constructor($container, type, name, id, logic) {
		this.$container = $container;
		this.type = type;
		this.name = name;
		this.id = id;
		this.logic = logic;
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
						self.updateHtml();
					}
				}
			});
		}
	}

	updateHtml() {
		if (this.type === CheckType.SONG) {
			this.$html.empty();
			this.$html.append(`${this.name} : ${this.item.name}`);
			this.$html.css({ color: "lime" })
		} else if (this.type === CheckType.ITEM) {

		}
	}

	formatItemString(itemName) {
		let name = itemName.toLowerCase();
		return name[0].toUpperCase() + name.slice(1);
	}
}

class Item {
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
	constructor($container, name, id, sk, bk, item) {
		this.$container = $container;
		this.name = name;
		this.id = id;
		this.sk = sk;
		this.bk = bk;
		this.item = item;
		this.isDungeon = this.sk > 0;
		this.isSubDungeon = this.bk == null;
		this.buildHtmlIfNeeded()
	}

	buildHtmlIfNeeded() {
		this.$html = $(`<div></div>`);
		if (this.isDungeon || this.isSubDungeon) {
			let $header = $(`<div></div>`);
			this.$html.append($header);
			let cssId = this.isSubDungeon ? this.id : this.id + 'Dungeon';
			let $spanName = $(`<span class="dungeon" id=${cssId}>${this.name}</span>`)
			let $spanItem = $(`<span class="badge badge-pill badge-primary relevantItems">${this.item}</span>`)
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
var songs = [];
var items = [];
var areas = [];

var itemListId = ['farores', 'firearrows', 'lens', 'bombchu', 'scale1', 'bottle', 'slingshot', 'str3'];
var songListId = ['lullaby', 'epona', 'saria', 'time', 'sun', 'storms', 'minuet', 'bolero', 'serenade', 'requiem', 'nocturne', 'prelude'];

var dungeonRequirement = {
	["Forest"]: {
		requirements: ["hookshot1", "bow", "str1"],
		css: { color: "lightgreen" }
	},
	["Fire"]: {
		requirements: ["hammer"],
		css: { color: "red" }
	},
	["Water"]: {
		requirements: ["hookshot2"],
		alternateRequirement: ["irons", "scale2"],
		css: { color: "blue" }
	},
	["Spirit"]: {
		requirements: ["str2", "mirror", "bomb", "hookshot1"],
		css: { color: "yellow" }
	},
	["Shadow"]: {
		requirements: ["dins", "magic", "hovers", "bomb", "hookshot1"],
		css: { color: "yellow" }
	},
	["Pocket"]: {
		requirements: [],
		css: { color: "yellow", opacity: 0.2 }

	},
	["Ganon"]: {
		requirements: ["magic", "lightarrows", "bow"],
		css: { color: "rgb(102, 0, 0)" }
	},
	["Deku"]: {
		requirements: [],
		css: { color: "lightgreen", opacity: .6 }
	},
	["Dodongo"]: {
		requirements: ["bomb"],
		css: { color: "red", opacity: .6 }
	},
	["Jabu"]: {
		requirements: ["boomerang", "letter"],
		css: { color: "blue", opacity: .6 }
	},
}


$(document).ready(() => {
	let $document = $(document);
	initItemList();
	initSongSection($document);
	initItemListSection($document, ".items", 4, itemListId);
	initItemListSection($document, ".songList", 6, songListId);
	initDungeonSection($document);
	initDungeonRequirementSection($document)
})

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
		songs.push(new Check($songSection, CheckType.SONG, "Zelda", "lullaby", () => { return true; }));
		songs.push(new Check($songSection, CheckType.SONG, "Saria", "saria", () => { return true; }));
		songs.push(new Check($songSection, CheckType.SONG, "Epona", "epona", () => { return true; }));
		songs.push(new Check($songSection, CheckType.SONG, "Sun", "sun", () => { return false; }));
		songs.push(new Check($songSection, CheckType.SONG, "OoT", "time", () => { return false; }));
		songs.push(new Check($songSection, CheckType.SONG, "Storms", "storms", () => { return true; }));
		songs.push(new Check($songSection, CheckType.SONG, "Minuet", "minuet", () => { return false; }));
		songs.push(new Check($songSection, CheckType.SONG, "Bolero", "bolero", () => { return false; }));
		songs.push(new Check($songSection, CheckType.SONG, "Serenade", "serenade", () => { return false; }));
		songs.push(new Check($songSection, CheckType.SONG, "Nocturne", "nocturne", () => { return false; }));
		songs.push(new Check($songSection, CheckType.SONG, "Requiem", "requiem", () => { return false; }));
		songs.push(new Check($songSection, CheckType.SONG, "Prelude", "prelude", () => { return false; }));

		// songs.forEach(s => s.buildHtml());
	}
}

function initDungeonRequirementSection($document) {
	var $requirementSection = $document.find(".requirements");
	if ($requirementSection) {
		let $div = $(`<div></div>`)
		for (const key in dungeonRequirement) {
			if (dungeonRequirement.hasOwnProperty(key)) {
				const element = dungeonRequirement[key];
				let $cloneDiv = $div.clone();
				$requirementSection.append($cloneDiv);
				let $name = $(`<span>${key.slice(0, 3)}</span>`)
				$name.css(element.css);
				$cloneDiv.append($name);
				if (element.alternateRequirement) {
					for (let index = 0; index < element.alternateRequirement.length; index++) {
						const req = element.alternateRequirement[index];
						let item = items.filter(v => v.id == req)[0];
						let $span = $(`<span></span>`)
						$cloneDiv.append($span);
						if (item) {
							item.$container.push($span);
							item.inUI = true;
							item.buildHtmlIfNeeded()
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
						let $span = $(`<span></span>`)
						$cloneDiv.append($span);
						if (item) {
							item.$container.push($span);
							item.inUI = true;
							item.buildHtmlIfNeeded()
						}
					}
				}

			}
		}
	}

}

function initDungeonSection($document) {
	let column1 = $document.find("#dungeonColumn1");
	let column2 = $document.find("#dungeonColumn2");
	let column3 = $document.find("#dungeonColumn3");

	areas.push(new Area(column1, "For", "forest", 5, 1, 8));
	addSeparation(column1);
	areas.push(new Area(column1, "Fir", "fire", 8, 1, 6));
	addSeparation(column1);
	areas.push(new Area(column1, "Wat", "water", 6, 1, 4));
	areas.push(new Area(column2, "Spi", "spirit", 5, 1, 14));
	addSeparation(column2);
	areas.push(new Area(column2, "Sha", "shadow", 5, 1, 12));
	addSeparation(column2);
	areas.push(new Area(column2, "Gan", "ganon", 2, 0, 14));
	areas.push(new Area(column3, "GTG", "gtg", 9, null, 13));
	addSeparation(column3);
	areas.push(new Area(column3, "BoTW", "botw", 3, null, 11));
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
