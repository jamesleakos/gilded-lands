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
var LandAndBiome_1 = require("../../Enums/LandAndBiome");
var FullLandDepthPerCardRequirement = /** @class */ (function (_super) {
    __extends(FullLandDepthPerCardRequirement, _super);
    function FullLandDepthPerCardRequirement(biomeType, biomeDepth, perCardAmount, amount) {
        var _this = _super.call(this) || this;
        _this.type = DeckRequirements_1.DeckReqType.FullLandDepthPerCard;
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.BiomeType, biomeType);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.BiomeDepth, biomeDepth);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.PerCardAmount, perCardAmount);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.Amount, amount);
        return _this;
    }
    FullLandDepthPerCardRequirement.prototype.myRequiredValues = function () {
        return [
            DeckRequirements_1.DeckReqVariable.BiomeType,
            DeckRequirements_1.DeckReqVariable.BiomeDepth,
            DeckRequirements_1.DeckReqVariable.PerCardAmount,
            DeckRequirements_1.DeckReqVariable.Amount,
        ];
    };
    FullLandDepthPerCardRequirement.prototype.canBeAdded = function (myBiome, myCard) {
        return this.wouldRequirementBeMetAtSomeNumberOfMyCard(myBiome, myBiome.getCardsCountByLibraryID(myCard.libraryId) + 1);
    };
    FullLandDepthPerCardRequirement.prototype.isRequirementMet = function (myBiome, libraryCardID) {
        return this.wouldRequirementBeMetAtSomeNumberOfMyCard(myBiome, myBiome.getCardsCountByLibraryID(libraryCardID));
    };
    FullLandDepthPerCardRequirement.prototype.wouldRequirementBeMetAtSomeNumberOfMyCard = function (myBiome, numberOfMyCard) {
        var _this = this;
        if (myBiome.biomeType !== this.reqValues.get(DeckRequirements_1.DeckReqVariable.BiomeType))
            return false;
        var testingEntry;
        if (this.reqValues.get(DeckRequirements_1.DeckReqVariable.BiomeDepth) ===
            LandAndBiome_1.BiomeDepth.all) {
            testingEntry = myBiome;
        }
        else {
            var subEntry = myBiome.subBiomes.find(function (sb) { return sb.biomeDepth === _this.reqValues.get(DeckRequirements_1.DeckReqVariable.BiomeDepth); });
            if (subEntry === undefined)
                return false;
            testingEntry = subEntry;
        }
        if ((testingEntry.landTiles.length /
            this.reqValues.get(DeckRequirements_1.DeckReqVariable.Amount)) *
            this.reqValues.get(DeckRequirements_1.DeckReqVariable.PerCardAmount) <
            numberOfMyCard)
            return false;
        return true;
    };
    FullLandDepthPerCardRequirement.prototype.requirementToText = function (gameManager) {
        return (this.reqValues.get(DeckRequirements_1.DeckReqVariable.Amount) +
            ' of ' +
            this.reqValues.get(DeckRequirements_1.DeckReqVariable.BiomeDepth) +
            ' ' +
            this.reqValues.get(DeckRequirements_1.DeckReqVariable.BiomeType) +
            ' per ' +
            this.reqValues.get(DeckRequirements_1.DeckReqVariable.PerCardAmount));
    };
    FullLandDepthPerCardRequirement.fromJSON = function (json) {
        var amount = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.Amount; }).value;
        var biomeType = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.BiomeType; }).value;
        var biomeDepth = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.BiomeDepth; }).value;
        var perCardAmount = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.PerCardAmount; }).value;
        if (!biomeType || !biomeDepth || !perCardAmount || !amount)
            throw new Error('Missing value in json');
        return new FullLandDepthPerCardRequirement(biomeType, biomeDepth, perCardAmount, amount);
    };
    return FullLandDepthPerCardRequirement;
}(DeckRequirement_1.default));
DeckRequirement_1.default.registerRequirement(DeckRequirements_1.DeckReqType.CardAmount, FullLandDepthPerCardRequirement.fromJSON);
exports.default = FullLandDepthPerCardRequirement;
