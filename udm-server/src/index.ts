import "reflect-metadata";
import "dotenv/config";
import { v4 } from "uuid";
import cors from "cors";

import express, { Express, Request, Response } from "express";
import session from "express-session";

import { createConnection, Connection } from "typeorm";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { authChecker } from "./utils/auth-checker";

import database from "./config/database";
import { RedisStore, redisClient } from "./config/redis";
import { emailTransporter } from "./config/email";

import { UserResolver } from "./resolvers/user.resolver";
import { TrackResolver } from "./resolvers/track.resolver";

import { createUserDataLoader } from "./utils/create-user-dataloader";
import { cacheTracks } from "./utils/cache-tracks";

const PRODUCTION: boolean = process.env.NODE_ENV === "production";
const WORKERS = process.env.WEB_CONCURRENCY || 1;
const PORT = process.env.PORT || 5000;

const server = async () => {
    const orm: Connection = await createConnection(database);

    const app: Express = express();

    app.disable("x-powered-by");

    app.set("trust proxy", 1);
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        })
    );

    app.use(
        session({
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
                sameSite: "lax", // set true
                secure: PRODUCTION,
            },
            secret: process.env.SESSION_SECRET || "secret",
            resave: false,
            saveUninitialized: false,
        })
    );

    const graphQLSchema = await buildSchema({
        resolvers: [UserResolver, TrackResolver],
        validate: false,
        authChecker,
    });

    const apolloServer = new ApolloServer({
        schema: graphQLSchema,
        context: ({ req, res }: any) => ({
            req,
            res,
            redisClient,
            userLoader: createUserDataLoader(),
        }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    cacheTracks();

    app.use("/media", express.static("media"));

    if (orm.isConnected) {
        console.log(
            `🗄️  Connected to PostgreSQL database on port ${process.env.DB_PORT}`
        );
    }

    redisClient.monitor((error, monitor) => {
        monitor.on("monitor", (time, args, source) => {
            console.log(time, args, source);
        });
        if (!error) {
            console.log(
                `📙 Connected to Redis on port ${process.env.REDIS_PORT}`
            );
        }
    });

    emailTransporter.verify((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(
                `📧 SMTP email server ready at ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`
            );
        }
    });

    app.listen(PORT, () => {
        console.log(`🚀 Node server running on port ${PORT}`);
    });
};
server().catch((err) => {
    console.error(err);
});
