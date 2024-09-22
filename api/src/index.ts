import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./db";
import { RedisManager } from "./RedisManager";
dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors({ origin: [] }));

app.get("/", (req: Request, res: Response) => {
  res.send("API Service working!");
});

app.post("/notification", async(req: Request, res: Response) => {
  try {
    const { userId, message, priority } = req.body;
    const user = await prisma.user.findFirst({
      where: {id: Number(userId)},
    });
    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }
    const notificationPrefrences = await prisma.notificationPreferences.findFirst({
        where: {userId: Number(userId)}
    })
    let publisher = RedisManager.getInstance();       

    if(notificationPrefrences?.sms){
        await publisher.pushToQueue({message, to:user.phone, service:'sms', priority, name:user.name})     //message, to(self- for test), service, priority, name
        // console.log("SMS message pushed to Queue")
    }       
    if(notificationPrefrences?.email){
        await publisher.pushToQueue({message, to:user.email, service:'email', priority, name:user.name})
        // console.log("email message pushed to Queue")
    }     
    if(notificationPrefrences?.whatsapp){
        await publisher.pushToQueue({message, to:user.phone, service:'whatsapp', priority, name:user.name})
        // console.log("Whatsapp message pushed to Queue")
    }  

    res.status(200).json({ message: "Notification sent successfully" });

  } catch (error) {
    console.log(error)
  }
});

app.listen(PORT, () => {
  console.log(`server started at localhost:${PORT}`);
});
