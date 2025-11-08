import { verifyToken } from "./hashes.js";
import express from "express";
export const _scopes = ["viewer", "analyst", "tuner", "super"];
export const jwtauth = (secret) => {
    return async (req, res, next) => {
        const token = req.headers.authorization ?? req.query.token;
        if (!token) {
            return res.sendStatus(401);
        }
        const contents = verifyToken(token, secret);
        if (!contents?.username)
            return res.sendStatus(401);
        req.query.username = contents.username;
        return next();
    };
};
//# sourceMappingURL=auth.js.map