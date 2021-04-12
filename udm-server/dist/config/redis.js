"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.RedisStore = void 0;
const tslib_1 = require("tslib");
const connect_redis_1 = tslib_1.__importDefault(require("connect-redis"));
const ioredis_1 = tslib_1.__importDefault(require("ioredis"));
const express_session_1 = tslib_1.__importDefault(require("express-session"));
exports.RedisStore = connect_redis_1.default(express_session_1.default);
exports.redisClient = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    family: Number(process.env.REDIS_FAMILY),
    password: process.env.REDIS_PASS,
    db: Number(process.env.REDIS_DB),
    enableReadyCheck: true,
});
//# sourceMappingURL=redis.js.map