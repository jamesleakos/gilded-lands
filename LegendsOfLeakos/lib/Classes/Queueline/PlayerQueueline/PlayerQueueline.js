"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerQueueline = /** @class */ (function () {
    function PlayerQueueline() {
    }
    PlayerQueueline.prototype.fillBaseInfo = function (myPlayerUserId, sourceCardInstanceId, sourcePlayerUserId, queuePosition) {
        this.myPlayerUserId = myPlayerUserId;
        this.sourceCardInstanceId = sourceCardInstanceId;
        this.sourcePlayerUserId = sourcePlayerUserId;
        this.queuePosition = queuePosition;
    };
    return PlayerQueueline;
}());
exports.default = PlayerQueueline;
