import express, { type Application } from "express";
import path from "path";
import completionsRouter from "./routers/completions.js";

export function api(): Application {
	const app = express();
	app.enable("trust proxy");
	app.use("/", express.static(path.join(__dirname, "ui")));
	app.use("*", express.static(path.join(__dirname, "ui/index.html")));

	const api = express.Router();
	api.use("/completions", completionsRouter());
	app.use("/api", api);

	return app;
}
