"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queueline = /** @class */ (function () {
    function Queueline() {
    }
    // can't give a base class a constructor
    Queueline.prototype.fillBaseInfo = function (server, sourceCard, sourcePlayer, priority) {
        this.server = server;
        this.sourceCard = sourceCard;
        this.sourcePlayer = sourcePlayer;
        this.priority = priority;
    };
    Queueline.prototype.areTargetsStillAvailable = function () {
        return true;
    };
    Queueline.prototype.areTargetsStillRequired = function () {
        return false;
    };
    Queueline.prototype.areAllSelectedTargetInfoItemsValid = function () {
        return true;
    };
    Queueline.prototype.goOutForTargets = function () { };
    return Queueline;
}());
exports.default = Queueline;
