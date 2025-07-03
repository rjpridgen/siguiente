import { from } from "@siguiente/lib/crypto/key"
import { consola } from "consola"
import { start } from "./web"

switch (await consola.prompt("Siguiente", {
    type: "select",
    options: ["Web"]
})) {
    case "Web":
        start(consola)
        break
}