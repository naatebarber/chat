import Completions from "./clients/completions";

export interface Message {
	role: "user" | "agent";
	message: string;
}

export default class API {
	token: string;
	client_id: string;

	completions: Completions;

	constructor(token: string, client_id: string) {
		this.token = token;
		this.client_id = client_id;

		this.completions = new Completions(this);
	}
}
