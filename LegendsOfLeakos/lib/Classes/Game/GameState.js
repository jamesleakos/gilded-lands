"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameState = /** @class */ (function () {
    function GameState(gameManager, players, currentTurn, currentPhaseIndex, rngSeed, blocks) {
        this.blocks = [];
        this.gameManager = gameManager;
        this.players = players;
        this.currentTurn = currentTurn;
        this.currentPhaseIndex = currentPhaseIndex;
        this.rngSeed = rngSeed;
        this.blocks = blocks;
    }
    // clone
    GameState.prototype.clone = function () {
        var clone = new GameState(this.gameManager, this.players.map(function (playerInfo) { return playerInfo.clone(); }), this.currentTurn, this.currentPhaseIndex, this.rngSeed, this.blocks.map(function (b) { return (__assign({}, b)); }));
        return clone;
    };
    // blocking
    GameState.prototype.cardBlocking = function (blockingCardInstanceId, blockedCardInstanceId, blockOrder) {
        var blockingCard = this.getCardFromAnywhere(blockingCardInstanceId);
        if (!blockingCard) {
            throw new Error('blockingCard is null');
        }
        var blockedCard = this.getCardFromAnywhere(blockedCardInstanceId);
        if (!blockedCard) {
            throw new Error('blockedCard is null');
        }
        if (this.blocks.some(function (b) { return b.blockingCardInstanceId === blockingCardInstanceId; })) {
            throw new Error('blockingCard is already blocking');
        }
        var blocksOnTheSameCard = this.blocks.filter(function (b) { return b.blockedCardInstanceId === blockedCardInstanceId; });
        // make sure there are no gaps in the blockOrder values
        if (blockOrder > blocksOnTheSameCard.length) {
            blockOrder = blocksOnTheSameCard.length;
        }
        for (var _i = 0, blocksOnTheSameCard_1 = blocksOnTheSameCard; _i < blocksOnTheSameCard_1.length; _i++) {
            var block = blocksOnTheSameCard_1[_i];
            if (block.blockOrder >= blockOrder) {
                block.blockOrder++;
            }
        }
        this.blocks.push({
            blockingCardInstanceId: blockingCardInstanceId,
            blockedCardInstanceId: blockedCardInstanceId,
            blockOrder: blockOrder,
        });
    };
    GameState.prototype.reorderBlockingCard = function (blockingCardInstanceId, newBlockOrder) {
        var blocksOnTheSameCard = this.blocks.filter(function (b) { return b.blockingCardInstanceId === blockingCardInstanceId; });
        var thisBlock = this.blocks.find(function (b) { return b.blockingCardInstanceId === blockingCardInstanceId; });
        if (!thisBlock) {
            throw new Error('block is null');
        }
        var oldBlockOrder = thisBlock.blockOrder;
        if (newBlockOrder < oldBlockOrder) {
            for (var _i = 0, blocksOnTheSameCard_2 = blocksOnTheSameCard; _i < blocksOnTheSameCard_2.length; _i++) {
                var block = blocksOnTheSameCard_2[_i];
                if (block.blockOrder >= newBlockOrder &&
                    block.blockOrder < oldBlockOrder)
                    block.blockOrder++;
            }
        }
        else if (newBlockOrder > oldBlockOrder) {
            for (var _a = 0, blocksOnTheSameCard_3 = blocksOnTheSameCard; _a < blocksOnTheSameCard_3.length; _a++) {
                var block = blocksOnTheSameCard_3[_a];
                if (block.blockOrder <= newBlockOrder &&
                    block.blockOrder > oldBlockOrder)
                    block.blockOrder--;
            }
        }
        thisBlock.blockOrder = newBlockOrder;
    };
    GameState.prototype.stopCardBlocking = function (blockingCardInstanceId) {
        var blockingCard = this.getCardFromAnywhere(blockingCardInstanceId);
        if (!blockingCard) {
            throw new Error('blockingCard is null');
        }
        var blocksOnTheSameCard = this.blocks.filter(function (b) { return b.blockingCardInstanceId === blockingCardInstanceId; });
        var thisBlock = this.blocks.find(function (b) { return b.blockingCardInstanceId === blockingCardInstanceId; });
        if (!thisBlock) {
            throw new Error('block is null');
        }
        var oldBlockOrder = thisBlock.blockOrder;
        for (var _i = 0, blocksOnTheSameCard_4 = blocksOnTheSameCard; _i < blocksOnTheSameCard_4.length; _i++) {
            var block = blocksOnTheSameCard_4[_i];
            if (block.blockOrder > oldBlockOrder)
                block.blockOrder--;
        }
        this.blocks = this.blocks.filter(function (b) { return b.blockingCardInstanceId !== blockingCardInstanceId; });
    };
    // get stuff
    GameState.prototype.getCardFromAnywhere = function (cardInstanceId) {
        var tempCard = null;
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            tempCard = playerInfo.getCardFromInstanceId(cardInstanceId);
            if (tempCard != null)
                return tempCard;
        }
        return tempCard;
    };
    GameState.prototype.getZoneByInstanceId = function (zoneInstanceId) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            var tempZone = playerInfo.getZoneFromInstanceId(zoneInstanceId);
            if (!!tempZone)
                return tempZone;
        }
        console.log('did not find the zone:', zoneInstanceId, ' in players with zone instance ids:', this.players.map(function (p) { return p.zones.map(function (z) { return z.instanceId; }); }));
        return null;
    };
    GameState.prototype.getZoneByZoneEnumAndUserId = function (zoneEnum, userId) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            if (playerInfo.userId === userId) {
                var tempZone = playerInfo.getFriendlyZoneFromZoneEnum(zoneEnum);
                if (!!tempZone)
                    return tempZone;
            }
        }
        console.log('did not find the zone:', zoneEnum, ' in players with userId:', userId);
        return null;
    };
    GameState.prototype.getEntityFromAnywhere = function (instanceId) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            for (var _b = 0, _c = playerInfo.zones; _b < _c.length; _b++) {
                var zone = _c[_b];
                if (zone.instanceId === instanceId)
                    return zone;
                for (var _d = 0, _e = zone.enchantments; _d < _e.length; _d++) {
                    var enchantment = _e[_d];
                    if (enchantment.instanceId === instanceId)
                        return enchantment;
                }
                for (var _f = 0, _g = zone.cards; _f < _g.length; _f++) {
                    var card = _g[_f];
                    if (card.instanceId === instanceId)
                        return card;
                    for (var _h = 0, _j = card.enchantments; _h < _j.length; _h++) {
                        var enchantment = _j[_h];
                        if (enchantment.instanceId === instanceId)
                            return enchantment;
                    }
                }
            }
        }
        console.log('did not find the entity');
        return null;
    };
    GameState.prototype.getPlayerInfoByUserId = function (userId) {
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var playerInfo = _a[_i];
            if (playerInfo.userId === userId)
                return playerInfo;
        }
        return null;
    };
    return GameState;
}());
exports.default = GameState;
