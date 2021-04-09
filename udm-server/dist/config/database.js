"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const user_1 = require("../entities/user");
const track_1 = require("../entities/track");
exports.default = {
    type: "postgres",
    url: process.env.DB_URL,
    synchronize: true,
    logging: process.env.DB_LOGGING,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    entities: [user_1.User, track_1.Track],
    migrations: [path_1.default.join(__dirname, "/migrations/**/*.ts")],
    subscribers: [path_1.default.join(__dirname, "/subscribers/**/*.ts")],
    cli: {
        migrationsDir: path_1.default.join(__dirname, "/migrations"),
    },
};
//# sourceMappingURL=database.js.map