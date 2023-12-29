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
var MessageBase_1 = require("../MessageBase");
var NetworkProtocol_1 = require("../../../Enums/NetworkProtocol");
var SendChatTextMessage = /** @class */ (function (_super) {
    __extends(SendChatTextMessage, _super);
    function SendChatTextMessage(messageId, senderUserId, recipientUserId, text) {
        var _this = _super.call(this, messageId, senderUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.SendChatTextMessage;
        _this.recipientUserId = recipientUserId;
        _this.text = text;
        return _this;
    }
    SendChatTextMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { recipientUserId: this.recipientUserId, text: this.text });
    };
    SendChatTextMessage.fromJSON = function (json) {
        return new SendChatTextMessage(json.messageId, json.senderUserId, json.recipientUserId, json.text);
    };
    // check that all fields in the message are valid
    SendChatTextMessage.prototype.validate = function () {
        return (_super.prototype.validate.call(this) && this.recipientUserId != null && this.text != null);
    };
    return SendChatTextMessage;
}(MessageBase_1.ClientMessage));
exports.default = SendChatTextMessage;