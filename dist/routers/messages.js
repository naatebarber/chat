import crypto from "node:crypto";
import express from "express";
import { Ollama } from "ollama";
import { jwtauth } from "../util/auth.js";
const messagesRouter = (secret, db, _ollama) => {
    const messages = express.Router();
    messages.use(express.json());
    messages.use(jwtauth(secret));
    messages.get("/", async (req, res) => {
        try {
            let { offset, limit } = req.query;
            if (!offset || !limit)
                return res.sendStatus(400);
            let data = await db.query(`
        SELECT * FROM messages
        OFFSET $1
        LIMIT $2
        `, [parseInt(offset), parseInt(limit)]);
            return res.send(data.rows ?? []);
        }
        catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    messages.post("/", async (req, res) => {
        try {
            let { message } = req.body;
            if (!message)
                return res.sendStatus(400);
            let hash = crypto.hash("md5", message.content);
            await db.query(`
        INSERT INTO messages (
          hash,
          role,
          content,
          created_at
        ) VALUES (
          $1,
          $2,
          $3,
          to_timestamp($4),
        ) ON CONFLICT DO NOTHING 
        `, [hash, message.role, message.content, Date.now() / 1000]);
            return res.sendStatus(201);
        }
        catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    return messages;
};
export default messagesRouter;
//# sourceMappingURL=messages.js.map