import "reflect-metadata";
import "dotenv/config";
import { v4 } from "uuid";
import cors from "cors";

import express, { Express, Request, Response } from "express";
import session from "express-session";

import { createConnection, Connection } from "typeorm";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { authChecker } from "./utils/check-auth";

import database from "./config/database";
import { RedisStore, redisClient } from "./config/redis";
import { emailTransporter } from "./config/email";

import { UserResolver } from "./resolvers/user.resolver";
import { TrackResolver } from "./resolvers/track.resolver";

import { createUserDataLoader } from "./utils/create-user-dataloader";
import { cacheTracks } from "./utils/cache-tracks";
import sessionConfig from "./config/session";

const WORKERS = process.env.WEB_CONCURRENCY || 1;

const { NODE_ENV, DEBUG, HOST, PORT, CORS_ORIGIN, DB_PORT, REDIS_PORT } =
    process.env;

const server = async () => {
    const orm: Connection = await createConnection(database);

    const app: Express = express();

    app.disable("x-powered-by");

    app.set("trust proxy", 1);

    app.use(
        cors({
            origin: CORS_ORIGIN,
            credentials: true,
        })
    );

    app.use(session(sessionConfig));

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
        introspection: DEBUG,
        playground: DEBUG,
    });

    apolloServer.applyMiddleware({ app, cors: false });

    cacheTracks();

    app.use("/media", express.static("media"));

    if (orm.isConnected) {
        console.log(`🗄️  Connected to PostgreSQL database on port ${DB_PORT}`);
    }

    redisClient.monitor((error, monitor) => {
        if (!error) {
            console.log(`📙 Connected to Redis on port ${REDIS_PORT}`);
        }
        if (DEBUG) {
            monitor.on("monitor", (time, args, source) => {
                console.log(time, args, source);
            });
        }
    });

    /*
    emailTransporter.verify((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(
                `📧 SMTP email server ready at ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`
            );
        }
    });
    */

    app.listen(PORT, () => {
        console.log(`🚀 Node server running on ${HOST}:${PORT}`);
    });
};
server().catch((err) => {
    console.error(err);
});
