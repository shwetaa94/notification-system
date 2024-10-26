import { createClient } from "redis";
import WhatsAppManager from "./WhatsAppManager"

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

async function main() {
  await client.connect();

  while (true) {
    const msg = await client.rPop("whatsapp");

    if (msg) {
        console.log(`Processing message: ${msg}`);
      const { to, message, name } = JSON.parse(msg);
      // process the message send notification
      console.log("this is message:",message);
      try {
        await WhatsAppManager.getInstance().sendWhatsAppMessage({ to,message, name });
        console.log("WhatsApp Message Sent Successfully");
      } catch (error) {
        console.log(error);
      }
    }
  }
}

main()