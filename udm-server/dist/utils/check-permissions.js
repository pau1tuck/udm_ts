"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("User not authenticated");
    }
    return next();
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=check-permissions.js.map