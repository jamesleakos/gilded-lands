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
Object.defineProperty(exports, "__esModule", { value: true });
var MessageBase_1 = require("../MessageBase");
var QueueStartedMessage = /** @class */ (function (_super) {
    __extends(QueueStartedMessage, _super);
    function QueueStartedMessage(recipientUserId, totalQueuelines, queuelinesThisMessage, breakBeforeEndOfQueue, breakingPlayer, blockingCards, blockedCards, blockingOrder) {
        var _this = _super.call(this, recipientUserId) || this;
        _this.totalQueuelines = totalQueuelines;
        _this.queuelinesThisMessage = queuelinesThisMessage;
        _this.breakBeforeEndOfQueue = breakBeforeEndOfQueue;
        _this.breakingPlayer = breakingPlayer;
        _this.blockingCards = blockingCards;
        _this.blockedCards = blockedCards;
        _this.blockingOrder = blockingOrder;
        return _this;
    }
    QueueStartedMessage.prototype.toJSON = function () {
        return {
            recipientUserId: this.recipientUserId,
            totalQueuelines: this.totalQueuelines,
            queuelinesThisMessage: this.queuelinesThisMessage,
            breakBeforeEndOfQueue: this.breakBeforeEndOfQueue,
            breakingPlayer: this.breakingPlayer,
            blockingCards: this.blockingCards,
            blockedCards: this.blockedCards,
            blockingOrder: this.blockingOrder,
        };
    };
    QueueStartedMessage.fromJSON = function (json) {
        return new QueueStartedMessage(json.recipientUserId, json.totalQueuelines, json.queuelinesThisMessage, json.breakBeforeEndOfQueue, json.breakingPlayer, json.blockingCards, json.blockedCards, json.blockingOrder);
    };
    // check that all fields in the message are valid
    QueueStartedMessage.prototype.validate = function () {
        return (this.recipientUserId != null &&
            this.totalQueuelines != null &&
            this.queuelinesThisMessage != null &&
            this.breakBeforeEndOfQueue != null &&
            this.breakingPlayer != null &&
            this.blockingCards != null &&
            this.blockedCards != null &&
            this.blockingOrder != null);
    };
    return QueueStartedMessage;
}(MessageBase_1.ServerMessage));
exports.default = QueueStartedMessage;
