"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Condition_1 = require("../../Enums/Condition");
var RuntimeCondition = /** @class */ (function () {
    function RuntimeCondition() {
    }
    RuntimeCondition.registerFromRuntimeJSON = function (type, method) {
        this.fromRuntimeJSONMethods[type] = method;
    };
    RuntimeCondition.fromRuntimeJSON = function (json) {
        var conditionType = Condition_1.ConditionType[json.conditionType];
        var method = this.fromRuntimeJSONMethods[conditionType];
        if (!method) {
            throw new Error('Condition type not registered for: ' + Condition_1.ConditionType[conditionType]);
        }
        return method(json);
    };
    RuntimeCondition.registerFromLibraryJSON = function (type, method) {
        this.fromLibraryJSONMethods[type] = method;
    };
    RuntimeCondition.fromLibraryJSON = function (json) {
        var conditionType = Condition_1.ConditionType[json.conditionType];
        var method = this.fromLibraryJSONMethods[conditionType];
        if (!method) {
            throw new Error('Condition type not registered for: ' + Condition_1.ConditionType[conditionType]);
        }
        return method(json);
    };
    RuntimeCondition.registerIsLibraryJSONValid = function (type, method) {
        this.isLibraryJSONValidMethods[type] = method;
    };
    RuntimeCondition.isLibraryJSONValid = function (json) {
        var conditionType = Condition_1.ConditionType[json.conditionType];
        var method = this.isLibraryJSONValidMethods[conditionType];
        if (!method) {
            throw new Error('Condition type not registered for: ' + Condition_1.ConditionType[conditionType]);
        }
        return method(json);
    };
    RuntimeCondition.registerSampleLibraryJSON = function (type, creator) {
        this.sampleLibraryJSONMethods[type] = creator;
    };
    RuntimeCondition.createSampleLibraryJSON = function (type) {
        var method = this.sampleLibraryJSONMethods[type];
        if (!method) {
            throw new Error('Condition type not registered for: ' + Condition_1.ConditionType[type]);
        }
        return method();
    };
    // #endregion
    // #region fromRuntimeJSON methods
    RuntimeCondition.fromRuntimeJSONMethods = {};
    // #endregion
    // #region fromLibraryJSON methods
    RuntimeCondition.fromLibraryJSONMethods = {};
    // #endregion
    // #region isLibraryJSONValid methods
    RuntimeCondition.isLibraryJSONValidMethods = {};
    // #endregion
    // #region Register Sample Condition Creators
    RuntimeCondition.sampleLibraryJSONMethods = {};
    return RuntimeCondition;
}());
exports.default = RuntimeCondition;
