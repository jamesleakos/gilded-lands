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
var LibraryKeywordValue = /** @class */ (function () {
    function LibraryKeywordValue(keywordValueType, values, setByDesigner) {
        this.keywordValueType = keywordValueType;
        this.values = __spreadArray([], values, true);
        this.setByDesigner = setByDesigner;
    }
    LibraryKeywordValue.prototype.toJSON = function () {
        return {
            keywordValueType: Keyword_1.KeywordValueType[this.keywordValueType],
            values: __spreadArray([], this.values, true),
            setByDesigner: this.setByDesigner,
        };
    };
    LibraryKeywordValue.fromLibraryJSON = function (json) {
        return new LibraryKeywordValue(Keyword_1.KeywordValueType[json.keywordValueType], json.values, json.setByDesigner);
    };
    return LibraryKeywordValue;
}());
exports.default = LibraryKeywordValue;
