import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export async function GET(req: Request) {
  let bgImage = new URL("background.png", new URL(req.url).origin).toString();

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `url("${bgImage}")`,
        }}
        tw="w-full h-full flex items-center justify-center"
      >
        <div tw="flex-1 flex flex-col justify-end p-3 h-full overflow-hidden mb-3">
          <div tw="flex flex-col mb-1">
            <div tw="text-gray-200 text-bold text-md mb-1">0x1234...5678</div>
            <div tw="bg-gray-600 rounded-lg px-2 flex self-start">
              <p tw="text-md text-white">Hello! How are you?</p>
            </div>
          </div>
          <div tw="flex flex-col">
            <div tw="text-gray-200 text-bold text-md mb-1">0xabcd...ef01</div>
            <div tw="bg-gray-600 rounded-lg px-2 flex self-start">
              <p tw="text-md text-white">
                Hi there! I'm doing great, thanks for asking!
              </p>
            </div>
          </div>
          <div tw="flex flex-col">
            <div tw="text-gray-200 text-bold text-md mb-1">0xabcd...ef01</div>
            <div tw="bg-gray-600 rounded-lg px-2 flex self-start">
              <p tw="text-md text-white">
                Hi there! I'm doing great, thanks for asking!
              </p>
            </div>
          </div>
          <div tw="flex flex-col">
            <div tw="text-gray-200 text-bold text-md mb-1">0xabcd...ef01</div>
            <div tw="bg-gray-600 rounded-lg px-2 flex self-start">
              <p tw="text-md text-white">
                Hi there! I'm doing great, thanks for asking!
              </p>
            </div>
          </div>
          <div tw="flex flex-col mb-2">
            <div tw="text-gray-200 text-bold text-md mb-1">0xabcd...ef01</div>
            <div tw="bg-gray-600 rounded-lg px-2 flex self-start">
              <p tw="text-md text-white">
                Hi there! I'm doing great, thanks for asking!
              </p>
            </div>
          </div>
          <div tw="flex flex-col relative">
            <div tw="flex">
              <span tw="text-gray-200 font-extrabold text-lg px-1 rounded-t-lg inline-block  bg-black bg-opacity-60">
                0xabcd...ef01
              </span>
            </div>
            <div tw="rounded-b-lg rounded-tr-lg px-2 flex self-start bg-black bg-opacity-60">
              <p tw="text-md text-white">
                LAST there! I'm doing great, thanks for asking! qweqweq
                qweqweqweqw qweqweqw
              </p>
              <span tw="absolute right-0 bottom-0 text-xs text-gray-400 p-2">
                12:34 PM
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 512,
      height: 512,
    },
  );
}
