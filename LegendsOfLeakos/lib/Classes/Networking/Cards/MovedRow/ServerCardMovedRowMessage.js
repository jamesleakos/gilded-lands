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
/**
 * This message is for cards the player requested to be moved (currently, always between rows,
 * as cards that were played have their own message)
 */
var ServerCardMovedRowMessage = /** @class */ (function (_super) {
    __extends(ServerCardMovedRowMessage, _super);
    function ServerCardMovedRowMessage(recipientUserId, ownerPlayerUserId, movedCardInstanceId, originZoneEnum, destinationZoneEnum, queuePosition) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.CardMoved;
        _this.ownerPlayerUserId = ownerPlayerUserId;
        _this.movedCardInstanceId = movedCardInstanceId;
        _this.originZoneEnum = originZoneEnum;
        _this.destinationZoneEnum = destinationZoneEnum;
        _this.queuePosition = queuePosition;
        return _this;
    }
    ServerCardMovedRowMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { ownerPlayerUserId: this.ownerPlayerUserId, movedCardInstanceId: this.movedCardInstanceId, originZoneEnum: this.originZoneEnum, destinationZoneEnum: this.destinationZoneEnum, queuePosition: this.queuePosition });
    };
    ServerCardMovedRowMessage.fromJSON = function (json) {
        return new ServerCardMovedRowMessage(json.recipientUserId, json.ownerPlayerUserId, json.movedCardInstanceId, json.originZoneEnum, json.destinationZoneEnum, json.queuePosition);
    };
    // check that all fields in the message are valid
    ServerCardMovedRowMessage.prototype.validate = function () {
        return (this.recipientUserId != null &&
            this.ownerPlayerUserId != null &&
            this.movedCardInstanceId != null &&
            this.originZoneEnum != null &&
            this.destinationZoneEnum != null &&
            this.queuePosition != null);
    };
    return ServerCardMovedRowMessage;
}(MessageBase_1.ServerMessage));
exports.default = ServerCardMovedRowMessage;
