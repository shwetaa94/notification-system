import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

export default class WhatsAppManager {
  private static instance: WhatsAppManager;
  private client: twilio.Twilio;

  private constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    const authToken = process.env.TWILIO_AUTH_TOKEN || "";
    this.client = twilio(accountSid, authToken);
  }

  public static getInstance() {
    if (WhatsAppManager.instance) return WhatsAppManager.instance;
    return (WhatsAppManager.instance = new WhatsAppManager());
  }

  public async sendWhatsAppMessage({to, message, name}:{to:string, message:string, name:string}):Promise<void>{
    try {
        const from = `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`;
        const toWithWhatsApp = `whatsapp:${to}`;
  
        const response = await this.client.messages.create({
          body: message,
          from,
          to: toWithWhatsApp,
        });
  
        console.log("SMS sent successfully to :"+name, response.sid);
      } catch (error) {
        console.error("Error sending whatsapp message:", error);
      }

  }
}
