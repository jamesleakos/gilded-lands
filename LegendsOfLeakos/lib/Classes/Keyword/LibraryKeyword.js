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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Keyword_1 = require("../../Enums/Keyword");
var LibraryKeywordValueInfo_1 = __importDefault(require("./LibraryKeywordValueInfo"));
var RuntimeCondition_1 = __importDefault(require("../Condition/RuntimeCondition"));
var LibraryKeywordValue_1 = __importDefault(require("./LibraryKeywordValue"));
var LibraryKeyword = /** @class */ (function () {
    function LibraryKeyword(keywordType, indexForUpgrades, designerDescription, isPermanent, duration, startsActive, keywordValueList, conditions, imageName) {
        this.keywordValueList = [];
        // conditions are for like - which cards will this buff, etc. I think it's largely for stat buffs
        this.conditions = [];
        this.keywordType = keywordType;
        this.indexForUpgrades = indexForUpgrades;
        this.designerDescription = designerDescription;
        this.isPermanent = isPermanent;
        this.duration = duration;
        this.startsActive = startsActive;
        this.imageName = imageName;
        for (var _i = 0, keywordValueList_1 = keywordValueList; _i < keywordValueList_1.length; _i++) {
            var x = keywordValueList_1[_i];
            this.keywordValueList.push(new LibraryKeywordValue_1.default(x.keywordValueType, __spreadArray([], x.values, true), x.setByDesigner));
        }
        for (var _a = 0, conditions_1 = conditions; _a < conditions_1.length; _a++) {
            var c = conditions_1[_a];
            this.conditions.push(RuntimeCondition_1.default.createCondition(c.conditionType, c.conditionValues));
        }
    }
    // #region Builder Helpers
    LibraryKeyword.canBeAssignedToCardByCreator = function (keywordType) {
        switch (keywordType) {
            case Keyword_1.KeywordType.DivineShield:
                return true;
            case Keyword_1.KeywordType.Impetus:
                return true;
            case Keyword_1.KeywordType.Skirmisher:
                return true;
            case Keyword_1.KeywordType.Provoke:
                return true;
            case Keyword_1.KeywordType.Meek:
                return true;
            case Keyword_1.KeywordType.Shielded:
                return false;
            case Keyword_1.KeywordType.Warleader:
                return true;
            case Keyword_1.KeywordType.DamageModification:
                return true;
            default:
                throw new Error('That keyword is not in the list');
        }
    };
    LibraryKeyword.typesOfKeywordsThatCanBeAssignedToCardByCreator = function () {
        return [
            Keyword_1.KeywordType.DivineShield,
            Keyword_1.KeywordType.Impetus,
            Keyword_1.KeywordType.Skirmisher,
            Keyword_1.KeywordType.Provoke,
            Keyword_1.KeywordType.Meek,
            Keyword_1.KeywordType.Warleader,
            Keyword_1.KeywordType.DamageModification,
        ];
    };
    LibraryKeyword.libraryKeywordValueInfoForType = function (keywordType) {
        switch (keywordType) {
            case Keyword_1.KeywordType.DivineShield:
                var uses = new LibraryKeywordValueInfo_1.default(Keyword_1.KeywordValueType.uses, 1, true);
                return [uses];
            case Keyword_1.KeywordType.Shielded:
                var shieldAmount = new LibraryKeywordValueInfo_1.default(Keyword_1.KeywordValueType.shieldAmount, 1, false);
                var shieldingCardInstanceId = new LibraryKeywordValueInfo_1.default(Keyword_1.KeywordValueType.shieldingCardInstanceId, 1, false);
                return [shieldAmount, shieldingCardInstanceId];
            case Keyword_1.KeywordType.Warleader:
                var statCardBuffAttack = new LibraryKeywordValueInfo_1.default(Keyword_1.KeywordValueType.statCardBuffAttack, 1, true);
                var statCardBuffHealth = new LibraryKeywordValueInfo_1.default(Keyword_1.KeywordValueType.statCardBuffHealth, 1, true);
                return [statCardBuffAttack, statCardBuffHealth];
            case Keyword_1.KeywordType.Impetus:
            case Keyword_1.KeywordType.Skirmisher:
            case Keyword_1.KeywordType.Provoke:
            case Keyword_1.KeywordType.Meek:
                return [];
            case Keyword_1.KeywordType.DamageModification:
                var shieldAttackAmount = new LibraryKeywordValueInfo_1.default(Keyword_1.KeywordValueType.modifyAttackAmount, 1, true);
                var shieldMagicAmount = new LibraryKeywordValueInfo_1.default(Keyword_1.KeywordValueType.modifyAbilityDamageAmount, 1, true);
                return [shieldAttackAmount, shieldMagicAmount];
            default:
                throw new Error('That keyword is not in the list');
        }
    };
    // required keyword values are in the runtime, so they can be accessed by class more easily
    // #endregion
    // #region JSON
    LibraryKeyword.prototype.toJSON = function () {
        return {
            keywordType: Keyword_1.KeywordType[this.keywordType],
            indexForUpgrades: this.indexForUpgrades,
            designerDescription: this.designerDescription,
            isPermanent: this.isPermanent,
            duration: this.duration,
            startsActive: this.startsActive,
            conditions: this.conditions.map(function (c) {
                return c.toJSON();
            }),
            keywordValueList: this.keywordValueList.map(function (c) {
                return c.toJSON();
            }),
            imageName: this.imageName,
        };
    };
    LibraryKeyword.fromJSON = function (json) {
        var keywordType = Keyword_1.KeywordType[json.keywordType];
        var indexForUpgrades = json.indexForUpgrades;
        var designerDescription = json.designerDescription;
        var isPermanent = json.isPermanent;
        var duration = json.duration;
        var startsActive = json.startsActive;
        var conditions = json.conditions.map(function (c) {
            return RuntimeCondition_1.default.fromJSON(c);
        });
        var keywordValueList = json.keywordValueList.map(function (c) {
            return LibraryKeywordValue_1.default.fromLibraryJSON(c);
        });
        var imageName = json.imageName;
        return new LibraryKeyword(keywordType, indexForUpgrades, designerDescription, isPermanent, duration, startsActive, keywordValueList, conditions, imageName);
    };
    LibraryKeyword.isJSONValid = function (json) {
        if (typeof json.keywordType !== 'string' ||
            !Object.values(Keyword_1.KeywordType).includes(json.keywordType)) {
            console.log('Invalid JSON: keywordType is not a valid KeywordType:');
            console.log('type of keywordType:', typeof json.keywordType);
            console.log('Object.values(KeywordType):', Object.values(Keyword_1.KeywordType));
            console.log('json.keywordType:', json.keywordType);
            return false;
        }
        if (typeof json.indexForUpgrades !== 'number') {
            console.log('Invalid JSON: indexForUpgrades is not a number', json);
            return false;
        }
        if (typeof json.designerDescription !== 'string') {
            console.log('Invalid JSON: designerDescription is not a string', json);
            return false;
        }
        if (typeof json.isPermanent !== 'boolean') {
            console.log('Invalid JSON: isPermanent is not a boolean', json);
            return false;
        }
        if (typeof json.duration !== 'number') {
            console.log('Invalid JSON: duration is not a number', json);
            return false;
        }
        if (typeof json.startsActive !== 'boolean') {
            console.log('Invalid JSON: startsActive is not a boolean', json);
            return false;
        }
        if (!Array.isArray(json.conditions) ||
            !json.conditions.every(RuntimeCondition_1.default.isJSONValid)) {
            console.log('Invalid JSON: conditions is not a valid array of Condition', json);
            return false;
        }
        if (typeof json.imageName !== 'string') {
            console.log('Invalid JSON: imageName is not a string', json);
            return false;
        }
        return true;
    };
    return LibraryKeyword;
}());
exports.default = LibraryKeyword;
