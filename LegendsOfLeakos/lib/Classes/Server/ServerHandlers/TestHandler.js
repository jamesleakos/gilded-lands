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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServerHandler_1 = __importDefault(require("../ServerHandler"));
var TestHandler = /** @class */ (function (_super) {
    __extends(TestHandler, _super);
    function TestHandler(gameServer) {
        return _super.call(this, gameServer) || this;
    }
    TestHandler.prototype.registerNetworkHandlers = function (playerSockets) {
        var _this = this;
        var _loop_1 = function (socket) {
            socket.on('client-message', function (data) {
                _this.gameServer.test(socket, data);
            });
            socket.on('end-game', function (data) {
                _this.gameServer.endGame();
            });
        };
        for (var _i = 0, playerSockets_1 = playerSockets; _i < playerSockets_1.length; _i++) {
            var socket = playerSockets_1[_i];
            _loop_1(socket);
        }
    };
    TestHandler.prototype.unregisterNetworkHandlers = function (playerSockets) {
        for (var _i = 0, playerSockets_2 = playerSockets; _i < playerSockets_2.length; _i++) {
            var socket = playerSockets_2[_i];
            socket.removeAllListeners('client-message');
            socket.removeAllListeners('end-game');
        }
    };
    return TestHandler;
}(ServerHandler_1.default));
exports.default = TestHandler;
