import crypto from "node:crypto";
import express from "express";
import { Ollama } from "ollama";
const messagesRouter = (db, _ollama) => {
    const messages = express.Router();
    messages.use(express.json());
    messages.post("/message", async (req, res) => {
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
        ) VALUES (
          $1,
          $2,
          $3,
        ) ON CONFLICT DO NOTHING 
        `, [hash, message.role, message.content]);
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
//# sourceMappingURL=persistence.js.map