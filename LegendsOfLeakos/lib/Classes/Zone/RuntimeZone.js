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
var Zone_1 = require("../../Enums/Zone");
var RuntimeCard_1 = __importDefault(require("../Card/RuntimeCard"));
var RuntimeEnchantment_1 = __importDefault(require("../Enchantment/RuntimeEnchantment"));
var TargetableRuntimeEntity_1 = __importDefault(require("../Entity/TargetableRuntimeEntity"));
var GameProperties_1 = __importDefault(require("../Game/GameProperties"));
var RuntimeZone = /** @class */ (function (_super) {
    __extends(RuntimeZone, _super);
    // I don't like the idea of these - it's hard to track and hard to copy
    // onZoneChanged: (numCards: number) => void;
    // onCardAdded: (card: RuntimeCard) => void;
    // onCardRemoved: (card: RuntimeCard) => void;
    function RuntimeZone(instanceId, name, zoneEnum, ownerPlayerUserId, cards, enchantments) {
        var _this = _super.call(this) || this;
        _this.cards = [];
        _this.enchantments = [];
        // #endregion
        // #region JSON
        _this.clone = function () {
            var clone = new RuntimeZone(_this.instanceId, _this.name, _this.zoneEnum, _this.ownerPlayerUserId, _this.cards.map(function (card) { return RuntimeCard_1.default.fromRuntimeJSON(card.toJSON()); }), _this.enchantments.map(function (enchantment) {
                return RuntimeEnchantment_1.default.fromRuntimeJSON(enchantment.toJSON());
            }));
            return clone;
        };
        _this.instanceId = instanceId;
        _this.name = name;
        _this.zoneEnum = zoneEnum;
        _this.ownerPlayerUserId = ownerPlayerUserId;
        _this.cards = cards;
        _this.enchantments = enchantments;
        return _this;
    }
    RuntimeZone.prototype.preResolveEffect = function (e, sourceEntity, gameState, targetInfoList) {
        for (var _i = 0, _a = this.enchantments; _i < _a.length; _i++) {
            var enchantment = _a[_i];
            enchantment.preResolveEffect(e, sourceEntity, gameState, targetInfoList);
        }
        for (var _b = 0, _c = this.cards; _b < _c.length; _b++) {
            var card = _c[_b];
            card.preResolveEffect(e, sourceEntity, gameState, targetInfoList);
        }
    };
    RuntimeZone.prototype.postResolveEffect = function (e, sourceEntity, gameState, targetInfoList) {
        for (var _i = 0, _a = this.enchantments; _i < _a.length; _i++) {
            var enchantment = _a[_i];
            enchantment.postResolveEffect(e, sourceEntity, gameState, targetInfoList);
        }
        for (var _b = 0, _c = this.cards; _b < _c.length; _b++) {
            var card = _c[_b];
            card.postResolveEffect(e, sourceEntity, gameState, targetInfoList);
        }
    };
    // #region add and remove cards
    RuntimeZone.prototype.addCard = function (card) {
        var cardToAdd = this.cards.find(function (c) { return c.instanceId === card.instanceId; });
        if (!!cardToAdd) {
            console.log("ERROR: RuntimeZone.getLibraryZone: Cannot add card ".concat(card.instanceId, " to zone ").concat(this.instanceId, " because it already exists in that zone"));
            return;
        }
        if (this.getLibraryZone().hasMaxCards &&
            this.cards.length >= this.getLibraryZone().maxCards) {
            console.log("Cannot add card ".concat(card.instanceId, " to zone ").concat(this.instanceId, " because it is full"));
            return;
        }
        this.cards.push(card);
        card.residingZoneInstanceId = this.instanceId;
    };
    RuntimeZone.prototype.addCardCreatedByEffect = function (card) {
        var cardToAdd = this.cards.find(function (c) { return c.instanceId === card.instanceId; });
        if (cardToAdd === undefined) {
            this.addCard(card);
        }
    };
    RuntimeZone.prototype.removeCard = function (card) {
        var cardToRemove = this.cards.find(function (c) { return c.instanceId === card.instanceId; });
        if (cardToRemove === undefined) {
            return;
        }
        this.cards = this.cards.filter(function (c) { return c.instanceId !== cardToRemove.instanceId; });
        // if (this.onZoneChanged) {
        //   this.onZoneChanged(this.numCards);
        // }
        // if (this.onCardRemoved) {
        //   this.onCardRemoved(card);
        // }
    };
    // #endregion
    // #region utilities
    RuntimeZone.prototype.getLibraryZone = function () {
        var _this = this;
        var lib = GameProperties_1.default.gameZones.find(function (z) { return z.zoneEnum === _this.zoneEnum; });
        if (!lib) {
            console.log("ERROR: RuntimeZone.getLibraryZone: Could not find library zone for ".concat(this.zoneEnum));
            return;
        }
        return lib;
    };
    RuntimeZone.prototype.toJSONFromRuntimeCopyAllCards = function () {
        return {
            instanceId: this.instanceId,
            name: this.name,
            zoneEnum: this.zoneEnum,
            ownerPlayerUserId: this.ownerPlayerUserId,
            cards: this.cards.map(function (c) { return c.toJSON(); }),
            enchantments: this.enchantments.map(function (e) { return e.toJSON(); }),
        };
    };
    RuntimeZone.prototype.toJSONForPlayer = function () {
        var libraryZone = this.getLibraryZone();
        var showCards = libraryZone.ownerVisibility === Zone_1.ZoneOwnerVisibility.Visible;
        return {
            instanceId: this.instanceId,
            name: this.name,
            zoneEnum: this.zoneEnum,
            ownerPlayerUserId: this.ownerPlayerUserId,
            cards: showCards ? this.cards.map(function (c) { return c.toJSON(); }) : [],
            enchantments: this.enchantments.map(function (e) { return e.toJSON(); }),
        };
    };
    RuntimeZone.prototype.toJSONForOpponent = function () {
        var libraryZone = this.getLibraryZone();
        var showCards = libraryZone.opponentVisibility === Zone_1.ZoneOpponentVisibility.Visible;
        return {
            instanceId: this.instanceId,
            name: this.name,
            zoneEnum: this.zoneEnum,
            ownerPlayerUserId: this.ownerPlayerUserId,
            cards: showCards ? this.cards.map(function (c) { return c.toJSON(); }) : [],
            enchantments: this.enchantments.map(function (e) { return e.toJSON(); }),
        };
    };
    RuntimeZone.fromRuntimeJSON = function (json) {
        var zone = new RuntimeZone(json.instanceId, json.name, json.zoneEnum, json.ownerPlayerUserId, json.cards.map(function (c) { return RuntimeCard_1.default.fromRuntimeJSON(c); }), json.enchantments.map(function (e) { return RuntimeEnchantment_1.default.fromRuntimeJSON(e); }));
        return zone;
    };
    //** Create a RuntimeZone from a Library Zone - NO cards or enchantments */
    RuntimeZone.fromLibraryJSON = function (json) {
        var zone = new RuntimeZone(json.instanceId, json.name, json.zoneEnum, json.ownerPlayerUserId, [], // cards
        [] // enchantments
        );
        return zone;
    };
    return RuntimeZone;
}(TargetableRuntimeEntity_1.default));
exports.default = RuntimeZone;
