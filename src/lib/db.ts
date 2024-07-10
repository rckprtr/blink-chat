import { ChatMessage } from "@/types";
import { kv } from "@vercel/kv";

const chatKey = "chat:messages:v1";

export async function addMessage(message: ChatMessage) {
  let results = await kv.zadd(chatKey, {
    score: message.timestamp,
    member: JSON.stringify(message),
  });
  console.log("Added message", message, results);
}

export async function getMessages(max = -1): Promise<ChatMessage[]> {
  let results = await kv.zrange(chatKey, 0, max);
  return results as ChatMessage[];
}
