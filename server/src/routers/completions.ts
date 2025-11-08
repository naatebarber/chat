import express from "express";
import { Ollama } from "ollama";
import type { Pool } from "pg";
import { jwtauth } from "../util/auth.js";

const completionsRouter = (secret: string, _db: Pool, ollama: Ollama) => {
	const completions = express.Router();
	completions.use(express.json());
	completions.use(jwtauth(secret));

	completions.get("/models", async (_, res) => {
		try {
			let models = await ollama.list();
			let modelNames = models.models.map((m) => m.name);
			return res.send(modelNames);
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	});

	completions.post("/chat", async (req, res) => {
		try {
			const { model, messages } = req.body;

			let modelResponse = await ollama.chat({
				model,
				messages,
				stream: true,
			});

			res.status(200);

			for await (let part of modelResponse) {
				let data = part.message.thinking ?? part.message.content;
				if (data) res.write(data);
			}

			res.end();
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	});

	return completions;
};

export default completionsRouter;
