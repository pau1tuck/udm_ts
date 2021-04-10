"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDataLoader = void 0;
const tslib_1 = require("tslib");
const dataloader_1 = tslib_1.__importDefault(require("dataloader"));
const user_1 = require("../entities/user");
const createUserDataLoader = () => {
    new dataloader_1.default((userIds) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const users = yield user_1.User.findByIds(userIds);
        const userIdToUser = {};
        users.forEach((u) => {
            userIdToUser[u.id] = u;
        });
        const sortedUsers = userIds.map((userId) => userIdToUser[userId]);
        console.log("userIds", userIds);
        console.log("map", userIdToUser);
        console.log("sortedUsers", sortedUsers);
        return sortedUsers;
    }));
};
exports.createUserDataLoader = createUserDataLoader;
//# sourceMappingURL=create-user-dataloader.js.map