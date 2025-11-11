import Auth from "./clients/auth";
import Completions from "./clients/completions";
import Documents from "./clients/documents";

export interface ChatMessage {
	role: "user" | "system" | "assistant";
	content: string;
}

export type Message = ChatMessage & {
	hash: string;
	embedding?: number[];
	created_at: number;
};

export interface Document {
	hash: string;
	content: string;
	metadata: { [key: string]: any };
	embedding?: number[];
	owner: string;
	created_at: number;
}

export default class API {
	token: string;
	client_id: string;

	auth: Auth;
	completions: Completions;
	documents: Documents;

	constructor() {
		this.token = sessionStorage.getItem("x-nttoken");
		this.client_id = sessionStorage.getItem("x-ntuser");

		this.auth = new Auth(this);
		this.completions = new Completions(this);
		this.documents = new Documents(this);
	}

	credentials(token: string, client_id: string) {
		sessionStorage.setItem("x-nttoken", token);
		sessionStorage.setItem("x-ntuser", client_id);
		this.token = token;
		this.client_id = client_id;
	}

	wipeCredentials() {
		sessionStorage.removeItem("x-nttoken");
		sessionStorage.removeItem("x-ntuser");
		this.token = undefined;
		this.client_id = undefined;
	}

	logout() {
		this.wipeCredentials();
		window.location.assign("/login");
	}
}
