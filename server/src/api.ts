import express, { type Application } from "express";
import path from "path";
import completionsRouter from "./routers/completions.js";
import { Ollama } from "ollama";

function createOllama() {
	return new Ollama({
		host: process.env.OLLAMA_HOST,
		headers: {
			...(process.env.OLLAMA_API_KEY
				? { Authorization: "Bearer " + process.env.OLLAMA_API_KEY }
				: {}),
		},
	});
}

export function createApi(): Application {
	const app = express();
	app.enable("trust proxy");

	const ollama = createOllama();

	const api = express.Router();
	api.use("/completions", completionsRouter(ollama));
	app.use("/api", api);

	app.use("/", express.static(path.join(import.meta.dirname, "ui")));
	app.use(
		"/*splat",
		express.static(path.join(import.meta.dirname, "ui/index.html")),
	);

	return app;
}
