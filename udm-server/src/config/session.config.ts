import { v4 } from "uuid";
import { RedisStore, redisClient } from "./redis.config";

const PROD = process.env.NODE_ENV === "production";

const sessionConfig = {
    name: "sid",
    genid: () => v4(),
    store: new RedisStore({
        client: redisClient as any,
        disableTouch: true,
        disableTTL: true,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: PROD,
        secure: PROD,
    },
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
};

export default sessionConfig;
