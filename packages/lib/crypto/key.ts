import { sha256 } from '@noble/hashes/sha2';
import { hkdf } from '@noble/hashes/hkdf';

export function from(something: string) {
    const derived = hkdf(sha256, sha256(something), undefined, 'application', 40); // 40 bytes
    return Buffer.from(derived).toBase64()
}
