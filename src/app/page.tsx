import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn, shortenAddress, formatTimestamp } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CoinsIcon,
  FileTextIcon,
  ImageIcon,
  ShieldIcon,
  WalletIcon,
} from "lucide-react";
import { getMessages } from "@/lib/db";

const actionCards: Array<{
  title: string;
  href: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}> = [
  {
    title: "On-chain Memo",
    href: "/memo",
    description: "Send a simple message on-chain using an SPL Memo.",
    icon: <FileTextIcon className="size-12" />,
  },
  {
    title: "Staking SOL",
    href: "/stake",
    description:
      "Help secure the Solana network by staking SOL to a validator.",
    icon: <ShieldIcon className="size-12" />,
  },
  {
    title: "Transfer Native SOL",
    href: "/transfer-sol",
    description: "Easily transfer native SOL to any other Solana wallet.",
    icon: <WalletIcon className="size-12" />,
  },
];
export const fetchCache = 'force-no-store'
export default async function Pages() {
  //const bgImage = new URL("/background.png", requestUrl.origin).toString();
  const messages = await getMessages();

  return (
    <>
      {/* <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:pt-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            An example app built using Next.js 13 server components.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 13 and open sourcing
            everything. Follow along as we figure this out together.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section> */}

      <section
        id="features"
        className={
          "container space-y-12 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        }
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-6 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Blink Chat
          </h2>
        </div>

        <div className="p-3 bg-slate-800 rounded-lg"
         
        >
          {messages.map((msg, key) => (
            <div key={key} className="flex flex-col relative mb-2">
              <div className="flex">
                <span className="text-gray-200 text-sm px-2 rounded-t-lg inline-block bg-black bg-opacity-60">
                  {shortenAddress(msg.sender)}
                </span>
              </div>
              <div className="rounded-b-lg rounded-tr-lg px-2 self-start bg-black bg-opacity-60">
                <p className="text-md text-white my-2">{msg.msg}</p>
                <div className="block text-xs">
                  <a href={`https://solscan.io/tx/${msg.signature}`} target="_blank" className="underline mr-2">sig</a>
                  <span className="text-cs text-gray-500">{formatTimestamp(msg.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            You can find the{" "}
            <Button variant={"link"} asChild>
              <Link
                href="https://github.com/rckprtr/blink-chat"
                target="_blank"
              >
                full source code
              </Link>
            </Button>{" "}
            for this entire repo on GitHub.
          </p>
        </div>
      </section>

      {/* <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Taxonomy is open source and powered by open source software. <br />{" "}
            The code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{" "}
          </p>
        </div>
      </section> */}
    </>
  );
}
