import { App } from "./App";

try {
	void new App().start();
} catch (e) {
	process.exit(1);
}

process.on("uncaughtException", () => {
	process.exit(1);
});
