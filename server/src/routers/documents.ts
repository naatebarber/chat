import crypto from "node:crypto";
import express from "express";
import { Ollama } from "ollama";
import type { Pool } from "pg";
import { jwtauth } from "../util/auth.js";

const documentsRouter = (secret: string, db: Pool, _ollama: Ollama) => {
	const documents = express.Router();
	documents.use(express.json());
	documents.use(jwtauth(secret));

	documents.get("/", async (req, res) => {
		try {
			let { offset, limit } = req.query;
			if (!offset || !limit) return res.sendStatus(400);

			let data = await db.query(
				`
        SELECT * FROM documents
        OFFSET $1
        LIMIT $2
        `,
				[parseInt(offset as string), parseInt(limit as string)],
			);

			return res.send(data.rows ?? []);
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	});

	documents.get("/search", async (req, res) => {
		try {
			let { search, offset, limit } = req.query;

			if (!search || !offset || !limit) return res.sendStatus(400);

			let data = await db.query(
				`
        SELECT * FROM documents
        WHERE content ILIKE $1
        OFFSET $2
        LIMIT $3
        `,
				[
					`%${search as string}%`,
					parseInt(offset as string),
					parseInt(limit as string),
				],
			);

			return res.send(data.rows ?? []);
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	});

	documents.post("/", async (req, res) => {
		try {
			let { username: owner } = req.user;
			let { content, metadata } = req.body as {
				content: string;
				metadata?: any;
			};

			if (!content || !owner) return res.sendStatus(400);

			let hash = crypto.hash("md5", content);

			await db.query(
				`
        INSERT INTO documents (
          hash,
          content,
          metadata,
          owner,
          created_at
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          to_timestamp($5)
        ) ON CONFLICT DO NOTHING 
        `,
				[hash, content, metadata, owner as string, Date.now() / 1000],
			);

			return res.sendStatus(201);
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	});

	documents.delete("/:hash", async (req, res) => {
		try {
			let { hash } = req.params;
			if (!hash) return res.sendStatus(400);

			await db.query(
				`
        DELETE FROM documents
        WHERE hash = $1
        `,
				[hash],
			);

			return res.sendStatus(201);
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	});

	return documents;
};

export default documentsRouter;
