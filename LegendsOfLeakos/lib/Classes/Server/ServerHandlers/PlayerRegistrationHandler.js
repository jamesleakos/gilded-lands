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
var RegisterPlayerMessage_1 = __importDefault(require("../../Networking/GameLoop/Game/RegisterPlayerMessage"));
var PlayerInfo_1 = __importDefault(require("../../Player/PlayerInfo"));
var Stat_1 = __importDefault(require("../../Stat/Stat"));
var RuntimeZone_1 = __importDefault(require("../../Zone/RuntimeZone"));
var RuntimeRealm_1 = __importDefault(require("../../RealmsAndLand/Realm/RuntimeRealm"));
var Networking_1 = require("../../../Enums/Networking");
var Zone_1 = require("../../../Enums/Zone");
var GameProperties_1 = __importDefault(require("../../Game/GameProperties"));
var PlayerRegistrationHandler = /** @class */ (function (_super) {
    __extends(PlayerRegistrationHandler, _super);
    function PlayerRegistrationHandler(gameServer) {
        return _super.call(this, gameServer) || this;
    }
    PlayerRegistrationHandler.prototype.registerNetworkHandlers = function (playerSockets) {
        var _this = this;
        var _loop_1 = function (socket) {
            socket.on(Networking_1.NetworkProtocol.RegisterPlayer.toString(), function (data) {
                _this.onRegisterPlayer(socket, data);
            });
        };
        for (var _i = 0, playerSockets_1 = playerSockets; _i < playerSockets_1.length; _i++) {
            var socket = playerSockets_1[_i];
            _loop_1(socket);
        }
    };
    PlayerRegistrationHandler.prototype.unregisterNetworkHandlers = function (playerSockets) {
        for (var _i = 0, playerSockets_2 = playerSockets; _i < playerSockets_2.length; _i++) {
            var socket = playerSockets_2[_i];
            socket.removeAllListeners(Networking_1.NetworkProtocol.RegisterPlayer.toString());
        }
    };
    PlayerRegistrationHandler.prototype.onRegisterPlayer = function (playerSocket, data) {
        var msg = RegisterPlayerMessage_1.default.fromJSON(data);
        // DONT USE validateMessageAndPlayer here because we don't have a player yet
        // check the msg for all varibles
        if (!msg.validate()) {
            console.log('Invalid register player message');
            return;
        }
        // If this player is already registered, ignore this message.
        var player = this.gameServer.gameState.getPlayerInfoByUserId(msg.senderUserId);
        if (player) {
            console.log('Player is already registered');
            return;
        }
        // make sure the socket id matches the senderUserId
        var checkedSocketId = this.gameServer.userIdToSocketId(msg.senderUserId);
        if (checkedSocketId !== playerSocket.id) {
            console.log('Socket IDs do not match');
            return;
        }
        // Create a new player info for the registered player.
        player = new PlayerInfo_1.default();
        player.id = this.gameServer.gameState.players.length;
        player.userId = msg.senderUserId;
        player.nickname = msg.name;
        player.isConnected = true;
        player.isHuman = msg.isHuman;
        player.currentEntityInstanceId = player.id * 100000;
        // Set the player stats based on the generic player definition.
        for (var _i = 0, _a = GameProperties_1.default.playerStats; _i < _a.length; _i++) {
            var stat = _a[_i];
            var statCopy = new Stat_1.default(stat.statId, stat.name, stat.originalValue, stat.baseValue, stat.minValue, stat.maxValue, new Array(), new Array());
            player.stats.push(statCopy);
            player.nameToStat.set(statCopy.name, statCopy);
            player.idToStat.set(statCopy.statId, statCopy);
        }
        // Set the player zones based on the generic zone definitions.
        var personalZones = GameProperties_1.default.gameZones.filter(function (x) { return x.owner !== Zone_1.ZoneOwner.Shared; });
        for (var _b = 0, personalZones_1 = personalZones; _b < personalZones_1.length; _b++) {
            var zone = personalZones_1[_b];
            var zoneCopy = new RuntimeZone_1.default(player.currentEntityInstanceId++, zone.name, zone.zoneEnum, player.userId, [], []);
            player.zones.push(zoneCopy);
        }
        // Adding the deck
        var deckZone = player.getFriendlyZoneFromZoneEnum(Zone_1.ZoneEnum.Deck);
        var _c = RuntimeRealm_1.default.registerRealmAndAddCardsToDeck(msg.realm, deckZone, player, this.gameServer.gameState.gameManager.cardLibrary, GameProperties_1.default.realmLayout), realm = _c[0], newDeck = _c[1];
        player.realm = realm;
        deckZone = newDeck;
        // Add the new player to the server's list of players.
        this.gameServer.gameState.players.push(player);
        console.log("Player with id ".concat(player.id, " has joined the game."));
        // When the appropriate number of players is registered, the game can start.
        if (this.gameServer.gameState.players.length === 2) {
            this.gameServer.startNewGame();
        }
    };
    return PlayerRegistrationHandler;
}(ServerHandler_1.default));
exports.default = PlayerRegistrationHandler;
