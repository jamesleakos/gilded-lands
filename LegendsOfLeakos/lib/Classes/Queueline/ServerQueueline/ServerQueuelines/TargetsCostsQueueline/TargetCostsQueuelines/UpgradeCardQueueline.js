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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TargetsCostsQueueline_1 = __importDefault(require("../TargetsCostsQueueline"));
var CardUpgradedMessage_1 = __importDefault(require("../../../../../Networking/Upgrades/CardUpgradedMessage"));
var NetworkProtocol_1 = require("../../../../../../Enums/NetworkProtocol");
var EffectSolver_1 = __importDefault(require("../../../../../Game/EffectSolver"));
var UpgradeCardEffect_1 = __importDefault(require("../../../../../Effect/RuntimeEffects/UpgradeEffects/UpgradeCardEffect"));
var UpgradeCardQueueLine = /** @class */ (function (_super) {
    __extends(UpgradeCardQueueLine, _super);
    function UpgradeCardQueueLine(clientMessageId, sourceCardInstanceId, sourcePlayerUserId, targetInfoList, paidCosts, effect, priority, upgradeLevel) {
        var _this = _super.call(this) || this;
        _this.fillBaseInfo(clientMessageId, sourceCardInstanceId, sourcePlayerUserId, priority);
        _this.targetInfoList = __spreadArray([], targetInfoList, true);
        _this.paidCosts = __spreadArray([], paidCosts, true);
        _this.effect = effect;
        _this.upgradeLevel = upgradeLevel;
        return _this;
    }
    UpgradeCardQueueLine.prototype.sendEffectToDoEffect = function (server, queuePosition) {
        // first let's upgrade the card
        var upgradingCard = server.gameState.getCardFromAnywhere(this.sourceCardInstanceId);
        if (!upgradingCard) {
            throw new Error('Card not found');
        }
        var libraryCard = server.gameState.gameManager.cardLibrary.find(function (card) { return card.libraryId === upgradingCard.libraryId; });
        if (!libraryCard) {
            throw new Error('Library card not found');
        }
        var upgradeEffect = UpgradeCardEffect_1.default.createUpgradeCardEffect(this.upgradeLevel);
        // upgrade the card
        EffectSolver_1.default.doEffect(server.gameState, this.sourceCardInstanceId, upgradeEffect, this.targetInfoList);
        // now we move on to the activated effect
        // first, we need to select any targets that are supposed to be selected by the server
        for (var i = 0; i < this.effect.targetCriterias.length; i++) {
            var targetCriteria = this.effect.targetCriterias()[i];
            if (!targetCriteria.playerSelectsTarget) {
                this.targetInfoList[i] = targetCriteria.autoSelectTargetInfo(this.sourceCardInstanceId, server.gameState);
            }
        }
        // send the effect over to effectsolver
        EffectSolver_1.default.doEffect(server.gameState, this.sourceCardInstanceId, this.effect, this.targetInfoList);
        // send the effect to the clients
        for (var _i = 0, _a = server.gameState.players; _i < _a.length; _i++) {
            var player = _a[_i];
            var msg = new CardUpgradedMessage_1.default(player.userId, this.sourcePlayerUserId, this.sourceCardInstanceId, this.upgradeLevel, this.paidCosts, this.targetInfoList, this.effect != null, queuePosition);
            server.sendToPlayer(NetworkProtocol_1.NetworkProtocol.CardUpgraded, msg, player.userId);
        }
    };
    return UpgradeCardQueueLine;
}(TargetsCostsQueueline_1.default));
exports.default = UpgradeCardQueueLine;
