import { Pool } from "pg";
import pgvector from "pgvector/pg";
import { singleUser } from "./util/singleuser.js";
export async function createDb(HOST, PORT, DB, USER, PASS) {
    const db = new Pool({
        host: HOST,
        port: parseInt(PORT),
        database: DB,
        user: USER,
        password: PASS,
    });
    await db.connect();
    db.query(`
    CREATE EXTENSION IF NOT EXISTS vector
    `);
    await pgvector.registerTypes(await db.connect());
    db.query(`
    CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(100),
      password VARCHAR(100),
      config JSONB
    )
    `);
    db.query(`
    CREATE TABLE IF NOT EXISTS messages (
      hash VARCHAR(100) PRIMARY KEY,
      role VARCHAR(20),
      content TEXT,
      embedding vector(384),
      created_at TIMESTAMP
    )
    `);
    await singleUser(db);
    return db;
}
//# sourceMappingURL=db.js.map