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
var Queueline_1 = __importDefault(require("../Queueline"));
var CreatureAttackedMessage_1 = __importDefault(require("../../Networking/Attacking/CreatureAttackedMessage"));
var Networking_1 = require("../../../Enums/Networking");
var FightCreatureQueueLine = /** @class */ (function (_super) {
    __extends(FightCreatureQueueLine, _super);
    function FightCreatureQueueLine(server, attackingCard, attackedCard, sourcePlayer, priority) {
        var _this = _super.call(this) || this;
        _this.fillBaseInfo(server, attackingCard, sourcePlayer, priority);
        _this.attackedCard = attackedCard;
        return _this;
    }
    FightCreatureQueueLine.prototype.sendEffectToDoEffect = function (queuePosition) {
        var fightEffect = this.server.effectSolver.createFightEffect();
        var tempTargetInfo = this.server.effectSolver.createFightTargetInfoList(this.attackedCard.instanceId);
        this.server.effectSolver.doEffect(this.sourceCard, fightEffect, tempTargetInfo);
        // send CardAttackedToPlayers
        for (var i = 0; i < this.server.gameState.players.length; i++) {
            var player = this.server.gameState.players[i];
            var msg = new CreatureAttackedMessage_1.default();
            msg.recipientNetId = player.netId;
            msg.attackingPlayerNetId = this.sourcePlayer.netId;
            msg.queuePosition = queuePosition;
            msg.attackingCardInstanceId = this.sourceCard.instanceId;
            msg.attackedCardInstanceId = this.attackedCard.instanceId;
            this.server.safeSendToClient(player, Networking_1.NetworkProtocol.CreatureAttacked, msg);
        }
    };
    return FightCreatureQueueLine;
}(Queueline_1.default));
exports.default = FightCreatureQueueLine;
