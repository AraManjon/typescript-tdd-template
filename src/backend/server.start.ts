import { App } from "./App";

try {
	void new App().start();
} catch (e) {
	console.log(e);
	process.exit(1);
}

process.on("uncaughtException", (err) => {
	console.log("uncaughtException", err);
	process.exit(1);
});
