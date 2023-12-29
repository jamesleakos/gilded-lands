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
var NetworkProtocol_1 = require("../../../Enums/NetworkProtocol");
var SendChatMessage_1 = __importDefault(require("../../Networking/Chat/SendChatMessage"));
var ServerHandler_1 = __importDefault(require("../ServerHandler"));
var ChatHandler = /** @class */ (function (_super) {
    __extends(ChatHandler, _super);
    function ChatHandler(gameServer) {
        return _super.call(this, gameServer) || this;
    }
    ChatHandler.prototype.registerNetworkHandlers = function (playerSockets) {
        var _this = this;
        var _loop_1 = function (socket) {
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.SendChatTextMessage], function (data) {
                try {
                    _this.onChat(socket, data);
                }
                catch (error) {
                    console.log('error: ', error);
                }
            });
        };
        for (var _i = 0, playerSockets_1 = playerSockets; _i < playerSockets_1.length; _i++) {
            var socket = playerSockets_1[_i];
            _loop_1(socket);
        }
    };
    ChatHandler.prototype.unregisterNetworkHandlers = function (playerSockets) {
        for (var _i = 0, playerSockets_2 = playerSockets; _i < playerSockets_2.length; _i++) {
            var socket = playerSockets_2[_i];
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.SendChatTextMessage]);
        }
    };
    ChatHandler.prototype.onChat = function (playerSocket, data) {
        var msg = SendChatMessage_1.default.fromJSON(data);
        var player = this.validateMessageAndReturnPlayer(playerSocket.id, msg);
        if (!player) {
            throw new Error('Player not found');
        }
        for (var _i = 0, _a = this.gameServer.gameState.players; _i < _a.length; _i++) {
            var player_1 = _a[_i];
            this.gameServer.sendToPlayer(NetworkProtocol_1.NetworkProtocol.SendChatTextMessage, msg, player_1.userId);
        }
    };
    return ChatHandler;
}(ServerHandler_1.default));
exports.default = ChatHandler;
