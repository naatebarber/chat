import express from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import type { Pool } from "pg";
import type { User } from "../db.js";
import { jwtauth } from "../util/auth.js";

const authRouter = (secret: string, db: Pool) => {
	const auth = express.Router();
	auth.use(express.json());

	auth.post("/login", async (req, res) => {
		try {
			let { username, password } = req.body;
			if (!username || !password) return res.sendStatus(400);

			let data = await db.query(
				`
        SELECT * FROM users
        WHERE username = $1
        LIMIT 1
        `,
				[username],
			);

			let user = data?.rows?.[0] as User;

			if (!user) return res.sendStatus(401);

			if (!compare(password, user.password)) return res.sendStatus(401);

			let token = jwt.sign(
				{
					username,
				},
				secret,
				{
					expiresIn: 60 * 60 * 3,
				},
			);

			return res.send({
				token,
			});
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	});

	auth.get("/session", jwtauth(secret), async (_, res) => {
		return res.sendStatus(200);
	});

	return auth;
};

export default authRouter;
