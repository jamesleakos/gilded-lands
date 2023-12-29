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
var MoveCardEffect_1 = __importDefault(require("../../../../Effect/RuntimeEffects/MoveEffects/MoveCardEffect"));
var Keyword_1 = require("../../../../../Enums/Keyword");
var AttackEffect_1 = __importDefault(require("../../../../Effect/RuntimeEffects/AttackEffects/AttackEffect"));
var ShieldedKeyword = /** @class */ (function (_super) {
    __extends(ShieldedKeyword, _super);
    function ShieldedKeyword(setMyEntityId, keywordType, indexForUpgrades, setDescription, setIsPermanent, setDuration, keywordValueList, isActive, conditions, imageName) {
        var _this = _super.call(this) || this;
        _this.setBaseData(setMyEntityId, keywordType, indexForUpgrades, setDescription, setIsPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        return _this;
    }
    ShieldedKeyword.prototype.preResolveEffect = function (myEnt, e, sourceCard, gameState, targetInfoList) {
        if (!this.isActive)
            return;
        switch (e.constructor) {
            case AttackEffect_1.default:
                var attackEffect = e;
                var target = attackEffect.getAttackedCard(gameState, targetInfoList);
                var shieldingCard = gameState.getCardFromAnywhere(this.getKeywordValue(Keyword_1.KeywordValueType.shieldingCardInstanceId));
                var shieldingCardZone = gameState.getZoneByInstanceId(shieldingCard.residingZoneInstanceId);
                if (target.instanceId === this.myEntityInstanceId &&
                    (shieldingCardZone.name === 'FrontBoard' ||
                        shieldingCardZone.name === 'BackBoard')) {
                    attackEffect.applyShieldToAttackedCard(this.getKeywordValue(Keyword_1.KeywordValueType.shieldAmount));
                }
                return;
            default:
                return;
        }
    };
    ShieldedKeyword.prototype.postResolveEffect = function (myEnt, e, sourceCard, gameState, targetInfoList) {
        if (!this.isActive)
            return;
        var myEntity = gameState.getEntityFromAnywhere(this.myEntityInstanceId);
        if (!myEntity) {
            throw new Error('myEntity is null');
        }
        switch (e.constructor) {
            case MoveCardEffect_1.default:
                var moveEffect = e;
                if (sourceCard.instanceId ===
                    this.getKeywordValue(Keyword_1.KeywordValueType.shieldingCardInstanceId)) {
                    var shieldingCard = gameState.getCardFromAnywhere(this.getKeywordValue(Keyword_1.KeywordValueType.shieldingCardInstanceId));
                    var shieldingCardZone = gameState.getZoneByInstanceId(shieldingCard.residingZoneInstanceId);
                    if (shieldingCardZone.name === 'Frontboard' ||
                        shieldingCardZone.name === 'BackBoard' ||
                        shieldingCardZone.name === 'BattleBoard') {
                        myEntity.removeKeyword(this);
                    }
                }
                return;
            default:
                return;
        }
    };
    return ShieldedKeyword;
}(RuntimeKeyword_1.default));
RuntimeKeyword_1.default.registerKeyword(Keyword_1.KeywordType.Shielded, ShieldedKeyword);
exports.default = ShieldedKeyword;
