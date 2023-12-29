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
var RuntimeCard_1 = __importDefault(require("../../../../Card/RuntimeCard"));
var Keyword_1 = require("../../../../../Enums/Keyword");
var AttackEffect_1 = __importDefault(require("../../../../Effect/Effects/AttackEffects/AttackEffect"));
var DealSetDamageEffect_1 = __importDefault(require("../../../../Effect/Effects/CardTargetEffects/DealDamage/DealSetDamageEffect"));
var IntModifier_1 = __importDefault(require("../../../../ModifableInt/IntModifier"));
var WardZoneKeyword = /** @class */ (function (_super) {
    __extends(WardZoneKeyword, _super);
    function WardZoneKeyword(myEntityId, keywordType, indexForUpgrades, setDescription, setIsPermanent, setDuration, keywordValueList, isActive, conditions, imageName) {
        var _this = _super.call(this) || this;
        _this.setBaseData(myEntityId, keywordType, indexForUpgrades, setDescription, setIsPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        return _this;
    }
    WardZoneKeyword.prototype.preResolveEffect = function (myEnt, e, sourceEntity, gameState, targetInfoList) {
        if (!this.isActive) {
            return;
        }
        var myEntity = gameState.getEntityFromAnywhere(this.myEntityInstanceId);
        if (!myEntity) {
            throw new Error('myEntity is null');
        }
        // if my entity is a RuntimeZone, assign myZone to myEntity. Otherwise, myEntity is a RuntimeCard, so assign myZone to the zone of myEntity
        var myZone = myEntity instanceof RuntimeCard_1.default
            ? gameState.getZoneByInstanceId(myEntity.residingZoneInstanceId)
            : myEntity;
        switch (e.constructor) {
            case AttackEffect_1.default:
                var attackEffect = e;
                var attackedCard = gameState.getCardFromAnywhere(targetInfoList[0].targetEntityInstanceIds[0]);
                var attackKV_1 = this.getKeywordValue(Keyword_1.KeywordValueType.shieldAttackAmount);
                attackEffect.blockInfo.forEach(function (b) {
                    var blockingCard = gameState.getCardFromAnywhere(b.blockingCardInstanceId);
                    if (!blockingCard) {
                        throw new Error('blockingCard is null');
                    }
                    if (blockingCard.residingZoneInstanceId === myZone.instanceId) {
                        b.damageToBlockingCard.intModifiers.push(new IntModifier_1.default(attackKV_1, false));
                    }
                });
                break;
            case DealSetDamageEffect_1.default:
                var dealSetDamageEffect = e;
                var attackedCards = targetInfoList.map(function (c) {
                    var attackedCard = gameState.getCardFromAnywhere(c.targetEntityInstanceIds[0]);
                    if (!attackedCard)
                        throw new Error('attackedCard is null. instanceId: ' +
                            c.targetEntityInstanceIds[0]);
                    return attackedCard;
                });
                attackedCards.forEach(function (c) {
                    // if the card is in the same zone as this (either entityID )
                });
            default:
                break;
        }
    };
    return WardZoneKeyword;
}(RuntimeKeyword_1.default));
