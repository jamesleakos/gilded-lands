"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class, which currently serves as the base for zones, cards, and enchantments, provides pre / post effect resolve
 * capacity for the effect solver. It incidentally is the base class for everything that an effect can target, though
 * currently that's not being used to full capacity.
 */
var TargetableRuntimeEntity = /** @class */ (function () {
    function TargetableRuntimeEntity() {
    }
    return TargetableRuntimeEntity;
}());
exports.default = TargetableRuntimeEntity;
