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
var CardPlayedMessage_1 = __importDefault(require("../../../../../Networking/Cards/Play/CardPlayedMessage"));
var NetworkProtocol_1 = require("../../../../../../Enums/NetworkProtocol");
var EffectSolver_1 = __importDefault(require("../../../../../Game/EffectSolver"));
var MoveCardEffect_1 = __importDefault(require("../../../../../Effect/RuntimeEffects/MoveEffects/MoveCardEffect"));
var PlayCardQueueLine = /** @class */ (function (_super) {
    __extends(PlayCardQueueLine, _super);
    function PlayCardQueueLine(clientMessageId, sourceCardInstanceId, sourcePlayerUserId, targetInfoList, paidCosts, priority, originZoneZoneEnum, destinationZoneZoneEnum) {
        var _this = _super.call(this) || this;
        _this.fillBaseInfo(clientMessageId, sourceCardInstanceId, sourcePlayerUserId, priority);
        _this.targetInfoList = __spreadArray([], targetInfoList, true);
        _this.paidCosts = __spreadArray([], paidCosts, true);
        _this.originZoneZoneEnum = originZoneZoneEnum;
        _this.destinationZoneZoneEnum = destinationZoneZoneEnum;
        return _this;
    }
    PlayCardQueueLine.prototype.sendEffectToDoEffect = function (server, queuePosition) {
        // send the effect over to effectsolver
        var moveEffect = MoveCardEffect_1.default.createMoveCardEffect(this.originZoneZoneEnum, this.destinationZoneZoneEnum);
        EffectSolver_1.default.doEffect(server.gameState, this.sourceCardInstanceId, moveEffect, this.targetInfoList);
        // send the effect to the clients
        for (var _i = 0, _a = server.gameState.players; _i < _a.length; _i++) {
            var player = _a[_i];
            var msg = new CardPlayedMessage_1.default(player.userId, this.sourcePlayerUserId, server.gameState.getCardFromAnywhere(this.sourceCardInstanceId), this.originZoneZoneEnum, this.destinationZoneZoneEnum, this.paidCosts, this.targetInfoList, queuePosition, '');
            server.sendToPlayer(NetworkProtocol_1.NetworkProtocol.CardPlayed, msg, player.userId);
        }
    };
    return PlayCardQueueLine;
}(TargetsCostsQueueline_1.default));
exports.default = PlayCardQueueLine;
