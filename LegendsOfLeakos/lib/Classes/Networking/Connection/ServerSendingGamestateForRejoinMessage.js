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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBase_1 = require("../MessageBase");
var PlayerInfo_1 = __importDefault(require("../../Player/PlayerInfo"));
var GameManager_1 = __importDefault(require("../../Game/GameManager"));
var NetworkProtocol_1 = require("../../../Enums/NetworkProtocol");
var ServerSendingGamestateForRejoin = /** @class */ (function (_super) {
    __extends(ServerSendingGamestateForRejoin, _super);
    function ServerSendingGamestateForRejoin(recipientUserId, turn, phaseIndex, rngSeed, player, opponent, gameManger) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.ServerSendingGamestateForRejoin;
        _this.turn = turn;
        _this.phaseIndex = phaseIndex;
        _this.rngSeed = rngSeed;
        _this.player = player;
        _this.opponent = opponent;
        _this.gameManager = gameManger;
        return _this;
    }
    ServerSendingGamestateForRejoin.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { turn: this.turn, phaseIndex: this.phaseIndex, rngSeed: this.rngSeed, player: this.player.toJSONForPlayer(), opponent: this.opponent.toJSONForOpponent(), gameManger: this.gameManager.toJSON() });
    };
    ServerSendingGamestateForRejoin.fromJSON = function (json) {
        return new ServerSendingGamestateForRejoin(json.recipientUserId, json.turn, json.phaseIndex, json.rngSeed, PlayerInfo_1.default.fromRuntimeJSON(json.player), PlayerInfo_1.default.fromRuntimeJSON(json.opponent), GameManager_1.default.fromJSON(json.gameManger));
    };
    // check that all fields in the message are valid
    ServerSendingGamestateForRejoin.prototype.validate = function () {
        return (this.recipientUserId != null &&
            this.turn != null &&
            this.phaseIndex != null &&
            this.rngSeed != null &&
            this.player != null &&
            this.opponent != null &&
            this.gameManager != null);
    };
    return ServerSendingGamestateForRejoin;
}(MessageBase_1.ServerMessage));
exports.default = ServerSendingGamestateForRejoin;
