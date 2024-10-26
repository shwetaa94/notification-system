import {createClient, RedisClientType} from 'redis'
import dotenv from 'dotenv'
dotenv.config()

const emailPriority = ["email-1", "email-2", "email-3"]
const smsPriority =   ["sms-1", "sms-2", "sms-3"]
const whatsAppPriority = ["whatsapp-1", "whatsapp-2", "whatsapp-3"]

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

//redispop  
//emails priorty kya h

async function main() {
    await client.connect();
    
    // Main processing loop
    while (true) {
      try {
        // Check and process email queues
        if (await processQueueGroup(emailPriority)) continue;
        
        // Check and process SMS queues if no higher-priority emails
        if (await processQueueGroup(smsPriority)) continue;
        
        // Check and process WhatsApp queues if no higher-priority SMS or emails
        await processQueueGroup(whatsAppPriority);
        
      } catch (error) {
        console.error('Error in main loop:', error);
      }
    }
  }
  
  // Helper function to process a group of queues with priority
  async function processQueueGroup(queueList: string[]) {
    for (const queue of queueList) {
      const size = await client.lLen(queue);
      
      if (Number(size) > 0) {
        await popMSGfromQUEUE(queue);
        
        // After processing a message, recheck the first queue in this group
        if (queueList[0] !== queue) {
          const firstQueueSize = await client.lLen(queueList[0]);
          if (Number(firstQueueSize) > 0) return true; // Return true to signal higher-priority queue found
        }
        if ( queue=== queueList[2] && queueList[1] !== queue) {
          const secondQueueSize = await client.lLen(queueList[1]);
          if (Number(secondQueueSize) > 0) return true; // Return true to signal higher-priority queue found
        }
      }
    }
    return false; // No higher-priority queues found
  }
  
  // Function to pop a message from the queue
  async function popMSGfromQUEUE(queue: string) {
    const message = await client.rPop(queue);
    const queueName =queue.split("-")[0]
    console.log(`Popped message from ${queue}:`, message);
    message&&(await client.lPush(queueName, message))
  }
  main();