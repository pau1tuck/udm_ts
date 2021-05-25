import "reflect-metadata";
import "dotenv/config";
import cors from "cors";

import express, { Express } from "express";
import session from "express-session";

import { createConnection, Connection } from "typeorm";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { authChecker } from "./middleware/check-auth";

import database from "./config/database.config";
import { redisClient } from "./config/redis.config";
import { emailTransporter } from "./config/nodemailer.config";

import { UserResolver } from "./resolvers/user.resolver";
import { TrackResolver } from "./resolvers/track.resolver";

import { createUserDataLoader } from "./middleware/create-user-dataloader";
import { cacheTracks } from "./middleware/cache-tracks";
import sessionConfig from "./config/session.config";

const WORKERS = process.env.WEB_CONCURRENCY || 1;

const { DEBUG, HOST, PORT, CORS_ORIGIN, DB_HOST, DB_PORT, REDIS_PORT } =
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
        console.log(
            `🗄️  Connected to PostgreSQL database on ${DB_HOST}:${DB_PORT}`
        );
    }
    console.log(orm.logger);

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
