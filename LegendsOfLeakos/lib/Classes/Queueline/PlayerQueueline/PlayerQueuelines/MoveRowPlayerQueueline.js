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
var MoveRowPlayerQueueline = /** @class */ (function (_super) {
    __extends(MoveRowPlayerQueueline, _super);
    function MoveRowPlayerQueueline(myPlayerUserId, sourceCardInstanceId, sourcePlayerUserId, queuePosition, originZoneZoneEnum, destinationZoneZoneEnum) {
        var _this = _super.call(this) || this;
        _this.fillBaseInfo(myPlayerUserId, sourceCardInstanceId, sourcePlayerUserId, queuePosition);
        _this.originZoneZoneEnum = originZoneZoneEnum;
        _this.destinationZoneZoneEnum = destinationZoneZoneEnum;
        return _this;
    }
    MoveRowPlayerQueueline.prototype.sendEffectToPlayer = function (gameState, myPlayer) {
        if (!myPlayer) {
            throw new Error('Player not found');
        }
        myPlayer.onCardMovedRow(this.sourceCardInstanceId, this.originZoneZoneEnum, this.destinationZoneZoneEnum);
    };
    MoveRowPlayerQueueline.prototype.actionToString = function (gameState) {
        var sourcePlayer = gameState.getPlayerInfoByUserId(this.sourcePlayerUserId);
        var sourceCard = gameState.getCardFromAnywhere(this.sourceCardInstanceId);
        if (!sourcePlayer || !sourceCard) {
            throw new Error('Player or card not found');
        }
        return "".concat(sourcePlayer.name, "'s ").concat(sourceCard.name, " (Instance ID: ").concat(sourceCard.instanceId, ") moved from ").concat(this.originZoneZoneEnum, " to ").concat(this.destinationZoneZoneEnum);
    };
    MoveRowPlayerQueueline.prototype.clone = function () {
        return new MoveRowPlayerQueueline(this.myPlayerUserId, this.sourceCardInstanceId, this.sourcePlayerUserId, this.queuePosition, this.originZoneZoneEnum, this.destinationZoneZoneEnum);
    };
    return MoveRowPlayerQueueline;
}(PlayerQueueline_1.default));
exports.default = MoveRowPlayerQueueline;
