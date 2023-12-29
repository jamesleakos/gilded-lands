const { v4: uuidv4 } = require('uuid');
const gameMan = require('./gameManager.js');
const MAX_PLAYERS = 2;

class LoLPlayer {
  constructor(socketId, userId, name) {
    this.socketId = socketId;
    this.userId = userId;
    this.name = name;
    this.isConnected = true;
    this.isReady = false;
    // this is set to null because this is being handled by the restful API - it'll grab the realm once we go start the game
    this.realm = null;
  }
}

class Room {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.players = [];
    this.gameInProgress = false;
    this.game = null;
  }

  addPlayer(player) {
    if (this.players.find((p) => p.userId === player.userId)) return;

    this.players.push(player);
  }

  removePlayer(userId) {
    this.players = this.players.filter((p) => p.userId !== userId);
  }

  checkReady() {
    return this.players.every((p) => p.isReady) && this.players.length > 1;
  }

  getPlayerByUserID(userID) {
    return this.players.find((p) => p.userId === userID);
  }
}

class RoomManager {
  constructor() {
    this.rooms = [];
    this.players = [];
    this.userIDToRoom = {};
    this.userIDToPlayer = {};
    this.socketIDToPlayer = {};
  }

  getFullRoomReport() {
    return {
      rooms: this.rooms,
      players: this.players,
      userIDToRoom: this.socketIDToRoom,
      userIDToPlayer: this.userIDToPlayer,
      socketIDToPlayer: this.socketIDToPlayer,
    };
  }

  getRoomByID(roomID) {
    return this.rooms.find((r) => r.id === roomID);
  }

  getOpenRooms() {
    const outRooms = this.rooms.filter((room) => {
      return !room.gameInProgress && !room.game;
    });

    return outRooms;
  }

  createRoom(roomname) {
    // make sure to cleanup
    this.cleanupEmptyRooms();

    const newRoom = new Room(roomname);
    this.rooms.push(newRoom);
    return newRoom;
  }

  getPlayerByUserID(userID) {
    return this.userIDToPlayer[userID];
  }

  getPlayerBySocketID(socketID) {
    return this.socketIDToPlayer[socketID];
  }

  createPlayer(user, playerSocket) {
    const newPlayer = new LoLPlayer(
      playerSocket.id,
      user.id,
      user.name.slice(0, 10)
    );
    this.players.push(newPlayer);
    this.socketIDToPlayer[playerSocket.id] = newPlayer;
    this.userIDToPlayer[user.id] = newPlayer;
    return newPlayer;
  }

  // new room on player request, player gets added
  createNewRoomAddPlayer(roomname, player, playerSocket) {
    // create room
    const room = this.createRoom(roomname);
    this.addPlayerToRoom(room, player, playerSocket);
    return room;
  }

  addPlayerToRoom(room, player, playerSocket) {
    player.isReady = false;

    // don't let too many players join
    if (room.players.length >= MAX_PLAYERS) return;

    // don't let a player join a room they're already in
    if (room.players.find((p) => p.userId === player.userId)) return;

    // add to io namespace - this could get moved to game manager in the future, but it is okay for a pregame chat here
    playerSocket.join(room.id);

    // add to new room
    room.addPlayer(player);

    delete this.userIDToRoom[player.userId];
    this.userIDToRoom[player.userId] = room;

    // remove player from any other rooms they're in
    const otherRooms = this.rooms.filter((r) => r.id !== room.id);
    otherRooms.forEach((r) => {
      this.removePlayerFromRoom(r, player, playerSocket);
    });
  }

  removePlayerFromRoom(room, player, playerSocket) {
    player.isReady = false;
    // remove from room
    room.removePlayer(player.userId);
    // remove from playerToRoom tracker
    if (this.userIDToRoom[player.userId] === room) {
      delete this.userIDToRoom[player.userId];
    }
    //unsub from room messages
    playerSocket.leave(room.id);

    // make sure to cleanup
    this.cleanupEmptyRooms();
  }

  removePlayerFromTrackedRoom(player, playerSocket) {
    const oldRoom = this.userIDToRoom[player.userId];
    if (oldRoom) {
      this.removePlayerFromRoom(oldRoom, player, playerSocket);
    } else {
      console.log('no room to remove player from');
    }
  }

  //** Called when a player connects. Creates a player if they don't exist.
  // Returns true if they exits and need to be connected to a game */
  playerConnected(user, playerSocket) {
    // console.log('playerConnected', user, user.id);

    const player = this.userIDToPlayer[user.id];

    // console.log('player:', player);

    if (player) {
      // update the player with the new socket
      player.socketId = playerSocket.id;

      // update the socketIDToPlayer tracker
      this.socketIDToPlayer[playerSocket.id] = player;

      const room = this.userIDToRoom[user.id];
      if (room && room.game && room.gameInProgress) {
        // the player had been disconnected, but not removed and the game is still on

        // subscribe the player to the room and game they were in
        playerSocket.join(room.id);

        return room; // needs to rejoin game
      }
      {
        // console.log('room check failed: ', room);
        return false; // does need to join game
      }
    } else {
      // the player is new, create them
      this.createPlayer(user, playerSocket);
      return false; // does not need to join game
    }
  }

  playerDisconnected(playerSocket) {
    const player = this.socketIDToPlayer[playerSocket.id];
    console.log(
      'player disconnecting with userId:',
      player.userId,
      'and socketId:',
      playerSocket.id
    );
    const room = this.userIDToRoom[player.userId];
    if (room && room.game && room.gameInProgress) {
      player.isConnected = false;
      if (room.players.filter((p) => p.isConnected).length === 0) {
        // if no players are connected, shut down the room
        this.rooms = this.rooms.filter((r) => r.id !== room.id);
      }
    } else {
      // remove from all
      console.log('removing player with socketId:', playerSocket.id);
      this.removePlayer(player, playerSocket);
    }
  }

  removePlayer(player, playerSocket) {
    // remove from room
    this.removePlayerFromTrackedRoom(player, playerSocket);

    const userId = player.userId;
    // delete from userID tracker
    delete this.userIDToPlayer[userId];
    delete this.userIDToRoom[userId];

    // remove from array - this auto removes it from the trackers as well?
    this.players = this.players.filter((p) => p.socketId !== playerSocket.id);

    // delete from trackers
    delete this.socketIDToPlayer[playerSocket.id];
  }

  checkForGameReady(player) {
    const room = this.userIDToRoom[player.userId];
    if (!room) {
      console.log('roomManager.checkforGameReady: no room found for player');
      return false;
    }
    if (room.checkReady()) {
      return room;
    } else {
      return false;
    }
  }

  cleanupEmptyRooms() {
    this.rooms = this.rooms.filter((r) => r.players.length > 0);
  }
}

const roomMan = new RoomManager();
module.exports = roomMan;
