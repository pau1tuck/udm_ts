import {
    Arg,
    Authorized,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Track } from "../entities/track";
import { PaginatedTracks, TrackInput } from "../types/track.types";
import { redisClient } from "../config/redis";

const { TRACKS_CACHE_KEY } = process.env;

@Resolver(Track)
export class TrackResolver {
    @Query(() => PaginatedTracks)
    async tracks(
        @Arg("limit", () => Int)
        limit: number
    ): Promise<PaginatedTracks> {
        const allTracks =
            (await redisClient.lrange(TRACKS_CACHE_KEY, 0, -1)) || [];
        const tracks = allTracks.map((track: string) => JSON.parse(track));
        return {
            payload: tracks.slice(0, limit),
            hasMore: tracks.length === limit + 1,
        };
    }

    @Query(() => Track, { nullable: true })
    track(@Arg("id") id: string): Promise<Track | undefined> {
        return Track.findOne(id);
    }

    @Authorized("ADMIN")
    @Mutation(() => Track)
    async createTrack(@Arg("input") input: TrackInput): Promise<Track> {
        const newTrack = await Track.create({
            ...input,
        }).save();
        redisClient.lpush(TRACKS_CACHE_KEY, JSON.stringify(newTrack));
        return newTrack;
    }

    // @Authorized("ADMIN")
    @Mutation(() => Track, { nullable: true })
    async updateTrack(
        @Arg("id") id: string,
        @Arg("youTubeId") youTubeId: string,
        @Arg("buyUrl") buyUrl: string
    ): Promise<Track | null> {
        const result = await getConnection()
            .createQueryBuilder()
            .update(Track)
            .set({ youTubeId, buyUrl })
            .where("id = :id", {
                id,
            })
            .returning("*")
            .execute();

        return result.raw[0];
    }

    @Authorized("ADMIN")
    @Mutation(() => Boolean)
    async deleteTrack(@Arg("id") id: string): Promise<boolean> {
        await Track.delete({ id });
        return true;
    }
}
