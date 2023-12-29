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
var DeckRequirement_1 = __importDefault(require("./DeckRequirement"));
var DeckRequirements_1 = require("../../Enums/DeckRequirements");
var LandAmountDeckRequirement = /** @class */ (function (_super) {
    __extends(LandAmountDeckRequirement, _super);
    function LandAmountDeckRequirement(biomeType, amount) {
        var _this = _super.call(this) || this;
        _this.type = DeckRequirements_1.DeckReqType.LandAmount;
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.BiomeType, biomeType);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.Amount, amount);
        return _this;
    }
    LandAmountDeckRequirement.prototype.myRequiredValues = function () {
        return [DeckRequirements_1.DeckReqVariable.Amount, DeckRequirements_1.DeckReqVariable.BiomeType];
    };
    LandAmountDeckRequirement.prototype.canBeAdded = function (myBiome, myCard) {
        return this.isRequirementMet(myBiome, myCard.libraryId);
    };
    LandAmountDeckRequirement.prototype.isRequirementMet = function (biome, myCardLibraryId) {
        var _this = this;
        var landTiles = biome.landTiles.filter(function (c) {
            return c.landType === _this.reqValues.get(DeckRequirements_1.DeckReqVariable.BiomeType);
        });
        if (landTiles !== undefined) {
            return landTiles.length >= this.reqValues.get(DeckRequirements_1.DeckReqVariable.Amount);
        }
        return false;
    };
    LandAmountDeckRequirement.prototype.requirementToText = function () {
        return (this.reqValues.get(DeckRequirements_1.DeckReqVariable.Amount) +
            ' of ' +
            this.reqValues.get(DeckRequirements_1.DeckReqVariable.BiomeType));
    };
    LandAmountDeckRequirement.fromJSON = function (json) {
        var amount = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.Amount; }).value;
        var biomeType = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.BiomeType; }).value;
        if (!biomeType || !amount)
            throw new Error('Missing value in json');
        return new LandAmountDeckRequirement(biomeType, amount);
    };
    return LandAmountDeckRequirement;
}(DeckRequirement_1.default));
DeckRequirement_1.default.registerRequirement(DeckRequirements_1.DeckReqType.CardAmount, LandAmountDeckRequirement.fromJSON);
exports.default = LandAmountDeckRequirement;
