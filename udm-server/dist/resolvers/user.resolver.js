"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = require("fs");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const graphql_upload_1 = require("graphql-upload");
const argon2_1 = tslib_1.__importDefault(require("argon2"));
const user_1 = require("../entities/user");
const check_permissions_1 = require("../utils/check-permissions");
let UserResolver = class UserResolver {
    users() {
        return user_1.User.find();
    }
    currentUser({ req }) {
        if (!req.session.userId) {
            return null;
        }
        return user_1.User.findOne(req.session.userId);
    }
    register(firstName, lastName, country, email, password, isVerified, isAdmin) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const encryptedPassword = yield argon2_1.default.hash(password);
            try {
                yield user_1.User.insert({
                    firstName,
                    lastName,
                    country,
                    email,
                    password: encryptedPassword,
                    isVerified,
                    isAdmin,
                });
            }
            catch (err) {
                console.log(err);
                return false;
            }
            return true;
        });
    }
    login(email, password, ctx) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ where: { email } });
            if (!user) {
                throw new Error("Email address not registered");
            }
            const checkPassword = yield argon2_1.default.verify(user.password, password);
            if (!checkPassword) {
                throw new Error("Incorrect password");
            }
            if (!user.isVerified) {
                throw new Error("Email address not verified");
            }
            ctx.req.session.userId = user.id;
            ctx.req.session.isAdmin = user.isAdmin;
            console.log(`${user.email} logged in`);
            return user;
        });
    }
    logout({ req, res }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => req.session.destroy((err) => {
                res.clearCookie("sid");
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            }));
        });
    }
    updateUser(id, firstName, lastName, country) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .update(user_1.User)
                .set({ firstName, lastName, country })
                .where("id = :id", {
                id,
            })
                .returning("*")
                .execute();
            return result.raw[0];
        });
    }
    deleteUser(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield user_1.User.delete({ id });
            return true;
        });
    }
    uploadAvatar(id, { createReadStream, filename }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => createReadStream()
                .pipe(fs_1.createWriteStream(path_1.default.join(__dirname, `media/images/avatars/${id}/${filename}`)))
                .on("finish", () => resolve(true))
                .on("error", () => reject(false)));
        });
    }
};
tslib_1.__decorate([
    type_graphql_1.Query(() => [user_1.User]),
    type_graphql_1.UseMiddleware(check_permissions_1.isAdmin),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
tslib_1.__decorate([
    type_graphql_1.Query(() => user_1.User, { nullable: true }),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserResolver.prototype, "currentUser", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => Boolean),
    tslib_1.__param(0, type_graphql_1.Arg("firstName")),
    tslib_1.__param(1, type_graphql_1.Arg("lastName")),
    tslib_1.__param(2, type_graphql_1.Arg("country")),
    tslib_1.__param(3, type_graphql_1.Arg("email")),
    tslib_1.__param(4, type_graphql_1.Arg("password")),
    tslib_1.__param(5, type_graphql_1.Arg("isVerified")),
    tslib_1.__param(6, type_graphql_1.Arg("isAdmin")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => user_1.User, { nullable: true }),
    tslib_1.__param(0, type_graphql_1.Arg("email")),
    tslib_1.__param(1, type_graphql_1.Arg("password")),
    tslib_1.__param(2, type_graphql_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => Boolean),
    tslib_1.__param(0, type_graphql_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => user_1.User, { nullable: true }),
    type_graphql_1.UseMiddleware(check_permissions_1.isAdmin),
    tslib_1.__param(0, type_graphql_1.Arg("id")),
    tslib_1.__param(1, type_graphql_1.Arg("firstName")),
    tslib_1.__param(2, type_graphql_1.Arg("lastName")),
    tslib_1.__param(3, type_graphql_1.Arg("country")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(check_permissions_1.isAdmin),
    tslib_1.__param(0, type_graphql_1.Arg("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
tslib_1.__decorate([
    type_graphql_1.Mutation(() => Boolean),
    tslib_1.__param(0, type_graphql_1.Arg("id")),
    tslib_1.__param(1, type_graphql_1.Arg("avatar", () => graphql_upload_1.GraphQLUpload)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "uploadAvatar", null);
UserResolver = tslib_1.__decorate([
    type_graphql_1.Resolver(user_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map