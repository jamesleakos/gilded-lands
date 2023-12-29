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
var RuntimeKeyword_1 = __importDefault(require("../../RuntimeKeyword/RuntimeKeyword"));
var Keyword_1 = require("../../../../Enums/Keyword");
var NormalAttackEffect_1 = __importDefault(require("../../../Effect/Effects/AttackEffects/NormalAttackEffect"));
var DivineShieldKeyword = /** @class */ (function (_super) {
    __extends(DivineShieldKeyword, _super);
    function DivineShieldKeyword(myEntityId, keywordType, indexForUpgrades, setDescription, setIsPermanent, setDuration, keywordValueList, isActive, conditions, imageName) {
        var _this = _super.call(this) || this;
        _this.setBaseData(myEntityId, keywordType, indexForUpgrades, setDescription, setIsPermanent, setDuration, keywordValueList, isActive, conditions, imageName);
        return _this;
    }
    DivineShieldKeyword.prototype.useShield = function (gameState) {
        var myEntity = gameState.getEntityFromAnywhere(this.myEntityInstanceId);
        if (!myEntity) {
            throw new Error('myEntity is null');
        }
        this.keywordValueList.find(function (c) { return c.keywordValueType === Keyword_1.KeywordValueType.uses; }).values[0] -= 1;
        if (this.keywordValueList.find(function (c) { return c.keywordValueType === Keyword_1.KeywordValueType.uses; }).values[0] <= 0) {
            myEntity.condemnKeywordToRemoval(this);
        }
    };
    DivineShieldKeyword.prototype.preResolveEffect = function (myEnt, e, sourceCard, gameState, targetInfoList) {
        if (!this.isActive)
            return;
        var myEntity = gameState.getEntityFromAnywhere(this.myEntityInstanceId);
        if (!myEntity) {
            throw new Error('myEntity is null');
        }
        switch (e.constructor) {
            case NormalAttackEffect_1.default:
                var attackEffect = e;
                var target = attackEffect.getAttackedCard(gameState, targetInfoList);
                if (target.instanceId === myEntity.instanceId &&
                    this.keywordValueList.find(function (c) { return c.keywordValueType === Keyword_1.KeywordValueType.uses; }).values[0] > 0) {
                    attackEffect.hitDivineShield();
                    this.useShield(gameState);
                }
                return;
            default:
                return;
        }
    };
    return DivineShieldKeyword;
}(RuntimeKeyword_1.default));
RuntimeKeyword_1.default.registerKeyword(Keyword_1.KeywordType.DivineShield, DivineShieldKeyword);
exports.default = DivineShieldKeyword;
