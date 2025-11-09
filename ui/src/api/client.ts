import API from "./api";

export abstract class Client {
	api: API;

	constructor(api: API) {
		this.api = api;
	}

	auth() {
		return {
			Authorization: this.api.token,
		};
	}

	get(uri: string): Promise<Response> {
		return fetch(uri, {
			headers: this.auth(),
		});
	}

	post(
		uri: string,
		body?: any,
		options?: {
			json?: boolean;
			noauth?: boolean;
			headers?: any;
			signal?: AbortSignal;
		},
	): Promise<Response> {
		return fetch(uri, {
			method: "POST",
			headers: {
				...(options?.noauth ? {} : this.auth()),
				...(options?.json ? { "Content-Type": "application/json" } : {}),
				...(options?.headers ?? {}),
			},
			body: body ? (options?.json ? JSON.stringify(body) : body) : undefined,
			signal: options?.signal,
		});
	}

	delete(
		uri: string,
		body?: any,
		options?: {
			json?: boolean;
		},
	): Promise<Response> {
		return fetch(uri, {
			method: "DELETE",
			headers: {
				...this.auth(),
				...(options?.json ? { "Content-Type": "application/json" } : {}),
			},
			body: body ? (options?.json ? JSON.stringify(body) : body) : undefined,
		});
	}
}
