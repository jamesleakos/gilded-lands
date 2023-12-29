"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Stat_1 = __importDefault(require("../Stat/Stat"));
var RuntimeZone_1 = __importDefault(require("../Zone/RuntimeZone"));
var Zone_1 = require("../../Enums/Zone");
var LandAndBiome_1 = require("../../Enums/LandAndBiome");
var PayResourceCost_1 = __importDefault(require("../PayResourceCost/PayResourceCost"));
var RuntimeRealm_1 = __importDefault(require("../RealmsAndLand/Realm/RuntimeRealm"));
var PlayerInfo = /** @class */ (function () {
    function PlayerInfo() {
        this.stats = [];
        // #endregion
    }
    PlayerInfo.prototype.clone = function () {
        var clone = new PlayerInfo();
        clone.userId = this.userId;
        clone.id = this.id;
        clone.name = this.name;
        clone.isConnected = this.isConnected;
        clone.isHuman = this.isHuman;
        clone.stats = this.stats.map(function (stat) { return stat.clone(); });
        clone.nameToStat = new Map();
        clone.idToStat = new Map();
        for (var _i = 0, _a = clone.stats; _i < _a.length; _i++) {
            var stat = _a[_i];
            clone.nameToStat.set(stat.name, stat);
            clone.idToStat.set(stat.statId, stat);
        }
        clone.zones = this.zones.map(function (zone) { return zone.clone(); });
        clone.realm = this.realm.clone();
        clone.currentEntityInstanceId = this.currentEntityInstanceId;
        clone.readyForQueue = this.readyForQueue;
        return clone;
    };
    // #region Get Cards
    PlayerInfo.prototype.getCardFromInstanceId = function (cardInstanceId) {
        for (var _i = 0, _a = this.zones; _i < _a.length; _i++) {
            var zone = _a[_i];
            var tempCard = zone.cards.find(function (x) { return x.instanceId === cardInstanceId; });
            if (tempCard !== undefined) {
                return tempCard;
            }
        }
        return null;
    };
    PlayerInfo.prototype.getAllFriendlyCardsInPlay = function () {
        var cardList = new Array();
        6;
        cardList.push.apply(cardList, this.getFriendlyZoneFromZoneEnum(Zone_1.ZoneEnum.BackBoard).cards);
        cardList.push.apply(cardList, this.getFriendlyZoneFromZoneEnum(Zone_1.ZoneEnum.FrontBoard).cards);
        cardList.push.apply(cardList, this.getFriendlyZoneFromZoneEnum(Zone_1.ZoneEnum.BattleBoard).cards);
        return cardList;
    };
    // #endregion
    // #region Get Zones
    PlayerInfo.prototype.getFriendlyZoneContainingCard = function (cardInstanceId) {
        for (var _i = 0, _a = this.zones; _i < _a.length; _i++) {
            var zone = _a[_i];
            var tempCard = zone.cards.find(function (x) { return x.instanceId === cardInstanceId; });
            if (tempCard !== undefined) {
                return zone;
            }
        }
        return null;
    };
    PlayerInfo.prototype.getZoneFromInstanceId = function (zoneInstanceId) {
        var zone = this.zones.find(function (x) { return x.instanceId === zoneInstanceId; });
        return this.zones.find(function (c) { return c.instanceId === zoneInstanceId; });
    };
    PlayerInfo.prototype.getFriendlyZoneFromZoneEnum = function (zoneEnum) {
        return this.zones.find(function (c) { return c.zoneEnum === zoneEnum; });
    };
    // #endregion
    // #region Costs and Mana
    PlayerInfo.prototype.setPlayerManaFromLand = function () {
        this.nameToStat.get('ForestMana').baseValue = 0;
        this.nameToStat.get('OceanMana').baseValue = 0;
        this.nameToStat.get('DesertMana').baseValue = 0;
        this.nameToStat.get('MountainMana').baseValue = 0;
        this.nameToStat.get('PrairieMana').baseValue = 0;
        this.nameToStat.get('FellsMana').baseValue = 0;
        this.nameToStat.get('TundraMana').baseValue = 0;
        for (var _i = 0, _a = this.realm.landTiles; _i < _a.length; _i++) {
            var landTile = _a[_i];
            if (landTile.explored) {
                switch (landTile.landType) {
                    case LandAndBiome_1.LandType.forest:
                        this.nameToStat.get('ForestMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.ocean:
                        this.nameToStat.get('OceanMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.desert:
                        this.nameToStat.get('DesertMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.mountain:
                        this.nameToStat.get('MountainMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.prairie:
                        this.nameToStat.get('PrairieMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.fells:
                        this.nameToStat.get('FellsMana').baseValue += 1;
                        break;
                    case LandAndBiome_1.LandType.tundra:
                        this.nameToStat.get('TundraMana').baseValue += 1;
                        break;
                }
            }
        }
    };
    PlayerInfo.prototype.payResourceCosts = function (costs, goalManaSpend) {
        var _this = this;
        if (goalManaSpend === void 0) { goalManaSpend = null; }
        if (!this.canPayResourceCosts(costs)) {
            console.log('CANNOT PAY COSTS');
            return null;
        }
        var outList = new Array();
        for (var _i = 0, costs_1 = costs; _i < costs_1.length; _i++) {
            var cost = costs_1[_i];
            if (this.nameToStat.get('AnyMana').statId !== cost.statId) {
                this._payResourceCost(this.idToStat.get(cost.statId), cost.value, outList);
            }
        }
        var anyCost = costs.find(function (x) { return x.statId === _this.nameToStat.get('AnyMana').statId; });
        if (anyCost !== undefined) {
            var anyValueRemaining = anyCost.value;
            if (goalManaSpend != null) {
                for (var _a = 0, goalManaSpend_1 = goalManaSpend; _a < goalManaSpend_1.length; _a++) {
                    var cost = goalManaSpend_1[_a];
                    if (anyValueRemaining > 0) {
                        this._payResourceCost(this.idToStat.get(cost.statId), Math.min(anyValueRemaining, cost.value), outList);
                        anyValueRemaining -= cost.value;
                    }
                }
            }
            for (var _b = 0, _c = this.stats; _b < _c.length; _b++) {
                var stat = _c[_b];
                if (anyValueRemaining > 0) {
                    if (this.nameToStat.get('Life').statId !== stat.statId) {
                        var reduceBy = Math.min(anyValueRemaining, stat.effectiveValue);
                        this._payResourceCost(stat, reduceBy, outList);
                        anyValueRemaining -= reduceBy;
                    }
                }
            }
        }
        return outList;
    };
    PlayerInfo.prototype._payResourceCost = function (stat, cost, outlist) {
        // Pay the cost from this playerInfo's stats
        stat.baseValue -= cost;
        // Add the payment to the outlist
        // Check if this stat has already been used in outlist
        var tempCost = outlist.find(function (c) { return c.statId === stat.statId; });
        // If not, add it
        if (tempCost === undefined) {
            var newCost = new PayResourceCost_1.default(stat.statId, cost);
            outlist.push(newCost);
        }
        // If so, just increase the value
        else {
            tempCost.value += cost;
        }
    };
    PlayerInfo.prototype.canPayResourceCosts = function (costs) {
        var _this = this;
        var availableResources = [];
        for (var _i = 0, _a = this.stats; _i < _a.length; _i++) {
            var playerResource = _a[_i];
            var tempPRC = new PayResourceCost_1.default(playerResource.statId, playerResource.effectiveValue);
            availableResources.push(tempPRC);
        }
        var _loop_1 = function (cost) {
            if (this_1.nameToStat.get('AnyMana').statId !== cost.statId) {
                var availableResource = availableResources.find(function (ar) { return ar.statId === cost.statId; });
                if (availableResource && availableResource.value < cost.value) {
                    return { value: false };
                }
                if (availableResource) {
                    availableResource.value -= cost.value;
                }
            }
        };
        var this_1 = this;
        for (var _b = 0, costs_2 = costs; _b < costs_2.length; _b++) {
            var cost = costs_2[_b];
            var state_1 = _loop_1(cost);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        var remainingMana = 0;
        for (var _c = 0, availableResources_1 = availableResources; _c < availableResources_1.length; _c++) {
            var c = availableResources_1[_c];
            if (c.statId !== this.nameToStat.get('Life').statId) {
                remainingMana += c.value;
            }
        }
        var anyCost = costs.find(function (x) { return x.statId === _this.nameToStat.get('AnyMana').statId; });
        if (anyCost !== undefined) {
            if (anyCost.value > remainingMana) {
                return false;
            }
        }
        return true;
    };
    // #endregion
    // #region JSON
    /**
     * This is a complete copy of the player's state, to send to the player themselves.
     * It includes cards in zones that should be visible to them and not the opponent (hand)
     */
    PlayerInfo.prototype.toJSONForPlayer = function () {
        var json = {};
        json.name = this.name;
        json.userId = this.userId;
        json.id = this.id;
        json.currentEntityInstanceId = this.currentEntityInstanceId;
        // Copy player stats.
        json.stats = this.stats.map(function (stat) { return stat.toJSON(); });
        // Copy player zones - zone.toJSONForPlayer() will not include cards that should be hidden from the player
        json.zones = this.zones.map(function (zone) { return zone.toJSONForPlayer(); });
        // Copy realm
        json.realm = this.realm.toJSONFullCopy();
        return json;
    };
    /**
     * This is a complete copy of the player's state, to send to the opponent.
     * It does not include cards in zones that should be hidden from the opponent (hand)
     */
    PlayerInfo.prototype.toJSONForOpponent = function () {
        var json = {};
        json.name = this.name;
        json.userId = this.userId;
        json.id = this.id;
        json.currentEntityInstanceId = this.currentEntityInstanceId;
        // Copy player stats.
        json.stats = this.stats.map(function (stat) { return stat.toJSON(); });
        // Copy player zones - zone.toJSONForOpponent() will not include cards that should be hidden from the opponent
        json.zones = this.zones.map(function (zone) { return zone.toJSONForOpponent(); });
        // Copy land and realm
        json.realm = this.realm.toJSONForOpponent();
        return json;
    };
    /**
     * for use once the game is going - it's unclear to me, if this needs to be parsed away
     * if this will work because of the circular references inherant in giving the gameState
     */
    PlayerInfo.fromRuntimeJSON = function (json) {
        var playerInfo = new PlayerInfo();
        playerInfo.name = json.name;
        playerInfo.userId = json.userId;
        playerInfo.id = json.id;
        playerInfo.currentEntityInstanceId = json.currentEntityInstanceId;
        // Copy player stats.
        playerInfo.stats = json.stats.map(function (stat) {
            return Stat_1.default.fromRuntimeJSON(stat);
        });
        playerInfo.nameToStat = new Map();
        playerInfo.idToStat = new Map();
        for (var _i = 0, _a = playerInfo.stats; _i < _a.length; _i++) {
            var stat = _a[_i];
            playerInfo.nameToStat.set(stat.name, stat);
            playerInfo.idToStat.set(stat.statId, stat);
        }
        // Copy player zones.
        playerInfo.zones = json.zones.map(function (zone) {
            return RuntimeZone_1.default.fromRuntimeJSON(zone);
        });
        // Copy land and realm
        playerInfo.realm = RuntimeRealm_1.default.fromRuntimeJSON(json.realm);
        return playerInfo;
    };
    return PlayerInfo;
}());
exports.default = PlayerInfo;
