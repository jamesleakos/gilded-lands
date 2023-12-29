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
var MessageBase_1 = require("../../MessageBase");
var EndQueueExecutionMessage = /** @class */ (function (_super) {
    __extends(EndQueueExecutionMessage, _super);
    function EndQueueExecutionMessage(recipientUserId) {
        return _super.call(this, recipientUserId) || this;
    }
    EndQueueExecutionMessage.prototype.toJSON = function () {
        return {
            recipientUserId: this.recipientUserId,
        };
    };
    EndQueueExecutionMessage.fromJSON = function (json) {
        return new EndQueueExecutionMessage(json.recipientUserId);
    };
    // check that all fields in the message are valid
    EndQueueExecutionMessage.prototype.validate = function () {
        return this.recipientUserId != null;
    };
    return EndQueueExecutionMessage;
}(MessageBase_1.ServerMessage));
exports.default = EndQueueExecutionMessage;
