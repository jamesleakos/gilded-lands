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
var PayResourceCost_1 = __importDefault(require("../../../PayResourceCost/PayResourceCost"));
var TargetInfo_1 = __importDefault(require("../../../Target/TargetInfo"));
var NetworkProtocol_1 = require("../../../../Enums/NetworkProtocol");
var QueuePlayCardMessage = /** @class */ (function (_super) {
    __extends(QueuePlayCardMessage, _super);
    function QueuePlayCardMessage(messageId, senderUserId, cardInstanceId, destinationZoneZoneEnum, paidCosts, targetInfoList) {
        // enum
        var _this = _super.call(this, messageId, senderUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.QueuePlayCard;
        _this.cardInstanceId = cardInstanceId;
        _this.destinationZoneZoneEnum = destinationZoneZoneEnum;
        _this.paidCosts = paidCosts;
        _this.targetInfoList = targetInfoList;
        return _this;
    }
    QueuePlayCardMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { cardInstanceId: this.cardInstanceId, destinationZoneZoneEnum: this.destinationZoneZoneEnum, paidCosts: this.paidCosts.map(function (cost) { return cost.toJSON(); }), targetInfoList: this.targetInfoList.map(function (info) { return info.toJSON(); }) });
    };
    QueuePlayCardMessage.fromJSON = function (json) {
        var paidCosts = json.paidCosts.map(function (cost) {
            return PayResourceCost_1.default.fromJSON(cost);
        });
        var targetInfoList = json.targetInfoList.map(function (info) {
            return TargetInfo_1.default.fromJSON(info);
        });
        return new QueuePlayCardMessage(json.messageId, json.senderUserId, json.cardInstanceId, json.destinationZoneZoneEnum, paidCosts, targetInfoList);
    };
    // check that all fields in the message are valid
    QueuePlayCardMessage.prototype.validate = function () {
        return (_super.prototype.validate.call(this) &&
            this.cardInstanceId != null &&
            this.destinationZoneZoneEnum != null &&
            this.paidCosts != null &&
            this.targetInfoList != null);
    };
    return QueuePlayCardMessage;
}(MessageBase_1.ClientMessage));
exports.default = QueuePlayCardMessage;
