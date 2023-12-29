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
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBase_1 = require("../../MessageBase");
var EndGameMessage = /** @class */ (function (_super) {
    __extends(EndGameMessage, _super);
    function EndGameMessage(recipientUserId, winnerPlayerIndex) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.winnerPlayerIndex = winnerPlayerIndex;
        return _this;
    }
    EndGameMessage.prototype.toJSON = function () {
        return {
            recipientUserId: this.recipientUserId,
            winnerPlayerIndex: this.winnerPlayerIndex,
        };
    };
    EndGameMessage.fromJSON = function (json) {
        return new EndGameMessage(json.recipientSocketId, json.winnerPlayerIndex);
    };
    // check that all fields in the message are valid
    EndGameMessage.prototype.validate = function () {
        return this.recipientUserId != null && this.winnerPlayerIndex != null;
    };
    return EndGameMessage;
}(MessageBase_1.ServerMessage));
exports.default = EndGameMessage;
