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
Object.defineProperty(exports, "__esModule", { value: true });
var Keyword_1 = require("../../../Enums/Keyword");
var RuntimeKeywordValue = /** @class */ (function () {
    function RuntimeKeywordValue(keywordValueType, values) {
        this.keywordValueType = keywordValueType;
        this.values = __spreadArray([], values, true);
    }
    RuntimeKeywordValue.prototype.toJSON = function () {
        return {
            keywordValueType: Keyword_1.KeywordValueType[this.keywordValueType],
            values: __spreadArray([], this.values, true),
        };
    };
    RuntimeKeywordValue.fromRuntimeJSON = function (json) {
        return new RuntimeKeywordValue(Keyword_1.KeywordValueType[json.keywordValueType], json.values);
    };
    RuntimeKeywordValue.fromLibraryJSON = function (json) {
        return new RuntimeKeywordValue(Keyword_1.KeywordValueType[json.keywordValueType], json.values);
    };
    return RuntimeKeywordValue;
}());
exports.default = RuntimeKeywordValue;
