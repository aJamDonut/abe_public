class ServerItem {
	constructor(sprite, helper) {
		this.cloneToMe(sprite);
		this.id = sprite.id || helper.randID();
		this.x = sprite.x;
		this.y = sprite.y;
		this.width = sprite.width;
		this.height = sprite.height;
		this.lastX = this.x;
		this.lastY = this.y;
		this.helper = helper;
		this.body = {};
		this.hasPath = false;
		this.tileSize = 64;
		this.path = [];
		this.data = sprite.data || {};
		this.meta = sprite.meta || {};
		this.cloneFrom(_BLUEPRINTS.persistent, sprite.codename);
		this.cloneFrom(_BLUEPRINTS.persistent, "pers_" + sprite.codename);
		this.statuses = {};
		this.updates = [];
		this.className = "ServerItem";
		this.touchers = {};
		this.class = sprite.class;
		this.codename = sprite.codename;
		this.lastLOSCheck = 0;
		this.losRay = [];
		this.losCircle = [];
		this.data.stats = {
			hp: 100
		};
		this.attackStartX = false;
		this.attackStartY = false;
		this.inventoryIndex = 0;
		this.itemList = {};
		this.contentsList = [];
		this.inventoryBuffer = {};
		this.extensions = {};
	}

	updateDir() {
		var dir = this.dir || "down";

		let xDist = this.helper.dist({x: this.lastX, y: 0}, {x: this.x, y: 0});
		let yDist = this.helper.dist({x: 0, y: this.lastY}, {x: 0, y: this.y});

		if (xDist > 2 || yDist > 2) {
			if (xDist >= yDist) {
				if (this.lastX > this.x) {
					dir = "left";
				} else {
					dir = "right";
				}
			} else {
				if (this.lastY > this.y) {
					dir = "up";
				} else {
					dir = "down";
				}
			}
		}

		this.dir = dir;

		this.lastX = this.x;
		this.lastY = this.y;
	}

	getRecipe(shortname) {
		let recipe = _BLUEPRINTS.RECIPES["recipe_" + shortname];
		if (!recipe) {
			console.error("[ABE-ERROR] Recipe not found", shortname);
			return false;
		}
		return this.parseRecipe(recipe);
	}

	parseRecipe(recipe) {
		if (recipe.ingredients) {
			return recipe; //Already parsed
		}

		recipe.ingredients = [];

		let requires;
		let amounts;

		try {
			requires = recipe.require.split(",");
			amounts = recipe.amount.split(",");
		} catch (e) {
			console.error("[ABE-ERROR] Provided recipe without correct requires/amounts");
			return;
		}

		for (let i = 0; i < requires.length; i++) {
			recipe.ingredients.push({
				resource: requires[i],
				resource_longname: "ss_item_" + requires[i],
				amount: amounts[i]
			});
		}
		return recipe;
	}

	//Creates itemList for items with inventory
	indexInventory() {
		if (!this.inventory) {
			return;
		}

		//It looks at the inventory and makes a list of it contents easier accessible to developers
		if (this.inventory.length == 0 || this.inventoryIndex > this.inventory.length) {
			this.inventoryIndex = 0;
			this.itemList = this.inventoryBuffer;
			this.contentsList = Object.keys(this.itemList);
			this.inventoryBuffer = {};
			return;
		}

		let item = this.inventory[this.inventoryIndex];
		this.inventoryIndex++;

		if (!item) {
			return;
		}

		if (!this.inventoryBuffer[item.name]) {
			this.inventoryBuffer[item.name] = 0;
		}

		this.inventoryBuffer[item.name] += parseInt(item.data.qty);
	}

	hasResource(resource) {
		return this.itemList[resource];
	}

	getResource(resource) {
		return this.itemList[resource];
	}

	hasResourceQty(resource, amount) {
		if (isNaN(amount)) return false;
		amount = parseInt(amount);
		if (!this.hasResource(resource)) {
			return false;
		}
		return this.itemList[resource] >= amount;
	}

	dieOnWallCheck() {
		if (servers.physics.isBlocked(this.x + 32, this.y + 32)) {
			//Must have atleast existed for some amount of time
			if (this.data.created < game.ts - 100) {
				this.removePhysics = true; //Destroy self
			}
		}
	}

	failed(reason) {
		console.log("[ABE-INFO] Failed a server items job", reason, this);
		this._failed = true;

		if (this.data.assigned) {
			let life = this.helper.world.index.getFromIndex(this.data.assigned, "all");
			if (!life) {
				this.data.assigned = false;
			}
			if (life && life.data.jobId !== this.id) {
				//Worked for this job moved on like a lame-o
				this.data.assigned = false;
			}
		}
	}

	isFailed() {
		if (this._failed || this.data.failedOnce) {
			this._failed = false;
			this.data.failedOnce = false;
			return true; //True if failed, but also unset the failed so someone else can try
		}

		if (this.data.assigned) {
			let life = this.helper.world.index.getFromIndex(this.data.assigned, "all");
			if (!life) {
				this.data.assigned = false;
			}
			if (life && life.data.jobId !== this.id) {
				//Worked for this job moved on like a lame-o
				this.data.assigned = false;
			}
		}

		return false; //False if not failed
	}

	//TODO: maybe move.. copied from game.clone
	clone(obj) {
		if (null === obj || "object" != typeof obj) {
			return obj;
		}
		var copy = obj.constructor();
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) {
				copy[attr] = obj[attr];
			}
		}
		return copy;
	}

	//TODO: maybe move.. copied from game.clone
	cloneToMe(obj) {
		if (null === obj || "object" != typeof obj) {
			return obj;
		}
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) {
				this[attr] = obj[attr];
			}
		}
	}

	cloneFrom(src, name) {
		if (!src[name]) {
			return false; //Nothing to clone
		}
		this.events = this.clone(src[name].events);
		/*this.data = Object.assign(this.data,this.clone(src[name].data));
        this.meta = this.clone(src[name].meta);
        this.readName = src[name].readName;
        this.sprite = src[name].sprite;
        this.destroyBase = src[name].destroyBase;
        if(src[name].spriteData) {
            this.width = src[name].spriteData.w / 0.5;
            this.height = src[name].spriteData.h / 0.5;
        }*/
	}

	canSee(targetId) {
		this.helper.physicsUpdate("getLOS", {srcId: this.id, destId: targetId});
	}

	initPhysics() {}

	sync(force) {
		this.helper.world.sync(this, force);
	}

	hasLOS(target) {
		if (this.lastLOSCheck < Date.now() - 1000) {
			this.lastLOSCheck = Date.now();
			this.losProjectile = {x: this.x, y: this.y, id: this.id + "projectile"};
			this.helper.physicsUpdate("hitscan", {
				id: this.id,
				projectile: this.losProjectile,
				x: this.x - 16,
				y: this.y,
				endX: target.x - 16,
				endY: target.y
			});
		}

		if (this.losRay.includes("wall")) {
			return false;
		} else {
			return true;
		}
	}

	initWorld() {
		try {
			this.states = ["aistate_idle"];
			this.state = "aistate_idle";
			this.setBrain();
			this.state = "aistate_idle";
		} catch (e) {
			console.error(e);
		}
	}

	setBrain() {
		if (this.data.brain == undefined) {
			return false;
		}
		this.states = _AISTATECOLLECTIONS["ais_" + this.data.brain].states.split(",");
	}

	getNextState() {
		if (this.states.length === 1) {
			//Dummy NPC so stupid
			return false;
		}
		var lastState = this.state;
		var highestWeight = 0;
		var highestWeightState = "";
		for (var i = 0; i < this.states.length; i++) {
			var state = this.states[i];
			var weight = _AISTATES[state].weight(this);
			if (weight > highestWeight) {
				highestWeight = weight;
				highestWeightState = state;
			}
		}

		this.state = highestWeightState;

		if (highestWeightState !== lastState) {
			_AISTATES[lastState].end(this);
			_AISTATES[this.state].start(this);
		}
	}

	takeDamage(value) {
		this.hasUpdates = true;
		this.updates.push({updateStat: {hp: -10}});
	}

	processUpdates(updates) {
		for (let i = 0; i < updates.length; i++) {
			this.processServerUpdate(updates[i]);
		}
	}

	processServerUpdate(update) {
		if (update.type == "addStatus") {
			this.addAndStartStatus(update.data.status, update.data.options);
			return true;
		}
		if (update.type == "losRay") {
			this.losRay = update.losRay;
		}
	}

	addStatus(status, options) {
		if (options == undefined) {
			options = {};
		}

		this.addAndStartStatus(status, options);

		//Send updates from physics back to the rest
		this.updates.push({type: "addStatus", data: {status: status, options: options}});
	}

	dist(target) {
		return this.helper.dist(target, this);
	}

	syncStat(stat) {
		console.log(this.codename + " asked to Sync: " + stat);
	}

	addAndStartStatus(status, options) {
		//Doesn't exist server side so don't add it.
		if (!_STATUSES["s_effect_" + status]) {
			console.error("No effect: " + "s_effect_" + status);
			return false;
		}
		var id = this.helper.randID("status");
		var status = {effect: _STATUSES["s_effect_" + status], options: options};
		status.startTime = Date.now();
		status.effect.start(this, options);

		if (options.duration === undefined) {
			//If no duration, execute now.
			if (typeof status.effect.tick == "function") {
				status.effect.tick(this, options); //Init tick just incase it's used.
			}
			if (typeof status.effect.end == "function") {
				status.effect.end(this, options);
			}
		} else {
			//TODO: none-instant isn't implemented yet coz its 2:14am
			//Used duration so add it
			this.statuses[id] = status;
		}
	}

	reduceDebug(msg) {
		if (this.dbgCounter == undefined || this.dbgCounter > this.helper.rng(988, 1000)) {
			console.log(msg);
			this.dbgCounter = 0;
		}
		this.dbgCounter++;
	}

	isDead() {
		return this.data.dead || false;
	}

	stopMoving() {
		this.path = [];
		this.pathFind = false;
	}

	findResource(resource) {
		return this.helper.world.findResource(this, resource);
	}

	destroy() {
		//ADD DESTROY FUNCTION
		this.helper.world.removeFromServerAndClient(this.id);
	}

	cleanupDropoffJob() {
		let dropOffJob = this.helper.world.index.getFromIndex(this.dropOffJobSourceId, "all");
		if (dropOffJob) {
			dropOffJob.destroy();
			this.dropOffJobSourceId = false;
		}
	}

	cleanupHaulJob() {
		let haulJob = this.helper.world.index.getFromIndex(this.haulJobSourceId, "all");
		if (haulJob) {
			haulJob.destroy();
			this.haulJobSourceId = false;
			return;
		}
	}

	cleanupCraftingJob() {
		let craftingJob = this.helper.world.index.getFromIndex(this.craftJobSourceId, "all");
		if (craftingJob) {
			craftingJob.destroy();
			this.craftJobSourceId = false;
			return;
		}
	}

	cleanupIngredientOrphans() {
		this.cleanupDropoffJob();
		this.cleanupHaulJob();
	}

	getNeededIngredient() {
		let craftItem = this.data.queue[0];
		let recipe = this.getRecipe(craftItem.recipe);

		for (let i = 0; i < recipe.ingredients.length; i++) {
			let ingredient = recipe.ingredients[i];
			if (!this.hasResourceQty(ingredient.resource_longname, ingredient.amount)) {
				return ingredient;
			}
		}

		this.cleanupIngredientOrphans(); //Remove any jobs from this

		return false;
	}

	findIngredients() {
		//Breaks the code?
		//this.cleanupCraftingJob(); // If any craft jobs active delete them

		let craftItem = this.data.queue[0];
		let recipe = this.getRecipe(craftItem.recipe);

		let needIngredient = false;

		for (let i = 0; i < recipe.ingredients.length; i++) {
			let ingredient = recipe.ingredients[i];
			if (!this.hasResourceQty(ingredient.resource_longname, ingredient.amount)) {
				this.spawnDropoffHelper(ingredient);
			}
		}

		//this.spawnHaulingHelper() //TODO: this is the broken bit?
	}

	hasValidHaulingHelper() {
		const HAUL_TIMEOUT = 100000;
		if (this.haulJobSourceId) {
			let haulJob = this.helper.world.index.getFromIndex(this.haulJobSourceId, "all");
			if (!haulJob) {
				//Container probably changed quantity and no longer valid
				this.haulJobSourceId = false;
				return false;
			}

			if (haulJob.data.job === "dropoff" && haulJob.data.createdTime < game.ts - HAUL_TIMEOUT) {
				this.haulJobSourceId = false;
				console.error("[ABE-INFO] Remake haul job");
				haulJob.destroy();
			}
		}
		return this.haulJobSourceId;
	}

	spawnHaulingHelper(ingredient) {
		if (this.hasValidHaulingHelper()) return; //Already got an okay helper

		//THIS IS THE PART FAILING
		//THIS IS THE PART FAILING needIngredient.resource returns false
		//THIS IS THE PART FAILING
		let storageId = this.findResource(ingredient.resource);

		if (!storageId) {
			console.log("Search storage not fond", ingredient.resource, ingredient);
			return;
		}

		let storageContainer = this.helper.world.index.getFromIndex(storageId, "playerstorage");
		if (!storageContainer) {
			console.error("[ABE-ERROR] Storage container not found");
			return;
		}

		//Already has a source
		let newId = this.id + "-job-haul";

		this.haulJobSourceId = newId;

		this.helper.world.addObjectFromServer({
			id: newId,
			class: "ComplexItem",
			codename: "pers_haul_helper",
			x: storageContainer.x,
			y: storageContainer.y,
			width: storageContainer.width,
			height: storageContainer.height,
			data: {
				resource: ingredient.resource,
				qty: ingredient.amount,
				sourceId: storageContainer.id,
				parentId: this.id
			}
		});

		return;
	}

	spawnDropoffHelper(ingredient) {
		let newId = this.id + "-job-dropoff-" + ingredient.resource;

		let dropOffJob = this.helper.world.index.getFromIndex(newId, "all");
		if (dropOffJob) return; //Job already exists

		const myQty = this.getResource(ingredient.resource_longname);

		let needQty = ingredient.amount;

		//I already have some so reduce the amount needed
		if (myQty < needQty) {
			needQty = needQty - myQty;
		}

		console.log("I neeeeed ", needQty, ingredient.resource);

		this.dropOffJobSourceId = newId;
		this.helper.world.addObjectFromServer({
			id: newId,
			class: "ComplexItem",
			codename: "pers_dropoff_helper",
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			data: {
				resource: ingredient.resource,
				qty: ingredient.amount,
				parentId: this.id
			}
		});
	}

	shouldJobCheck() {
		//Adding a little RNG to try offset job checks
		//Every 500-1500 ms
		const JOB_REFRESH_INTERVAL = 500 + game.rng(0, 1000);

		if (this.lastJobCheck && this.lastJobCheck > game.ts - JOB_REFRESH_INTERVAL) {
			return false;
		}

		this.lastJobCheck = game.ts;
		return true;
	}

	spawnCraftHelper(craftItem) {
		//Already exists, check if still valid
		if (this.craftJobSourceId) {
			let craftJob = this.helper.world.index.getFromIndex(this.craftJobSourceId, "all");
			if (craftJob) return;
		}

		//No ingredients needed
		//AND no craft job ID set
		//This assumes we can craft given a queue item exists and no recipe required
		let newId = this.id + "-job-craft";
		this.craftJobSourceId = newId;
		this.helper.world.addObjectFromServer({
			id: newId,
			class: "ComplexItem",
			codename: "pers_craft_helper",
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			data: {
				parentId: this.id,
				craftItem: craftItem
			}
		});
	}

	craftQueueCount() {
		return this.data.queue.length;
	}

	hauls() {
		if (!this.shouldJobCheck()) return; // Reduce checks

		//TODO: in future for just "generic storage" this will need changing i guess?
		if (!this.craftQueueCount()) return; // Nothing to craft anyways

		if (this.getNeededIngredient()) return this.findIngredients();

		return this.spawnCraftHelper(this.data.queue[0]); //Must have something to craft
	}

	addExtension(name, options) {
		var key = name + "-" + this.helper.randID();

		this.extensions[key] = {key: key, name: name, options: options};
	}

	loadExtensions() {
		var extensions = Object.keys(this.extensions);
		if (extensions.length == 0) {
			return false;
		}
		for (var i = 0; i < extensions.length; i++) {
			this.loadExtension(this.extensions[extensions[i]]);
		}
	}

	loadExtension(extensionData) {
		if (!_BLUEPRINTS.EXTENSIONS) {
			console.error("[ABE] No extensions in system");
			return false;
		}

		if (!_BLUEPRINTS.EXTENSIONS[extensionData.name]) {
			console.error("[ABE] Can't find extension: " + extensionData.name);
			return false;
		}

		var extensionMeta = _BLUEPRINTS.EXTENSIONS[extensionData.name];

		if (typeof extensionMeta.events.onCreate === "function") {
			extensionMeta.events.onCreate.call(this, this, extensionData.options, this.saveData);
		}
	}

	toJSON() {
		return {
			id: this.id,
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			data: this.data,
			meta: this.meta,
			class: this.class,
			codename: this.codename
		};
	}
}

export default ServerItem;
