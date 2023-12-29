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
var RuntimeKeyword_1 = __importDefault(require("../RuntimeKeyword"));
var Keyword_1 = require("../../../../Enums/Keyword");
var RuntimeCondition_1 = __importDefault(require("../../../Condition/RuntimeCondition"));
var AttributeKeyword = /** @class */ (function (_super) {
    __extends(AttributeKeyword, _super);
    function AttributeKeyword(myEntityId, indexForUpgrades, setDescription, setIsPermanent, setDuration, isActive, imageName, conditions, attribute) {
        var _this = _super.call(this) || this;
        _this.myEntityInstanceId = myEntityId;
        _this.keywordType = Keyword_1.KeywordType.Attribute;
        _this.indexForUpgrades = indexForUpgrades;
        _this.description = setDescription;
        _this.isPermanent = setIsPermanent;
        _this.duration = setDuration;
        _this.isActive = isActive;
        _this.imageName = imageName;
        _this.conditions = conditions;
        _this.attribute = attribute;
        return _this;
    }
    // #region JSON
    AttributeKeyword.prototype.toJSON = function () {
        return {
            keywordType: Keyword_1.KeywordType[this.keywordType],
            myEntityInstanceId: this.myEntityInstanceId,
            indexForUpgrades: this.indexForUpgrades,
            description: this.description,
            isPermanent: this.isPermanent,
            duration: this.duration,
            isActive: this.isActive,
            imageName: this.imageName,
            conditions: this.conditions.map(function (c) { return c.toJSON(); }),
            attribute: Keyword_1.Attribute[this.attribute],
        };
    };
    AttributeKeyword.prototype.clone = function () {
        return new AttributeKeyword(this.myEntityInstanceId, this.indexForUpgrades, this.description, this.isPermanent, this.duration, this.isActive, this.imageName, this.conditions.map(function (c) { return c.clone(); }), this.attribute);
    };
    AttributeKeyword.fromRuntimeJSON = function (json) {
        return new AttributeKeyword(json.myEntityInstanceId, json.indexForUpgrades, json.description, json.isPermanent, json.duration, json.isActive, json.imageName, json.conditions.map(function (c) { return RuntimeCondition_1.default.fromRuntimeJSON(c); }), Keyword_1.Attribute[json.attribute]);
    };
    AttributeKeyword.fromLibraryJSON = function (myEntityInstanceId, json) {
        return new AttributeKeyword(myEntityInstanceId, json.indexForUpgrades, json.description, json.isPermanent, json.duration, json.isActive, json.imageName, json.conditions.map(function (c) { return RuntimeCondition_1.default.fromLibraryJSON(c); }), Keyword_1.Attribute[json.data.attribute.value]);
    };
    AttributeKeyword.isLibraryJSONValid = function (json) {
        if (json.keywordType &&
            Object.values(Keyword_1.KeywordType)
                .filter(function (value) { return typeof value === 'string'; })
                .includes(json.keywordType) &&
            json.data.attribute &&
            Object.values(Keyword_1.Attribute)
                .filter(function (value) { return typeof value === 'string'; })
                .includes(json.data.attribute.value)) {
            return true;
        }
        return false;
    };
    AttributeKeyword.createSampleLibraryJSON = function () {
        return {
            keywordType: Keyword_1.KeywordType[Keyword_1.KeywordType.Attribute],
            indexForUpgrades: 0,
            description: 'Attribute',
            isPermanent: true,
            duration: 0,
            isActive: true,
            imageName: 'Attribute',
            conditions: [],
            data: {
                attribute: {
                    type: 'Enum',
                    enum: 'Attribute',
                    value: Keyword_1.Attribute[Keyword_1.Attribute.Impetus],
                },
            },
        };
    };
    return AttributeKeyword;
}(RuntimeKeyword_1.default));
exports.default = AttributeKeyword;
RuntimeKeyword_1.default.registerFromLibraryJSON(Keyword_1.KeywordType.Attribute, AttributeKeyword.fromLibraryJSON);
RuntimeKeyword_1.default.registerFromRuntimeJSON(Keyword_1.KeywordType.Attribute, AttributeKeyword.fromRuntimeJSON);
RuntimeKeyword_1.default.registerIsLibraryJSONValid(Keyword_1.KeywordType.Attribute, AttributeKeyword.isLibraryJSONValid);
RuntimeKeyword_1.default.registerSampleLibraryJSON(Keyword_1.KeywordType.Attribute, AttributeKeyword.createSampleLibraryJSON);
