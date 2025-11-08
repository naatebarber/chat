import { Client } from "../client";

export default class Auth extends Client {
	login(username: string, password: string) {
		return this.post(
			"/api/auth/login",
			{
				username,
				password,
			},
			{
				json: true,
			},
		);
	}

	session() {
		return this.get("/api/auth/session");
	}
}
