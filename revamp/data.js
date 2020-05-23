/**
 * @abstract
 */
class BasicClass {
	/**
	 * Name displayed in UI
	 * @type {string}
	 * @default null
	 */
	name = null;

	/**
	 * Object Id, useful when locking for specific item. 
	 * We can compare this instead of object reference.
	 * @type {string}
	 * @default null
	 */
	id = null;

	/**
	 * @param {string} name 
	 * @param {string} id 
	 */
	constructor(name, id) {
		this.name = name;
		this.id = id;
	}
}

class Item extends BasicClass {

	/**
	 * Logic-wise status
	 * @type {LogicStatus} 
	 * @default LogicStatus.NONE
	 */
	status = LogicStatus.NONE;

	/**
	 * Where to draw the item if needed
	 * @type {HTMLElement[]}
	 */
	container = [];

	/** 
	 * How many item there are of this type (ie: Bombs, Bow)
	 * @property count
	 * @type {number}
	 * @default 1
	 */
	count = 1;

	/**
	 * Determine if item is present in UI
	 * @property presentInUI
	 * @type {boolean}
	 * @default false
	 */
	presentInUI = false;

	/**
	 * 
	 * @param {string} name Item Name
	 * @param {string} id Item Id
	 * @param {number} [count] 
	 */
	constructor(name, id, count) {
		super(name, id);
		this.count = count | 1;
	}

	/**
	 * Update item logic status. 
	 * If item is already in logic it does nothing
	 * @param {LogicStatus} value 
	 */
	updateStatus(value) {
		if (this.status == LogicStatus.IN_LOGIC) return;
		this.status = value;
		Logic.updateWithItemGet(this);
		this.highlightItemIfNeeded();
	}

	highlightItemIfNeeded() {
		if (this.presentInUI) {
			let opacity = this.status != LogicStatus.NONE ? 1 : .2;
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
		if (this.presentInUI) {
			let path = itemsData[this.id].default;
			let htmlId = this.id + 'img';
			let self = this;
			if (this.$container) {
				let $html = $(`<img class="itempics" src="${path}" id="${htmlId}" alt=${this.name}></img>`);
				this.$container.forEach(e => {
					e.empty();
					let $clone = $html.clone();
					$clone.on("click", () => {
						// Disable click callback if item has been unlocked in logic
						if (self.status == LogicStatus.IN_LOGIC) return;

						// Get new status
						let newStatus = self.status;
						if (self.status == LogicStatus.NONE) {
							newStatus = LogicStatus.OUT_LOGIC;
						} else { newStatus = LogicStatus.NONE; }

						//Handle scenario of item with progressives upgrades.
						if ((self.id.startsWith("hookshot") || self.id.startsWith("scale") || self.id.startsWith("str"))) {
							let prefix = self.id.substring(0, self.id.length - 1);
							let index = +(self.id.substring(self.id.length - 1)); // Cast number
							if (index > 1) {
								for (let i = index - 1; i > 0; i--) {
									let item = items.filter(v => v.id == prefix + i)[0];
									//Do not update item which are in logic
									if (item && item.status != LogicStatus.IN_LOGIC) {
										item.updateStatus(LogicStatus.OUT_LOGIC)
									}
								}
							}
							if (index <= 2) {
								for (let i = index + 1; i <= 3; i++) {
									let item = items.filter(v => v.id == prefix + i)[0];
									if (!item) break;
									if (self.status == LogicStatus.NONE) {
										item.updateStatus(LogicStatus.NONE)
									}
								}
							}
						}
						self.updateStatus(newStatus);
					});
					e.append($clone);
					self.highlightItemIfNeeded();
				})
			}
		}
	}


}

class Area extends BasicClass {

	/**
	 * Where to draw the area
	 * @type {HTMLElement}
	 */
	$container;

	/** @type Check[] */
	checks = 0

	/** 
	 * @type {number}
	 * @default 0
	 */
	small_keys = 0;
	/** 
	 * @type {number}
	 * @default null
	 */
	boss_key = null;

	/**
	 * @returns {boolean}
	 */
	get isDungeon() { return this.small_keys > 0; }

	/**
	 * @returns {boolean}
	 */
	get isOptionnalDungeon() { return this.isDungeon && this.boss_key == null; }

	/**
	* @param {string} name
	* @param {string} id
	* @param {number} checks
	* @param {number} [sk]
	* @param {number} [bk]
	* @todo Change checks parameter into a list of checks
	*/
	constructor($container, name, id, checks, sk, bk) {
		super(name, id);
		this.$container = $container;
		this.small_keys = sk;
		this.boss_key = bk;
		this.checks = checks;

		this.$html = $(`<div></div>`);
		if (this.$container) {
			this.$container.append(this.$html);
			this.buildHtmlIfNeeded();
		}
	}

	buildHtmlIfNeeded() {
		if (this.isDungeon || this.isOptionnalDungeon) {
			let $header = $(`<div></div>`);
			this.$html.append($header);
			let cssId = this.isOptionnalDungeon ? this.id : this.id + 'Dungeon';
			let $spanName = $(`<span class="dungeon" id=${cssId}>${this.name}</span>`)
			let $spanItem = $(`<span class="badge badge-pill badge-primary relevantItems">${this.checks}</span>`)
			let $spanSk = $(`<span class="badge badge-pill badge-secondary sk">${this.small_keys}</span>`)
			this.$html.append($spanName, $spanItem, $spanSk);
			if (!this.isOptionnalDungeon) {
				let $spanBk = $(`<span class="badge badge-pill badge-danger bk">${this.boss_key}</span>`)
				this.$html.append($spanBk);
			}
		}
	}
}

class Check extends BasicClass {

	/**
	 * Where to draw the check
	 * @type {HTMLElement}
	 */
	$container;

	/**
	 * Type of check. 
	 * Determines what kind of item is accepted in this check
	 * @type {CheckType}
	 */
	checkType;

	/** 
	 * Callback determining if this check is in logic
	 * @type {()=>LogicStatus} 
	 */
	checkLogic = null;

	/**
	 * Logic-wise status
	 * @type {LogicStatus} 
	 * @default LogicStatus.NONE
	 */
	status = LogicStatus.NONE;

	/**
	 * Item in check
	 * @type {Item}
	 * @default null;
	 */
	item = null;

	/**
	 * @param {HTMLElement} $container 
	 * @param {string} name 
	 * @param {string} id 
	 * @param {CheckType} type 
	 */
	constructor($container, type, name, id) {
		super(name, id);
		this.$container = $container;
		this.checkType = type;
		this.checkLogic = Logic.getLogicForCheck(id);

		this.$html = $(`<div></div>`);
		if (this.$container) {
			$container.append(this.$html);
			this.buildHtml();
		}
	}

	buildHtml() {
		if (this.$container) {
			this.$html.empty();
			let $form = $(`
  				<input type="text" maxlength="3">
    			<span class="input-group-text">${this.name}</span>
			`);
			this.$html.append($form);

			let abbrevArray = Abbrev[this.checkType];
			let $input = this.$html.find('input');
			let self = this;
			$input.on("input", (ev) => {
				let value = $input.val();
				if (value.length === 3) {
					let uncaps = value.toLowerCase();
					let result = abbrevArray[uncaps]
					if (result) {
						let item = items.filter(v => v.id === result && v.count != 0)[0];
						if (item) {
							self.item = item;
							self.item.count--;
							this.updateStatus();
							let checksWithoutItem = checks.filter(v => !v.item);
							let checksOutsideLogic = checks.filter(v => v.item && v.status == LogicStatus.OUT_LOGIC);
							Logic.updateLogicRecursively(checksOutsideLogic);
							checksWithoutItem.forEach(v => v.updateStatus());
						}
					}
				}
			});
			this.updateStatus();
		}
	}

	updateHtml() {
		if (this.checkType == CheckType.SONG && this.item) {
			this.$html.empty();
			this.$html.append(`<span>${this.name} : ${this.item.name}</span>`);
		}

		if (this.status == LogicStatus.IN_LOGIC) {
			if (hideInaccessible) {
				this.$html.show();
			}
			this.$html.find("span").css({ color: "lime", opacity: 1 });
		} else if (this.status == LogicStatus.OUT_LOGIC) {
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

	updateStatus() {
		this.status = this.checkLogic();
		this.updateHtml();
		if (this.item) this.item.updateStatus(this.status);
	}
}
