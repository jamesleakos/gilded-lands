"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var IntModifier_1 = __importDefault(require("./IntModifier"));
var ModifiableInt = /** @class */ (function () {
    function ModifiableInt(baseValue, effectValueIntModifiers) {
        this.baseValue = baseValue;
        this.intModifiers = [];
        for (var _i = 0, effectValueIntModifiers_1 = effectValueIntModifiers; _i < effectValueIntModifiers_1.length; _i++) {
            var i = effectValueIntModifiers_1[_i];
            this.intModifiers.push(new IntModifier_1.default(i.value, i.permanent));
        }
    }
    Object.defineProperty(ModifiableInt.prototype, "effectiveValue", {
        get: function () {
            var value = this.baseValue;
            for (var _i = 0, _a = this.intModifiers; _i < _a.length; _i++) {
                var modifier = _a[_i];
                value += modifier.value;
            }
            return value;
        },
        enumerable: false,
        configurable: true
    });
    ModifiableInt.prototype.toJSON = function () {
        return {
            baseValue: this.baseValue,
        };
    };
    ModifiableInt.prototype.clone = function () {
        return new ModifiableInt(this.baseValue, this.intModifiers.map(function (i) { return i.clone(); }));
    };
    ModifiableInt.fromJSON = function (json) {
        var newModifiableInt = new ModifiableInt(json.baseValue, new Array());
        return newModifiableInt;
    };
    ModifiableInt.isLibraryJSONValid = function (json) {
        if (typeof json.baseValue !== 'number') {
            console.log('Invalid JSON: baseValue is not a number');
            return false;
        }
        return true;
    };
    return ModifiableInt;
}());
exports.default = ModifiableInt;
