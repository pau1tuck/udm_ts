import { Field, InputType, Int } from "type-graphql";

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

    @Field(() => Int)
    month!: number;

    @Field(() => Int)
    year!: number;

    @Field()
    youTubeId!: string;

    @Field()
    buyUrl?: string;
}
