import { secp256k1 } from '@noble/curves/secp256k1'; // ESM and Common.js

export function test() {
    const priv = secp256k1.utils.randomPrivateKey();
    const pub = secp256k1.getPublicKey(priv);
    const msg = new Uint8Array(32).fill(1);
    const sig = secp256k1.sign(msg, priv);
    const isValid = secp256k1.verify(sig, msg, pub) === true;
    
    console.info(sig)
    console.info(isValid)
}
