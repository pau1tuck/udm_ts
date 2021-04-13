import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    country!: string;

    @Field()
    email!: string;

    @Field()
    password!: string;

    @Field({ defaultValue: false })
    verified!: boolean;

    @Field(() => [String])
    roles?: string[];
}
