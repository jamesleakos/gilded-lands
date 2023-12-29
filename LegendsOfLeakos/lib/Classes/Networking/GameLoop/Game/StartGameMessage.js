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
var MessageBase_1 = require("../../MessageBase");
var PlayerInfo_1 = __importDefault(require("../../../Player/PlayerInfo"));
var GameManager_1 = __importDefault(require("../../../Game/GameManager"));
var NetworkProtocol_1 = require("../../../../Enums/NetworkProtocol");
var StartGameMessage = /** @class */ (function (_super) {
    __extends(StartGameMessage, _super);
    function StartGameMessage(recipientUserId, playerIndex, turnDuration, names, player, opponent, rngSeed, gameManager) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.StartGame;
        _this.playerIndex = playerIndex;
        _this.turnDuration = turnDuration;
        _this.names = names;
        _this.player = player;
        _this.opponent = opponent;
        _this.rngSeed = rngSeed;
        _this.gameManager = gameManager;
        return _this;
    }
    StartGameMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { playerIndex: this.playerIndex, turnDuration: this.turnDuration, names: this.names, player: this.player.toJSONForPlayer(), opponent: this.opponent.toJSONForOpponent(), rngSeed: this.rngSeed, gameManger: this.gameManager.toJSON() });
    };
    StartGameMessage.fromJSON = function (json) {
        return new StartGameMessage(json.recipientUserId, json.playerIndex, json.turnDuration, json.names, PlayerInfo_1.default.fromRuntimeJSON(json.player), PlayerInfo_1.default.fromRuntimeJSON(json.opponent), json.rngSeed, GameManager_1.default.fromJSON(json.gameManger));
    };
    // check that all fields in the message are valid
    StartGameMessage.prototype.validate = function () {
        return (this.recipientUserId != null &&
            this.playerIndex != null &&
            this.turnDuration != null &&
            this.names != null &&
            this.player != null &&
            this.opponent != null &&
            this.rngSeed != null &&
            this.gameManager != null);
    };
    return StartGameMessage;
}(MessageBase_1.ServerMessage));
exports.default = StartGameMessage;
