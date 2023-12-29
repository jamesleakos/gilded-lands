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
var NextPhaseReadyMessage = /** @class */ (function (_super) {
    __extends(NextPhaseReadyMessage, _super);
    function NextPhaseReadyMessage(recipientUserId, turn, player, opponent) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.turn = turn;
        _this.player = player;
        _this.opponent = opponent;
        return _this;
    }
    NextPhaseReadyMessage.prototype.toJSON = function () {
        return {
            recipientUserId: this.recipientUserId,
            turn: this.turn,
            player: this.player.toJSONForPlayer(),
            opponent: this.opponent.toJSONForOpponent(),
        };
    };
    NextPhaseReadyMessage.fromJSON = function (json) {
        return new NextPhaseReadyMessage(json.recipientUserId, json.turn, PlayerInfo_1.default.fromRuntimeJSON(json.player), PlayerInfo_1.default.fromRuntimeJSON(json.opponent));
    };
    // check that all fields in the message are valid
    NextPhaseReadyMessage.prototype.validate = function () {
        return (this.recipientUserId != null &&
            this.turn != null &&
            this.player != null &&
            this.opponent != null);
    };
    return NextPhaseReadyMessage;
}(MessageBase_1.ServerMessage));
exports.default = NextPhaseReadyMessage;
