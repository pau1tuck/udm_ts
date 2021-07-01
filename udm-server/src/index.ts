import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import throng from "throng";
import { v4 } from "uuid";

import express, { Express, Request, Response } from "express";
import session from "express-session";

import { createConnection, Connection } from "typeorm";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { authChecker } from "./middleware/check-auth";

import database from "./config/database.config";
import { RedisStore, redisClient } from "./config/redis.config";
import { emailTransporter } from "./config/nodemailer.config";

import { UserResolver } from "./resolvers/user.resolver";
import { TrackResolver } from "./resolvers/track.resolver";

import { createUserDataLoader } from "./middleware/create-user-dataloader";
import { cacheTracks } from "./middleware/cache-tracks";

const PROD = process.env.NODE_ENV === "production";
const WORKERS = Number(process.env.WEB_CONCURRENCY) || 1;

const {
    DEBUG,
    HOST,
    PORT,
    CORS_ORIGIN,
    DB_HOST,
    DB_PORT,
    REDIS_HOST,
    REDIS_PORT,
} = process.env;

const server = async () => {
    const orm: Connection = await createConnection(database);

    const app: Express = express();

    app.disable("x-powered-by");

    app.set("trust proxy", "195.110.58.50");

    app.use(
        cors({
            origin: PROD ? /udmx\.net$/ : CORS_ORIGIN,
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
                httpOnly: false,
                sameSite: "lax",
                secure: PROD,
                domain: PROD ? ".udmx.net" : undefined,
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
        introspection: DEBUG,
    });

    apolloServer.applyMiddleware({ app, cors: false });

    cacheTracks();

    app.use("/media", express.static("media"));

    if (orm.isConnected) {
        console.log(
            `🗄️  Connected to PostgreSQL database on ${DB_HOST}:${DB_PORT}`
        );
    }

    redisClient.monitor((error, monitor) => {
        if (!error) {
            console.log(`📙 Connected to Redis on ${REDIS_HOST}:${REDIS_PORT}`);
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

    app.get(
        "/.well-known/acme-challenge/BGG82hWJqcHQ4uFCs6ICI6w2zzuIUIbMjrGYjmRLdwQ",
        (_req: Request, res: Response) => {
            res.send(
                "BGG82hWJqcHQ4uFCs6ICI6w2zzuIUIbMjrGYjmRLdwQ.sgFVWkcUsODnnQ0ll8Qx94Wi2b-EPuFsJ6258U5doRM"
            );
        }
    );

    if (PROD) {
        app.get("/", (_req: Request, res: Response) => {
            res.redirect("https://udmx.net");
        });
    }

    app.listen(PORT, () => {
        console.log(`🚀 Node server running on ${HOST}:${PORT}`);
    });
};

throng(WORKERS, server);
