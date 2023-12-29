"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Effect_1 = require("../../Enums/Effect");
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var IntModifier_1 = __importDefault(require("../ModifableInt/IntModifier"));
var EffectValue = /** @class */ (function () {
    function EffectValue(effectValueType, setValue, modInts) {
        this.effectValueType = effectValueType;
        this.setValue = setValue;
        this.modInts = modInts.map(function (i) { return new ModifiableInt_1.default(i.baseValue, i.intModifiers); });
    }
    EffectValue.prototype.fitToTargetInfo = function (targetInfo) {
        var numberOfTargets = targetInfo.targetEntityInstanceIds.length;
        this.modInts = [];
        for (var i = 0; i < numberOfTargets; i++) {
            this.modInts.push(new ModifiableInt_1.default(this.setValue, []));
        }
    };
    EffectValue.prototype.modifyEffectValueInt = function (index, modifyValue, modifyPermanent) {
        this.modInts[index].intModifiers.push(new IntModifier_1.default(modifyValue, modifyPermanent));
    };
    EffectValue.prototype.postEffect = function () {
        this.modInts.forEach(function (evInt) {
            evInt.intModifiers = evInt.intModifiers.filter(function (c) { return c.permanent; });
        });
    };
    EffectValue.prototype.contains = function (x) {
        return this.modInts.some(function (i) { return i.effectiveValue === x; });
    };
    EffectValue.prototype.effectiveValues = function () {
        return this.modInts.map(function (evInt) { return evInt.effectiveValue; });
    };
    EffectValue.prototype.toJSON = function () {
        return {
            effectValueType: Effect_1.EffectValueType[this.effectValueType],
            setValue: this.setValue,
            modInts: this.modInts.map(function (i) { return i.toJSON(); }),
        };
    };
    EffectValue.fromJSON = function (json) {
        return new EffectValue(
        // frim string
        Effect_1.EffectValueType[json.effectValueType], json.setValue, json.modInts.map(function (i) { return ModifiableInt_1.default.fromJSON(i); }));
    };
    EffectValue.isJSONValid = function (json) {
        if (typeof json.effectValueType !== 'string') {
            console.log('Invalid JSON: effectValueType is not a string');
            return false;
        }
        if (!Object.values(Effect_1.EffectValueType).includes(json.effectValueType)) {
            console.log('Invalid JSON: effectValueType is not a valid EffectValueType');
            return false;
        }
        if (typeof json.setValue !== 'number') {
            console.log('Invalid JSON: setValue is not a number');
            return false;
        }
        if (!Array.isArray(json.modInts)) {
            console.log('Invalid JSON: modInts is not an array');
            return false;
        }
        for (var _i = 0, _a = json.modInts; _i < _a.length; _i++) {
            var i = _a[_i];
            if (!ModifiableInt_1.default.isJSONValid(i)) {
                console.log('Invalid JSON: modInts contains invalid ModifiableInt');
                return false;
            }
        }
        return true;
    };
    return EffectValue;
}());
exports.default = EffectValue;
