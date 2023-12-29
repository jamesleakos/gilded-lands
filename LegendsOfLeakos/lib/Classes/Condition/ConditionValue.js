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
var Condition_1 = require("../../Enums/Condition");
var Zone_1 = require("../../Enums/Zone");
var Keyword_1 = require("../../Enums/Keyword");
var ConditionValue = /** @class */ (function () {
    function ConditionValue(conditionValueType, values) {
        this.values = [];
        this.conditionValueType = conditionValueType;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var v = values_1[_i];
            this.values.push(v);
        }
    }
    ConditionValue.prototype.returnReadableStringOfValues = function () {
        var tempString = '';
        for (var i = 0; i < this.values.length; i++) {
            tempString += this.getValueString(this.values[i]);
            if (i < this.values.length - 1)
                tempString += ', ';
        }
        return tempString;
    };
    ConditionValue.prototype.getValueString = function (index) {
        switch (this.conditionValueType) {
            case Condition_1.ConditionValueType.HasKeywordOfKeywordType:
                return Keyword_1.KeywordType[index];
            case Condition_1.ConditionValueType.IsInZoneOfZoneEnum:
                return Zone_1.ZoneEnum[index];
            default:
                return 'Not found - Come Look for Error';
        }
    };
    ConditionValue.prototype.toJSON = function () {
        return {
            conditionValueType: Condition_1.ConditionValueType[this.conditionValueType],
            values: __spreadArray([], this.values, true),
        };
    };
    ConditionValue.fromJSON = function (json) {
        return new ConditionValue(Condition_1.ConditionValueType[json.conditionValueType], json.values);
    };
    ConditionValue.isJSONValid = function (json) {
        if (typeof json.conditionValueType !== 'string') {
            console.log('Invalid JSON: conditionValueType is not a string');
            return false;
        }
        if (!Object.values(Condition_1.ConditionValueType).includes(json.conditionValueType)) {
            console.log('Invalid JSON: conditionValueType is not a valid ConditionValueType');
            return false;
        }
        if (!Array.isArray(json.values)) {
            console.log('Invalid JSON: values is not an array');
            return false;
        }
        for (var _i = 0, _a = json.values; _i < _a.length; _i++) {
            var v = _a[_i];
            if (typeof v !== 'number') {
                console.log('Invalid JSON: value is not a number');
                return false;
            }
        }
        return true;
    };
    return ConditionValue;
}());
exports.default = ConditionValue;
