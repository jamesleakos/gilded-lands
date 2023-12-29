"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerQueueline = /** @class */ (function () {
    function ServerQueueline() {
    }
    // can't give an abstract class a constructor
    ServerQueueline.prototype.fillBaseInfo = function (clientMessageId, sourceCardInstanceId, sourcePlayerUserId, priority) {
        this.clientMessageId = clientMessageId;
        this.sourceCardInstanceId = sourceCardInstanceId;
        this.sourcePlayerUserId = sourcePlayerUserId;
        this.priority = priority;
    };
    ServerQueueline.prototype.areTargetsStillAvailable = function (server) {
        return true;
    };
    ServerQueueline.prototype.areTargetsStillRequired = function (server) {
        return false;
    };
    ServerQueueline.prototype.areAllSelectedTargetInfoItemsValid = function (server) {
        return true;
    };
    ServerQueueline.prototype.goOutForTargets = function (server, queuePosition) { };
    return ServerQueueline;
}());
exports.default = ServerQueueline;
