// internal
const roomMan = require('../managers/roomManager.js');
const gameMan = require('../managers/gameManager.js');
const userController = require('../db/controllers/user.js');

module.exports = async (io, playerSocket) => {
  // on connection, create a user and add them to the room manager
  const userId = playerSocket?.request?.session?.passport?.user;
  const user = await userController.getUserById(userId);
  console.log(
    'player connected with userId:',
    userId,
    'and socketId:',
    playerSocket.id
  );

  playerSocket.onevent = function (packet) {
    const eventName = packet.data[0];
    const eventData = packet.data[1];
    console.log(
      'Received event:',
      eventName,
      eventData ? 'with data:' + JSON.stringify(eventData) : ''
    );
    // Call the original onevent function
    Object.getPrototypeOf(this).onevent.call(this, packet);
  };

  if (!user) {
    console.log("ERROR: this shouldn't happen, user not found");
    console.log('userId', userId);
    return;
  }
  // this is necessary for matching stuff
  let room = roomMan.playerConnected(user, playerSocket);
  if (room) {
    // we already subscribed them to the room
    // we need to subscribe them to the game
    room.game.listen([playerSocket]);
    // then let the client know that they are in the game
    playerSocket.emit('rejoined-game', room.id);

    // TODO - here we reset whatever messaging system we need to make sure that they get the right
    // messages and that they rejoin the game

    // TODO - if the room has a game in progress, we need to send them the game state
  }

  // on join, this will be sent
  io.emit('rooms-update', roomMan.getOpenRooms());

  const roomUpdate = () => {
    playerSocket.emit('rooms-update', roomMan.getOpenRooms());
  };

  const createNewRoom = async (data) => {
    const player = roomMan.getPlayerBySocketID(playerSocket.id);
    if (!player) {
      console.log('ERROR: player not found');
      return;
    }

    // create room and add player
    const room = roomMan.createNewRoomAddPlayer(
      !!data?.roomname ? data.roomname : 'New Room',
      player,
      playerSocket
    );

    playerSocket.emit('set-ready', player.isReady);
    playerSocket.emit('you-joined-room', room.id);
    io.emit('rooms-update', roomMan.getOpenRooms());
  };

  const joinRoom = async (data) => {
    const player = roomMan.getPlayerBySocketID(playerSocket.id);
    if (!player) {
      console.log('ERROR: player not found in pregameHandler.joinRoom');
      return;
    }

    const room = roomMan.getRoomByID(data.room_id);

    // create player and add to room
    roomMan.addPlayerToRoom(room, player, playerSocket);

    playerSocket.emit('set-ready', player.isReady);
    playerSocket.emit('you-joined-room', room.id);
    io.emit('rooms-update', roomMan.getOpenRooms());
  };

  const leaveRoom = () => {
    console.log('pregame leave room');
    const player = roomMan.getPlayerBySocketID(playerSocket.id);
    if (!player) {
      console.log('ERROR: player not found in pregameHandler.leaveRoom');
      return;
    }

    roomMan.removePlayerFromTrackedRoom(player, playerSocket);

    playerSocket.emit('set-ready', player.isReady);
    playerSocket.emit('you-left-room');
    io.emit('rooms-update', roomMan.getOpenRooms());
  };

  const toggleReady = async () => {
    const player = roomMan.getPlayerBySocketID(playerSocket.id);
    if (!player) {
      console.log('ERROR: player not found in pregameHandler.leaveRoom');
      return;
    }
    player.isReady = !player.isReady;
    playerSocket.emit('set-ready', player.isReady);

    if (player.isReady) {
      // this will return false if not ready
      const room = roomMan.checkForGameReady(player);
      if (room) {
        await gameMan.startGame(room, io);
      }
    }

    io.emit('rooms-update', roomMan.getOpenRooms());
  };

  const playerDisconnected = () => {
    console.log('player disconnected');
    roomMan.playerDisconnected(playerSocket);
    io.emit('rooms-update', roomMan.getOpenRooms());
  };

  const fullRoomReport = () => {
    if (user.role !== 'admin') return;
    playerSocket.emit('full-room-report', roomMan.getFullRoomReport());
  };

  // and these will be assigned
  playerSocket.on('request-new-room', createNewRoom);
  playerSocket.on('request-rooms', roomUpdate);
  playerSocket.on('request-join-room', joinRoom);
  playerSocket.on('request-leave-room', leaveRoom);
  playerSocket.on('request-toggle-ready', toggleReady);
  playerSocket.on('request-full-room-report', fullRoomReport);
  playerSocket.on('disconnect', playerDisconnected);

  // testing
  playerSocket.on('check-for-play', () => {
    const roomCheck = roomMan.playerConnected(user, playerSocket);
    if (roomCheck && roomCheck.game && roomCheck.gameInProgress) {
      playerSocket.emit('rejoined-game', roomCheck.id);
    } else if (roomCheck && roomCheck.gameInProgress) {
      playerSocket.emit('waiting-on-game');
    } else {
      playerSocket.emit('not-in-game');
    }
  });
};
