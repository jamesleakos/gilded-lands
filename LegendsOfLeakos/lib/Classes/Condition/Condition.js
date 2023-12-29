"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Condition_1 = require("../../Enums/Condition");
var ConditionValue_1 = __importDefault(require("./ConditionValue"));
var RuntimeCondition = /** @class */ (function () {
    function RuntimeCondition() {
        this.conditionValues = [];
        // #endregion
    }
    RuntimeCondition.prototype.getConditionValue = function (conditionValueEnum) {
        return this.conditionValues.find(function (x) { return x.conditionValueType === conditionValueEnum; });
    };
    RuntimeCondition.prototype.requiredConditionValues = function () {
        return [];
    };
    RuntimeCondition.prototype.assignConditionValues = function (conditionType, conditionValues) {
        this.conditionType = conditionType;
        for (var _i = 0, conditionValues_1 = conditionValues; _i < conditionValues_1.length; _i++) {
            var cv = conditionValues_1[_i];
            this.conditionValues.push(new ConditionValue_1.default(cv.conditionValueType, cv.values));
        }
    };
    RuntimeCondition.registerCondition = function (type, ctor) {
        this.conditionConstructors[type] = ctor;
    };
    RuntimeCondition.createCondition = function (conditionType, conditionValues) {
        var ConditionCtor = this.conditionConstructors[conditionType];
        if (!ConditionCtor) {
            // Handle error: the conditionType is not registered
            throw new Error('Condition type not registered');
        }
        var outCondition = new ConditionCtor(conditionType, conditionValues);
        for (var _i = 0, conditionValues_2 = conditionValues; _i < conditionValues_2.length; _i++) {
            var cv = conditionValues_2[_i];
            if (!outCondition.requiredConditionValues().includes(cv.conditionValueType)) {
                throw new Error('Something not implemented here');
            }
        }
        return outCondition;
    };
    RuntimeCondition.createConditionForDeckBuilder = function (conditionType) {
        var condition = this.createCondition(conditionType, []);
        for (var _i = 0, _a = condition.requiredConditionValues(); _i < _a.length; _i++) {
            var cv = _a[_i];
            var temp = new ConditionValue_1.default(cv, []);
            temp.values.push(0);
            condition.conditionValues.push(temp);
        }
        return condition;
    };
    // #endregion
    // #region JSON
    RuntimeCondition.prototype.toJSON = function () {
        return {
            conditionType: Condition_1.ConditionType[this.conditionType],
            conditionValues: this.conditionValues.map(function (x) { return x.toJSON(); }),
        };
    };
    RuntimeCondition.fromJSON = function (json) {
        var condition = this.createCondition(Condition_1.ConditionType[json.conditionType], json.conditionValues.map(function (x) { return ConditionValue_1.default.fromJSON(x); }));
        return condition;
    };
    RuntimeCondition.isJSONValid = function (json) {
        if (typeof json.conditionType !== 'string') {
            console.log('Invalid JSON: conditionType is not a string');
            return false;
        }
        if (!Object.values(Condition_1.ConditionType).includes(json.conditionType)) {
            console.log('Invalid JSON: conditionType is not a valid ConditionType');
            return false;
        }
        if (!Array.isArray(json.conditionValues)) {
            console.log('Invalid JSON: conditionValues is not an array');
            return false;
        }
        for (var _i = 0, _a = json.conditionValues; _i < _a.length; _i++) {
            var cv = _a[_i];
            if (!ConditionValue_1.default.isJSONValid(cv)) {
                console.log('Invalid JSON: conditionValue is not valid');
                return false;
            }
        }
        return true;
    };
    // #region Static Condition Factory
    RuntimeCondition.conditionConstructors = {};
    return RuntimeCondition;
}());
exports.default = RuntimeCondition;
