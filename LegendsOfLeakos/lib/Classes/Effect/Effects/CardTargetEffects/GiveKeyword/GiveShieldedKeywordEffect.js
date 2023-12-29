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
var RuntimeEffect_1 = __importDefault(require("../../../RuntimeEffect"));
var GiveKeywordBaseEffect_1 = __importDefault(require("./GiveKeywordBaseEffect"));
var EffectValue_1 = __importDefault(require("../../../EffectValue"));
var TargetCriteria_1 = __importDefault(require("../../../../Target/TargetCriteria"));
var Effect_1 = require("../../../../../Enums/Effect");
var TargetTypeInfo_1 = __importDefault(require("../../../../Target/TargetTypeInfo"));
var Keyword_1 = require("../../../../../Enums/Keyword");
var RuntimeKeywordValue_1 = __importDefault(require("../../../../Keyword/RuntimeKeyword/RuntimeKeywordValue"));
var EffectValueCreatorInfo_1 = __importDefault(require("../../../EffectValueCreatorInfo"));
var Target_1 = require("../../../../../Enums/Target");
var GiveShieldedKeywordEffect = /** @class */ (function (_super) {
    __extends(GiveShieldedKeywordEffect, _super);
    function GiveShieldedKeywordEffect(effectValues, setTargetTypes) {
        var _this = _super.call(this) || this;
        _this.effectType = Effect_1.EffectType.GiveShieldedKeyword;
        _this.effectValues = effectValues;
        _this.targetCriterias = setTargetTypes;
        _this.checkConstructorIntegrity();
        return _this;
    }
    // #region Effect Execution
    GiveShieldedKeywordEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        var targetsToBeShielded = targetInfoList[0];
        var shieldAmountEV = this.getEffectValue(Effect_1.EffectValueType.ShieldedKeywordShieldAmount);
        var shieldingCardsEV = this.getEffectValue(Effect_1.EffectValueType.ShieldKeywordShieldingCardInstanceId);
        shieldAmountEV.fitToTargetInfo(targetsToBeShielded);
        shieldingCardsEV.fitToTargetInfo(targetsToBeShielded);
        if (!this.isTargetInfoValid(sourceEntity, state, targetsToBeShielded, this.targetCriterias[0]))
            return false;
        for (var i = 0; i < shieldAmountEV.modInts.length; i++) {
            shieldAmountEV.modInts[i].baseValue = shieldAmountEV.setValue;
            shieldingCardsEV.modInts[i].baseValue = sourceEntity.instanceId;
        }
        return true;
    };
    GiveShieldedKeywordEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var cardsToGiveKeyword = targetInfoList[0];
        var cardsToGiveKeywordTargetType = this.targetCriterias[0];
        if (!this.isTargetInfoValid(sourceEntity, state, cardsToGiveKeyword, this.targetCriterias[0]))
            return;
        var shieldAmountEV = this.getEffectValue(Effect_1.EffectValueType.ShieldedKeywordShieldAmount);
        var shieldingCardsEV = this.getEffectValue(Effect_1.EffectValueType.ShieldKeywordShieldingCardInstanceId);
        for (var i = 0; i < cardsToGiveKeyword.targetEntityInstanceIds.length; i++) {
            var currentTargetCard = state.getCardFromAnywhere(cardsToGiveKeyword.targetEntityInstanceIds[i]);
            if (!cardsToGiveKeywordTargetType.entitySatisfiesConditions(currentTargetCard.instanceId, sourceEntity.instanceId, state))
                break;
            currentTargetCard.addKeyword(Keyword_1.KeywordType.Shielded, null, 'Add Shielded Description Somewhere, maybe here', this.getEffectValue(Effect_1.EffectValueType.KeywordIsPermanent).modInts[i]
                .effectiveValue === 1, this.getEffectValue(Effect_1.EffectValueType.KeywordDuration).modInts[i]
                .effectiveValue, [
                new RuntimeKeywordValue_1.default(Keyword_1.KeywordValueType.shieldAmount, shieldAmountEV.effectiveValues()),
                new RuntimeKeywordValue_1.default(Keyword_1.KeywordValueType.shieldingCardInstanceId, shieldingCardsEV.effectiveValues()),
            ], true, // of course it should be active
            [], // new list of Condition
            'Hard code in image name here');
        }
    };
    // #endregion
    // #region Builders and Utils
    GiveShieldedKeywordEffect.sampleEffectForCardBuilder = function () {
        var effectValues = [];
        effectValues.push(new EffectValue_1.default(Effect_1.EffectValueType.ShieldedKeywordShieldAmount, 1, []));
        effectValues.push(new EffectValue_1.default(Effect_1.EffectValueType.ShieldKeywordShieldingCardInstanceId, 0, []));
        effectValues.push(new EffectValue_1.default(Effect_1.EffectValueType.KeywordIsPermanent, 0, []));
        effectValues.push(new EffectValue_1.default(Effect_1.EffectValueType.KeywordDuration, 0, []));
        var targetCriterias = [];
        targetCriterias.push(new TargetCriteria_1.default('Targets To Be Shielded', Target_1.TargetTypeEnum.TargetCreature, 1, // minSelectionsRequired
        1, // maxSelectionsAllowed
        1, // minSelectionsThatMustRemain
        Target_1.TargetableTypeSelectionEnum.TargetableOnActivation, []));
        return new GiveShieldedKeywordEffect(effectValues, targetCriterias);
    };
    GiveShieldedKeywordEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [
            new EffectValueCreatorInfo_1.default(Effect_1.EffectValueType.ShieldedKeywordShieldAmount, true),
            new EffectValueCreatorInfo_1.default(Effect_1.EffectValueType.ShieldKeywordShieldingCardInstanceId, false),
        ];
        for (var _i = 0, _a = _super.prototype.myRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    GiveShieldedKeywordEffect.prototype.numberOfTargetTypes = function () {
        return 1;
    };
    GiveShieldedKeywordEffect.prototype.targetTypeInfoList = function () {
        var list = [];
        list.push(new TargetTypeInfo_1.default('Targets To Be Shielded', // name
        'These are the units that are shielded by this effect. At least one must remain in the targetableZoneEnumList as of PreEffect to prevent sizzle', // description
        'Targets must be cards', 1, // minMinSelectionsRequired
        null // maxMaxSelectionsRequired
        ));
        return list;
    };
    GiveShieldedKeywordEffect.prototype.effectToString = function () {
        var outText = 'Give shield strength ' +
            this.getEffectValue(Effect_1.EffectValueType.ShieldedKeywordShieldAmount)
                .setValue +
            ' to a target. It will last as long as this unit.';
        return outText;
    };
    return GiveShieldedKeywordEffect;
}(GiveKeywordBaseEffect_1.default));
RuntimeEffect_1.default.registerEffect(Effect_1.EffectType.GiveShieldedKeyword, GiveShieldedKeywordEffect);
exports.default = GiveShieldedKeywordEffect;
