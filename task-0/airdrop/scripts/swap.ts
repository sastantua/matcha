import bs58 from "bs58";
import web3 from "@solana/web3.js"

// from base58 to uint8array
let secretKey = bs58.decode("[base58 private key here]");
console.log(`[${web3.Keypair.fromSecretKey(secretKey).secretKey}]`);

// from uint8array to base58
// let privkey = new Uint8Array([u8, u8, ..., u8]);
// console.log(bs58.encode(privkey));