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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Condition_1 = __importDefault(require("../Condition"));
var EntityReliantOnEntityCondition_1 = __importDefault(require("../EntityReliantOnEntityCondition"));
var Condition_2 = require("../../../Enums/Condition");
var EntitiesInSameZoneCondition = /** @class */ (function (_super) {
    __extends(EntitiesInSameZoneCondition, _super);
    function EntitiesInSameZoneCondition(conditionType, conditionValues) {
        var _this = _super.call(this) || this;
        _this.assignConditionValues(conditionType, conditionValues);
        return _this;
    }
    EntitiesInSameZoneCondition.prototype.requiredConditionValues = function () {
        var tempList = [];
        tempList.push.apply(tempList, _super.prototype.requiredConditionValues.call(this));
        return tempList;
    };
    EntitiesInSameZoneCondition.prototype.getReadableString = function () {
        return ('Has Keyword ' +
            this.getConditionValue(Condition_2.ConditionValueType.HasKeywordOfKeywordType)
                .values[0]);
    };
    EntitiesInSameZoneCondition.prototype.isTrue = function (targetEntity, reliantEntity) {
        return (targetEntity.residingZoneInstanceId ===
            reliantEntity.residingZoneInstanceId);
    };
    return EntitiesInSameZoneCondition;
}(EntityReliantOnEntityCondition_1.default));
Condition_1.default.registerCondition(Condition_2.ConditionType.EntitiesInSameZone, EntitiesInSameZoneCondition);
exports.default = EntitiesInSameZoneCondition;
