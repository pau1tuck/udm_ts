import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createUserDataLoader } from "../utils/create-user-dataloader";

export interface IContext {
    req: Request & { session: any };
    res: Response;
    redis: Redis;
    payload?: { userId: string; roles: string[] };
    userLoader: ReturnType<typeof createUserDataLoader>;
}
