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
var ServerCardMovedRowMessage_1 = __importDefault(require("../../../Networking/Cards/MovedRow/ServerCardMovedRowMessage"));
var NetworkProtocol_1 = require("../../../../Enums/NetworkProtocol");
var MoveCardEffect_1 = __importDefault(require("../../../Effect/RuntimeEffects/MoveEffects/MoveCardEffect"));
var EffectSolver_1 = __importDefault(require("../../../Game/EffectSolver"));
var MoveRowQueueLine = /** @class */ (function (_super) {
    __extends(MoveRowQueueLine, _super);
    function MoveRowQueueLine(clientMessageId, movingCardInstanceId, sourcePlayerUserId, priority, originZoneZoneEnum, destinationZoneZoneEnum) {
        var _this = _super.call(this) || this;
        _this.fillBaseInfo(clientMessageId, movingCardInstanceId, sourcePlayerUserId, priority);
        _this.originZoneZoneEnum = originZoneZoneEnum;
        _this.destinationZoneZoneEnum = destinationZoneZoneEnum;
        return _this;
    }
    MoveRowQueueLine.prototype.sendEffectToDoEffect = function (server, queuePosition) {
        // #region get objects
        var sourcePlayer = server.gameState.getPlayerInfoByUserId(this.sourcePlayerUserId);
        if (!sourcePlayer) {
            throw new Error('Source player not found');
        }
        var movingCard = server.gameState.getCardFromAnywhere(this.sourceCardInstanceId);
        if (!movingCard) {
            throw new Error('Moving card not found');
        }
        // #endregion
        // make effects
        var moveEffect = MoveCardEffect_1.default.createMoveCardEffect(this.originZoneZoneEnum, this.destinationZoneZoneEnum);
        // effect the effect
        EffectSolver_1.default.doEffect(server.gameState, movingCard.instanceId, moveEffect, []);
        // send message to players
        for (var _i = 0, _a = server.gameState.players; _i < _a.length; _i++) {
            var sendToPlayer = _a[_i];
            var msg = new ServerCardMovedRowMessage_1.default(sendToPlayer.userId, sourcePlayer.userId, movingCard.instanceId, this.originZoneZoneEnum, this.destinationZoneZoneEnum, queuePosition);
            server.sendToPlayer(NetworkProtocol_1.NetworkProtocol.ServerCardMovedRow, msg, sendToPlayer.userId);
        }
    };
    return MoveRowQueueLine;
}(ServerQueueline_1.default));
exports.default = MoveRowQueueLine;
