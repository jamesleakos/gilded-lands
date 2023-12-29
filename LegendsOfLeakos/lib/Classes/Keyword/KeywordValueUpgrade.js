"use strict";
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
var Keyword_1 = require("../../Enums/Keyword");
var ModifiableInt_1 = __importDefault(require("../ModifableInt/ModifiableInt"));
var KeywordValueUpgrade = /** @class */ (function () {
    function KeywordValueUpgrade(keywordValueType, valueChanges) {
        var _this = this;
        this.valueChanges = [];
        this.keywordValueType = keywordValueType;
        valueChanges.forEach(function (c) {
            _this.valueChanges.push(new ModifiableInt_1.default(c.baseValue, __spreadArray([], c.effectValueIntModifiers, true)));
        });
    }
    KeywordValueUpgrade.prototype.toJSON = function () {
        return {
            keywordValueType: this.keywordValueType.toString(),
            valueChanges: this.valueChanges.map(function (c) { return c.toJSON(); }),
        };
    };
    KeywordValueUpgrade.fromJSON = function (json) {
        var newKeywordValueUpgrade = new KeywordValueUpgrade(Keyword_1.KeywordValueType[json.keywordValueType], new Array());
        json.valueChanges.forEach(function (c) {
            newKeywordValueUpgrade.valueChanges.push(ModifiableInt_1.default.fromJSON(c));
        });
        return newKeywordValueUpgrade;
    };
    return KeywordValueUpgrade;
}());
exports.default = KeywordValueUpgrade;
