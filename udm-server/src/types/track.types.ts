import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Track } from "../entities/track";

@ObjectType()
export class PaginatedTracks {
    @Field(() => [Track])
    payload?: Track[];

    @Field()
    hasMore!: boolean;
}

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
