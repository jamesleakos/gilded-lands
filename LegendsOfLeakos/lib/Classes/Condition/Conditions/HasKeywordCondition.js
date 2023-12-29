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
var RuntimeCondition_1 = __importDefault(require("../RuntimeCondition"));
var Condition_1 = require("../../../Enums/Condition");
var Keyword_1 = require("../../../Enums/Keyword");
var AbilityKeywordRuntimeEntity_1 = __importDefault(require("../../Entity/AbilityKeywordRuntimeEntity"));
var HasKeywordCondition = /** @class */ (function (_super) {
    __extends(HasKeywordCondition, _super);
    function HasKeywordCondition(keywordType) {
        var _this = _super.call(this) || this;
        _this.conditionType = Condition_1.ConditionType.HasKeywordOfType;
        _this.keywordType = keywordType;
        return _this;
    }
    HasKeywordCondition.prototype.isTrue = function (entityInstanceId, sourceIntanceId, state) {
        // checks
        var entity = state.getEntityFromAnywhere(entityInstanceId);
        if (entity === null) {
            throw new Error('HasKeywordCardCondition requires a valid entity');
        }
        if (entity instanceof AbilityKeywordRuntimeEntity_1.default === false) {
            throw new Error('HasKeywordCardCondition requires a AbilityKeywordRuntimeEntity');
        }
        var keywordEntity = entity;
        // checks over
        return keywordEntity.hasKeyword(this.keywordType);
    };
    // #region Runtime Utility Methods
    HasKeywordCondition.prototype.getReadableString = function (gameProperties) {
        return "Has keyword ".concat(this.keywordType);
    };
    // #endregion
    // #region JSON
    HasKeywordCondition.prototype.toJSON = function () {
        return {
            conditionType: Condition_1.ConditionType[this.conditionType],
            keywordType: Keyword_1.KeywordType[this.keywordType],
        };
    };
    HasKeywordCondition.prototype.clone = function () {
        return new HasKeywordCondition(this.keywordType);
    };
    HasKeywordCondition.fromRuntimeJSON = function (json) {
        return new HasKeywordCondition(Keyword_1.KeywordType[json.keywordType]);
    };
    HasKeywordCondition.fromLibraryJSON = function (json) {
        return new HasKeywordCondition(Keyword_1.KeywordType[json.data.keywordType.value]);
    };
    HasKeywordCondition.isLibraryJSONValid = function (json) {
        if (json.conditionType &&
            Object.values(Condition_1.ConditionType)
                .filter(function (value) { return typeof value === 'string'; })
                .includes(json.conditionType) &&
            json.keywordType &&
            Object.values(Keyword_1.KeywordType)
                .filter(function (value) { return typeof value === 'string'; })
                .includes(json.keywordType)) {
            return true;
        }
        return false;
    };
    // #endregion
    // #region Builder Methods
    HasKeywordCondition.createSampleLibraryJSON = function () {
        return {
            conditionType: Condition_1.ConditionType[Condition_1.ConditionType.HasKeywordOfType],
            data: {
                keywordType: {
                    type: 'Enum',
                    enum: 'KeywordType',
                    value: Keyword_1.KeywordType[Keyword_1.KeywordType.DamageModification],
                },
            },
        };
    };
    return HasKeywordCondition;
}(RuntimeCondition_1.default));
RuntimeCondition_1.default.registerFromLibraryJSON(Condition_1.ConditionType.HasKeywordOfType, HasKeywordCondition.fromLibraryJSON);
RuntimeCondition_1.default.registerFromRuntimeJSON(Condition_1.ConditionType.HasKeywordOfType, HasKeywordCondition.fromRuntimeJSON);
RuntimeCondition_1.default.registerIsLibraryJSONValid(Condition_1.ConditionType.HasKeywordOfType, HasKeywordCondition.isLibraryJSONValid);
RuntimeCondition_1.default.registerSampleLibraryJSON(Condition_1.ConditionType.HasKeywordOfType, HasKeywordCondition.createSampleLibraryJSON);
exports.default = HasKeywordCondition;
