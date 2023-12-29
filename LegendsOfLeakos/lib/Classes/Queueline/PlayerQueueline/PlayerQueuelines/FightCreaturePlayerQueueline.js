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
var PlayerQueueline_1 = __importDefault(require("../PlayerQueueline"));
var FightCreaturePlayerQueueLine = /** @class */ (function (_super) {
    __extends(FightCreaturePlayerQueueLine, _super);
    function FightCreaturePlayerQueueLine(myPlayerUserId, attackingCardInstanceId, attackedCardInstanceId, sourcePlayerUserId, queuePosition) {
        var _this = _super.call(this) || this;
        _this.fillBaseInfo(myPlayerUserId, attackingCardInstanceId, sourcePlayerUserId, queuePosition);
        _this.attackedCardInstanceId = attackedCardInstanceId;
        return _this;
    }
    FightCreaturePlayerQueueLine.prototype.sendEffectToPlayer = function (gameState, myPlayer) {
        if (!myPlayer) {
            throw new Error('Player not found');
        }
        myPlayer.onCreatureAttacked(this.sourceCardInstanceId, this.attackedCardInstanceId);
    };
    FightCreaturePlayerQueueLine.prototype.actionToString = function (gameState) {
        var sourcePlayer = gameState.getPlayerInfoByUserId(this.sourcePlayerUserId);
        var sourceCard = gameState.getCardFromAnywhere(this.sourceCardInstanceId);
        var attackedCard = gameState.getCardFromAnywhere(this.attackedCardInstanceId);
        if (!sourcePlayer || !sourceCard || !attackedCard) {
            throw new Error('Player or card not found');
        }
        return "".concat(sourcePlayer.name, "'s ").concat(sourceCard.name, " (Instance ID: ").concat(sourceCard.instanceId, ") fought ").concat(attackedCard.name, " (Instance ID: ").concat(attackedCard.instanceId, ")");
    };
    FightCreaturePlayerQueueLine.prototype.clone = function () {
        return new FightCreaturePlayerQueueLine(this.myPlayerUserId, this.sourceCardInstanceId, this.attackedCardInstanceId, this.sourcePlayerUserId, this.queuePosition);
    };
    return FightCreaturePlayerQueueLine;
}(PlayerQueueline_1.default));
exports.default = FightCreaturePlayerQueueLine;
