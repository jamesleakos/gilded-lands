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
var PayResourceCost_1 = __importDefault(require("../../PayResourceCost/PayResourceCost"));
var TargetInfo_1 = __importDefault(require("../../Target/TargetInfo"));
var NetworkProtocol_1 = require("../../../Enums/NetworkProtocol");
var QueueUpgradeCardMessage = /** @class */ (function (_super) {
    __extends(QueueUpgradeCardMessage, _super);
    function QueueUpgradeCardMessage(messageId, senderUserId, cardInstanceId, upgradeIndex, paidCosts, targetInfoList, actionPriority) {
        var _this = _super.call(this, messageId, senderUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.QueueUpgradeCard;
        _this.cardInstanceId = cardInstanceId;
        _this.upgradeIndex = upgradeIndex;
        _this.paidCosts = paidCosts;
        _this.targetInfoList = targetInfoList;
        _this.actionPriority = actionPriority;
        return _this;
    }
    QueueUpgradeCardMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { cardInstanceId: this.cardInstanceId, upgradeIndex: this.upgradeIndex, paidCosts: this.paidCosts.map(function (cost) { return cost.toJSON(); }), targetInfoList: this.targetInfoList.map(function (info) { return info.toJSON(); }), actionPriority: this.actionPriority });
    };
    QueueUpgradeCardMessage.fromJSON = function (json) {
        return new QueueUpgradeCardMessage(json.messageId, json.senderUserId, json.cardInstanceId, json.upgradeIndex, json.paidCosts.map(PayResourceCost_1.default.fromJSON), json.targetInfoList.map(TargetInfo_1.default.fromJSON), json.actionPriority);
    };
    // check that all fields in the message are valid
    QueueUpgradeCardMessage.prototype.validate = function () {
        return (_super.prototype.validate.call(this) &&
            this.cardInstanceId != null &&
            this.upgradeIndex != null &&
            this.paidCosts != null &&
            this.targetInfoList != null &&
            this.actionPriority != null);
    };
    return QueueUpgradeCardMessage;
}(MessageBase_1.ClientMessage));
exports.default = QueueUpgradeCardMessage;
