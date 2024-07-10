/**
 * Solana Actions Example
 */

import {
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  MEMO_PROGRAM_ID,
  ActionGetResponse,
  ActionPostRequest,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

export const GET = async (req: Request) => {
  const requestUrl = new URL(req.url);

  const baseHref = new URL(`/api/actions/chat`, requestUrl.origin).toString();

  const payload: ActionGetResponse = {
    title: "Action Chat 💬",
    icon: new URL("/api/image-chat", new URL(req.url).origin).toString(),
    description: "Chat in actions",
    label: "Send Memo",
    links: {
      actions: [
        {
          label: "💬",
          href: `${baseHref}?msg={msg}`,
          parameters: [
            {
              name: "msg", // input field name
              label: "Solana just makes sense", // text input placeholder
            },
          ],
        },
      ],
    },
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const body: ActionPostRequest = await req.json();
    const requestUrl = new URL(req.url);

    try {
      if (requestUrl.searchParams.get("msg")) {
        requestUrl.searchParams.get("msg");
      }
    } catch (err) {
      throw "Invalid input query parameter: msg";
    }

    const msg = requestUrl.searchParams.get("msg") || "";

    if (msg.length == 0 || msg.length > 256) {
      return returnActionError("Message must be between 1 and 256 characters");
    }

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return new Response('Invalid "account" provided', {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }
    const connection = new Connection(
      process.env.SOLANA_RPC! || clusterApiUrl("devnet"),
    );

    let chatActionAuthorityPrivateKey = JSON.parse(process.env.CHAT_ACTION_AUTHORITY  || '');
    const actionAuthority = Keypair.fromSecretKey(Uint8Array.from(chatActionAuthorityPrivateKey));

    const transaction = new Transaction().add(
      //transfer 1 lamport to action authority to trigger webhook
      SystemProgram.transfer({
        fromPubkey: account,
        toPubkey: actionAuthority.publicKey,
        lamports: 1,
      }),
      new TransactionInstruction({
        programId: new PublicKey(MEMO_PROGRAM_ID),
        data: Buffer.from(
          msg,
          "utf8",
        ),
        keys: [
          {
            pubkey: actionAuthority.publicKey,
            isSigner: true,
            isWritable: false,
          },
        ],
      }),
    );

    // set the end user as the fee payer
    transaction.feePayer = account;

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Msg posted on-chain",
      },
      signers: [actionAuthority],
    });

    return Response.json(payload, {
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

function returnActionError(message: string): Response {
  return Response.json(
    {
      message,
    },
    {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    },
  );
}
