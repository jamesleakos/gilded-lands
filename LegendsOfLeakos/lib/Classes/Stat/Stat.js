"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stat = void 0;
var StatModifier_1 = __importDefault(require("./StatModifier"));
var StatBuff_1 = __importDefault(require("./StatBuff"));
var Stat = /** @class */ (function () {
    function Stat(statId, name, originalValue, baseValue, minValue, maxValue, modifiers, buffs) {
        this.modifiers = [];
        this.buffs = [];
        this.statId = statId;
        this.name = name;
        this.originalValue = originalValue;
        this.baseValue = baseValue;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.modifiers = modifiers;
        this.buffs = buffs;
    }
    Object.defineProperty(Stat.prototype, "baseValue", {
        get: function () {
            return this._baseValue;
        },
        set: function (value) {
            var oldValue = this._baseValue;
            this._baseValue = value;
            if (this.onValueChanged && oldValue !== this._baseValue) {
                this.onValueChanged(oldValue, value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Stat.prototype, "effectiveValue", {
        get: function () {
            var value = this.baseValue;
            for (var _i = 0, _a = this.modifiers; _i < _a.length; _i++) {
                var modifier = _a[_i];
                value += modifier.value;
            }
            for (var _b = 0, _c = this.buffs; _b < _c.length; _b++) {
                var buff = _c[_b];
                value += buff.value;
            }
            if (value < this.minValue) {
                value = this.minValue;
            }
            else if (value > this.maxValue) {
                value = this.maxValue;
            }
            return value;
        },
        enumerable: false,
        configurable: true
    });
    Stat.prototype.addModifier = function (modifier) {
        var oldValue = this.effectiveValue;
        this.modifiers.push(modifier);
        if (this.onValueChanged) {
            this.onValueChanged(oldValue, this.effectiveValue);
        }
    };
    Stat.prototype.addBuff = function (value, details) {
        this.buffs.push(new StatBuff_1.default(value, details));
        // we don't call it here because it's better to call it in DoEffect
    };
    Stat.prototype.onEndBattlePhase = function () {
        var oldValue = this.effectiveValue;
        var modifiersToRemove = [];
        var temporaryModifiers = this.modifiers.filter(function (x) { return !x.isPermanent(); });
        for (var _i = 0, temporaryModifiers_1 = temporaryModifiers; _i < temporaryModifiers_1.length; _i++) {
            var modifier = temporaryModifiers_1[_i];
            modifier.duration -= 1;
            if (modifier.duration <= 0) {
                modifiersToRemove.push(modifier);
            }
        }
        for (var _a = 0, modifiersToRemove_1 = modifiersToRemove; _a < modifiersToRemove_1.length; _a++) {
            var modifier = modifiersToRemove_1[_a];
            var index = this.modifiers.indexOf(modifier);
            if (index !== -1) {
                this.modifiers.splice(index, 1);
            }
        }
        if (modifiersToRemove.length > 0 && this.onValueChanged) {
            this.onValueChanged(oldValue, this.effectiveValue);
        }
    };
    Stat.prototype.clone = function () {
        return Stat.fromRuntimeJSON(this);
    };
    Stat.prototype.toJSON = function () {
        return {
            statId: this.statId,
            name: this.name,
            originalValue: this.originalValue,
            baseValue: this.baseValue,
            minValue: this.minValue,
            maxValue: this.maxValue,
            modifiers: this.modifiers.map(function (modifier) { return modifier.toJSON(); }),
            // buffs: this.buffs.map((buff) => buff.toJSON()), // we shouldn't need buffs - these are caluculated live at runtime
        };
    };
    Stat.fromLibraryJSON = function (json) {
        return new Stat(json.statId, json.name, json.originalValue, json.baseValue, json.minValue, json.maxValue, json.modifiers.map(function (modifier) { return StatModifier_1.default.fromJSON(modifier); }), 
        // json.buffs.map((buff: any) => StatBuff.fromJSON(buff)) // again, shouldn't need this
        new Array());
    };
    Stat.fromRuntimeJSON = function (json) {
        if (json.statId === undefined ||
            json.name === undefined ||
            json.originalValue === undefined ||
            json.baseValue === undefined ||
            json.minValue === undefined ||
            json.maxValue === undefined ||
            json.modifiers === undefined) {
            console.log('\nstat json: ', json);
            throw new Error('Invalid Stat JSON');
        }
        return new Stat(json.statId, json.name, json.originalValue, json.baseValue, json.minValue, json.maxValue, json.modifiers.map(function (modifier) { return StatModifier_1.default.fromJSON(modifier); }), 
        // json.buffs.map((buff: any) => StatBuff.fromJSON(buff)) // again, shouldn't need this
        new Array());
    };
    return Stat;
}());
exports.Stat = Stat;
exports.default = Stat;
