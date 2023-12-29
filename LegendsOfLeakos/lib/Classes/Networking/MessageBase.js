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
exports.MessageBase = exports.ClientMessage = exports.ServerMessage = void 0;
var GameManager_1 = __importDefault(require("../Game/GameManager"));
var NetworkProtocol_1 = require("../../Enums/NetworkProtocol");
var MessageBase = /** @class */ (function () {
    function MessageBase() {
    }
    return MessageBase;
}());
exports.MessageBase = MessageBase;
var ServerMessage = /** @class */ (function (_super) {
    __extends(ServerMessage, _super);
    function ServerMessage(recipientUserId) {
        var _this = _super.call(this) || this;
        _this.recipientUserId = recipientUserId;
        return _this;
    }
    ServerMessage.prototype.toJSON = function () {
        return {
            messageEnum: NetworkProtocol_1.NetworkProtocol[this.messageEnum],
            recipientUserId: this.recipientUserId,
        };
    };
    ServerMessage.prototype.validate = function () {
        return this.recipientUserId != null && this.messageEnum != null;
    };
    return ServerMessage;
}(MessageBase));
exports.ServerMessage = ServerMessage;
var ClientMessage = /** @class */ (function (_super) {
    __extends(ClientMessage, _super);
    function ClientMessage(messageId, senderUserId) {
        var _this = _super.call(this) || this;
        _this.messageId = messageId;
        _this.senderUserId = senderUserId;
        return _this;
    }
    ClientMessage.prototype.toJSON = function () {
        return {
            messageId: this.messageId,
            senderUserId: this.senderUserId,
        };
    };
    ClientMessage.prototype.validate = function () {
        return (this.senderUserId != null &&
            this.messageId != null &&
            this.messageEnum != null);
    };
    ClientMessage.prototype.clone = function () {
        return Object.assign(Object.create(this), this);
    };
    ClientMessage.generateUniqueId = function () {
        return GameManager_1.default.generateUniqueId();
    };
    return ClientMessage;
}(MessageBase));
exports.ClientMessage = ClientMessage;
