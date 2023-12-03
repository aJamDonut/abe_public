import AbeFSAjax from "../classes/AbeFSAjax.mjs";
import AbeFS from "../classes/AbeFS.mjs";
import Factions from "../classes/Factions.mjs";

import ServerWorld from "./ServerWorld.mjs";
import ServerPhysics from "./ServerPhysics.mjs";
import ServerPath from "./ServerPath.mjs";

import {isLive} from "../shared/Environment.mjs";

if (!globalThis.self && !global.self) {
	try {
		global.self = global;
	} catch (e) {}
}

//import {Emitter as NodeEmitter} from "./NodeEmitter.mjs";

import {Emitter as WebEmitter} from "./Emitter.mjs";

let Emitter = WebEmitter;

const servers = {
	physics: new ServerPhysics(Emitter),
	world: new ServerWorld(Emitter),
	disk: new ServerWorld(Emitter)
};

if (isLive()) {
	servers.path = new ServerPath(Emitter);
}

self.servers = servers;

class GameServer {
	constructor() {
		this.server = "Not set";
		this.ts = 0;
		console.info("Is Live?", isLive());
		if (isLive()) {
			this.fs = new AbeFS("gamedata", false); //Per save file
			this.globalfs = new AbeFS("gamedata", false); //Consistent everywhere
		} else {
			this.fs = new AbeFSAjax("gamedata", false); //Per save file
			this.globalfs = new AbeFSAjax("gamedata", false); //Consistent everywhere
		}
		this.fs.setFolder("current", true);
		this.globalfs.setFolder("global", true);

		this.factions = new Factions();

		this.servers = servers;
	}

	rng(min, max) {
		return Math.floor(min + Math.random() * (max + 1 - min));
	}

	onMessage(request, postMessage) {
		let data = request;

		if (!data.server && data.data) {
			data = data.data;
		}

		if (data.action == "pause") {
			console.error("Pause workers");
			try {
				this.servers.physics.runner.enabled = false;
			} catch (e) {}
			return;
		}

		if (data.action == "startPhysics") {
			console.log("Starting physics");

			this.servers.physics.Events.on(this.servers.physics.runner, "afterTick", (delta) => {
				this.servers.physics.tick((data) => {
					postMessage({
						time: Date.now(),
						tick: true,
						action: data.action,
						response: data.response,
						creatorId: data.creatorId,
						data: data
					});
				}, delta);
			});

			return true;
		}

		if (data.action == "startWorld") {
			this.servers.physics.Events.on(this.servers.physics.runner, "afterTick", (delta) => {
				this.servers.world.tick((data) => {
					try {
						postMessage({
							time: Date.now(),
							tick: true,
							action: data.action,
							response: data.response,
							creatorId: data.creatorId,
							data: data
						});
					} catch (e) {
						console.error("[ABE] Failed to parse object in server world");
						console.error(data);
						console.error(e);
					}
				}, delta);
			});
			return true;
		}

		if (data.async == true) {
			if (typeof this.servers[data.server][data.action] !== "function") {
				console.error("Attempted to execute: " + data.server + "->" + data.action + " but not exist ");
			} else {
				try {
					this.servers[data.server][data.action].call(this.servers[data.server], data, function (response) {
						postMessage({
							time: Date.now(),
							action: data.action,
							server: data.server,
							response: response,
							id: data.creatorId,
							data: data.data
						});
					});
				} catch (e) {
					console.error(`${data.server}, ${data.action}`, data);
					console.error(e);
				}
			}
		} else {
			if (!this.servers[data.server]) {
				console.error("PROBLEMATIC WORKER");
				console.error(data);
				debugger;
				console.error(JSON.stringify(data));
				console.error("PROBLEMATIC WORKER END");
			}
			if (typeof this.servers[data.server][data.action] !== "function") {
				console.error("Attempted to execute: " + data.server + "->" + data.action + " but not exist ");
			} else {
				try {
					var response = {
						time: Date.now(),
						action: data.action,
						server: data.server,
						response: this.servers[data.server][data.action](data),
						id: data.creatorId,
						data: data.data
					};
					//postMessage(response); //if you want to reply
				} catch (e) {
					console.error(`${data.server}, ${data.action}`, data);
					console.error(e);
				}
			}
		}
	}
}
export default GameServer;
