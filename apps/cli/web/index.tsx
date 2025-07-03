import { test } from "@siguiente/lib/crypto/ca";
import { serve } from "bun";
import type { ConsolaInstance } from "consola";
import { renderToReadableStream } from "react-dom/server";

function Component(props: { message: string }) {
  return (
    <body>
      <h1>{props.message}</h1>
    </body>
  );
}

export function start(cli: ConsolaInstance, port = 4545) {
    const server = serve({
        tls: {

        },
        error(error) {
            cli.error(error.code, error.message)
        },
        routes: {
            "/": async () => {
              const stream = await renderToReadableStream(
                <Component message="Hello from server!" />,
              );
              return new Response(stream, {
                headers: { "Content-Type": "text/html" },
              });
            },
            "/api/hello": { GET: () => Response.json(test()) },
        },
        port
    });
}
