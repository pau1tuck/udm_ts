import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Roles {
    @Field()
    roles?: string;
}
