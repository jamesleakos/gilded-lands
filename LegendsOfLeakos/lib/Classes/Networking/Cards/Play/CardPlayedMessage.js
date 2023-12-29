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
var PayResourceCost_1 = __importDefault(require("../../../PayResourceCost/PayResourceCost"));
var TargetInfo_1 = __importDefault(require("../../../Target/TargetInfo"));
var NetworkProtocol_1 = require("../../../../Enums/NetworkProtocol");
var CardPlayedMessage = /** @class */ (function (_super) {
    __extends(CardPlayedMessage, _super);
    function CardPlayedMessage(recipientUserId, sourcePlayerUserId, card, originZoneZoneEnum, destinationZoneZoneEnum, paidCosts, targetInfoList, queuePosition, info) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.CardPlayed;
        _this.sourcePlayerUserId = sourcePlayerUserId;
        _this.card = card;
        _this.originZoneZoneEnum = originZoneZoneEnum;
        _this.destinationZoneZoneEnum = destinationZoneZoneEnum;
        _this.paidCosts = paidCosts;
        _this.targetInfoList = targetInfoList;
        _this.queuePosition = queuePosition;
        _this.info = info;
        return _this;
    }
    CardPlayedMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { sourcePlayerUserId: this.sourcePlayerUserId, card: this.card.toJSON(), originZoneZoneEnum: this.originZoneZoneEnum, destinationZoneZoneEnum: this.destinationZoneZoneEnum, paidCosts: this.paidCosts.map(function (cost) { return cost.toJSON(); }), targetInfoList: this.targetInfoList.map(function (info) { return info.toJSON(); }), queuePosition: this.queuePosition, info: this.info });
    };
    CardPlayedMessage.fromJSON = function (json) {
        var paidCosts = json.paidCosts.map(PayResourceCost_1.default.fromJSON);
        var targetInfoList = json.targetInfoList.map(TargetInfo_1.default.fromJSON);
        return new CardPlayedMessage(json.recipientUserId, json.sourcePlayerUserId, RuntimeCard_1.default.fromRuntimeJSON(json.card), json.originZoneZoneEnum, json.destinationZoneZoneEnum, paidCosts.map(function (cost) { return PayResourceCost_1.default.fromJSON(cost); }), targetInfoList.map(function (info) { return TargetInfo_1.default.fromJSON(info); }), json.queuePosition, json.info);
    };
    // check that all fields in the message are valid
    CardPlayedMessage.prototype.validate = function () {
        return (this.recipientUserId != null &&
            this.sourcePlayerUserId != null &&
            this.card != null &&
            this.originZoneZoneEnum != null &&
            this.destinationZoneZoneEnum != null &&
            this.paidCosts != null &&
            this.targetInfoList != null &&
            this.queuePosition != null &&
            this.info != null);
    };
    return CardPlayedMessage;
}(MessageBase_1.ServerMessage));
exports.default = CardPlayedMessage;
