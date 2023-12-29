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
var ServerSendingGamestateForRejoinMessage_1 = __importDefault(require("../../Networking/Connection/ServerSendingGamestateForRejoinMessage"));
var ServerHandler_1 = __importDefault(require("../ServerHandler"));
var ConnectionHandler = /** @class */ (function (_super) {
    __extends(ConnectionHandler, _super);
    function ConnectionHandler(gameServer) {
        return _super.call(this, gameServer) || this;
    }
    ConnectionHandler.prototype.registerNetworkHandlers = function (playerSockets) {
        var _this = this;
        var _loop_1 = function (socket) {
            try {
                socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.RejoinedGame], function (data) {
                    _this.onRejoinedGame(socket, data);
                });
                socket.on('dev-player-end-game', function (data) {
                    console.log('in-game: dev-player-end-game');
                    _this.gameServer.endGame();
                });
            }
            catch (error) {
                console.log('error: ', error);
            }
        };
        for (var _i = 0, playerSockets_1 = playerSockets; _i < playerSockets_1.length; _i++) {
            var socket = playerSockets_1[_i];
            _loop_1(socket);
        }
    };
    ConnectionHandler.prototype.unregisterNetworkHandlers = function (playerSockets) {
        for (var _i = 0, playerSockets_2 = playerSockets; _i < playerSockets_2.length; _i++) {
            var socket = playerSockets_2[_i];
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.RejoinedGame]);
            socket.removeAllListeners('dev-player-end-game');
        }
    };
    ConnectionHandler.prototype.onRejoinedGame = function (socket, data) {
        var _this = this;
        var player = this.gameServer.gameState.players.find(function (player) { return _this.gameServer.userIdToSocketId(player.userId) === socket.id; });
        if (!player) {
            throw new Error('Player not found / not a valid message');
        }
        var returnMessage = new ServerSendingGamestateForRejoinMessage_1.default(player.userId, this.gameServer.gameState.currentTurn, this.gameServer.gameState.currentPhaseIndex, this.gameServer.gameState.rngSeed, player, this.gameServer.gameState.players.find(function (p) { return p.userId !== player.userId; }), this.gameServer.gameState.gameManager);
        this.gameServer.sendToPlayer(NetworkProtocol_1.NetworkProtocol.ServerSendingGamestateForRejoin, returnMessage, player.userId);
    };
    return ConnectionHandler;
}(ServerHandler_1.default));
exports.default = ConnectionHandler;
