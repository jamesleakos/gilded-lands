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
var Stat_1 = __importDefault(require("../Stat/Stat"));
var RuntimeEnchantment_1 = __importDefault(require("../Enchantment/RuntimeEnchantment"));
var RuntimeKeyword_1 = __importDefault(require("../Keyword/RuntimeKeyword/RuntimeKeyword"));
var RuntimeAbility_1 = __importDefault(require("../Ability/RuntimeAbility"));
var LibraryCardEntry_1 = __importDefault(require("../RealmsAndLand/Biome/LibraryCardEntry"));
var GameProperties_1 = __importDefault(require("../Game/GameProperties"));
var Zone_1 = require("../../Enums/Zone");
var RuntimeCard = /** @class */ (function (_super) {
    __extends(RuntimeCard, _super);
    function RuntimeCard(name, instanceId, ownerPlayerUserId, residingZoneInstanceId, keywords, abilities, libraryId, upgradesApplied, attack, health, priority, enchantments) {
        var _this = _super.call(this) || this;
        _this.upgradesApplied = [];
        _this.getStatList = function () { return [_this.attack, _this.health, _this.priority]; };
        _this.enchantments = [];
        // #region utilities
        _this.isPlayable = function (gameState) {
            var phase = GameProperties_1.default.gamePhases[gameState.currentPhaseIndex];
            if (!GameProperties_1.default.phasesCardsCanBePlayedIn.includes(phase.phaseEnum)) {
                return false;
            }
            var ownerPlayer = gameState.getPlayerInfoByUserId(_this.ownerPlayerUserId);
            var libraryCard = _this.getLibraryCard(gameState);
            if (!ownerPlayer.canPayResourceCosts(libraryCard.costs)) {
                return false;
            }
            var zone = gameState.getZoneByInstanceId(_this.residingZoneInstanceId);
            if (!zone || zone.zoneEnum !== Zone_1.ZoneEnum.Hand) {
                return false;
            }
            return true;
        };
        _this.name = name;
        _this.instanceId = instanceId;
        _this.ownerPlayerUserId = ownerPlayerUserId;
        _this.residingZoneInstanceId = residingZoneInstanceId;
        _this.keywords = keywords;
        _this.abilities = abilities;
        _this.libraryId = libraryId;
        _this.upgradesApplied = upgradesApplied;
        _this.attack = attack;
        _this.health = health;
        _this.priority = priority;
        _this.enchantments = enchantments;
        return _this;
    }
    RuntimeCard.prototype.getLibraryCard = function (gameState) {
        return gameState.gameManager.getCardFromLibraryId(this.libraryId);
    };
    // #endregion
    // #region post and pre resolve effect
    RuntimeCard.prototype.preResolveEffect = function (e, sourceEntity, gameState, targetInfoList) {
        for (var _i = 0, _a = this.enchantments; _i < _a.length; _i++) {
            var enchantment = _a[_i];
            enchantment.preResolveEffect(e, sourceEntity, gameState, targetInfoList);
        }
        _super.prototype.preResolveEffect.call(this, e, sourceEntity, gameState, targetInfoList);
    };
    RuntimeCard.prototype.postResolveEffect = function (e, sourceEntity, gameState, targetInfoList) {
        for (var _i = 0, _a = this.enchantments; _i < _a.length; _i++) {
            var enchantment = _a[_i];
            enchantment.postResolveEffect(e, sourceEntity, gameState, targetInfoList);
        }
        _super.prototype.postResolveEffect.call(this, e, sourceEntity, gameState, targetInfoList);
    };
    // #endregion
    // #region from LibraryCardEntry and from JSON (runtime and library)
    RuntimeCard.prototype.toJSON = function () {
        return {
            // super
            name: this.name,
            instanceId: this.instanceId,
            residingZoneInstanceId: this.residingZoneInstanceId,
            ownerPlayerUserId: this.ownerPlayerUserId,
            keywords: this.keywords.map(function (k) { return k.toJSON(); }),
            abilities: this.abilities.map(function (a) { return a.toJSON(); }),
            // super end
            libraryId: this.libraryId,
            upgradesApplied: this.upgradesApplied.map(function (u) { return u; }),
            attack: this.attack.toJSON(),
            health: this.health.toJSON(),
            priority: this.priority.toJSON(),
            enchantments: this.enchantments.map(function (enchantment) {
                return enchantment.toJSON();
            }),
        };
    };
    RuntimeCard.fromRuntimeJSON = function (json) {
        return new RuntimeCard(json.name, json.instanceId, json.ownerPlayerUserId, json.residingZoneInstanceId, json.keywords.map(function (k) { return RuntimeKeyword_1.default.fromRuntimeJSON(k); }), json.abilities.map(function (a) { return RuntimeAbility_1.default.fromRuntimeJSON(a); }), json.libraryId, json.upgradesApplied, Stat_1.default.fromRuntimeJSON(json.attack), Stat_1.default.fromRuntimeJSON(json.health), Stat_1.default.fromRuntimeJSON(json.priority), json.enchantments.map(function (e) { return RuntimeEnchantment_1.default.fromRuntimeJSON(e); }));
    };
    RuntimeCard.cardFromLibraryJSON = function (json, zone, ownerPlayer) {
        var instanceId = ownerPlayer.currentEntityInstanceId++;
        return new RuntimeCard(json.name, instanceId, ownerPlayer.userId, zone.instanceId, json.keywords.map(function (k) {
            return RuntimeKeyword_1.default.fromLibraryJSON(instanceId, k);
        }), json.abilities.map(function (a) { return RuntimeAbility_1.default.fromLibraryJSON(a); }), json.libraryId, [], Stat_1.default.fromLibraryJSON(json.attack), Stat_1.default.fromLibraryJSON(json.health), Stat_1.default.fromLibraryJSON(json.priority), []);
    };
    RuntimeCard.cardsFromLibraryCardEntry = function (json, zone, ownerPlayer, cardLibrary) {
        var libraryCardEntry = LibraryCardEntry_1.default.fromJSON(json);
        if (!libraryCardEntry)
            throw new Error('Invalid LibraryCardEntry');
        var libraryCard = cardLibrary.find(function (c) { return c.libraryId === libraryCardEntry.libraryId; });
        var cards = [];
        for (var i = 0; i < libraryCardEntry.amount; i++) {
            var card = RuntimeCard.cardFromLibraryJSON(libraryCard.toJSON(), zone, ownerPlayer);
            cards.push(card);
        }
        return cards;
    };
    return RuntimeCard;
}(AbilityKeywordRuntimeEntity_1.default));
exports.default = RuntimeCard;
