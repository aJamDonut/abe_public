function checkIsNodeJs() {
	return typeof process === "object";
}

function isElectron() {
	// Renderer process
	if (typeof window !== "undefined" && typeof window.process === "object" && window.process.type === "renderer") {
		return true;
	}

	// Main process
	if (typeof process !== "undefined" && typeof process.versions === "object" && !!process.versions.electron) {
		return true;
	}

	// Detect the user agent when the `nodeIntegration` option is set to true
	if (
		typeof navigator === "object" &&
		typeof navigator.userAgent === "string" &&
		navigator.userAgent.indexOf("Electron") >= 0
	) {
		return true;
	}
	return false;
}

/**
 * Checks if running in NW.js
 * Works for Web Workers and Browser
 * @returns {boolean} True if NW OR Nodejs false if anything else
 */
function isNw() {
	
	//Catch for nodejs
	if (checkIsNodeJs()) {
		return true;
	}

	try {
		if (typeof self !== "undefined" && self.__nw_require) {
			return true;
		}
		if (nw !== undefined) {
			if (nw.Window !== undefined) {
				return true;
			}
		}
	} catch (e) {
		return false;
	}

	return false;
}

export {isNw, isElectron};
