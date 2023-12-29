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
var RuntimeCard_1 = __importDefault(require("../../../Card/RuntimeCard"));
var NetworkProtocol_1 = require("../../../../Enums/NetworkProtocol");
/**
 * This message is used by the server to move cards that the player did not request to be moved.
 * ex. moving cards to the battle row on attack.
 * The cards do not need to start as visible to either player for this to work
 */
var ServerMovedCardMessage = /** @class */ (function (_super) {
    __extends(ServerMovedCardMessage, _super);
    function ServerMovedCardMessage(recipientUserId, ownerPlayerUserId, card, originZoneZoneEnum, destinationZoneZoneEnum) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.CardMoved;
        _this.ownerPlayerUserId = ownerPlayerUserId;
        _this.card = card;
        _this.originZoneZoneEnum = originZoneZoneEnum;
        _this.destinationZoneZoneEnum = destinationZoneZoneEnum;
        return _this;
    }
    ServerMovedCardMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { ownerPlayerUserId: this.ownerPlayerUserId, card: this.card.toJSON(), originZoneZoneEnum: this.originZoneZoneEnum, destinationZoneZoneEnum: this.destinationZoneZoneEnum });
    };
    ServerMovedCardMessage.fromJSON = function (json) {
        return new ServerMovedCardMessage(json.recipientUserId, json.ownerPlayerUserId, RuntimeCard_1.default.fromRuntimeJSON(json.card), json.originZoneZoneEnum, json.destinationZoneZoneEnum);
    };
    // check that all fields in the message are valid
    ServerMovedCardMessage.prototype.validate = function () {
        return (this.recipientUserId != null &&
            this.ownerPlayerUserId != null &&
            this.card != null &&
            this.originZoneZoneEnum != null &&
            this.destinationZoneZoneEnum != null);
    };
    return ServerMovedCardMessage;
}(MessageBase_1.ServerMessage));
exports.default = ServerMovedCardMessage;
