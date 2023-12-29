"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ModifiableInt_1 = __importDefault(require("../../ModifableInt/ModifiableInt"));
var KeywordUpgrade = /** @class */ (function () {
    function KeywordUpgrade(keywordType, keywordUpgradeIndex, isPermanent, durationChange, isActive) {
        this.newConditions = [];
        this.removeConditionsOfType = [];
        this.keywordType = keywordType;
        this.keywordUpgradeIndex = keywordUpgradeIndex;
        this.isPermanent = isPermanent;
        this.durationChange = durationChange;
        this.isActive = isActive;
    }
    KeywordUpgrade.prototype.upgradeKeyword = function (keyword) {
        var _this = this;
        if (keyword.keywordType !== this.keywordType ||
            keyword.indexForUpgrades !== this.keywordUpgradeIndex)
            return;
        keyword.isPermanent = this.isPermanent;
        keyword.duration += this.durationChange.effectiveValue;
        this.newConditions.forEach(function (c) {
            keyword.conditions.push(c);
        });
        this.removeConditionsOfType.forEach(function (ct) {
            _this.newConditions = _this.newConditions.filter(function (c) { return c.conditionType !== ct; });
        });
        keyword.isActive = this.isActive;
    };
    KeywordUpgrade.prototype.toJSON = function () {
        return {
            keywordType: this.keywordType,
            keywordUpgradeIndex: this.keywordUpgradeIndex,
            isPermanent: this.isPermanent,
            durationChange: this.durationChange.toJSON(),
            isActive: this.isActive,
        };
    };
    KeywordUpgrade.fromJSON = function (json) {
        var keywordType = json.keywordType;
        var keywordUpgradeIndex = json.keywordUpgradeIndex;
        var isPermanent = json.isPermanent;
        var durationChange = ModifiableInt_1.default.fromJSON(json.durationChange);
        var isActive = json.isActive;
        return new KeywordUpgrade(keywordType, keywordUpgradeIndex, isPermanent, durationChange, isActive);
    };
    return KeywordUpgrade;
}());
exports.default = KeywordUpgrade;
