import { verifyToken } from "./hashes.js";
import express from "express";

export const _scopes = ["viewer", "analyst", "tuner", "super"];

export const jwtauth = (secret: string) => {
	return async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		const token = req.headers.authorization ?? (req.query.token as string);
		if (!token) {
			return res.sendStatus(401);
		}

		const contents = verifyToken(token, secret);
		if (!contents?.username) return res.sendStatus(401);

		req.query.username = contents.username;
		return next();
	};
};
