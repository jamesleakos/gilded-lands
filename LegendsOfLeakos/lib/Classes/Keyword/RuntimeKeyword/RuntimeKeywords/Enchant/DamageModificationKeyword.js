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
var RuntimeKeyword_1 = __importDefault(require("../../RuntimeKeyword"));
var Keyword_1 = require("../../../../../Enums/Keyword");
var AttackEffect_1 = __importDefault(require("../../../../Effect/RuntimeEffects/AttackEffects/AttackEffect"));
var DealSetDamageEffect_1 = __importDefault(require("../../../../Effect/RuntimeEffects/CardTargetEffects/DealSetDamageEffect"));
var IntModifier_1 = __importDefault(require("../../../../ModifableInt/IntModifier"));
var Effect_1 = require("../../../../../Enums/Effect");
var DamageModificationKeyword = /** @class */ (function (_super) {
    __extends(DamageModificationKeyword, _super);
    function DamageModificationKeyword(myEntityId, keywordType, indexForUpgrades, setDescription, setIsPermanent, setDuration, keywordValueList, isActive, conditions, imageName) {
        var _this = _super.call(this) || this;
        _this.setBaseData(myEntityId, keywordType, indexForUpgrades, setDescription, setIsPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        return _this;
    }
    DamageModificationKeyword.prototype.preResolveEffect = function (myEnt, e, sourceEntity, gameState, targetInfoList) {
        var _this = this;
        if (!this.isActive) {
            return;
        }
        var myEntity = gameState.getEntityFromAnywhere(this.myEntityInstanceId);
        if (!myEntity) {
            throw new Error('myEntity is null');
        }
        switch (e.constructor) {
            case AttackEffect_1.default:
                // get effect
                var attackEffect = e;
                // attacked card
                var attackedCard = gameState.getCardFromAnywhere(targetInfoList[0].targetEntityInstanceIds[0]);
                if (!attackedCard)
                    throw new Error('attackedCard is null');
                // attacking card
                var sourceCard = sourceEntity;
                if (!sourceCard)
                    throw new Error('attackingCard is null');
                // get the attack keyword value
                var attackKV_1 = this.getKeywordValue(Keyword_1.KeywordValueType.modifyAttackAmount);
                // do the blocking cards
                attackEffect.blockInfo.forEach(function (b) {
                    var blockingCard = gameState.getCardFromAnywhere(b.blockingCardInstanceId);
                    if (!blockingCard) {
                        throw new Error('blockingCard is null');
                    }
                    var meetsConditions = true;
                    for (var _i = 0, _a = _this.conditions; _i < _a.length; _i++) {
                        var condition = _a[_i];
                        if (!condition.isTrue(blockingCard.instanceId, myEntity.instanceId, gameState)) {
                            meetsConditions = false;
                        }
                    }
                    if (meetsConditions) {
                        b.damageToBlockingCard.intModifiers.push(new IntModifier_1.default(attackKV_1, false));
                    }
                });
                // now do the same for the attacked card
                var attackedMeetsConditions = true;
                for (var _i = 0, _a = this.conditions; _i < _a.length; _i++) {
                    var condition = _a[_i];
                    if (!condition.isTrue(attackedCard.instanceId, myEntity.instanceId, gameState)) {
                        attackedMeetsConditions = false;
                    }
                }
                if (attackedMeetsConditions) {
                    attackEffect.damageToAttackedCard.intModifiers.push(new IntModifier_1.default(attackKV_1, false));
                }
                // now do the same for the attacking card
                var attackingMeetsConditions = true;
                for (var _b = 0, _c = this.conditions; _b < _c.length; _b++) {
                    var condition = _c[_b];
                    if (!condition.isTrue(sourceCard.instanceId, myEntity.instanceId, gameState)) {
                        attackingMeetsConditions = false;
                    }
                }
                if (attackingMeetsConditions) {
                    attackEffect.damageToAttackingCard.intModifiers.push(new IntModifier_1.default(attackKV_1, false));
                }
                break;
            case DealSetDamageEffect_1.default:
                var abilityDamageKV_1 = this.getKeywordValue(Keyword_1.KeywordValueType.modifyAbilityDamageAmount);
                if (!abilityDamageKV_1) {
                    throw new Error('abilityDamageKV is null');
                }
                var dealSetDamageEffect_1 = e;
                if (targetInfoList.length !== 1) {
                    throw new Error('targetInfoList.length !== 1');
                }
                var attackedCards = targetInfoList[0].targetEntityInstanceIds.map(function (c) {
                    var card = gameState.getCardFromAnywhere(c);
                    if (!card)
                        throw new Error('card is null');
                    return card;
                });
                attackedCards.forEach(function (c, index) {
                    var meetsConditions = true;
                    for (var _i = 0, _a = _this.conditions; _i < _a.length; _i++) {
                        var condition = _a[_i];
                        if (!condition.isTrue(c.instanceId, myEntity.instanceId, gameState)) {
                            meetsConditions = false;
                        }
                    }
                    if (meetsConditions) {
                        var damageList = dealSetDamageEffect_1.getEffectValue(Effect_1.EffectValueType.DamageAmount);
                        damageList.modInts[index].intModifiers.push(new IntModifier_1.default(abilityDamageKV_1, false));
                    }
                });
            default:
                break;
        }
    };
    return DamageModificationKeyword;
}(RuntimeKeyword_1.default));
RuntimeKeyword_1.default.registerKeyword(Keyword_1.KeywordType.DamageModification, DamageModificationKeyword);
exports.default = DamageModificationKeyword;
