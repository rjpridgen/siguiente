import { secp256k1 } from '@noble/curves/secp256k1';

export function key() {
    return Buffer.from(secp256k1.utils.randomPrivateKey()).toString("base64")
}