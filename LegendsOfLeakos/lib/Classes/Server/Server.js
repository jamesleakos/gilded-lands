"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// handlers
var TestHandler_1 = __importDefault(require("./ServerHandlers/TestHandler"));
var GameServer = /** @class */ (function () {
    // #endregion
    // #region Constructor
    function GameServer(room, sendToRoom, sendToPlayer, endGameCallback, gameProperties) {
        this.handlers = [];
        this.queue = [];
        this.room = room;
        this.sendToRoom = sendToRoom;
        this.sendToPlayer = sendToPlayer;
        this.endGameCallback = endGameCallback;
        this.loadGameConfiguration(gameProperties);
        this.addServerHandlers();
    }
    Object.defineProperty(GameServer.prototype, "effectSolver", {
        get: function () {
            return this._effectSolver;
        },
        set: function (value) {
            this._effectSolver = value;
        },
        enumerable: false,
        configurable: true
    });
    // #endregion
    // #region One Use Functions
    // Loads the game configuration.
    GameServer.prototype.loadGameConfiguration = function (gameProperties) {
        this.turnDuration = gameProperties.turnDuration;
        this.phaseList = gameProperties.phaseList;
    };
    // Adds the server handlers that are actually responsible for implementing the server's logic.
    GameServer.prototype.addServerHandlers = function () {
        this.handlers.push(new TestHandler_1.default(this));
        // this.handlers.push(new PlayerRegistrationHandler(this));
        // this.handlers.push(new TurnSequenceHandler(this));
        // this.handlers.push(new EffectSolverHandler(this));
        // this.handlers.push(new ChatHandler(this));
        // this.handlers.push(new PlayerActionHandler(this));
        // this.handlers.push(new CombatHandler(this));
    };
    // Registers the network handlers for the messages the server is interested in listening to.
    GameServer.prototype.listen = function (playerSockets) {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler.registerNetworkHandlers(playerSockets);
        }
    };
    // Unregisters the network handlers for the messages the server is interested in listening to.
    GameServer.prototype.unlisten = function (playerSockets) {
        for (var _i = 0, _a = this.handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            handler.unregisterNetworkHandlers(playerSockets);
        }
        this.handlers = [];
    };
    GameServer.prototype.startNewGame = function () {
        console.log('Starting new game');
    };
    // Called when a player with the specified connection identifier connects to the server.
    GameServer.prototype.onPlayerConnected = function (connectionId) {
        console.log('Player with id ' + connectionId + ' connected to server.');
        /*var player = Players.find(x => x.ConnectionId === connectionId);
      if (player !== null)
          player.IsConnected = true;*/
    };
    // Called when a player with the specified connection identifier disconnects from the server.
    GameServer.prototype.onPlayerDisconnected = function (connectionId) {
        console.log('Player with id ' + connectionId + ' disconnected from server.');
        /*var player = Players.find(x => x.ConnectionId === connectionId);
      if (player !== null)
          player.IsConnected = false;*/
    };
    // #endregion
    // #region Other Helpers
    // #endregion
    // #region Game Loop
    // #region Start and End
    GameServer.prototype.test = function (playerSocket, data) {
        this.sendToPlayer('server-message', 'Hello from server via other player', this.room);
    };
    GameServer.prototype.endGame = function () {
        console.log('Ending game');
        this.endGameCallback('game statistics go here');
    };
    return GameServer;
}());
exports.default = Server;
