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
var FullCardPerCardRequirement = /** @class */ (function (_super) {
    __extends(FullCardPerCardRequirement, _super);
    function FullCardPerCardRequirement(libraryId, perCardAmount, amount) {
        var _this = _super.call(this) || this;
        _this.type = DeckRequirements_1.DeckReqType.FullCardPerCard;
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.LibraryCardId, libraryId);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.PerCardAmount, perCardAmount);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.Amount, amount);
        return _this;
    }
    FullCardPerCardRequirement.prototype.myRequiredValues = function () {
        return [
            DeckRequirements_1.DeckReqVariable.LibraryCardId,
            DeckRequirements_1.DeckReqVariable.PerCardAmount,
            DeckRequirements_1.DeckReqVariable.Amount,
        ];
    };
    FullCardPerCardRequirement.prototype.canBeAdded = function (myBiome, myCard) {
        return this.wouldRequirementBeMetAtSomeNumberOfMyCard(myBiome, myBiome.getCardsCountByLibraryID(myCard.libraryId) + 1);
    };
    FullCardPerCardRequirement.prototype.isRequirementMet = function (myBiome, libraryCardID) {
        return this.wouldRequirementBeMetAtSomeNumberOfMyCard(myBiome, myBiome.getCardsCountByLibraryID(libraryCardID));
    };
    FullCardPerCardRequirement.prototype.wouldRequirementBeMetAtSomeNumberOfMyCard = function (myBiome, numberOfMyCard) {
        var _this = this;
        var deckEntry = myBiome.cards.find(function (c) { return c.libraryId === _this.reqValues.get(DeckRequirements_1.DeckReqVariable.LibraryCardId); });
        if (deckEntry === undefined)
            return false;
        if ((deckEntry.amount / this.reqValues.get(DeckRequirements_1.DeckReqVariable.Amount)) *
            this.reqValues.get(DeckRequirements_1.DeckReqVariable.PerCardAmount) <
            numberOfMyCard)
            return false;
        return true;
    };
    FullCardPerCardRequirement.prototype.requirementToText = function (gameManager) {
        var _this = this;
        var cardInLibrary = gameManager.cardLibrary.find(function (c) { return c.libraryId === _this.reqValues.get(DeckRequirements_1.DeckReqVariable.LibraryCardId); });
        return (this.reqValues.get(DeckRequirements_1.DeckReqVariable.Amount) +
            ' of ' +
            cardInLibrary.name +
            ' per ' +
            this.reqValues.get(DeckRequirements_1.DeckReqVariable.PerCardAmount));
    };
    FullCardPerCardRequirement.fromJSON = function (json) {
        var amount = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.Amount; }).value;
        var perCardAmount = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.PerCardAmount; }).value;
        var libraryId = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.LibraryCardId; }).value;
        if (!libraryId || !perCardAmount || !amount)
            throw new Error('Missing value in json');
        return new FullCardPerCardRequirement(libraryId, perCardAmount, amount);
    };
    return FullCardPerCardRequirement;
}(DeckRequirement_1.default));
DeckRequirement_1.default.registerRequirement(DeckRequirements_1.DeckReqType.CardAmount, FullCardPerCardRequirement.fromJSON);
exports.default = FullCardPerCardRequirement;
