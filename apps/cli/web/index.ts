import { serve } from "bun";
import index from "./public/index.html";
import type { ConsolaInstance } from "consola";

export function start(cli: ConsolaInstance, port = 4545) {
    const server = serve({
        error(error) {
            cli.error(error.code, error.message)
        },
        routes: {
            "/": index,
            "/api/hello": { GET: () => Response.json({ message: "Hello from API" }) },
        },
        port
    });
}
