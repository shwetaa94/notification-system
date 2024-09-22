import * as Brevo from '@getbrevo/brevo'
import dotenv from 'dotenv'
dotenv.config()

export class EmailManager{
    private static instance:EmailManager;
    private apiInstance: Brevo.TransactionalEmailsApi

    private constructor(){
        this.apiInstance = new Brevo.TransactionalEmailsApi();
        this.setApiKey(process.env.BREVO_API_KEY ||"")
    }
    public static getInstance(){
        if(!EmailManager.instance)
            return EmailManager.instance = new EmailManager()
        return EmailManager.instance
    }

    private setApiKey(apikey:string){
        this.apiInstance.setApiKey(0,apikey)
    }
    public async sendEmail({subject,htmlContent,recipientName,recipientEmail,}: {
      subject: string;
      htmlContent: string;
      recipientName: string;
      recipientEmail: string;
    }): Promise<void> {
        const sendSmtpEmail = new Brevo.SendSmtpEmail();
    
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.htmlContent = htmlContent;
        sendSmtpEmail.sender = {
          name: process.env.SENDER_NAME || "Default Sender",
          email: process.env.SENDER_EMAIL || "default@example.com",
        };
        sendSmtpEmail.to = [{ email: recipientEmail, name: recipientName },];  //kitne bhi logo ko bhej skte hai [{},{},{],....,{}]
        sendSmtpEmail.replyTo = {
          email: process.env.SENDER_EMAIL || "default@example.com",
          name: process.env.SENDER_NAME || "Default Sender",
        };
        sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
        sendSmtpEmail.params = {
          parameter: "My param value",
          subject: "common subject",
        };
        // Schedule the sending in one hour\
        // scheduledAt: '2018-01-01 00:00:01'
    
        try {
          const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
          console.log("API called successfully. Returned data:");
        } catch (error) {
          console.error("Error sending email:", error);
        }
      }
    }
    