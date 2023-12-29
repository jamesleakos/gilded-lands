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
var DealDamageEqualToAttackEffect = /** @class */ (function (_super) {
    __extends(DealDamageEqualToAttackEffect, _super);
    // constructor
    function DealDamageEqualToAttackEffect(setEffectValues, setTargetTypes) {
        var _this = _super.call(this) || this;
        _this.effectEnum = Effect_2.EffectType.DealDamageEqualToAttack;
        _this.setEffectValueList(setEffectValues);
        _this.setTargetTypeList(setTargetTypes);
        return _this;
    }
    // Effect Creation Static Vars
    // variables and methods to help with the creation of these effects by a person in the card creator
    DealDamageEqualToAttackEffect.prototype.sampleEffectForCardBuilder = function () {
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
        return new DealDamageEqualToAttackEffect(effectValues, [damageTargetType]);
    };
    DealDamageEqualToAttackEffect.prototype.myRequiredEffectValues = function () {
        var tempList = [
            new EffectValueCreatorInfo_1.default(Effect_2.EffectValueType.DamageAmount, false),
            new EffectValueCreatorInfo_1.default(Effect_2.EffectValueType.HitDivineShield, false),
        ];
        for (var _i = 0, _a = _super.prototype.myRequiredEffectValues.call(this); _i < _a.length; _i++) {
            var x = _a[_i];
            tempList.push(x);
        }
        return tempList;
    };
    DealDamageEqualToAttackEffect.prototype.numberOfTargetTypes = function () {
        return 1;
        // TargetInfoList[0] = Targets to be dealt damage based on their own attack
    };
    DealDamageEqualToAttackEffect.prototype.targetTypeInfoList = function () {
        var list = [];
        list.push(new TargetTypeInfo_1.default('Targets Damaged', // name
        'These are the targets that are damaged. They are damaged based on their attack stat. One must remain in order to not sizzle.', // description
        'Targets must be cards', 1, // minMinSelectionsRequired
        null // maxMaxSelectionsRequired
        ));
        return list;
    };
    // Effect To Text
    DealDamageEqualToAttackEffect.prototype.effectToString = function () {
        var outText = 'Deal damage to up to ' +
            this.targetTypes[0].maxSelectionsAllowed.toString() +
            ' targets equal to their attack.';
        return outText;
    };
    DealDamageEqualToAttackEffect.prototype.changeEffectDamageAmount = function (newAmount, index, modifyPermanent) {
        this.modifyEffectValueInt(Effect_2.EffectValueType.DamageAmount, index, newAmount, modifyPermanent);
    };
    DealDamageEqualToAttackEffect.prototype.preEffect = function (state, sourceEntity, targetInfoList) {
        var damageAmountEV = this.getEffectValue(Effect_2.EffectValueType.DamageAmount);
        var targetsToBeDealtDamage = targetInfoList[0];
        damageAmountEV.fitToTargetInfo(targetsToBeDealtDamage);
        for (var i = 0; i < damageAmountEV.modInts.length; i++) {
            var card = state.getCardFromAnywhere(targetsToBeDealtDamage.cardInstanceIdList[i]);
            damageAmountEV.modInts[i].baseValue = card.attack.effectiveValue;
        }
        if (!this.isTargetInfoStillValid(sourceEntity, state, targetsToBeDealtDamage, this.targetTypes[0]))
            return false;
        if (!this.isCardStillInPlay(sourceEntity, state))
            return false;
        return true;
    };
    DealDamageEqualToAttackEffect.prototype.resolve = function (state, sourceEntity, targetInfoList) {
        if (!this.isCardStillInPlay(sourceEntity, state))
            return;
        var targetsToBeDealtDamage = targetInfoList[0];
        var damageTargetType = this.targetTypes[0];
        for (var i = 0; i < targetsToBeDealtDamage.cardInstanceIdList.length; i++) {
            var currentTargetCard = state.getCardFromAnywhere(targetsToBeDealtDamage.cardInstanceIdList[i]);
            // if the card has since moved since we targeted it or otherwise doesn't satisfy conditions anymore
            if (!damageTargetType.cardSatisfiesConditions(currentTargetCard, state))
                break;
            var hitDivineShield = this.getEffectValue(Effect_2.EffectValueType.HitDivineShield).modInts[i]
                .effectiveValue == 0;
            var damageAmount = this.getEffectValue(Effect_2.EffectValueType.DamageAmount).modInts[i].effectiveValue;
            if (!hitDivineShield) {
                currentTargetCard.health.baseValue -= damageAmount;
            }
        }
    };
    return DealDamageEqualToAttackEffect;
}(EntityEffect_1.default));
Effect_1.default.registerEffect(Effect_2.EffectType.DealDamageEqualToAttack, DealDamageEqualToAttackEffect);
exports.default = DealDamageEqualToAttackEffect;
