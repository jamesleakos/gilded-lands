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
var TargetInfo_1 = __importDefault(require("../../Target/TargetInfo"));
var NetworkProtocol_1 = require("../../../Enums/NetworkProtocol");
var ReturnTargetsToServerMessage = /** @class */ (function (_super) {
    __extends(ReturnTargetsToServerMessage, _super);
    function ReturnTargetsToServerMessage(messageId, senderUserId, targetInfo, targetInfoCode) {
        var _this = _super.call(this, messageId, senderUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.ReturnTargetsToServer;
        _this.targetInfo = targetInfo;
        _this.targetInfoCode = targetInfoCode;
        return _this;
    }
    ReturnTargetsToServerMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { targetInfo: this.targetInfo.map(function (info) { return info.toJSON(); }), targetInfoCode: this.targetInfoCode });
    };
    ReturnTargetsToServerMessage.fromJSON = function (json) {
        return new ReturnTargetsToServerMessage(json.messageId, json.senderUserId, json.targetInfo.map(TargetInfo_1.default.fromJSON), json.targetInfoCode);
    };
    // check that all fields in the message are valid
    ReturnTargetsToServerMessage.prototype.validate = function () {
        return (_super.prototype.validate.call(this) && this.targetInfo != null && this.targetInfoCode != null);
    };
    return ReturnTargetsToServerMessage;
}(MessageBase_1.ClientMessage));
exports.default = ReturnTargetsToServerMessage;
