import express, {} from "express";
import path from "path";
export function api() {
    const app = express();
    app.enable("trust proxy");
    app.use("/", express.static(path.join(__dirname, "ui")));
    app.use("*", express.static(path.join(__dirname, "ui/index.html")));
    return app;
}
//# sourceMappingURL=api.js.map