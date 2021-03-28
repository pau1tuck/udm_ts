import { Field, InputType } from "type-graphql";

@InputType()
export class TrackInput {
    @Field()
    artist!: string;

    @Field()
    title!: string;

    @Field()
    version?: string;

    @Field()
    label?: string;

    @Field()
    image?: string;

    @Field()
    filename!: string;

    @Field()
    buyUrl?: string;
}
