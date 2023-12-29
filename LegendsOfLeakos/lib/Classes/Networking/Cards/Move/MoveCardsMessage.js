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
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBase_1 = require("../../MessageBase");
var NetworkProtocol_1 = require("../../../../Enums/NetworkProtocol");
var MoveCardsMessage = /** @class */ (function (_super) {
    __extends(MoveCardsMessage, _super);
    function MoveCardsMessage(recipientUserId, originZoneZoneEnum, destinationZoneZoneEnum, numCards) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.CardsMoved;
        _this.recipientUserId = recipientUserId;
        _this.originZoneZoneEnum = originZoneZoneEnum;
        _this.destinationZoneZoneEnum = destinationZoneZoneEnum;
        _this.numCards = numCards;
        return _this;
    }
    MoveCardsMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { originZoneZoneEnum: this.originZoneZoneEnum, destinationZoneZoneEnum: this.destinationZoneZoneEnum, numCards: this.numCards });
    };
    MoveCardsMessage.fromJSON = function (json) {
        return new MoveCardsMessage(json.recipientUserId, json.originZoneZoneEnum, json.destinationZoneZoneEnum, json.numCards);
    };
    // check that all fields in the message are valid
    MoveCardsMessage.prototype.validate = function () {
        return (this.recipientUserId != null &&
            this.originZoneZoneEnum != null &&
            this.destinationZoneZoneEnum != null &&
            this.numCards != null);
    };
    return MoveCardsMessage;
}(MessageBase_1.ServerMessage));
exports.default = MoveCardsMessage;
