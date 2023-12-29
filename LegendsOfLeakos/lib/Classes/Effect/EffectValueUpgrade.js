"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Effect_1 = require("../../Enums/Effect");
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var EffectValueUpgrade = /** @class */ (function () {
    function EffectValueUpgrade(type, modInt) {
        this.effectValueType = type;
        this.setValueChange = new ModifiableInt_1.default(modInt.baseValue, modInt.intModifiers);
    }
    EffectValueUpgrade.prototype.toJSON = function () {
        return {
            effectValueType: Effect_1.EffectValueType[this.effectValueType],
            setValueChange: this.setValueChange.toJSON(),
        };
    };
    EffectValueUpgrade.fromJSON = function (json) {
        return new EffectValueUpgrade(Effect_1.EffectValueType[json.effectValueType], ModifiableInt_1.default.fromJSON(json.setValueChange));
    };
    return EffectValueUpgrade;
}());
exports.default = EffectValueUpgrade;
