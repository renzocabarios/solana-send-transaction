import {
  Cluster,
  clusterApiUrl,
  Connection,
  Keypair,
  Transaction,
  LAMPORTS_PER_SOL,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import * as bs58 from "bs58";
import * as dotenv from "dotenv";

dotenv.config();

const connection: Connection = new Connection(
  clusterApiUrl((process.env.CLUSTER as Cluster) ?? "devnet")
);

const ACCOUNT_1: Keypair = Keypair.fromSecretKey(
  bs58.decode(process.env.PRIVATE_KEY ?? "")
);

async function main() {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: ACCOUNT_1.publicKey,
        toPubkey: new PublicKey(process.env.PUBLIC_KEY_1 ?? ""),
        lamports: LAMPORTS_PER_SOL / 100,
      })
    );

    const signature = await sendAndConfirmTransaction(connection, transaction, [
      ACCOUNT_1,
    ]);

    console.log("SIGNATURE", signature);
  } catch (e: any) {}
}

main();
