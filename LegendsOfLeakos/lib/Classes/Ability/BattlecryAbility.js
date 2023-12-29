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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAbility_1 = __importDefault(require("./BaseAbility"));
var RuntimeEffect_1 = __importDefault(require("../Effect/RuntimeEffect"));
var Phase_1 = require("../../Enums/Phase");
var Ability_1 = require("../../Enums/Ability");
var BattlecryAbility = /** @class */ (function (_super) {
    __extends(BattlecryAbility, _super);
    function BattlecryAbility(setName, setEffect, useableInPhases) {
        var _this = _super.call(this) || this;
        _this.name = setName;
        _this.type = Ability_1.AbilityType.Battlecry;
        _this.effect = setEffect;
        _this.useableInPhases = __spreadArray([], useableInPhases, true);
        return _this;
    }
    BattlecryAbility.prototype.toJSON = function () {
        return {
            name: this.name,
            type: this.type,
            effect: this.effect.toJSON(),
            // map enums to strings
            useableInPhases: this.useableInPhases.map(function (phase) { return Phase_1.PhaseEnum[phase]; }),
        };
    };
    BattlecryAbility.fromJSON = function (json) {
        var temp = new BattlecryAbility(json.name, RuntimeEffect_1.default.fromJSON(json.effect), json.useableInPhases.map(function (phase) { return Phase_1.PhaseEnum[phase]; }));
        return temp;
    };
    BattlecryAbility.isJSONValid = function (json) {
        if (typeof json.name !== 'string') {
            console.log('Invalid JSON: name is not a string');
            return false;
        }
        if (!RuntimeEffect_1.default.isJSONValid(json.effect)) {
            console.log('Invalid JSON: effect is not an object');
            return false;
        }
        for (var _i = 0, _a = json.useableInPhases; _i < _a.length; _i++) {
            var phase = _a[_i];
            if (typeof phase !== 'string') {
                console.log('Invalid JSON: phase is not a string');
                return false;
            }
            if (!Object.values(Phase_1.PhaseEnum).includes(phase)) {
                console.log('Invalid JSON: phase is not a valid PhaseEnum');
                return false;
            }
        }
        return true;
    };
    return BattlecryAbility;
}(BaseAbility_1.default));
exports.default = BattlecryAbility;
