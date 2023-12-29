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
var AbilityActivatedMessage_1 = __importDefault(require("../../../../../Networking/Abilities/AbilityActivatedMessage"));
var NetworkProtocol_1 = require("../../../../../../Enums/NetworkProtocol");
var EffectSolver_1 = __importDefault(require("../../../../../Game/EffectSolver"));
var ActivateAbilityQueueLine = /** @class */ (function (_super) {
    __extends(ActivateAbilityQueueLine, _super);
    function ActivateAbilityQueueLine(clientMessageId, sourceCardInstanceId, sourcePlayerUserId, targetInfoList, paidCosts, effect, priority, abilityIndex) {
        var _this = _super.call(this) || this;
        _this.fillBaseInfo(clientMessageId, sourceCardInstanceId, sourcePlayerUserId, priority);
        _this.targetInfoList = __spreadArray([], targetInfoList, true);
        _this.paidCosts = __spreadArray([], paidCosts, true);
        _this.effect = effect;
        _this.abilityIndex = abilityIndex;
        return _this;
    }
    ActivateAbilityQueueLine.prototype.sendEffectToDoEffect = function (server, queuePosition) {
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
            var msg = new AbilityActivatedMessage_1.default(player.userId, this.sourcePlayerUserId, this.sourceCardInstanceId, this.abilityIndex, this.paidCosts, this.targetInfoList, queuePosition);
            server.sendToPlayer(NetworkProtocol_1.NetworkProtocol.AbilityActivated, msg, player.userId);
        }
    };
    return ActivateAbilityQueueLine;
}(TargetsCostsQueueline_1.default));
exports.default = ActivateAbilityQueueLine;
