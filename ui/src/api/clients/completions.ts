import { Message } from "ollama";
import { Client } from "../client";

export default class Completions extends Client {
	models() {
		return this.get("/api/completions/models");
	}

	chat(model: string, messages: Message[]) {
		return this.post(
			`/api/completions/chat`,
			{
				model,
				messages,
			},
			{
				json: true,
			},
		);
	}
}
