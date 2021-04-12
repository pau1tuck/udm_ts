import { AuthChecker } from "type-graphql";
import { IContext } from "../types/context.interface";

export const authChecker: AuthChecker<IContext> = ({ context }, roles) => {
    if (roles.length === 0) {
        // if `@Authorized()`, check only if user exists
        return context.req.session.userId !== undefined;
    }
    // there are some roles defined now

    if (!context.req.session.userId) {
        // and if no user, restrict access
        return false;
    }
    if (
        context.req.session.roles.some((role: string) => roles.includes(role))
    ) {
        // grant access if the roles overlap
        return true;
    }

    // no roles matched, restrict access
    return false;
};
