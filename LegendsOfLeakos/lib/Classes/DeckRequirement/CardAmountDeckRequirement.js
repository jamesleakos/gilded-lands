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
var CardAmountDeckRequirement = /** @class */ (function (_super) {
    __extends(CardAmountDeckRequirement, _super);
    function CardAmountDeckRequirement(libraryId, amount) {
        var _this = _super.call(this) || this;
        _this.type = DeckRequirements_1.DeckReqType.CardAmount;
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.Amount, amount);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.LibraryCardId, libraryId);
        return _this;
    }
    CardAmountDeckRequirement.prototype.myRequiredValues = function () {
        return [DeckRequirements_1.DeckReqVariable.Amount, DeckRequirements_1.DeckReqVariable.LibraryCardId];
    };
    CardAmountDeckRequirement.prototype.canBeAdded = function (myBiome, myCard) {
        return this.isRequirementMet(myBiome, myCard.libraryId);
    };
    CardAmountDeckRequirement.prototype.isRequirementMet = function (myBiome, libraryCardID) {
        var _this = this;
        var counter = 0;
        var libraryCardEntry = myBiome.cards.find(function (c) { return c.libraryId === _this.reqValues.get(DeckRequirements_1.DeckReqVariable.LibraryCardId); });
        if (libraryCardEntry !== undefined) {
            counter += libraryCardEntry.amount;
        }
        for (var _i = 0, _a = myBiome.subBiomes; _i < _a.length; _i++) {
            var subbiome = _a[_i];
            var subCardEntry = subbiome.cards.find(function (c) { return c.libraryId === _this.reqValues.get(DeckRequirements_1.DeckReqVariable.LibraryCardId); });
            if (subCardEntry !== undefined) {
                counter += subCardEntry.amount;
            }
        }
        return counter >= this.reqValues.get(DeckRequirements_1.DeckReqVariable.Amount);
    };
    CardAmountDeckRequirement.prototype.requirementToText = function (gameManager) {
        var _this = this;
        return (this.reqValues.get(DeckRequirements_1.DeckReqVariable.Amount) +
            ' of ' +
            gameManager.cardLibrary.find(function (c) { return c.libraryId === _this.reqValues.get(DeckRequirements_1.DeckReqVariable.LibraryCardId); }).name);
    };
    CardAmountDeckRequirement.fromJSON = function (json) {
        var libraryId = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.LibraryCardId; }).value;
        var amount = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.Amount; }).value;
        if (!libraryId || !amount)
            throw new Error('Missing value in json');
        return new CardAmountDeckRequirement(libraryId, amount);
    };
    return CardAmountDeckRequirement;
}(DeckRequirement_1.default));
DeckRequirement_1.default.registerRequirement(DeckRequirements_1.DeckReqType.CardAmount, CardAmountDeckRequirement.fromJSON);
exports.default = CardAmountDeckRequirement;
