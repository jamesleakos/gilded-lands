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
var ServerQueueline_1 = __importDefault(require("../ServerQueueline"));
var CreatureAttackedMessage_1 = __importDefault(require("../../../Networking/Attacking/CreatureAttackedMessage"));
var NetworkProtocol_1 = require("../../../../Enums/NetworkProtocol");
var AttackEffect_1 = __importDefault(require("../../../Effect/RuntimeEffects/AttackEffects/AttackEffect"));
var EffectSolver_1 = __importDefault(require("../../../Game/EffectSolver"));
var FightCreatureQueueLine = /** @class */ (function (_super) {
    __extends(FightCreatureQueueLine, _super);
    function FightCreatureQueueLine(clientMessageId, attackingCardInstanceId, attackedCardInstanceId, sourcePlayerUserId, priority) {
        var _this = _super.call(this) || this;
        _this.fillBaseInfo(clientMessageId, attackingCardInstanceId, sourcePlayerUserId, priority);
        _this.attackedCardInstanceId = attackedCardInstanceId;
        return _this;
    }
    FightCreatureQueueLine.prototype.sendEffectToDoEffect = function (server, queuePosition) {
        // #region get objects
        var sourcePlayer = server.gameState.getPlayerInfoByUserId(this.sourcePlayerUserId);
        if (!sourcePlayer) {
            throw new Error('Source player not found');
        }
        var attackingCard = server.gameState.getCardFromAnywhere(this.sourceCardInstanceId);
        if (!attackingCard) {
            throw new Error('Attacking card not found');
        }
        var attackedCard = server.gameState.getCardFromAnywhere(this.attackedCardInstanceId);
        if (!attackedCard) {
            throw new Error('Attacked card not found');
        }
        // #endregion
        // make effects
        var fightEffect = AttackEffect_1.default.createFightEffect();
        var tempTargetInfo = AttackEffect_1.default.createFightTargetInfoList(this.attackedCardInstanceId);
        // effect the effect
        EffectSolver_1.default.doEffect(server.gameState, attackingCard.instanceId, fightEffect, tempTargetInfo);
        // send CardAttackedToPlayers
        for (var _i = 0, _a = server.gameState.players; _i < _a.length; _i++) {
            var sendToPlayer = _a[_i];
            var msg = new CreatureAttackedMessage_1.default(sendToPlayer.userId, sourcePlayer.userId, attackingCard.instanceId, attackedCard.instanceId, queuePosition);
            server.sendToPlayer(NetworkProtocol_1.NetworkProtocol.CreatureAttacked, msg, sendToPlayer.userId);
        }
    };
    return FightCreatureQueueLine;
}(ServerQueueline_1.default));
exports.default = FightCreatureQueueLine;
