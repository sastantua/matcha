import fs from 'fs';
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

const filePath = 'outputs/dev-wallet.json';
const fileContents = fs.readFileSync(filePath, 'utf-8');
const wallet = JSON.parse(fileContents);

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
    console.log("pk", keypair.publicKey);
    try {
        const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`)
    } catch (e) {
        console.log("error:", e);
    }
})();

//Success! Check out your TX here: https://explorer.solana.com/tx/5bv4u3z9WVZcrBh2jFENc6fpM5TcZB1xYoZjmHJGa4JsqL1gjRzLCV3QaNdCbXnErkgeWj4oveRXKL9bp6ptAnuv?cluster=devnet