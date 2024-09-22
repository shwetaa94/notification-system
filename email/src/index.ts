import { createClient } from "redis";
import { EmailManager } from "./EmailManager";

const client = createClient()

async function main(){
    await client.connect()

    while(true){
        try {
           const msg = await client.rPop("email")
           if(msg){
                const {message, to, name}= JSON.parse(msg)
                await EmailManager.getInstance().sendEmail({
                    subject : "Testing Sweet Mails",
                    htmlContent: message,
                    recipientEmail: to,
                    recipientName: name
                })
                console.log(`Email sent to: ${to} 😎`)
           }
        } catch (error) {
            console.log("Erorr in sending email..", error)
        }
    }
}
main()