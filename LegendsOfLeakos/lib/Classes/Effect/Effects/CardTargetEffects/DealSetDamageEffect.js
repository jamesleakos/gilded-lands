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
var EntityEffect_1 = __importDefault(require("../../EntityEffect"));
var EffectValueCreatorInfo_1 = __importDefault(require("../../EffectValueCreatorInfo"));
var EffectValue_1 = __importDefault(require("../../EffectValue"));
var Effect_2 = require("../../../../Enums/Effect");
var TargetType_1 = __importDefault(require("../../../Target/TargetType"));
var TargetTypeInfo_1 = __importDefault(require("../../../Target/TargetTypeInfo"));
var Target_1 = require("../../../../Enums/Target");
var DealSetDamageEffect = /** @class */ (function (_super) {
    __extends(DealSetDamageEffect, _super);
    // constructor
    function DealSetDamageEffect(setEffectValues, setTargetTypes) {
        var _this = _super.call(this) || this;
        _this.effectEnum = Effect_2.EffectType.DealSetDamage;
        _this.setEffectValueList(setEffectValues);
        _this.setTargetTypeList(setTargetTypes);
        return _this;
    }
    // Effect Creation Static Vars
    // variables and methods to help with the creation of these effects by a person in the card creator
    DealSetDamageEffect.prototype.sampleEffectForCardBuilder = function () {
        var effectValues = [];
        for (var _i = 0, _a = this.myRequiredEffectValues(); _i < _a.length; _i++) {
            var info = _a[_i];
            effectValues.push(new EffectValue_1.default(info.effectValueType, 0, []));
        }
        var damageTargetType = new TargetType_1.default('Damage Target', Target_1.TargetTypeEnum.TargetCreature, 1, // minSelectionsRequired
        1, // maxSelectionsAllowed
        1, // minSelectionsThatMustRemain
        Target_1.TargetableTypeSelectionEnum.TargetableOnActivation, [] // conditions
        );
        return new DealSetDamageEffect(effectValues, [damageTargetType]);
    };
    DealSetDamageEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [
            new EffectValueCreatorInfo_1.default(Effect_2.EffectValueType.DamageAmount, true),
            new EffectValueCreatorInfo_1.default(Effect_2.EffectValueType.HitDivineShield, false),
        ];
        for (var _i = 0, _a = _super.prototype.myRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    DealSetDamageEffect.prototype.numberOfTargetTypes = function () {
        return 1;
    };
    DealSetDamageEffect.prototype.targetTypeInfoList = function () {
        var list = [];
        list.push(new TargetTypeInfo_1.default('Targets To Be Dealt Damage', // name
        'These are the targets that are damaged. They are damaged a set amount.', // description
        'Targets must be cards', // target type description
        1, // minMinSelectionsRequired
        null // maxMaxSelectionsRequired
        ));
        return list;
    };
    // Effect To Text
    DealSetDamageEffect.prototype.effectToString = function () {
        var outText = 'Deal ' +
            this.getEffectValue(Effect_2.EffectValueType.DamageAmount).setValue.toString() +
            ' damage to up to ' +
            this.targetTypes[0].maxSelectionsAllowed.toString() +
            ' targets.';
        return outText;
    };
    DealSetDamageEffect.prototype.changeEffectDamageAmount = function (newAmount, index, modifyPermanent) {
        this.modifyEffectValueInt(Effect_2.EffectValueType.DamageAmount, index, newAmount, modifyPermanent);
    };
    DealSetDamageEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        var targetsToBeDealtDamage = targetInfoList[0];
        var damageAmountEV = this.getEffectValue(Effect_2.EffectValueType.DamageAmount);
        var hitDivineShieldEV = this.getEffectValue(Effect_2.EffectValueType.HitDivineShield);
        damageAmountEV.fitToTargetInfo(targetsToBeDealtDamage);
        hitDivineShieldEV.fitToTargetInfo(targetsToBeDealtDamage);
        if (!this.isTargetInfoStillValid(sourceEntity, state, targetsToBeDealtDamage, this.targetTypes[0]))
            return false;
        if (!this.isCardStillInPlay(sourceEntity, state))
            return false;
        return true;
    };
    DealSetDamageEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        var targetsToBeDealtDamage = targetInfoList[0];
        var damageTargetType = this.targetTypes[0];
        for (var i = 0; i < targetsToBeDealtDamage.cardInstanceIdList.length; i++) {
            var currentTargetCard = state.getCardFromAnywhere(targetsToBeDealtDamage.cardInstanceIdList[i]);
            // check if the card still satisfies conditions
            if (!damageTargetType.cardSatisfiesConditions(currentTargetCard, state))
                break;
            // these effect values should have a list of ints for each of the cards in targetsToBeDealtDamage
            var hitDivineShield = this.getEffectValue(Effect_2.EffectValueType.HitDivineShield).modInts[i]
                .effectiveValue == 1;
            var damageAmount = this.getEffectValue(Effect_2.EffectValueType.DamageAmount).modInts[i].effectiveValue;
            if (!hitDivineShield) {
                currentTargetCard.health.baseValue -= damageAmount;
            }
        }
    };
    return DealSetDamageEffect;
}(EntityEffect_1.default));
Effect_1.default.registerEffect(Effect_2.EffectType.DealSetDamage, DealSetDamageEffect);
exports.default = DealSetDamageEffect;
