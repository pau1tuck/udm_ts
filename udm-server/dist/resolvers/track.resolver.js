"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackResolver = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const track_1 = require("../entities/track");
const track_input_1 = require("../types/track.input");
const paginated_tracks_1 = require("../types/paginated-tracks");
const redis_1 = require("../config/redis");
const constants_1 = require("../config/constants");
let TrackResolver = class TrackResolver {
    tracks(limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const allTracks = (yield redis_1.redisClient.lrange(constants_1.TRACKS_CACHE_KEY, 0, -1)) || [];
            const tracks = allTracks.map((track) => JSON.parse(track));
            return {
                payload: tracks.slice(0, limit),
                hasMore: tracks.length === limit + 1,
            };
        });
    }
    track(id) {
        return track_1.Track.findOne(id);
    }
    createTrack(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newTrack = yield track_1.Track.create(Object.assign({}, input)).save();
            redis_1.redisClient.lpush(constants_1.TRACKS_CACHE_KEY, JSON.stringify(newTrack));
            return newTrack;
        });
    }
    updateTrack(id, youTubeId, buyUrl) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .update(track_1.Track)
                .set({ youTubeId, buyUrl })
                .where("id = :id", {
                id,
            })
                .returning("*")
                .execute();
            return result.raw[0];
        });
    }
    deleteTrack(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield track_1.Track.delete({ id });
            return true;
        });
    }
};
tslib_1.__decorate([
    type_graphql_1.Query(() => paginated_tracks_1.PaginatedTracks),
    tslib_1.__param(0, type_graphql_1.Arg("limit", () => type_graphql_1.Int)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], TrackResolver.prototype, "tracks", null);
tslib_1.__decorate([
    type_graphql_1.Query(() => track_1.Track, { nullable: true }),
    tslib_1.__param(0, type_graphql_1.Arg("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TrackResolver.prototype, "track", null);
tslib_1.__decorate([
    type_graphql_1.Authorized("ADMIN"),
    type_graphql_1.Mutation(() => track_1.Track),
    tslib_1.__param(0, type_graphql_1.Arg("input")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [track_input_1.TrackInput]),
    tslib_1.__metadata("design:returntype", Promise)
], TrackResolver.prototype, "createTrack", null);
tslib_1.__decorate([
    type_graphql_1.Authorized("ADMIN"),
    type_graphql_1.Mutation(() => track_1.Track, { nullable: true }),
    tslib_1.__param(0, type_graphql_1.Arg("id")),
    tslib_1.__param(1, type_graphql_1.Arg("youTubeId")),
    tslib_1.__param(2, type_graphql_1.Arg("buyUrl")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], TrackResolver.prototype, "updateTrack", null);
tslib_1.__decorate([
    type_graphql_1.Authorized("ADMIN"),
    type_graphql_1.Mutation(() => Boolean),
    tslib_1.__param(0, type_graphql_1.Arg("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TrackResolver.prototype, "deleteTrack", null);
TrackResolver = tslib_1.__decorate([
    type_graphql_1.Resolver(track_1.Track)
], TrackResolver);
exports.TrackResolver = TrackResolver;
//# sourceMappingURL=track.resolver.js.map