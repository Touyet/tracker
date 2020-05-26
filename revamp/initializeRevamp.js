var hideInaccessible = false;
/**
 * @type {Item[]}
 */
var items = [];
/**
 * @type {Check[]}
 */
var checks = [];
/**
 * @type {Area[]}
 */
var areas = [];

let $document = $(document);

$document.ready(() => {
	initItemList();
	initDungeonSection();
	initSongSection();
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
				item.presentInUI = true;
				let $cloneCol = $col.clone();
				item.$container.push($cloneCol);
				if (index % mod == 0) {
					$cloneRow = $row.clone();
				}
				$cloneRow.append($cloneCol);
				$itemsSection.append($cloneRow);
			}
		}
	}
}

function initSongSection() {
	var $songSection = $document.find(".songs");
	if ($songSection) {
		checks.push(new Check($songSection, CheckType.SONG, "Zelda", "zelda"));
		checks.push(new Check($songSection, CheckType.SONG, "Saria", "saria"));
		checks.push(new Check($songSection, CheckType.SONG, "Epona", "epona"));
		checks.push(new Check($songSection, CheckType.SONG, "Sun", "sun"));
		checks.push(new Check($songSection, CheckType.SONG, "OoT", "time"));
		checks.push(new Check($songSection, CheckType.SONG, "Storms", "storms"));
		checks.push(new Check($songSection, CheckType.SONG, "Minuet", "minuet"));
		checks.push(new Check($songSection, CheckType.SONG, "Bolero", "bolero"));
		checks.push(new Check($songSection, CheckType.SONG, "Serenade", "serenade"));
		checks.push(new Check($songSection, CheckType.SONG, "Nocturne", "nocturne"));
		checks.push(new Check($songSection, CheckType.SONG, "Requiem", "requiem"));
		checks.push(new Check($songSection, CheckType.SONG, "Prelude", "prelude"));
	}
}

function initDungeonSection() {
	let column1 = $document.find("#dungeonColumn1");
	let column2 = $document.find("#dungeonColumn2");

	areas.push(new Area(column1, "For", "forest", 8, 5, 1));
	addSeparation(column1);
	areas.push(new Area(column1, "Fir", "fire", 6, 8, 1));
	addSeparation(column1);
	areas.push(new Area(column1, "Wat", "water", 4, 6, 1));
	addSeparation(column1);
	areas.push(new Area(column1, "GTG", "gtg", 13, 9));

	areas.push(new Area(column2, "Spi", "spirit", 14, 5, 1));
	addSeparation(column2);
	areas.push(new Area(column2, "Sha", "shadow", 12, 5, 1));
	addSeparation(column2);
	areas.push(new Area(column2, "Gan", "ganon", 14, 2, 0));
	addSeparation(column2);
	areas.push(new Area(column2, "BoTW", "botw", 11, 3));
}



function addSeparation($div) {
	$div.append("<hr>");
}

/**
 * Check if a string contains at least one capital character
 * @param {string} str 
 * @returns index of char, -1 if not found
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

