import { getMessages } from "@/lib/db";
import { shortenAddress } from "@/lib/utils";
import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export async function GET(req: Request) {
  let bgImage = new URL("background.png", new URL(req.url).origin).toString();
  let msgs = await getMessages();
  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `url("${bgImage}")`,
        }}
        tw="w-full h-full flex items-center justify-center"
      >
        <div tw="flex-1 flex flex-col justify-end p-3 h-full overflow-hidden mb-3">
          {msgs.map((msg, key) => (
            <div tw="flex flex-col relative mb-2">
              <div tw="flex">
                <span tw="text-gray-200 font-extrabold text-lg px-1 rounded-t-lg inline-block  bg-black bg-opacity-60">
                  {shortenAddress(msg.sender)}
                </span>
              </div>
              <div tw="rounded-b-lg rounded-tr-lg px-2 flex self-start bg-black bg-opacity-60">
                <p tw="text-md text-white">{msg.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 512,
      height: 512,
    },
  );
}