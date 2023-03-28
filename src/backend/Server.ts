import express from "express";

export class Server {
	private readonly express: express.Express;
	private readonly port: string;

	constructor(port: string) {
		this.express = express();
		this.port = port;
	}

	async listen(): Promise<void> {
		await new Promise<void>((resolve) => {
			this.express.listen(this.port, () => {
				console.log(
					`✅ Backend App is running at http://localhost:${this.port} in ${this.express.get(
						"env"
					)} mode`
				);
				console.log("✋ Press CTRL-C to stop\n");

				resolve();
			});
		});
	}
}
