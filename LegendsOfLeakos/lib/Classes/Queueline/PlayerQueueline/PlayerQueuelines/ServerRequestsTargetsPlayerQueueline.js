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
var ServerRequestsTargetsPlayerQueueline = /** @class */ (function (_super) {
    __extends(ServerRequestsTargetsPlayerQueueline, _super);
    function ServerRequestsTargetsPlayerQueueline(myPlayerUserId, sourceCardInstanceId, sourcePlayerUserId, queuePosition, effect, targetInfoCode) {
        var _this = _super.call(this) || this;
        _this.fillBaseInfo(myPlayerUserId, sourceCardInstanceId, sourcePlayerUserId, queuePosition);
        _this.effect = effect;
        _this.targetInfoCode = targetInfoCode;
        return _this;
    }
    ServerRequestsTargetsPlayerQueueline.prototype.sendEffectToPlayer = function (gameState, myPlayer) {
        if (!myPlayer) {
            throw new Error('Player not found');
        }
        myPlayer.onServerRequestsTargets(this.effect, this.sourceCardInstanceId, this.effect.targetCriterias(), this.targetInfoCode);
    };
    ServerRequestsTargetsPlayerQueueline.prototype.actionToString = function (gameState) {
        var sourcePlayer = gameState.getPlayerInfoByUserId(this.sourcePlayerUserId);
        var sourceCard = gameState.getCardFromAnywhere(this.sourceCardInstanceId);
        if (!sourcePlayer || !sourceCard) {
            throw new Error('Player or card not found');
        }
        return "".concat(sourcePlayer.name, "'s ").concat(sourceCard.name, " (Instance ID: ").concat(sourceCard.instanceId, ") is requesting targets");
    };
    ServerRequestsTargetsPlayerQueueline.prototype.clone = function () {
        return new ServerRequestsTargetsPlayerQueueline(this.myPlayerUserId, this.sourceCardInstanceId, this.sourcePlayerUserId, this.queuePosition, this.effect.clone(), this.targetInfoCode);
    };
    return ServerRequestsTargetsPlayerQueueline;
}(PlayerQueueline_1.default));
exports.default = ServerRequestsTargetsPlayerQueueline;
