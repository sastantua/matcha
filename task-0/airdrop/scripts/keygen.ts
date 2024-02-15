import fs from 'fs';
import bs58 from 'bs58';
import * as prompt from 'prompt-sync'

import { Keypair } from "@solana/web3.js";

let kp = Keypair.generate();
let secretKey = kp.secretKey;
let publicKey = kp.publicKey.toBase58();

fs.writeFileSync('key.json', `You've generated a new Solana wallet:\nPublic Key: ${publicKey}\nSecret Key: ${secretKey}`);

console.log(`public key: ${publicKey}`)
console.log(`private key: ${secretKey}`)

