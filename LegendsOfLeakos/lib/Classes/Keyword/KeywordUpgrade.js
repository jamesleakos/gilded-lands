"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var KeywordValueUpgrade_1 = __importDefault(require("./KeywordValueUpgrade"));
var Condition_1 = __importDefault(require("../Condition/Condition"));
var KeywordUpgrade = /** @class */ (function () {
    function KeywordUpgrade(keywordType, keywordUpgradeIndex, isPermanent, durationChange, keywordValueUpgrades, isActive) {
        var _this = this;
        this.keywordValueUpgrades = [];
        this.newConditions = [];
        this.removeCondtionsOfType = [];
        this.keywordType = keywordType;
        this.keywordUpgradeIndex = keywordUpgradeIndex;
        this.isPermanent = isPermanent;
        this.durationChange = durationChange;
        keywordValueUpgrades.forEach(function (k) {
            _this.keywordValueUpgrades.push(new KeywordValueUpgrade_1.default(k.keywordValueType, k.valueChanges));
        });
        this.isActive = isActive;
    }
    KeywordUpgrade.prototype.upgradeKeyword = function (keyword) {
        var _this = this;
        if (keyword.keywordType !== this.keywordType ||
            keyword.indexForUpgrades !== this.keywordUpgradeIndex)
            return;
        keyword.isPermanent = this.isPermanent;
        keyword.duration += this.durationChange.effectiveValue;
        this.keywordValueUpgrades.forEach(function (kvu) {
            var kv = keyword.keywordValueList.find(function (c) { return c.keywordValueType === kvu.keywordValueType; });
            if (kv !== undefined && kv.values.length === kvu.valueChanges.length) {
                for (var i = 0; i < kv.values.length; i++) {
                    kv.values[i] += kvu.valueChanges[i].effectiveValue;
                }
            }
        });
        this.newConditions.forEach(function (c) {
            _this.newConditions.push(Condition_1.default.createCondition(c.conditionType, c.conditionValues)
                .condition);
        });
        this.removeCondtionsOfType.forEach(function (ct) {
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
            keywordValueUpgrades: this.keywordValueUpgrades.map(function (k) { return k.toJSON(); }),
            isActive: this.isActive,
        };
    };
    KeywordUpgrade.fromJSON = function (json) {
        var keywordType = json.keywordType;
        var keywordUpgradeIndex = json.keywordUpgradeIndex;
        var isPermanent = json.isPermanent;
        var durationChange = ModifiableInt_1.default.fromJSON(json.durationChange);
        var keywordValueUpgrades = json.keywordValueUpgrades.map(function (k) {
            return KeywordValueUpgrade_1.default.fromJSON(k);
        });
        var isActive = json.isActive;
        return new KeywordUpgrade(keywordType, keywordUpgradeIndex, isPermanent, durationChange, keywordValueUpgrades, isActive);
    };
    return KeywordUpgrade;
}());
exports.default = KeywordUpgrade;
