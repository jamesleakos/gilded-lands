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
var EntityEffect_1 = __importDefault(require("../../EntityEffect"));
var Effect_1 = require("../../../../Enums/Effect");
var TargetInfo_1 = __importDefault(require("../../../Target/TargetInfo"));
var Zone_1 = require("../../../../Enums/Zone");
var ModifiableInt_1 = __importDefault(require("../../../ModifableInt/ModifiableInt"));
var AttackEffect = /** @class */ (function (_super) {
    __extends(AttackEffect, _super);
    function AttackEffect() {
        var _this = _super.call(this) || this;
        // this is all purely to trigger preEffects on other entities - it does NOT effect eventual damage
        _this.blockInfo = [];
        _this.effectType = Effect_1.EffectType.NormalAttack;
        return _this;
    }
    // target criteria
    AttackEffect.prototype.targetCriteriaList = function () {
        return [];
    };
    // #region Effect Execution
    // NOTE: this is all purely to trigger preEffects on other entities
    // it does NOT effect eventual damage
    AttackEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        // check for attacked and attacking
        var attackedCard = state.getCardFromAnywhere(targetInfoList[0].targetEntityInstanceIds[0]);
        if (!attackedCard)
            return false;
        var attackedCardZone = state.getZoneByInstanceId(attackedCard.residingZoneInstanceId);
        if (!Zone_1.ZoneEnumMethods.isBoard(attackedCardZone.zoneEnum))
            return false;
        var attackingCard = sourceEntity;
        if (!attackingCard)
            throw new Error('Why is non card entity attacking?');
        var attackingCardZone = state.getZoneByInstanceId(attackingCard.residingZoneInstanceId);
        if (!Zone_1.ZoneEnumMethods.isBoard(attackingCardZone.zoneEnum))
            return false;
        // done checks
        var releventBlocks = state.blocks.filter(function (block) { return block.blockedCardInstanceId === attackedCard.instanceId; });
        // sort blocks by block order (ascending)
        releventBlocks.sort(function (a, b) { return a.blockOrder - b.blockOrder; });
        var blockingCards = releventBlocks.map(function (block) {
            return state.getCardFromAnywhere(block.blockingCardInstanceId);
        });
        var totalDamageFromAttackingCard = attackingCard.attack.effectiveValue;
        for (var i = 0; i < blockingCards.length; i++) {
            var blockingCard = blockingCards[i];
            var blockingCardZone = state.getZoneByInstanceId(blockingCard.residingZoneInstanceId);
            var damageToBlockingCard = Math.min(totalDamageFromAttackingCard, blockingCard.health.effectiveValue);
            var damangeToAttackingCard = blockingCard.attack.effectiveValue;
            if (blockingCardZone.zoneEnum !== Zone_1.ZoneEnum.FrontBoard) {
                damageToBlockingCard = 0;
                damangeToAttackingCard = 0;
            }
            totalDamageFromAttackingCard -= damageToBlockingCard;
            var newBlockInfo = {
                blockingCardInstanceId: blockingCard.instanceId,
                damageToBlockingCard: new ModifiableInt_1.default(damageToBlockingCard, []),
                damageToAttackingCard: new ModifiableInt_1.default(totalDamageFromAttackingCard, []),
                damageToBlockingCardPrevented: false,
                damageToAttackingCardPrevented: false,
            };
            this.blockInfo.push(newBlockInfo);
        }
        this.damageToAttackedCard = new ModifiableInt_1.default(Math.min(totalDamageFromAttackingCard, attackedCard.health.effectiveValue), []);
        this.damageToAttackedCardPrevented = false;
        this.damageToAttackingCard = new ModifiableInt_1.default(attackedCard.attack.effectiveValue, []);
        this.damageToAttackingCardPrevented = false;
        return true;
    };
    // NOTE: resolve is NOT effected by the block list ModifiableInts
    // Those were to trigger preEffects on other entities - dealing damage, boosting health, etc.
    AttackEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        // check for attacked and attacking
        var attackedCard = state.getCardFromAnywhere(targetInfoList[0].targetEntityInstanceIds[0]);
        if (!attackedCard)
            return false;
        var attackedCardZone = state.getZoneByInstanceId(attackedCard.residingZoneInstanceId);
        if (!Zone_1.ZoneEnumMethods.isBoard(attackedCardZone.zoneEnum))
            return false;
        var attackingCard = sourceEntity;
        if (!attackingCard)
            throw new Error('Why is non card entity attacking?');
        var attackingCardZone = state.getZoneByInstanceId(attackingCard.residingZoneInstanceId);
        if (!Zone_1.ZoneEnumMethods.isBoard(attackingCardZone.zoneEnum))
            return false;
        // done checks
        var remainingDamageToAttackedCard = attackingCard.attack.effectiveValue;
        // apply damage to blocking cards
        for (var _i = 0, _a = this.blockInfo; _i < _a.length; _i++) {
            var block = _a[_i];
            var blockingCard = state.getCardFromAnywhere(block.blockingCardInstanceId);
            if (!blockingCard)
                continue;
            var blockingCardZone = state.getZoneByInstanceId(blockingCard.residingZoneInstanceId);
            if (!Zone_1.ZoneEnumMethods.isBoard(blockingCardZone.zoneEnum))
                continue;
            var damageToBlockingCard = Math.min(remainingDamageToAttackedCard, blockingCard.health.effectiveValue);
            remainingDamageToAttackedCard -= damageToBlockingCard;
            if (!block.damageToBlockingCardPrevented) {
                blockingCard.health.baseValue -= damageToBlockingCard;
            }
            if (!block.damageToAttackingCardPrevented) {
                attackingCard.health.baseValue -= blockingCard.attack.effectiveValue;
            }
            // if this is here: to incentivize attacking, damage stops once the attacker runs out of attack
            // if (remainingDamageToAttackedCard <= 0) return;
        }
        // if this is here: if someone commits a bunch of blockers to one card, they should be rewarded
        // against any attacks on that card
        if (remainingDamageToAttackedCard <= 0)
            return;
        // apply damage to attacked card
        if (!this.damageToAttackedCardPrevented) {
            attackedCard.health.baseValue -= remainingDamageToAttackedCard;
        }
        if (!this.damageToAttackingCardPrevented) {
            attackingCard.health.baseValue -=
                this.damageToAttackingCard.effectiveValue;
        }
    };
    AttackEffect.prototype.applyShieldToAttackedCard = function (shieldAmount) {
        console.log('Here we need to add a modifier to the DamageToAttackedCardEffectValue');
    };
    AttackEffect.prototype.hitDivineShield = function () {
        console.log('Here we need to implement this');
    };
    // #endregion
    // #region Builder and Utils
    AttackEffect.prototype.effectToString = function () {
        var outText = "Unit attacks another unit. They both take damage equal to the other's attack.";
        return outText;
    };
    // #endregion
    // #region Static Creator Functions
    AttackEffect.createFightEffect = function () {
        var effect = new AttackEffect();
        return effect;
    };
    AttackEffect.createFightTargetInfoList = function (attackedCardInstanceId) {
        var targetInfoList = [];
        var targetInfo = new TargetInfo_1.default([attackedCardInstanceId], false, false);
        targetInfoList.push(targetInfo);
        return targetInfoList;
    };
    // #endregion
    // #region JSON
    AttackEffect.prototype.toJSON = function () {
        return {
            effectType: Effect_1.EffectType[this.effectType],
        };
    };
    AttackEffect.prototype.clone = function () {
        return new AttackEffect();
    };
    return AttackEffect;
}(EntityEffect_1.default));
exports.default = AttackEffect;
