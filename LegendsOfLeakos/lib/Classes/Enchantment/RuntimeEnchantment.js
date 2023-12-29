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
var AbilityKeywordRuntimeEntity_1 = __importDefault(require("../Entity/AbilityKeywordRuntimeEntity"));
var RuntimeKeyword_1 = __importDefault(require("../Keyword/RuntimeKeyword/RuntimeKeyword"));
var RuntimeAbility_1 = __importDefault(require("../Ability/RuntimeAbility"));
var RuntimeEnchantment = /** @class */ (function (_super) {
    __extends(RuntimeEnchantment, _super);
    function RuntimeEnchantment(name, imageName, libraryID, instanceId, creatingEntityInstanceId, creatingPlayerUserId, runtimeKeywords, abilities, residingZoneInstanceId, residingCardInstanceId) {
        if (residingCardInstanceId === void 0) { residingCardInstanceId = null; }
        var _this = _super.call(this) || this;
        _this.libraryID = libraryID;
        _this.ownerPlayerUserId = creatingPlayerUserId;
        _this.instanceId = instanceId;
        _this.residingZoneInstanceId = residingZoneInstanceId;
        _this.creatingEntityInstanceId = creatingEntityInstanceId;
        _this.residingCardInstanceId = residingCardInstanceId;
        _this.name = name;
        _this.imageName = imageName;
        _this.keywords = runtimeKeywords;
        _this.abilities = abilities;
        return _this;
    }
    RuntimeEnchantment.prototype.toJSON = function () {
        var json = {
            // start super
            name: this.name,
            instanceId: this.instanceId,
            residingZoneInstanceId: this.residingZoneInstanceId,
            ownerPlayerUserId: this.ownerPlayerUserId,
            runtimeKeywords: this.keywords.map(function (k) { return k.toJSON(); }),
            abilities: this.abilities.map(function (a) { return a.toJSON(); }),
            // end super
            imageName: this.imageName,
            libraryID: this.libraryID,
            creatingEntityInstanceId: this.creatingEntityInstanceId,
            residingCardInstanceId: this.residingCardInstanceId,
        };
        return json;
    };
    RuntimeEnchantment.fromRuntimeJSON = function (json) {
        var runtimeEnchantment = new RuntimeEnchantment(json.name, json.imageName, json.libraryID, json.instanceId, json.creatingEntityInstanceId, json.ownerPlayerUserId, json.runtimeKeywords.map(function (keyword) {
            return RuntimeKeyword_1.default.fromRuntimeJSON(keyword);
        }), json.abilities.map(function (ability) {
            return RuntimeAbility_1.default.fromRuntimeJSON(ability);
        }), json.residingZoneInstanceId, json.residingCardInstanceId);
        return runtimeEnchantment;
    };
    RuntimeEnchantment.fromLibraryJSON = function (json, creatingEntity, ownerPlayer, residingZone, residingCard) {
        if (residingCard === void 0) { residingCard = null; }
        var runtimeEnchantment = new RuntimeEnchantment(json.name, json.imageName, json.libraryID, json.instanceId, creatingEntity.instanceId, ownerPlayer.userId, json.runtimeKeywords.map(function (keyword) {
            return RuntimeKeyword_1.default.fromLibraryJSON(creatingEntity.instanceId, keyword);
        }), json.abilities.map(function (ability) {
            return RuntimeAbility_1.default.fromLibraryJSON(ability);
        }), residingZone.instanceId, residingCard.instanceId);
        return runtimeEnchantment;
    };
    return RuntimeEnchantment;
}(AbilityKeywordRuntimeEntity_1.default));
exports.default = RuntimeEnchantment;
