import { Field, ObjectType } from "type-graphql";
import { Track } from "../entities/track";

@ObjectType()
export class PaginatedTracks {
    @Field(() => [Track])
    payload?: Track[];

    @Field()
    hasMore!: boolean;
}
