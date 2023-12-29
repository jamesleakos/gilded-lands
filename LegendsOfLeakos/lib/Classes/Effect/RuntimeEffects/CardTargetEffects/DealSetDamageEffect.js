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
var TargetCriteria_1 = __importDefault(require("../../../Target/TargetCriteria"));
var RuntimeCard_1 = __importDefault(require("../../../Card/RuntimeCard"));
var Target_1 = require("../../../../Enums/Target");
var ModifiableInt_1 = __importDefault(require("../../../ModifableInt/ModifiableInt"));
var DealSetDamageEffect = /** @class */ (function (_super) {
    __extends(DealSetDamageEffect, _super);
    // constructor
    function DealSetDamageEffect(damageAmount, targetsToBeDealtDamage) {
        var _this = _super.call(this) || this;
        _this.damageAmount = damageAmount;
        _this.targetsToBeDealtDamage = targetsToBeDealtDamage;
        return _this;
    }
    DealSetDamageEffect.prototype.targetCriterias = function () {
        return [this.targetsToBeDealtDamage];
    };
    // #region Effect Execution
    DealSetDamageEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        var targetsToBeDealtDamage = targetInfoList[0];
        this.damageAmountTracker = [];
        this.divineShieldHitTracker = [];
        for (var _i = 0, _a = targetsToBeDealtDamage.targetEntityInstanceIds; _i < _a.length; _i++) {
            var targetInstanceId = _a[_i];
            this.damageAmountTracker.push(this.damageAmount.clone());
            this.divineShieldHitTracker.push(false);
        }
        if (!this.isAllTargetInfoValid(sourceEntity, state, targetInfoList))
            return false;
        return true;
    };
    DealSetDamageEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var targetsToBeDealtDamage = targetInfoList[0];
        for (var i = 0; i < targetsToBeDealtDamage.targetEntityInstanceIds.length; i++) {
            var targetInstanceId = targetsToBeDealtDamage.targetEntityInstanceIds[i];
            var targetEntity = state.getEntityFromAnywhere(targetInstanceId);
            if (targetEntity === null) {
                throw new Error('DealSetDamageEffect requires a valid targetEntity');
            }
            if (targetEntity instanceof RuntimeCard_1.default === false) {
                throw new Error('DealSetDamageEffect requires a RuntimeCard as the targetEntity');
            }
            var targetCard = targetEntity;
            var damageAmount = this.damageAmountTracker[i].effectiveValue;
            if (!this.divineShieldHitTracker[i]) {
                targetCard.health.baseValue -= damageAmount;
            }
        }
    };
    // #endregion
    // #region Targeting
    DealSetDamageEffect.prototype.areTargetsAvailable = function (state, sourceEntity) {
        return this.targetsToBeDealtDamage.areTargetsAvailable(sourceEntity.instanceId, state);
    };
    DealSetDamageEffect.prototype.isAllTargetInfoValid = function (sourceEntity, state, targetInfoList) {
        if (targetInfoList.length !== 1)
            return false;
        var targetsToBeDealtDamage = targetInfoList[0];
        if (!this.targetsToBeDealtDamage.isTargetInfoValid(sourceEntity.instanceId, targetsToBeDealtDamage, state))
            return false;
        return true;
    };
    // #endregion
    // #region Effect To Text
    DealSetDamageEffect.prototype.effectToString = function () {
        var outText = 'Deal ' +
            this.damageAmount.effectiveValue +
            ' damage to between' +
            this.targetsToBeDealtDamage.minSelectionsRequired +
            ' and ' +
            this.targetsToBeDealtDamage.maxSelectionsAllowed +
            ' targets.';
        return outText;
    };
    // #endregion
    // #region JSON
    DealSetDamageEffect.prototype.toJSON = function () {
        return {
            effectType: Effect_1.EffectType[this.effectType],
            damageAmount: this.damageAmount.toJSON(),
            targetsToBeDealtDamage: this.targetsToBeDealtDamage.toJSON(),
        };
    };
    DealSetDamageEffect.prototype.clone = function () {
        return new DealSetDamageEffect(this.damageAmount.clone(), this.targetsToBeDealtDamage.clone());
    };
    DealSetDamageEffect.fromRuntimeJSON = function (json) {
        return new DealSetDamageEffect(ModifiableInt_1.default.fromJSON(json.damageAmount), TargetCriteria_1.default.fromRuntimeJSON(json.targetsToBeDealtDamage));
    };
    DealSetDamageEffect.fromLibraryJSON = function (json) {
        return new DealSetDamageEffect(new ModifiableInt_1.default(json.data.damageAmount.value, []), TargetCriteria_1.default.fromLibraryJSON(json.data.targetsToBeDealtDamage.value));
    };
    DealSetDamageEffect.createSampleLibraryJSON = function () {
        var tc = new TargetCriteria_1.default('Deal Damage', Target_1.TargetTypeEnum.TargetCreature, 1, 2, 1, Target_1.TargetableTypeSelectionEnum.TargetableOnActivation, []);
        return {
            effectType: Effect_1.EffectType[Effect_1.EffectType.DealSetDamage],
            data: {
                damageAmount: {
                    type: 'Number',
                    value: 1,
                },
                targetsToBeDealtDamage: {},
            },
        };
    };
    return DealSetDamageEffect;
}(RuntimeEffect_1.default));
RuntimeEffect_1.default.registerFromRuntimeJSON(Effect_1.EffectType.DealSetDamage, DealSetDamageEffect.fromRuntimeJSON);
RuntimeEffect_1.default.registerFromLibraryJSON(Effect_1.EffectType.DealSetDamage, DealSetDamageEffect.fromLibraryJSON);
RuntimeEffect_1.default.registerSampleLibraryJSON(Effect_1.EffectType.DealSetDamage, DealSetDamageEffect.createSampleLibraryJSON);
exports.default = DealSetDamageEffect;
