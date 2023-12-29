"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var TargetInfo = /** @class */ (function () {
    function TargetInfo(targetEntityInstanceIds, noTargetWasSelected, targetsAreSelectedLater) {
        this.targetEntityInstanceIds = [];
        this.targetEntityInstanceIds = __spreadArray([], targetEntityInstanceIds, true);
        this.noTargetWasSelected = noTargetWasSelected;
        this.targetsAreSelectedLater = targetsAreSelectedLater;
    }
    TargetInfo.prototype.clone = function () {
        return TargetInfo.fromJSON(this);
    };
    TargetInfo.prototype.toJSON = function () {
        return {
            targetEntityInstanceIds: this.targetEntityInstanceIds,
            noTargetWasSelected: this.noTargetWasSelected,
            targetsAreSelectedLater: this.targetsAreSelectedLater,
        };
    };
    TargetInfo.fromJSON = function (json) {
        return new TargetInfo(json.targetEntityInstanceIds, json.noTargetWasSelected, json.targetsAreSelectedLater);
    };
    return TargetInfo;
}());
exports.default = TargetInfo;
