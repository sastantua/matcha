import fs from 'fs';
import { Connection, Transaction, SystemProgram, Keypair, sendAndConfirmTransaction, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const filePath = 'outputs/dev-wallet.json';
const fileContents = fs.readFileSync(filePath, 'utf-8');
const wallet = JSON.parse(fileContents);

const connection = new Connection("https://api.devnet.solana.com");
const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey("GLtaTaYiTQrgz411iPJD79rsoee59HhEy18rtRdrhEUJ");

(async () => {
    try {
        const balance = await connection.getBalance(from.publicKey);

        const tx = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance
            })
        );
        
        tx.recentBlockhash = (await connection.getLatestBlockhash("confirmed")).blockhash;
        tx.feePayer = from.publicKey;

        const fee = (await connection.getFeeForMessage(tx.compileMessage(), "confirmed")).value || 0;
        
        tx.instructions.pop();

        tx.add(SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: balance - fee
        }))

        const signature = await sendAndConfirmTransaction(connection, tx, [from]);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    } catch (e) {
        console.log("error:", e);
    }
})();

// Success! Check out your TX here: https://explorer.solana.com/tx/3ET8eQfmYSFRTqXRkGjDD2R8qn6totdPFMqtg5YXFveG2C9mdrSLqhHe4beKSJajiAsHFssz1cVT2xEy6Fbmfh7b?cluster=devnet