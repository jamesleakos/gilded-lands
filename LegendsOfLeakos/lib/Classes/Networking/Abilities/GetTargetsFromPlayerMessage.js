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
var RuntimeEffect_1 = __importDefault(require("../../Effect/RuntimeEffect"));
var TargetCriteria_1 = __importDefault(require("../../Target/TargetCriteria"));
var NetworkProtocol_1 = require("../../../Enums/NetworkProtocol");
var GetTargetsFromPlayerMessage = /** @class */ (function (_super) {
    __extends(GetTargetsFromPlayerMessage, _super);
    function GetTargetsFromPlayerMessage(recipientUserId, effect, currentCardInstanceId, targetCriterias, targetInfoCode, queueOrder) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.GetTargetsFromPlayer;
        _this.effect = effect;
        _this.cardInstanceId = currentCardInstanceId;
        _this.targetCriterias = targetCriterias;
        _this.targetInfoCode = targetInfoCode;
        _this.queueOrder = queueOrder;
        return _this;
    }
    GetTargetsFromPlayerMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { effect: this.effect.toJSON(), currentCardInstanceId: this.cardInstanceId, targetCriterias: this.targetCriterias.map(function (type) { return type.toJSON(); }), targetInfoCode: this.targetInfoCode });
    };
    GetTargetsFromPlayerMessage.fromJSON = function (json) {
        return new GetTargetsFromPlayerMessage(json.recipientUserId, RuntimeEffect_1.default.fromRuntimeJSON(json.effect), json.currentCardInstanceId, json.targetCriterias.map(TargetCriteria_1.default.fromRuntimeJSON), json.targetInfoCode, json.queueOrder);
    };
    // check that all fields in the message are valid
    GetTargetsFromPlayerMessage.prototype.validate = function () {
        return (this.recipientUserId != null &&
            this.effect != null &&
            this.cardInstanceId != null &&
            this.targetCriterias != null &&
            this.targetInfoCode != null &&
            this.queueOrder != null);
    };
    return GetTargetsFromPlayerMessage;
}(MessageBase_1.ServerMessage));
exports.default = GetTargetsFromPlayerMessage;
