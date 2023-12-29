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
var ActivateAbilityPlayerQueueline = /** @class */ (function (_super) {
    __extends(ActivateAbilityPlayerQueueline, _super);
    function ActivateAbilityPlayerQueueline(myPlayerUserId, sourceCardInstanceId, sourcePlayerUserId, queuePosition, paidCosts, targetInfoList, abilityIndex) {
        var _this = _super.call(this) || this;
        _this.fillBaseInfo(myPlayerUserId, sourceCardInstanceId, sourcePlayerUserId, queuePosition);
        _this.paidCosts = paidCosts;
        _this.targetInfoList = targetInfoList;
        _this.abilityIndex = abilityIndex;
        return _this;
    }
    ActivateAbilityPlayerQueueline.prototype.sendEffectToPlayer = function (gameState, myPlayer) {
        if (!myPlayer) {
            throw new Error('Player not found');
        }
        myPlayer.onActivateAbility(this.sourceCardInstanceId, this.targetInfoList, this.abilityIndex);
    };
    ActivateAbilityPlayerQueueline.prototype.actionToString = function (gameState) {
        var sourcePlayer = gameState.getPlayerInfoByUserId(this.sourcePlayerUserId);
        var sourceCard = gameState.getCardFromAnywhere(this.sourceCardInstanceId);
        if (!sourcePlayer || !sourceCard) {
            throw new Error('Player or card not found');
        }
        return "".concat(sourcePlayer.name, "'s ").concat(sourceCard.name, " (Instance ID: ").concat(sourceCard.instanceId, ") activated ability ").concat(this.abilityIndex);
    };
    ActivateAbilityPlayerQueueline.prototype.clone = function () {
        return new ActivateAbilityPlayerQueueline(this.myPlayerUserId, this.sourceCardInstanceId, this.sourcePlayerUserId, this.queuePosition, this.paidCosts.map(function (x) { return x.clone(); }), this.targetInfoList.map(function (x) { return x.clone(); }), this.abilityIndex);
    };
    return ActivateAbilityPlayerQueueline;
}(PlayerQueueline_1.default));
exports.default = ActivateAbilityPlayerQueueline;
