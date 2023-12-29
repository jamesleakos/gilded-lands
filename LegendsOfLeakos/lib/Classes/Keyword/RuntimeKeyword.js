"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Keyword_1 = require("../../Enums/Keyword");
var RuntimeKeywordValue_1 = __importDefault(require("./RuntimeKeywordValue"));
var Condition_1 = __importDefault(require("../Condition/Condition"));
var RuntimeKeyword = /** @class */ (function () {
    function RuntimeKeyword() {
        this.keywordValueList = [];
        // conditions for stat buffs
        this.conditions = [];
    }
    RuntimeKeyword.prototype.setBaseData = function (myEntityInstanceId, keywordType, indexForUpgrades, description, isPermanent, duration, keywordValueList, isActive, conditions, imageName) {
        this.myEntityInstanceId = myEntityInstanceId;
        this.keywordType = keywordType;
        this.indexForUpgrades = indexForUpgrades;
        this.description = description;
        this.isPermanent = isPermanent;
        this.duration = duration;
        this.isActive = isActive;
        for (var _i = 0, keywordValueList_1 = keywordValueList; _i < keywordValueList_1.length; _i++) {
            var x = keywordValueList_1[_i];
            var tempIntList = [];
            for (var _a = 0, _b = x.values; _a < _b.length; _a++) {
                var i = _b[_a];
                tempIntList.push(i);
            }
            this.keywordValueList.push(new RuntimeKeywordValue_1.default(x.keywordValueType, tempIntList));
        }
        for (var _c = 0, conditions_1 = conditions; _c < conditions_1.length; _c++) {
            var c = conditions_1[_c];
            this.conditions.push(Condition_1.default.createCondition(c.conditionType, c.conditionValues).condition);
        }
        this.imageName = imageName;
    };
    RuntimeKeyword.prototype.onEndTurn = function (gameState) {
        if (!this.isPermanent) {
            this.duration = this.duration - 1;
            if (this.duration <= 0) {
                var myEntity = gameState.getEntityFromAnywhere(this.myEntityInstanceId);
                if (!myEntity) {
                    throw new Error("Could not find entity with id ".concat(this.myEntityInstanceId));
                }
                myEntity.removeKeyword(this);
            }
        }
    };
    // This is for when we know we're just looking for one single value
    RuntimeKeyword.prototype.getKeywordValue = function (keywordValueType) {
        return this.keywordValueList.find(function (c) { return c.keywordValueType === keywordValueType; }).values[0];
    };
    // This is for when we know we're looking for a list
    RuntimeKeyword.prototype.getKeywordValues = function (keywordValueType) {
        return this.keywordValueList.find(function (c) { return c.keywordValueType === keywordValueType; }).values;
    };
    RuntimeKeyword.prototype.addStatBuff = function (stat, statCard, gameState) {
        return null;
    };
    RuntimeKeyword.prototype.preResolveEffect = function (myEnt, e, sourceEntity, gameState, targetInfoList) { };
    RuntimeKeyword.prototype.postResolveEffect = function (myEnt, e, sourceEntity, gameState, targetInfoList) { };
    RuntimeKeyword.registerKeyword = function (type, ctor) {
        this.keywordConstructors[type] = ctor;
    };
    RuntimeKeyword.createRuntimeKeyword = function (myEntityId, keywordType, indexForUpgrades, setDescription, isPermanent, setDuration, keywordValueList, isActive, conditions, imageName) {
        var ctor = this.keywordConstructors[keywordType];
        if (!ctor) {
            throw new Error("No constructor registered for keyword type ".concat(keywordType));
        }
        var outKeyword = new ctor(myEntityId, keywordType, indexForUpgrades, setDescription, isPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        return outKeyword;
    };
    RuntimeKeyword.prototype.toJSON = function () {
        return {
            myEntityInstanceId: this.myEntityInstanceId,
            keywordType: this.keywordType.toString(),
            indexForUpgrades: this.indexForUpgrades,
            description: this.description,
            isPermanent: this.isPermanent,
            duration: this.duration,
            keywordValueList: this.keywordValueList.map(function (x) { return x.toJSON(); }),
            isActive: this.isActive,
            conditions: this.conditions.map(function (x) { return x.toJSON(); }),
            imageName: this.imageName,
        };
    };
    RuntimeKeyword.fromRuntimeJSON = function (json) {
        var keyword = RuntimeKeyword.createRuntimeKeyword(json.myEntityInstanceId, Keyword_1.KeywordType[json.keywordType], json.indexForUpgrades, json.description, json.isPermanent, json.duration, json.keywordValueList.map(function (x) {
            return RuntimeKeywordValue_1.default.fromRuntimeJSON(x);
        }), json.isActive, json.conditions.map(function (x) { return Condition_1.default.fromJSON(x); }), json.imageName);
        if (!keyword) {
            throw new Error('Keyword was not created');
        }
        return keyword;
    };
    RuntimeKeyword.fromLibraryJSON = function (json, myEntity) {
        var keyword = RuntimeKeyword.createRuntimeKeyword(myEntity.instanceId, Keyword_1.KeywordType[json.keywordType], json.indexForUpgrades, json.designerDescription, json.isPermanent, json.duration, json.keywordValueList.map(function (x) {
            return RuntimeKeywordValue_1.default.fromLibraryJSON(x);
        }), json.startsActive, json.conditions.map(function (x) { return Condition_1.default.fromJSON(x); }), json.imageName);
        if (!keyword) {
            throw new Error('Keyword was not created');
        }
        return keyword;
    };
    // private static effectConstructors: {
    //   [key in EffectType]?: new (
    //     effectValueList: EffectValue[],
    //     targetTypes: TargetType[]
    //   ) => Effect;
    // } = {};
    // public static registerEffect(
    //   type: EffectType,
    //   ctor: new (
    //     effectValueList: EffectValue[],
    //     targetTypes: TargetType[]
    //   ) => Effect
    // ): void {
    //   this.effectConstructors[type] = ctor;
    // }
    // do the above but for keywords
    RuntimeKeyword.keywordConstructors = {};
    return RuntimeKeyword;
}());
exports.default = RuntimeKeyword;
// old create runtime keyword
// static createRuntimeKeyword(
//   myEntityId: number,
//   keywordType: KeywordType,
//   indexForUpgrades: number | null,
//   setDescription: string,
//   isPermanent: boolean,
//   setDuration: number,
//   keywordValueList: KeywordValue[],
//   isActive: boolean,
//   conditions: Condition[],
//   imageName: string
// ): KeywordFactoryPackage {
//   let outKeyword: RuntimeKeyword | null = null;
//   if (keywordType === KeywordType.Meek) {
//     if (setDescription === '')
//       setDescription = 'This unit does not prevent attacks into the back row';
//     outKeyword = new MeekKeyword(
//       myEntityId,
//       keywordType,
//       indexForUpgrades,
//       setDescription,
//       isPermanent,
//       setDuration,
//       keywordValueList,
//       isActive,
//       conditions,
//       imageName
//     );
//   }
//   if (keywordType === KeywordType.Impetus) {
//     if (setDescription === '')
//       setDescription = 'This unit can move and attack in the same turn';
//     outKeyword = new ImpetusKeyword(
//       myEntityId,
//       keywordType,
//       indexForUpgrades,
//       setDescription,
//       isPermanent,
//       setDuration,
//       keywordValueList,
//       isActive,
//       conditions,
//       imageName
//     );
//   }
//   if (keywordType === KeywordType.Provoke) {
//     if (setDescription === '')
//       setDescription = "I'm not sure what provoke is";
//     outKeyword = new ProvokeKeyword(
//       myEntityId,
//       keywordType,
//       indexForUpgrades,
//       setDescription,
//       isPermanent,
//       setDuration,
//       keywordValueList,
//       isActive,
//       conditions,
//       imageName
//     );
//   }
//   if (keywordType === KeywordType.Skirmisher) {
//     if (setDescription === '')
//       setDescription = 'This unit can move and attack in the same turn';
//     outKeyword = new SkirmisherKeyword(
//       myEntityId,
//       keywordType,
//       indexForUpgrades,
//       setDescription,
//       isPermanent,
//       setDuration,
//       keywordValueList,
//       isActive,
//       conditions,
//       imageName
//     );
//   }
//   if (keywordType === KeywordType.DivineShield) {
//     if (setDescription === '')
//       setDescription = 'When this unit takes damage, prevent it.';
//     outKeyword = new DivineShieldKeyword(
//       myEntityId,
//       keywordType,
//       indexForUpgrades,
//       setDescription,
//       isPermanent,
//       setDuration,
//       keywordValueList,
//       isActive,
//       conditions,
//       imageName
//     );
//   }
//   if (keywordType === KeywordType.Shielded) {
//     if (setDescription === '')
//       setDescription = 'Reduce damage that this unit takes by some amount';
//     outKeyword = new ShieldedKeyword(
//       myEntityId,
//       keywordType,
//       indexForUpgrades,
//       setDescription,
//       isPermanent,
//       setDuration,
//       keywordValueList,
//       isActive,
//       conditions,
//       imageName
//     );
//   }
//   if (keywordType === KeywordType.Overkill) {
//     if (setDescription === '')
//       setDescription =
//         "Damage in excess of blocker's health carries on to the next blocker or blocked unit";
//     outKeyword = new OverkillKeyword(
//       myEntityId,
//       keywordType,
//       indexForUpgrades,
//       setDescription,
//       isPermanent,
//       setDuration,
//       keywordValueList,
//       isActive,
//       conditions,
//       imageName
//     );
//   }
//   if (keywordType === KeywordType.Warleader) {
//     if (setDescription === '')
//       setDescription =
//         'This keyword buffs conditional card stats some set scalar amount';
//     outKeyword = new WarleaderKeyword(
//       myEntityId,
//       keywordType,
//       indexForUpgrades,
//       setDescription,
//       isPermanent,
//       setDuration,
//       keywordValueList,
//       isActive,
//       conditions,
//       imageName
//     );
//   }
//   // here we check for possible errors and possible bad passes of effectValueList and TargetTypes
//   let success = true;
//   let message = 'Keyword created successfully';
//   if (outKeyword === null) {
//     success = false;
//     message = 'Keyword was not created. Check if KeywordType was correct';
//   }
//   return {
//     keyword: outKeyword,
//     wasSuccessful: success,
//     message: message,
//   };
// }
