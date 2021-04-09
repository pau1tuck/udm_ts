"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheTracks = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const track_1 = require("../entities/track");
const redis_1 = require("../config/redis");
const constants_1 = require("../config/constants");
const cacheTracks = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield redis_1.redisClient.del(constants_1.TRACKS_CACHE_KEY);
    const allTracks = yield typeorm_1.getConnection()
        .getRepository(track_1.Track)
        .createQueryBuilder("t")
        .orderBy('t."createdAt"', "DESC")
        .getMany();
    const tracks = allTracks.map((track) => JSON.stringify(track));
    if (tracks.length) {
        yield redis_1.redisClient.lpush(constants_1.TRACKS_CACHE_KEY, ...tracks);
        console.log(yield redis_1.redisClient.lrange(constants_1.TRACKS_CACHE_KEY, 0, -1));
    }
});
exports.cacheTracks = cacheTracks;
//# sourceMappingURL=cache-tracks.js.map