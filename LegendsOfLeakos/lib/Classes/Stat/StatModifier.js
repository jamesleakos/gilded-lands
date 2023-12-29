"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatModifier = /** @class */ (function () {
    function StatModifier(value, duration) {
        if (duration === void 0) { duration = StatModifier.PERMANENT; }
        this.value = value;
        this.duration = duration;
    }
    StatModifier.prototype.isPermanent = function () {
        return this.duration === StatModifier.PERMANENT;
    };
    StatModifier.prototype.toJSON = function () {
        return {
            value: this.value,
            duration: this.duration,
        };
    };
    StatModifier.fromJSON = function (json) {
        return new StatModifier(json.value, json.duration);
    };
    StatModifier.PERMANENT = 0;
    return StatModifier;
}());
exports.default = StatModifier;
