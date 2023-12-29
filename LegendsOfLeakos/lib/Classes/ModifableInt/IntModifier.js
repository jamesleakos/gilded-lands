"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IntModifier = /** @class */ (function () {
    function IntModifier(value, permanent) {
        this.value = value;
        this.permanent = permanent;
    }
    IntModifier.prototype.clone = function () {
        return new IntModifier(this.value, this.permanent);
    };
    return IntModifier;
}());
exports.default = IntModifier;
