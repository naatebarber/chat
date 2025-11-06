import { createApi } from "./api.js";
async function main() {
    const api = createApi();
    api.listen(8080, "0.0.0.0", () => {
        console.log("Chat listening on 8080");
    });
}
main();
//# sourceMappingURL=main.js.map