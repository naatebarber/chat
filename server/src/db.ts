import { Pool } from "pg";
import pgvector from "pgvector/pg";
import { singleUser } from "./util/singleuser.js";

export interface User {
	username: string;
	password: string;
	config: any;
}

export interface Message {
	role: "user" | "system" | "assistant";
	content: string;
}

export interface Document {
	hash: string;
	content: string;
	embedding?: number[];
	owner: string;
	created_at: number;
}

export async function createDb(
	HOST: string,
	PORT: string,
	DB: string,
	USER: string,
	PASS: string,
) {
	const db = new Pool({
		host: HOST,
		port: parseInt(PORT),
		database: DB,
		user: USER,
		password: PASS,
	});

	await db.connect();

	db.query(
		`
    CREATE EXTENSION IF NOT EXISTS vector
    `,
	);

	await pgvector.registerTypes(await db.connect());

	db.query(
		`
    CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(100),
      password VARCHAR(100),
      config JSONB
    )
    `,
	);

	db.query(
		`
    CREATE TABLE IF NOT EXISTS documents (
      hash VARCHAR(100) PRIMARY KEY,
      content TEXT,
      metadata JSONB,
      embedding vector(384),
      owner VARCHAR(100),
      created_at TIMESTAMP
    )
    `,
	);

	await singleUser(db);

	return db;
}
