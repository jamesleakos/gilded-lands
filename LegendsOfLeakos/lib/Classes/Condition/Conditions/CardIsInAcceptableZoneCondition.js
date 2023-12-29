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
var RuntimeCondition_1 = __importDefault(require("../RuntimeCondition"));
var RuntimeCard_1 = __importDefault(require("../../Card/RuntimeCard"));
var Condition_1 = require("../../../Enums/Condition");
var CardIsInAcceptableZoneCondition = /** @class */ (function (_super) {
    __extends(CardIsInAcceptableZoneCondition, _super);
    function CardIsInAcceptableZoneCondition(conditionType, conditionValues) {
        var _this = _super.call(this) || this;
        _this.assignConditionValues(conditionType, conditionValues);
        return _this;
    }
    CardIsInAcceptableZoneCondition.prototype.requiredConditionValues = function () {
        var tempList = __spreadArray([
            Condition_1.ConditionValueType.IsInZoneOfZoneEnum
        ], _super.prototype.requiredConditionValues.call(this), true);
        return tempList;
    };
    CardIsInAcceptableZoneCondition.prototype.getReadableString = function () {
        var zones = '';
        for (var _i = 0, _a = this.getConditionValue(Condition_1.ConditionValueType.IsInZoneOfZoneEnum).values; _i < _a.length; _i++) {
            var i = _a[_i];
            zones = zones + i + '; ';
        }
        return 'Is in zone ' + zones;
    };
    CardIsInAcceptableZoneCondition.prototype.isTrue = function (targetEntityInstanceId, sourceEntityInstanceId, gameState) {
        var entity = gameState.getEntityFromAnywhere(targetEntityInstanceId);
        if (entity === null) {
            throw new Error('CardIsInAcceptableZoneCondition requires a valid entity');
        }
        if (entity instanceof RuntimeCard_1.default === false) {
            throw new Error('CardIsInAcceptableZoneCondition requires a RuntimeCard');
        }
        // checks over
        var card = entity;
        var zoneEnums = this.getConditionValue(Condition_1.ConditionValueType.IsInZoneOfZoneEnum).values;
        var cardZoneEnum = gameState.getZoneByInstanceId(card.residingZoneInstanceId).zoneEnum;
        return zoneEnums.includes(cardZoneEnum);
    };
    return CardIsInAcceptableZoneCondition;
}(RuntimeCondition_1.default));
RuntimeCondition_1.default.registerCondition(Condition_1.ConditionType.CardIsInAcceptableZone, CardIsInAcceptableZoneCondition);
exports.default = CardIsInAcceptableZoneCondition;
