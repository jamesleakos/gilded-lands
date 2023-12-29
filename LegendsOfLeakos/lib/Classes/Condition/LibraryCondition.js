"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryCondition = /** @class */ (function () {
    function LibraryCondition(conditionType, data) {
        this.conditionType = conditionType;
        this.data = data;
    }
    LibraryCondition.prototype.toJSON = function () {
        return {
            conditionType: this.conditionType,
            data: this.data,
        };
    };
    LibraryCondition.fromJSON = function (json) {
        return new LibraryCondition(json.conditionType, json.data);
    };
    return LibraryCondition;
}());
exports.default = LibraryCondition;
