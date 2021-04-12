"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const email_1 = require("../config/email");
const sendVerificationEmail = (recipient, url) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const info = yield email_1.transporter.sendMail({
        from: '"Underground Dance Music" <noreply@udmx.net>',
        to: recipient,
        subject: "Confirm email address",
        text: "Welcome.",
        html: `Click the following link to confirm your email address: ${url}`,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
});
exports.sendVerificationEmail = sendVerificationEmail;
//# sourceMappingURL=send-email.js.map