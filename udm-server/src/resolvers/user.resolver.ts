import path from "path";
import { Errback } from "express";
import { createWriteStream } from "fs";
import {
    Arg,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { GraphQLUpload } from "graphql-upload";
import argon2 from "argon2";
import { User } from "../entities/user";
import { RegisterUserInput } from "../types/user.types";
import { IContext } from "../types/context.interface";
import { IUpload } from "../types/upload.interface";

@Resolver(User)
export class UserResolver {
    // LIST ALL USERS
    // @Authorized("ADMIN")
    @Query(() => [User])
    // @UseMiddleware(isAdmin)
    users(): Promise<User[]> | null {
        return User.find();
    }

    // CURRENT USER
    @Query(() => User, { nullable: true })
    currentUser(@Ctx() { req }: IContext) {
        if (!req.session.userId) {
            return null;
        }
        return User.findOne(req.session.userId);
    }

    // REGISTER
    @Mutation(() => Boolean)
    async register(
        @Arg("input") input: RegisterUserInput,
        @Arg("password") password: string
    ) {
        const encryptedPassword = await argon2.hash(password);
        try {
            await User.insert({
                ...input,
                password: encryptedPassword,
                verified: true,
                roles: ["ADMIN", "MODERATOR"],
            });
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    // LOG IN
    @Mutation(() => User, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: IContext
    ): Promise<User | Error> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("Email address not registered");
        }

        let checkPassword: boolean;
        if (user.password) {
            checkPassword = await argon2.verify(user.password, password);

            if (!checkPassword) {
                throw new Error("Incorrect password");
            }
        } else {
            throw new Error("No password set for account");
        }

        if (!user.verified) {
            throw new Error("Email address not verified");
        }

        ctx.req.session.userId = user.id;
        ctx.req.session.roles = user.roles;

        console.log(`${user.email} logged in`);
        return user;
    }

    // LOG OUT
    @Mutation(() => Boolean)
    async logout(@Ctx() { req, res }: IContext) {
        return new Promise((resolve) =>
            req.session.destroy((err: Errback) => {
                res.clearCookie("sid");
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }

                resolve(true);
            })
        );
    }

    // UPDATE USER
    @Mutation(() => User, { nullable: true })
    async updateUser(
        @Arg("id") id: number,
        @Arg("input") input: RegisterUserInput,
        @Arg("password") password: string
    ): Promise<User | null> {
        const encryptedPassword = await argon2.hash(password);
        const result = await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ ...input, password: encryptedPassword })
            .where("id = :id", {
                id,
            })
            .returning("*")
            .execute();

        return result.raw[0];
    }

    // DELETE USER
    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id: number): Promise<boolean> {
        await User.delete({ id });
        return true;
    }

    // UPLOAD USER AVATAR
    @Mutation(() => Boolean)
    async uploadAvatar(
        @Arg("id") id: string,
        @Arg("avatar", () => GraphQLUpload)
        { createReadStream, filename }: IUpload
    ): Promise<boolean> {
        return new Promise((resolve, reject) =>
            createReadStream()
                .pipe(
                    createWriteStream(
                        path.join(
                            __dirname,
                            `media/images/avatars/${id}/${filename}`
                        )
                    )
                )
                .on("finish", () => resolve(true))
                // eslint-disable-next-line prefer-promise-reject-errors
                .on("error", () => reject(false))
        );
    }
}
