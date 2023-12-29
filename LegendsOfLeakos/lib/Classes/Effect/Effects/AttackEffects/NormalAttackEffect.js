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
var AttackBaseEffect_1 = __importDefault(require("./AttackBaseEffect"));
var Effect_1 = require("../../../../Enums/Effect");
var EffectValue_1 = __importDefault(require("../../EffectValue"));
var TargetInfo_1 = __importDefault(require("../../../Target/TargetInfo"));
var TargetTypeInfo_1 = __importDefault(require("../../../Target/TargetTypeInfo"));
var RuntimeCard_1 = __importDefault(require("../../../Card/RuntimeCard"));
var Zone_1 = require("../../../../Enums/Zone");
var Effect_2 = __importDefault(require("../../Effect"));
var Effect_3 = require("../../../../Enums/Effect");
var NormalAttackEffect = /** @class */ (function (_super) {
    __extends(NormalAttackEffect, _super);
    function NormalAttackEffect(setEffectValues, setTargetTypes) {
        var _this = _super.call(this) || this;
        _this.effectTypeEnum = Effect_1.EffectType.NormalAttack;
        _this.setEffectValueList(setEffectValues);
        _this.setTargetTypeList(setTargetTypes);
        _this.checkConstructorIntegrity();
        return _this;
    }
    // #region Effect Execution
    NormalAttackEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        if (!(sourceEntity instanceof RuntimeCard_1.default))
            throw new Error('Why is non card entity attacking?');
        var sourceCard = sourceEntity;
        // Rerouting Blocked Attacks
        var attackedCard = this.getAttackedCard(state, targetInfoList);
        var actualBlockingCards = [];
        var assignedBlockingCards = [];
        var attackedCardZone = state.getZoneByInstanceId(attackedCard.residingZoneInstanceId);
        var damageToAttackedCardEV = this.getEffectValue(Effect_3.EffectValueType.DamageToAttackedCard);
        var damageToAttackingCardEV = this.getEffectValue(Effect_3.EffectValueType.DamageToAttackingCard);
        var attackedCardDamagePreventedEV = this.getEffectValue(Effect_3.EffectValueType.AttackedCardDamagePrevented);
        var attackingCardDamagePreventedEV = this.getEffectValue(Effect_3.EffectValueType.AttackingCardDamagePrevented);
        damageToAttackedCardEV.setValue = sourceCard.attack.effectiveValue;
        damageToAttackingCardEV.setValue = attackedCard.attack.effectiveValue;
        var targetToBeAttacked = targetInfoList[0];
        damageToAttackedCardEV.fitToTargetInfo(targetToBeAttacked);
        attackedCardDamagePreventedEV.fitToTargetInfo(targetToBeAttacked);
        var attacker = new TargetInfo_1.default([sourceCard.instanceId], [], false, false, false);
        damageToAttackingCardEV.fitToTargetInfo(attacker);
        attackingCardDamagePreventedEV.fitToTargetInfo(attacker);
        if (!(this.isCardStillInPlay(attackedCard, state) &&
            this.isCardStillInPlay(sourceCard, state)))
            return false;
        return true;
    };
    NormalAttackEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        console.log('NormalAttackEffect.resolve()');
        if (!(sourceEntity instanceof RuntimeCard_1.default)) {
            console.log('sourceEntity is not a RuntimeCard');
            throw new Error('Why is non card entity attacking?');
        }
        var sourceCard = sourceEntity;
        var attackedCard = this.getAttackedCard(state, targetInfoList);
        var damageToAttackedCard = this.getEffectValue(Effect_3.EffectValueType.DamageToAttackedCard).modInts[0].effectiveValue;
        var damageToAttackingCard = this.getEffectValue(Effect_3.EffectValueType.DamageToAttackingCard).modInts[0].effectiveValue;
        // if it's not in the battleboard, then don't let it happen
        var attackingCardZone = state.getZoneByInstanceId(sourceCard.residingZoneInstanceId);
        if (attackingCardZone.zoneEnum !== Zone_1.ZoneEnum.BattleBoard) {
            throw new Error('Attacking card is not in the battleboard');
        }
        if (!(this.isCardStillInPlay(attackedCard, state) &&
            this.isCardStillInPlay(sourceCard, state))) {
            console.log('one of the cards is no longer in play');
            return;
        }
        console.log('both cards are still in play');
        if (this.getEffectValue(Effect_3.EffectValueType.AttackedCardDamagePrevented).effectiveValues()[0] === 0) {
            attackedCard.health.baseValue -= damageToAttackedCard;
        }
        if (this.getEffectValue(Effect_3.EffectValueType.AttackingCardDamagePrevented).effectiveValues()[0] === 0) {
            console.log('attacking card damage prevented is 0');
            sourceCard.health.baseValue -= damageToAttackingCard;
        }
        var sourceCardZone = state.getZoneByInstanceId(sourceCard.residingZoneInstanceId);
        console.log('source card location: ' + Zone_1.ZoneEnum[sourceCardZone.zoneEnum]);
    };
    NormalAttackEffect.prototype.getAttackedCard = function (state, targetInfoList) {
        return state.getCardFromAnywhere(targetInfoList[0].cardInstanceIdList[0]);
    };
    NormalAttackEffect.prototype.applyShieldToAttackedCard = function (shieldAmount) {
        console.log('Here we need to add a modifier to the DamageToAttackedCardEffectValue');
    };
    NormalAttackEffect.prototype.hitDivineShield = function () {
        console.log('Here we need to implement this');
    };
    // #endregion
    // #region Builder and Utils
    NormalAttackEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [];
        for (var _i = 0, _a = _super.prototype.myRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    NormalAttackEffect.prototype.numberOfTargetTypes = function () {
        return 1;
    };
    NormalAttackEffect.prototype.targetTypeInfoList = function () {
        var list = [];
        list.push(new TargetTypeInfo_1.default('Target to be attacked', // name
        'Targets to be attacked.', // description
        'Targets must be cards', 1, // minMinSelectionsRequired
        1 // maxMaxSelectionsRequired
        ));
        return list;
    };
    NormalAttackEffect.prototype.effectToString = function () {
        var outText = "Unit attacks another unit. They both take damage equal to the other's attack.";
        return outText;
    };
    // #endregion
    // #region Static Creator Functions
    NormalAttackEffect.createFightEffect = function () {
        var targetTypes = [];
        var effectValues = [];
        effectValues.push(new EffectValue_1.default(Effect_3.EffectValueType.DamageToAttackedCard, 0, []));
        effectValues.push(new EffectValue_1.default(Effect_3.EffectValueType.DamageToAttackingCard, 0, []));
        effectValues.push(new EffectValue_1.default(Effect_3.EffectValueType.AttackedCardDamagePrevented, 0, []));
        effectValues.push(new EffectValue_1.default(Effect_3.EffectValueType.AttackingCardDamagePrevented, 0, []));
        var effect = Effect_2.default.createEffect(Effect_1.EffectType.NormalAttack, effectValues, targetTypes);
        return effect;
    };
    NormalAttackEffect.createFightTargetInfoList = function (attackedCardInstanceId) {
        var targetInfoList = [];
        var targetInfo = new TargetInfo_1.default([attackedCardInstanceId], [], false, false, false);
        targetInfoList.push(targetInfo);
        return targetInfoList;
    };
    return NormalAttackEffect;
}(AttackBaseEffect_1.default));
Effect_2.default.registerEffect(Effect_1.EffectType.NormalAttack, NormalAttackEffect);
exports.default = NormalAttackEffect;
