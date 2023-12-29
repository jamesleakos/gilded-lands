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
var MessageBase_1 = require("../../MessageBase");
var PlayerInfo_1 = __importDefault(require("../../../Player/PlayerInfo"));
var StartGameMessage = /** @class */ (function (_super) {
    __extends(StartGameMessage, _super);
    function StartGameMessage(recipientUserId, playerIndex, turnDuration, nicknames, player, opponent, rngSeed) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.playerIndex = playerIndex;
        _this.turnDuration = turnDuration;
        _this.nicknames = nicknames;
        _this.player = player;
        _this.opponent = opponent;
        _this.rngSeed = rngSeed;
        return _this;
    }
    StartGameMessage.prototype.toJSON = function () {
        return {
            recipientUserId: this.recipientUserId,
            playerIndex: this.playerIndex,
            turnDuration: this.turnDuration,
            nicknames: this.nicknames,
            player: this.player.toJSONForPlayer(),
            opponent: this.opponent.toJSONForOpponent(),
            rngSeed: this.rngSeed,
        };
    };
    StartGameMessage.fromJSON = function (json) {
        return new StartGameMessage(json.recipientSocketId, json.playerIndex, json.turnDuration, json.nicknames, PlayerInfo_1.default.fromRuntimeJSON(json.player), PlayerInfo_1.default.fromRuntimeJSON(json.opponent), json.rngSeed);
    };
    // check that all fields in the message are valid
    StartGameMessage.prototype.validate = function () {
        return (this.recipientUserId != null &&
            this.playerIndex != null &&
            this.turnDuration != null &&
            this.nicknames != null &&
            this.player != null &&
            this.opponent != null &&
            this.rngSeed != null);
    };
    return StartGameMessage;
}(MessageBase_1.ServerMessage));
exports.default = StartGameMessage;
