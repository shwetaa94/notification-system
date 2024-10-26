import { createClient } from "redis";
import SMSManager from "./SMSManager"

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

async function main() {
  await client.connect();

  while (true) {
    const msg = await client.rPop("sms");


    if (msg) {
        console.log(`Processing message: ${msg}`);
      const { to, message, name } = JSON.parse(msg);
      // process the message send notification
      try {
        await SMSManager.getInstance().sendSMS({ to,message, name });
        console.log("SMS Message Sent Successfully");
      } catch (error) {
        console.log(error);
      }
    }
  }
}
main()