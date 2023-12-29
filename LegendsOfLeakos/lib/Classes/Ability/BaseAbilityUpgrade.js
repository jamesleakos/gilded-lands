"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAbilityUpgrade = /** @class */ (function () {
    function BaseAbilityUpgrade() {
    }
    BaseAbilityUpgrade.prototype.upgradeAbility = function (ability) {
        this.effectUpgrade.upgradeEffect(ability.effect);
        for (var _i = 0, _a = this.addUseablePhases; _i < _a.length; _i++) {
            var phaseEnum = _a[_i];
            if (!ability.useableInPhases.includes(phaseEnum)) {
                ability.useableInPhases.push(phaseEnum);
            }
        }
        var _loop_1 = function (phaseEnum) {
            ability.useableInPhases = ability.useableInPhases.filter(function (c) { return c !== phaseEnum; });
        };
        for (var _b = 0, _c = this.removeUseablePhases; _b < _c.length; _b++) {
            var phaseEnum = _c[_b];
            _loop_1(phaseEnum);
        }
    };
    return BaseAbilityUpgrade;
}());
exports.default = BaseAbilityUpgrade;
