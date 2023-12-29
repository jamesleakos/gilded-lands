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
var Effect_1 = __importDefault(require("../../Effect"));
var GiveKeywordBaseEffect_1 = __importDefault(require("./GiveKeywordBaseEffect"));
var Effect_2 = require("../../../../Enums/Effect");
var EffectValue_1 = __importDefault(require("../../EffectValue"));
var TargetType_1 = __importDefault(require("../../../Target/TargetType"));
var TargetTypeInfo_1 = __importDefault(require("../../../Target/TargetTypeInfo"));
var Target_1 = require("../../../../Enums/Target");
var RuntimeKeywordValue_1 = __importDefault(require("../../../Keyword/RuntimeKeyword/RuntimeKeywordValue"));
var Keyword_1 = require("../../../../Enums/Keyword");
var EffectValueCreatorInfo_1 = __importDefault(require("../../EffectValueCreatorInfo"));
var GiveShieldedKeywordBasedOnOtherUnitsEffect = /** @class */ (function (_super) {
    __extends(GiveShieldedKeywordBasedOnOtherUnitsEffect, _super);
    function GiveShieldedKeywordBasedOnOtherUnitsEffect(setEffectValues, setTargetTypes) {
        var _this = _super.call(this) || this;
        _this.effectEnum = Effect_2.EffectType.GiveShieldedKeywordBasedOnOtherUnits;
        _this.setEffectValueList(setEffectValues);
        _this.setTargetTypeList(setTargetTypes);
        return _this;
    }
    GiveShieldedKeywordBasedOnOtherUnitsEffect.prototype.sampleEffectForCardBuilder = function () {
        var effectValues = [];
        for (var _i = 0, _a = this.myRequiredEffectValues(); _i < _a.length; _i++) {
            var info = _a[_i];
            effectValues.push(new EffectValue_1.default(info.effectValueType, 0, []));
        }
        var targetTypes = [];
        targetTypes.push(new TargetType_1.default('Targets To Be Shielded', Target_1.TargetTypeEnum.TargetCreature, 1, // minSelectionsRequired
        1, // maxSelectionsAllowed
        1, // minSelectionsThatMustRemain
        Target_1.TargetableTypeSelectionEnum.TargetableOnActivation, []));
        targetTypes.push(new TargetType_1.default('Targets To Determine Shield Amount', Target_1.TargetTypeEnum.TargetCreature, 2, // minSelectionsRequired
        2, // maxSelectionsAllowed
        2, // minSelectionsThatMustRemain
        Target_1.TargetableTypeSelectionEnum.TargetableOnActivation, [] // conditions
        ));
        targetTypes.push(new TargetType_1.default('These targets will provide the shielding', Target_1.TargetTypeEnum.TargetCreature, 1, // minSelectionsRequired
        1, // maxSelectionsAllowed
        1, // minSelectionsThatMustRemain
        Target_1.TargetableTypeSelectionEnum.TargetableOnActivation, [] // conditions
        ));
        return new GiveShieldedKeywordBasedOnOtherUnitsEffect(effectValues, targetTypes);
    };
    GiveShieldedKeywordBasedOnOtherUnitsEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [
            new EffectValueCreatorInfo_1.default(Effect_2.EffectValueType.ShieldedKeywordShieldAmount, true),
            new EffectValueCreatorInfo_1.default(Effect_2.EffectValueType.ShieldKeywordShieldingCardInstanceId, false),
        ];
        tempList.push.apply(tempList, _super.prototype.myRequiredEffectValues.call(this));
        return tempList;
    };
    GiveShieldedKeywordBasedOnOtherUnitsEffect.prototype.numberOfTargetTypes = function () {
        return 3;
    };
    GiveShieldedKeywordBasedOnOtherUnitsEffect.prototype.targetTypeInfoList = function () {
        var list = [
            new TargetTypeInfo_1.default('Targets To Be Shielded', 'These are the units that are shielded by this effect. At least one must remain in the targetableZoneEnumList as of preEffect to prevent sizzle', 'Targets must be cards', 1, null),
            new TargetTypeInfo_1.default('Targets To Determine Shield Amount', 'These two targets must remain as of preEffect(). They determine the shield amount by the difference in their attack.', 'Targets must be cards', 2, 2),
            new TargetTypeInfo_1.default('These targets will provide the shielding', 'These are the unit or units that provide the shielding. At least one must remain as of resolve();', 'Targets must be cards', 1, null),
        ];
        return list;
    };
    GiveShieldedKeywordBasedOnOtherUnitsEffect.prototype.effectToString = function () {
        var outText = 'Give shield to a unit with strength determined by the difference in attack of two other target units.';
        return outText;
    };
    GiveShieldedKeywordBasedOnOtherUnitsEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        var targetsToBeShielded = targetInfoList[0];
        var cardsDeterminingShields = targetInfoList[1];
        var shieldingCards = targetInfoList[2];
        var shieldAmountEV = this.getEffectValue(Effect_2.EffectValueType.ShieldedKeywordShieldAmount);
        var shieldingCardsEV = this.getEffectValue(Effect_2.EffectValueType.ShieldKeywordShieldingCardInstanceId);
        shieldAmountEV.fitToTargetInfo(targetsToBeShielded);
        shieldingCardsEV.fitToTargetInfo(shieldingCards);
        if (!this.isTargetInfoStillValid(sourceEntity, state, targetsToBeShielded, this.targetTypes[0])) {
            return false;
        }
        if (!this.isTargetInfoStillValid(sourceEntity, state, cardsDeterminingShields, this.targetTypes[1])) {
            return false;
        }
        if (!this.isTargetInfoStillValid(sourceEntity, state, shieldingCards, this.targetTypes[2])) {
            return false;
        }
        var card1 = state.getCardFromAnywhere(cardsDeterminingShields.cardInstanceIdList[0]);
        var card2 = state.getCardFromAnywhere(cardsDeterminingShields.cardInstanceIdList[1]);
        for (var i = 0; i < shieldAmountEV.modInts.length; i++) {
            shieldAmountEV.modInts[i].baseValue = Math.abs(card1.attack.effectiveValue - card2.attack.effectiveValue);
        }
        for (var i = 0; i < shieldingCardsEV.modInts.length; i++) {
            shieldingCardsEV.modInts[i].baseValue =
                shieldingCards.cardInstanceIdList[i];
        }
        return true;
    };
    GiveShieldedKeywordBasedOnOtherUnitsEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var targetsToBeShielded = targetInfoList[0];
        var cardsDeterminingShields = targetInfoList[1];
        var shieldingCards = targetInfoList[2];
        var targetsToBeShieldedType = this.targetTypes[0];
        var shieldAmountEV = this.getEffectValue(Effect_2.EffectValueType.ShieldedKeywordShieldAmount);
        var shieldingCardsEV = this.getEffectValue(Effect_2.EffectValueType.ShieldKeywordShieldingCardInstanceId);
        if (!this.isTargetInfoStillValid(sourceEntity, state, shieldingCards, this.targetTypes[2]))
            return;
        for (var i = 0; i < targetsToBeShielded.cardInstanceIdList.length; i++) {
            var currentTargetCard = state.getCardFromAnywhere(targetsToBeShielded.cardInstanceIdList[i]);
            if (!targetsToBeShieldedType.cardSatisfiesConditions(currentTargetCard, state))
                break;
            currentTargetCard.addKeyword(Keyword_1.KeywordType.Shielded, null, 'Add Shielded Description Somewhere, maybe here', this.getEffectValue(Effect_2.EffectValueType.KeywordIsPermanent).modInts[i]
                .effectiveValue === 1, this.getEffectValue(Effect_2.EffectValueType.KeywordDuration).modInts[i]
                .effectiveValue, [
                new RuntimeKeywordValue_1.default(Keyword_1.KeywordValueType.shieldAmount, shieldAmountEV.effectiveValues()),
                new RuntimeKeywordValue_1.default(Keyword_1.KeywordValueType.shieldingCardInstanceId, shieldingCardsEV.effectiveValues()),
            ], true, // of course it should be active
            [], // new List<Condition>()
            'Hard code in image name here');
        }
    };
    return GiveShieldedKeywordBasedOnOtherUnitsEffect;
}(GiveKeywordBaseEffect_1.default));
Effect_1.default.registerEffect(Effect_2.EffectType.GiveShieldedKeywordBasedOnOtherUnits, GiveShieldedKeywordBasedOnOtherUnitsEffect);
exports.default = GiveShieldedKeywordBasedOnOtherUnitsEffect;
