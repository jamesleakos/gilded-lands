"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerHandler = /** @class */ (function () {
    // Constructor.
    function ServerHandler(gameServer) {
        this.gameServer = gameServer;
    }
    ServerHandler.prototype.validateMessageAndReturnPlayer = function (playerSocketId, msg) {
        if (!msg) {
            console.log('Message is null');
            return null;
        }
        // validate the message
        if (!msg.validate()) {
            console.log('Invalid message');
            return null;
        }
        // make sure that the senderUserId has the correct socket
        var checkedSocketId = this.gameServer.userIdToSocketId(msg.senderUserId);
        if (checkedSocketId !== playerSocketId) {
            console.log('Socket IDs do not match');
            return null;
        }
        // get the player from the userId
        var playerInfo = this.gameServer.gameState.getPlayerInfoByUserId(msg.senderUserId);
        if (!playerInfo) {
            console.log('Player not found');
            return null;
        }
        return playerInfo;
    };
    return ServerHandler;
}());
exports.default = ServerHandler;
