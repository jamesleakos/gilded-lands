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
var DepthAmountDeckRequirement = /** @class */ (function (_super) {
    __extends(DepthAmountDeckRequirement, _super);
    function DepthAmountDeckRequirement(biomeDepth, amount) {
        var _this = _super.call(this) || this;
        _this.type = DeckRequirements_1.DeckReqType.DepthAmount;
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.BiomeDepth, biomeDepth);
        _this.reqValues.set(DeckRequirements_1.DeckReqVariable.Amount, amount);
        return _this;
    }
    DepthAmountDeckRequirement.prototype.myRequiredValues = function () {
        return [DeckRequirements_1.DeckReqVariable.BiomeDepth, DeckRequirements_1.DeckReqVariable.Amount];
    };
    DepthAmountDeckRequirement.prototype.canBeAdded = function (myBiome, myCard) {
        return this.isRequirementMet(myBiome, myCard.libraryId);
    };
    DepthAmountDeckRequirement.prototype.isRequirementMet = function (myBiome, libraryCardID) {
        var _this = this;
        var counter = 0;
        var landTiles = myBiome.landTiles.filter(function (lt) {
            return lt.depth === _this.reqValues.get(DeckRequirements_1.DeckReqVariable.BiomeDepth);
        });
        if (landTiles !== undefined) {
            counter += landTiles.length;
        }
        return counter >= this.reqValues.get(DeckRequirements_1.DeckReqVariable.Amount);
    };
    DepthAmountDeckRequirement.prototype.requirementToText = function (gameManager) {
        return (this.reqValues.get(DeckRequirements_1.DeckReqVariable.Amount) +
            ' of ' +
            this.reqValues.get(DeckRequirements_1.DeckReqVariable.BiomeDepth));
    };
    DepthAmountDeckRequirement.fromJSON = function (json) {
        var amount = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.Amount; }).value;
        var biomeDepth = json.reqValues.find(function (c) { return c.key === DeckRequirements_1.DeckReqVariable.BiomeDepth; }).value;
        if (!biomeDepth || !amount) {
            throw new Error('JSON parsing error');
        }
        return new DepthAmountDeckRequirement(biomeDepth, amount);
    };
    return DepthAmountDeckRequirement;
}(DeckRequirement_1.default));
DeckRequirement_1.default.registerRequirement(DeckRequirements_1.DeckReqType.CardAmount, DepthAmountDeckRequirement.fromJSON);
exports.default = DepthAmountDeckRequirement;
