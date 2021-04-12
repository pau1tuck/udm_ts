"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
let Roles = class Roles {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Roles.prototype, "roles", void 0);
Roles = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], Roles);
exports.Roles = Roles;
//# sourceMappingURL=user-role.js.map