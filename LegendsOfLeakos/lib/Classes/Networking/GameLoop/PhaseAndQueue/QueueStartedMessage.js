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
var QueueStartedMessage = /** @class */ (function (_super) {
    __extends(QueueStartedMessage, _super);
    function QueueStartedMessage(recipientUserId, totalQueuelines, queuelinesThisMessage, breakBeforeEndOfQueue, breakingPlayerUserId, attackingCardInstanceIds, blocks) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.messageEnum = NetworkProtocol_1.NetworkProtocol.QueueStarted;
        _this.totalQueuelines = totalQueuelines;
        _this.queuelinesThisMessage = queuelinesThisMessage;
        _this.breakBeforeEndOfQueue = breakBeforeEndOfQueue;
        _this.breakingPlayerUserId = breakingPlayerUserId;
        _this.attackingCardInstanceIds = attackingCardInstanceIds;
        _this.blocks = blocks;
        return _this;
    }
    QueueStartedMessage.prototype.toJSON = function () {
        return __assign(__assign({}, _super.prototype.toJSON.call(this)), { totalQueuelines: this.totalQueuelines, queuelinesThisMessage: this.queuelinesThisMessage, breakBeforeEndOfQueue: this.breakBeforeEndOfQueue, breakingPlayerUserId: this.breakingPlayerUserId, attackingCardInstanceIds: this.attackingCardInstanceIds, blocks: this.blocks.map(function (b) { return (__assign({}, b)); }) });
    };
    QueueStartedMessage.fromJSON = function (json) {
        return new QueueStartedMessage(json.recipientUserId, json.totalQueuelines, json.queuelinesThisMessage, json.breakBeforeEndOfQueue, json.breakingPlayerUserId, json.attackingCardInstanceIds, json.blocks.map(function (b) { return (__assign({}, b)); }));
    };
    // check that all fields in the message are valid
    QueueStartedMessage.prototype.validate = function () {
        return (this.recipientUserId != null &&
            this.totalQueuelines != null &&
            this.queuelinesThisMessage != null &&
            this.breakBeforeEndOfQueue != null &&
            // this.breakingPlayerUserId != null && // this can be NULL
            this.attackingCardInstanceIds != null &&
            this.blocks != null);
    };
    return QueueStartedMessage;
}(MessageBase_1.ServerMessage));
exports.default = QueueStartedMessage;
