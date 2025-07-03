import { from } from "@siguiente/lib/crypto/key"
import { consola } from "consola"

const password = await consola.prompt("Secret password", {
    type: "text",
    placeholder: "super secret key"
})

consola.info(from(password))