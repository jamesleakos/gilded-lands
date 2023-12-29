"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatUpgrade = void 0;
var StatModifier_1 = __importDefault(require("./StatModifier"));
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var StatUpgrade = /** @class */ (function () {
    function StatUpgrade(statId, value) {
        this.statId = statId;
        this.value = value;
    }
    StatUpgrade.prototype.upgradeStat = function (stat) {
        if (stat.statId !== this.statId)
            return;
        var mod = new StatModifier_1.default(this.value.effectiveValue);
        stat.addModifier(mod);
    };
    StatUpgrade.prototype.toJSON = function () {
        return {
            statId: this.statId,
            value: this.value.toJSON(),
        };
    };
    StatUpgrade.fromJSON = function (json) {
        return new StatUpgrade(json.statId, ModifiableInt_1.default.fromJSON(json.value));
    };
    return StatUpgrade;
}());
exports.StatUpgrade = StatUpgrade;
exports.default = StatUpgrade;
