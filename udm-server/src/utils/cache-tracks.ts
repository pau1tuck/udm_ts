import { getConnection } from "typeorm";
import { Track } from "../entities/track";
import { redisClient } from "../config/redis";
import { TRACKS_CACHE_KEY } from "../config/constants";

export const cacheTracks = async () => {
    await redisClient.del(TRACKS_CACHE_KEY);
    // const allTracks = await Track.find();
    const allTracks = await getConnection()
        .getRepository(Track)
        .createQueryBuilder("t")
        .orderBy('t."createdAt"', "DESC")
        .getMany();
    const tracks = allTracks.map((track: any) => JSON.stringify(track));
    if (tracks.length) {
        await redisClient.lpush(TRACKS_CACHE_KEY, ...tracks);
        console.log(await redisClient.lrange(TRACKS_CACHE_KEY, 0, -1));
    }
};
