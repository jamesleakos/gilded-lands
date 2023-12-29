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
var QueueActivateAbilityMessage = /** @class */ (function (_super) {
    __extends(QueueActivateAbilityMessage, _super);
    function QueueActivateAbilityMessage(messageId, senderUserId, sourceEntityInstanceId, abilityIndex, paidCosts, targetInfoList) {
        var _this = _super.call(this, messageId, senderUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.QueueActivateAbility;
        _this.sourceEntityInstanceId = sourceEntityInstanceId;
        _this.abilityIndex = abilityIndex;
        _this.paidCosts = paidCosts;
        _this.targetInfoList = targetInfoList;
        return _this;
    }
    QueueActivateAbilityMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { sourceEntityInstanceId: this.sourceEntityInstanceId, abilityIndex: this.abilityIndex, paidCosts: this.paidCosts.map(function (cost) { return cost.toJSON(); }), targetInfoList: this.targetInfoList.map(function (info) { return info.toJSON(); }) });
    };
    QueueActivateAbilityMessage.fromJSON = function (json) {
        var paidCosts = json.paidCosts.map(PayResourceCost_1.default.fromJSON);
        var targetInfoList = json.targetInfoList.map(TargetInfo_1.default.fromJSON);
        return new QueueActivateAbilityMessage(json.messageId, json.senderUserId, json.sourceEntityInstanceId, json.abilityIndex, paidCosts, targetInfoList);
    };
    // check that all fields in the message are valid
    QueueActivateAbilityMessage.prototype.validate = function () {
        return (_super.prototype.validate.call(this) &&
            this.sourceEntityInstanceId != null &&
            this.abilityIndex != null &&
            this.paidCosts != null &&
            this.targetInfoList != null);
    };
    return QueueActivateAbilityMessage;
}(MessageBase_1.ClientMessage));
exports.default = QueueActivateAbilityMessage;
