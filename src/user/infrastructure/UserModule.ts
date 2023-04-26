import { Express, Request, Response } from "express";
import multer from "multer";

export default class UserModule {
	static initializeRoutes(app: Express): void {
		const upload = multer({ dest: "uploads/" });

		app.get("/user", (req: Request, res: Response) => {
			const name = "Laura";
			const age = 35;
			const url = `${req.protocol} + '://' + ${req.get("host")} + ${req.originalUrl}`;
			res.json({ name, age, url });
		});

		app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
			const file = req.file;

			if (!file) {
				res.status(400).json({ error: "No file uploaded" });

				return;
			}

			const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
			const extension = `.${file.originalname.split(".").pop()}`;

			if (!allowedExtensions.includes(extension)) {
				res.status(400).json({ error: "Invalid file extension" });

				return;
			}

			res.json({ message: "File uploaded successfully" });
		});
	}
}
