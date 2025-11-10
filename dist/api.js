import express, {} from "express";
import path from "path";
import completionsRouter from "./routers/completions.js";
import { Ollama } from "ollama";
import { createDb } from "./db.js";
import documentsRouter from "./routers/documents.js";
import authRouter from "./routers/auth.js";
function createOllama(OLLAMA_HOST, OLLAMA_API_KEY) {
    return new Ollama({
        host: OLLAMA_HOST,
        headers: {
            ...(OLLAMA_API_KEY ? { Authorization: "Bearer " + OLLAMA_API_KEY } : {}),
        },
    });
}
export async function createApi() {
    const app = express();
    app.enable("trust proxy");
    const ollama = createOllama(process.env.OLLAMA_HOST, process.env.OLLAMA_API_KEY);
    let dbRequires = ["PG_HOST", "PG_PORT", "PG_DB", "PG_USER", "PG_PASS"];
    for (let req of dbRequires) {
        if (!process.env[req]) {
            throw new Error(`Environment missing required variable '${req}'`);
        }
    }
    let secret = process.env.SECRET ?? "secret";
    const db = await createDb(process.env.PG_HOST, process.env.PG_PORT, process.env.PG_DB, process.env.PG_USER, process.env.PG_PASS);
    const api = express.Router();
    api.use("/auth", authRouter(secret, db));
    api.use("/completions", completionsRouter(secret, db, ollama));
    api.use("/documents", documentsRouter(secret, db, ollama));
    app.use("/api", api);
    app.use("/", express.static(path.join(import.meta.dirname, "ui")));
    app.use("/*splat", express.static(path.join(import.meta.dirname, "ui/index.html")));
    return app;
}
//# sourceMappingURL=api.js.map