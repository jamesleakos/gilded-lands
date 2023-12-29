"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RuntimeKeyword_1 = __importDefault(require("../RuntimeKeyword"));
var StatBuff_1 = __importDefault(require("../../../Stat/StatBuff"));
var Keyword_1 = require("../../../../Enums/Keyword");
var RuntimeCondition_1 = __importDefault(require("../../../Condition/RuntimeCondition"));
var ModifiableInt_1 = __importDefault(require("../../../ModifableInt/ModifiableInt"));
var WarleaderKeyword = /** @class */ (function (_super) {
    __extends(WarleaderKeyword, _super);
    function WarleaderKeyword(myEntityInstanceId, indexForUpgrades, setDescription, setIsPermanent, setDuration, isActive, conditions, imageName, buffAttackStatAmount, buffHealthStatAmount) {
        var _this = _super.call(this) || this;
        _this.myEntityInstanceId = myEntityInstanceId;
        _this.keywordType = Keyword_1.KeywordType.Warleader;
        _this.indexForUpgrades = indexForUpgrades;
        _this.description = setDescription;
        _this.isPermanent = setIsPermanent;
        _this.duration = setDuration;
        _this.isActive = isActive;
        _this.imageName = imageName;
        _this.conditions = conditions;
        _this.buffAttackStatAmount = buffAttackStatAmount;
        _this.buffHealthStatAmount = buffHealthStatAmount;
        return _this;
    }
    WarleaderKeyword.prototype.addStatBuff = function (stat, statCard, gameState) {
        var myEntity = gameState.getEntityFromAnywhere(this.myEntityInstanceId);
        if (!myEntity) {
            throw new Error('myEntity is null');
        }
        for (var _i = 0, _a = this.conditions; _i < _a.length; _i++) {
            var condition = _a[_i];
            if (!condition.isTrue(statCard.instanceId, this.myEntityInstanceId, gameState))
                return null;
        }
        switch (stat.name) {
            case 'Attack':
                return new StatBuff_1.default(this.buffAttackStatAmount.effectiveValue, myEntity.name +
                    ' is granting ' +
                    this.buffAttackStatAmount.effectiveValue +
                    ' attack.');
            case 'Life':
                return new StatBuff_1.default(this.buffHealthStatAmount.effectiveValue, myEntity.name +
                    ' is granting ' +
                    this.buffHealthStatAmount.effectiveValue +
                    ' health.');
            default:
                return null;
        }
        // shouldn't need this because of the switch but oh well
        return null;
    };
    // #region JSON
    WarleaderKeyword.prototype.toJSON = function () {
        return {
            keywordType: Keyword_1.KeywordType[this.keywordType],
            myEntityInstanceId: this.myEntityInstanceId,
            indexForUpgrades: this.indexForUpgrades,
            description: this.description,
            isPermanent: this.isPermanent,
            duration: this.duration,
            isActive: this.isActive,
            imageName: this.imageName,
            conditions: this.conditions.map(function (c) { return c.toJSON(); }),
            buffAttackStatAmount: this.buffAttackStatAmount,
            buffHealthStatAmount: this.buffHealthStatAmount,
        };
    };
    WarleaderKeyword.prototype.clone = function () {
        return new WarleaderKeyword(this.myEntityInstanceId, this.indexForUpgrades, this.description, this.isPermanent, this.duration, this.isActive, this.conditions.map(function (c) { return c.clone(); }), this.imageName, this.buffAttackStatAmount.clone(), this.buffHealthStatAmount.clone());
    };
    WarleaderKeyword.fromRuntimeJSON = function (json) {
        return new WarleaderKeyword(json.myEntityInstanceId, json.indexForUpgrades, json.description, json.isPermanent, json.duration, json.isActive, json.conditions.map(function (c) { return RuntimeCondition_1.default.fromRuntimeJSON(c); }), json.imageName, ModifiableInt_1.default.fromJSON(json.buffAttackStatAmount), ModifiableInt_1.default.fromJSON(json.buffHealthStatAmount));
    };
    WarleaderKeyword.fromLibraryJSON = function (myEntityInstanceId, json) {
        return new WarleaderKeyword(myEntityInstanceId, json.indexForUpgrades, json.description, json.isPermanent, json.duration, json.isActive, json.conditions.map(function (c) { return RuntimeCondition_1.default.fromLibraryJSON(c); }), json.imageName, new ModifiableInt_1.default(json.data.buffAttackStatAmount.value, []), new ModifiableInt_1.default(json.data.buffHealthStatAmount.value, []));
    };
    WarleaderKeyword.isLibraryJSONValid = function (json) {
        if (json.keywordType &&
            Object.values(Keyword_1.KeywordType)
                .filter(function (value) { return typeof value === 'string'; })
                .includes(json.keywordType) &&
            json.indexForUpgrades &&
            typeof json.indexForUpgrades === 'number' &&
            json.description &&
            typeof json.description === 'string' &&
            json.isPermanent &&
            typeof json.isPermanent === 'boolean' &&
            json.duration &&
            typeof json.duration === 'number' &&
            json.isActive &&
            typeof json.isActive === 'boolean' &&
            json.imageName &&
            typeof json.imageName === 'string' &&
            json.conditions &&
            Array.isArray(json.conditions) &&
            json.conditions.every(function (c) {
                return RuntimeCondition_1.default.isLibraryJSONValid(c);
            }) &&
            json.data &&
            json.data.buffAttackStatAmount &&
            typeof json.data.buffAttackStatAmount.value === 'number' &&
            json.data.buffHealthStatAmount &&
            typeof json.data.buffHealthStatAmount.value === 'number') {
            return true;
        }
        return false;
    };
    WarleaderKeyword.createSampleLibraryJSON = function () {
        return {
            keywordType: Keyword_1.KeywordType[Keyword_1.KeywordType.Warleader],
            indexForUpgrades: 0,
            description: 'New Description',
            isPermanent: true,
            duration: 0,
            isActive: true,
            imageName: '',
            conditions: [],
            data: {
                buffAttackStatAmount: {
                    type: 'Number',
                    value: 1,
                },
                buffHealthStatAmount: {
                    type: 'Number',
                    value: 1,
                },
            },
        };
    };
    return WarleaderKeyword;
}(RuntimeKeyword_1.default));
RuntimeKeyword_1.default.registerFromLibraryJSON(Keyword_1.KeywordType.Warleader, WarleaderKeyword.fromLibraryJSON);
RuntimeKeyword_1.default.registerFromRuntimeJSON(Keyword_1.KeywordType.Warleader, WarleaderKeyword.fromRuntimeJSON);
RuntimeKeyword_1.default.registerIsLibraryJSONValid(Keyword_1.KeywordType.Warleader, WarleaderKeyword.isLibraryJSONValid);
RuntimeKeyword_1.default.registerSampleLibraryJSON(Keyword_1.KeywordType.Warleader, WarleaderKeyword.createSampleLibraryJSON);
exports.default = WarleaderKeyword;
