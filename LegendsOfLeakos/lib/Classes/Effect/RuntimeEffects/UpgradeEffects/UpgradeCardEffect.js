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
var RuntimeEffect_1 = __importDefault(require("../../RuntimeEffect"));
var Effect_1 = require("../../../../Enums/Effect");
var RuntimeCard_1 = __importDefault(require("../../../Card/RuntimeCard"));
var UpgradeCardEffect = /** @class */ (function (_super) {
    __extends(UpgradeCardEffect, _super);
    function UpgradeCardEffect(upgradeIndex) {
        var _this = _super.call(this) || this;
        _this.effectType = Effect_1.EffectType.UpgradeCardEffect;
        _this.upgradeIndex = upgradeIndex;
        return _this;
    }
    UpgradeCardEffect.prototype.targetCriterias = function () {
        return [];
    };
    // #region Effect Execution
    UpgradeCardEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        return true;
    };
    UpgradeCardEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var _this = this;
        if (!(sourceEntity instanceof RuntimeCard_1.default)) {
            throw new Error('Why is non card entity attacking?');
        }
        var sourceCard = sourceEntity;
        var libraryCard = state.gameManager.getCardFromLibraryId(sourceCard.libraryId);
        var upgrade = libraryCard.cardUpgrades.find(function (x) { return x.upgradeIndex === _this.upgradeIndex; });
        upgrade.upgradeCard(sourceCard);
    };
    UpgradeCardEffect.prototype.areTargetsAvailable = function (state, sourceEntity) {
        return true;
    };
    UpgradeCardEffect.prototype.isAllTargetInfoValid = function (sourceEntity, state, targetInfoList) {
        return true;
    };
    UpgradeCardEffect.prototype.isTargetInfoValid = function (sourceEntity, state, targetInfo, targetCriteria) {
        return true;
    };
    // #endregion
    // #region Runtime Utilities
    UpgradeCardEffect.prototype.effectToString = function () {
        var outText = "Upgrade this card to upgrade with index ".concat(this.upgradeIndex);
        return outText;
    };
    // #endregion
    // #region JSON and Creation
    UpgradeCardEffect.createUpgradeCardEffect = function (upgradeLevel) {
        return new UpgradeCardEffect(upgradeLevel);
    };
    UpgradeCardEffect.prototype.toJSON = function () {
        return {
            effectType: Effect_1.EffectType[this.effectType],
            upgradeIndex: this.upgradeIndex,
        };
    };
    UpgradeCardEffect.prototype.clone = function () {
        return new UpgradeCardEffect(this.upgradeIndex);
    };
    return UpgradeCardEffect;
}(RuntimeEffect_1.default));
exports.default = UpgradeCardEffect;
