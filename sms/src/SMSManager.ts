import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

export default class SMSManager {
  private static instance: SMSManager;
  private client: twilio.Twilio;

  private constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    const authToken = process.env.TWILIO_AUTH_TOKEN || "";
    this.client = twilio(accountSid, authToken);
  }

  public static getInstance() {
    if (SMSManager.instance) return SMSManager.instance;
    return (SMSManager.instance = new SMSManager());
  }

  public async sendSMS({to, message, name}:{to:string, message:string, name:string}):Promise<void>{
    try {
        const from = process.env.TWILIO_SMS_FROM || "";
  
        const response = await this.client.messages.create({
          body: message,
          from,
          to,
        });
  
        console.log("SMS sent successfully to :"+name, response.sid);
      } catch (error) {
        console.error("Error sending SMS:", error);
      }

  }
}
