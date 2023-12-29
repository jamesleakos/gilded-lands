"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameProperties_1 = __importDefault(require("../Game/GameProperties"));
var PayResourceCost = /** @class */ (function () {
    function PayResourceCost(statId, value) {
        this.statId = statId;
        this.value = value;
    }
    PayResourceCost.prototype.costName = function () {
        var _this = this;
        return GameProperties_1.default.playerStats.find(function (x) { return x.statId === _this.statId; }).name;
    };
    PayResourceCost.prototype.clone = function () {
        return PayResourceCost.fromJSON(this);
    };
    PayResourceCost.prototype.toJSON = function () {
        return {
            statId: this.statId,
            value: this.value,
        };
    };
    PayResourceCost.fromJSON = function (json) {
        return new PayResourceCost(json.statId, json.value);
    };
    PayResourceCost.isLibraryJSONValid = function (json) {
        var playerStat = GameProperties_1.default.playerStats.find(function (x) { return x.statId === json.statId; });
        if (playerStat === undefined)
            return false;
        if (typeof json.value !== 'number' ||
            json.value < playerStat.minValue ||
            json.value > playerStat.maxValue)
            return false;
        return true;
    };
    return PayResourceCost;
}());
exports.default = PayResourceCost;
