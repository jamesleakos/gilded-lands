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
var ServerQueueline_1 = __importDefault(require("../../ServerQueueline"));
var GetTargetsFromPlayerMessage_1 = __importDefault(require("../../../../Networking/Abilities/GetTargetsFromPlayerMessage"));
var NetworkProtocol_1 = require("../../../../../Enums/NetworkProtocol");
var EffectSolver_1 = __importDefault(require("../../../../Game/EffectSolver"));
var TargetsCostsQueueline = /** @class */ (function (_super) {
    __extends(TargetsCostsQueueline, _super);
    function TargetsCostsQueueline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.targetInfoList = [];
        _this.paidCosts = [];
        return _this;
    }
    TargetsCostsQueueline.prototype.setTargetInfoList = function (targetInfoList) {
        this.targetInfoList = __spreadArray([], targetInfoList, true);
    };
    TargetsCostsQueueline.prototype.areTargetsStillAvailable = function (server) {
        return this.effect.areTargetsAvailable(server.gameState, server.gameState.getCardFromAnywhere(this.sourceCardInstanceId));
    };
    TargetsCostsQueueline.prototype.areAllSelectedTargetInfoItemsValid = function (server) {
        return this.effect.isAllTargetInfoValid(server.gameState.getCardFromAnywhere(this.sourceCardInstanceId), server.gameState, this.targetInfoList);
    };
    TargetsCostsQueueline.prototype.areTargetsStillRequired = function (server) {
        return this.targetInfoList.some(function (t) { return t.targetsAreSelectedLater; });
    };
    TargetsCostsQueueline.prototype.goOutForTargets = function (server, queuePosition) {
        var code = EffectSolver_1.default.getRandomNumber(10000);
        var msg = new GetTargetsFromPlayerMessage_1.default(this.sourcePlayerUserId, this.effect, this.sourceCardInstanceId, this.effect.targetCriterias(), code, queuePosition);
        server.targetInfoCode = code;
        server.sendToPlayer(NetworkProtocol_1.NetworkProtocol.GetTargetsFromPlayer, msg, this.sourcePlayerUserId);
    };
    return TargetsCostsQueueline;
}(ServerQueueline_1.default));
exports.default = TargetsCostsQueueline;
