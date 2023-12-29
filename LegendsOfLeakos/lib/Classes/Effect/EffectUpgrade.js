"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Effect_1 = require("../../Enums/Effect");
var TargetCriteriaUpgrade_1 = __importDefault(require("../Target/TargetCriteriaUpgrade"));
var Target_1 = require("../../Enums/Target");
var EffectUpgrade = /** @class */ (function () {
    function EffectUpgrade(effectType, targetTypeUpgrades) {
        this.effectEnum = effectType;
        this.targetTypeUpgrades = targetTypeUpgrades.map(function (upgrade) {
            return new TargetCriteriaUpgrade_1.default(upgrade.targetTypeIndex, upgrade.newTargetTypeEnum, upgrade.newTargetableTypeSelectionEnum, upgrade.minSelectionsRequiredChange, upgrade.maxSelectionsAllowedChange, upgrade.minSelectionsThatMustRemainChange, upgrade.newConditions, upgrade.removeConditionsOfType);
        });
    }
    EffectUpgrade.prototype.upgradeEffect = function (effect) {
        if (effect.effectType !== this.effectEnum)
            return;
        for (var _i = 0, _a = this.targetTypeUpgrades; _i < _a.length; _i++) {
            var ttu = _a[_i];
            var tt = effect.targetCriterias()[ttu.targetTypeIndex];
            tt.targetTypeEnum = ttu.newTargetTypeEnum;
            tt.targetableTypeSelectionEnum = ttu.newTargetableTypeSelectionEnum;
            tt.playerSelectsTarget =
                ttu.newTargetableTypeSelectionEnum !==
                    Target_1.TargetableTypeSelectionEnum.AutoTarget;
            tt.minSelectionsRequired +=
                ttu.minSelectionsRequiredChange.effectiveValue;
            tt.maxSelectionsAllowed += ttu.maxSelectionsAllowedChange.effectiveValue;
            tt.minSelectionsThatMustRemain +=
                ttu.minSelectionsThatMustRemainChange.effectiveValue;
        }
    };
    EffectUpgrade.prototype.toJSON = function () {
        return {
            effectEnum: Effect_1.EffectType[this.effectEnum],
            targetTypeUpgrades: this.targetTypeUpgrades.map(function (ttu) { return ttu.toJSON(); }),
        };
    };
    EffectUpgrade.fromJSON = function (json) {
        return new EffectUpgrade(Effect_1.EffectType[json.effectEnum], json.targetTypeUpgrades.map(function (ttu) {
            return TargetCriteriaUpgrade_1.default.fromJSON(ttu);
        }));
    };
    return EffectUpgrade;
}());
exports.default = EffectUpgrade;
