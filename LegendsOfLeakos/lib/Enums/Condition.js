"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionMethods = exports.ConditionTargetType = exports.ConditionType = void 0;
var ConditionType;
(function (ConditionType) {
    ConditionType[ConditionType["HasKeywordOfType"] = 0] = "HasKeywordOfType";
    ConditionType[ConditionType["EntitiesInSameZone"] = 1] = "EntitiesInSameZone";
    ConditionType[ConditionType["CardIsInAcceptableZone"] = 2] = "CardIsInAcceptableZone";
})(ConditionType || (ConditionType = {}));
exports.ConditionType = ConditionType;
var ConditionTargetType;
(function (ConditionTargetType) {
    ConditionTargetType[ConditionTargetType["SingleTarget"] = 0] = "SingleTarget";
    ConditionTargetType[ConditionTargetType["TargetEntityPlusSourceEntity"] = 1] = "TargetEntityPlusSourceEntity";
    ConditionTargetType[ConditionTargetType["TargetEntityPlusReliantEntities"] = 2] = "TargetEntityPlusReliantEntities";
})(ConditionTargetType || (ConditionTargetType = {}));
exports.ConditionTargetType = ConditionTargetType;
var ConditionMethods = /** @class */ (function () {
    function ConditionMethods() {
    }
    ConditionMethods.conditionTargetType = function (conditionType) {
        switch (conditionType) {
            case ConditionType.HasKeywordOfType:
                return ConditionTargetType.SingleTarget;
            case ConditionType.EntitiesInSameZone:
                return ConditionTargetType.TargetEntityPlusSourceEntity;
            case ConditionType.CardIsInAcceptableZone:
                return ConditionTargetType.SingleTarget;
            default:
                throw new Error('Invalid ConditionType');
        }
    };
    return ConditionMethods;
}());
exports.ConditionMethods = ConditionMethods;
