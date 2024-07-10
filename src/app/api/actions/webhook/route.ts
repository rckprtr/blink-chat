import { CHAT_ADDRESS } from "@/app/constants";
import { ACTIONS_CORS_HEADERS } from "@solana/actions";
import { clusterApiUrl, Connection, VersionedTransactionResponse } from "@solana/web3.js";

export const POST = async (req: Request) => {
  if (
    req.headers.get("authorization") !== process.env.AUTH_HEADER_SECRET
  ) {
    console.log("Unauthorized");
    return new Response("Unauthorized", {
      status: 401,
      headers: ACTIONS_CORS_HEADERS,
    });
  }

  try {
    const webhookData = await req.json();
    console.log(webhookData);

    const connection = new Connection(
      process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
    );

    const authorityPublicKey = CHAT_ADDRESS;

    for (let i = 0; i < webhookData.length; i++) {

      let tx = await connection.getTransaction(webhookData[i].signature, {
        maxSupportedTransactionVersion: 0,
        commitment: "confirmed",
      });

      if (tx) {
        let msg = getMessages(tx, authorityPublicKey);
        if(msg){
          let timestamp = new Date(Number(webhookData[i].timestamp) * 1000)
          console.log(webhookData[i].feePayer + " says: " + msg, " at " + timestamp.toUTCString());
        }
      }
    }

    return new Response("Success", {
      status: 200,
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.log(err);
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;
    return new Response(message, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

//probably a better way of doing this
function getMessages(tx: VersionedTransactionResponse, authorityPublicKey: string) {
  const signedBy = "Program log: Signed by " + authorityPublicKey;
  let signersLog = tx.meta?.logMessages?.filter((msg) =>
    msg.startsWith(signedBy),
  );
  if (signersLog && signersLog.length > 0) {
    console.log("Transaction signed by authority");
    let memoLog = tx.meta?.logMessages?.filter((msg) =>
      msg.startsWith("Program log: Memo"),
    );
    if (memoLog && memoLog?.length > 0) {
      const regex = /"((?:[^"\\]|\\.)*)"/;
      const match = memoLog[0].match(regex);
      if (match) {
        const extractedText = match[1].replace(/\\"/g, '"');
        return extractedText;
      }
    }
  }
  return null;
}