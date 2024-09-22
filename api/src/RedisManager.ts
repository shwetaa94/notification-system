import { createClient, RedisClientType } from "redis";

export class RedisManager {
  private static instance: RedisManager;
  private redisClient: RedisClientType;

  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
  }

  public static getInstance(): RedisManager {
    if (RedisManager.instance) 
        return RedisManager.instance;

    return (RedisManager.instance = new RedisManager());
  }

  public async pushToQueue({message, to, service, priority, name}:{message: string, to: string, service:string, priority: number, name:string}){
    const channel = `${service}-${priority}`;
    await this.redisClient.lPush(channel, JSON.stringify({message, to, name}))
    console.log(`message pushed to Queue: ${channel}`)
  }
}
