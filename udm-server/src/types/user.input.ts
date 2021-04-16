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

    @Field({ defaultValue: false })
    verified!: boolean;

    @Field(() => [String], { nullable: true })
    roles?: string[];
}
