import forge from "node-forge";

export async function test() {
    // generate EC keypair (e.g., using P-256 curve)
    const ec = forge.pki.ed25519
    const keys = ec.generateKeyPair();

    // create certificate
    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;

    // set serial number & validity
    cert.serialNumber = "01";
    const now = new Date();
    const expire = new Date();
    expire.setFullYear(now.getFullYear() + 10);
    cert.validity.notBefore = now;
    cert.validity.notAfter = expire;

    // set subject & issuer (since it’s self-signed, they’re the same)
    const attrs = [
    { name: "commonName", value: "My Self-Signed EC CA" },
    { name: "countryName", value: "US" },
    { shortName: "ST", value: "CA" },
    { name: "localityName", value: "San Francisco" },
    { name: "organizationName", value: "My Company" },
    { shortName: "OU", value: "CA Unit" },
    ];
    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    // add extensions (important: mark as CA)
    cert.setExtensions([
    { name: "basicConstraints", cA: true },
    { name: "keyUsage", keyCertSign: true, digitalSignature: true, cRLSign: true },
    { name: "subjectKeyIdentifier" },
    ]);

    // self-sign the certificate
    cert.sign(keys.privateKey, forge.md.sha256.create());

    // convert to PEM
    const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
    const certPem = forge.pki.certificateToPem(cert);

    console.log("✅ Self-signed EC CA created:");
    console.log("- Private key: ec-ca-key.pem");
    console.log("- Certificate: ec-ca-cert.pem");

    return {
        privateKeyPem,
        certPem
    }
}
