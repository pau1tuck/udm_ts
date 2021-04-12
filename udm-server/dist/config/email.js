"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTransporter = void 0;
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
exports.emailTransporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {},
    logger: Boolean(process.env.DEBUG),
    debug: Boolean(process.env.DEBUG),
});
//# sourceMappingURL=email.js.map