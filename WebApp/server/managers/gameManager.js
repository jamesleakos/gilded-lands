// LoL stuff
const { Classes } = require('../../lol_access');
const GameServer = Classes.Server.GameServer;
const GameProperties = Classes.Game.GameProperties;

// get DB data
const { getUserSelectedRealm } = require('../db/controllers/realm.js');
const { getCardsInternal } = require('../db/controllers/card.js');
const { getEnchantmentsInternal } = require('../db/controllers/enchantment.js');

const startGame = async (room, io) => {
  // check for correct number of players
  if (
    room.players.length < GameProperties.minPlayers ||
    room.players.length > GameProperties.maxPlayers
  ) {
    console.log('ERROR: Invalid number of players');
    return;
  }
  // give each player a realm
  for (let player of room.players) {
    const realm = await getUserSelectedRealm(player.userId);
    if (!realm) {
      console.log('ERROR: player does not have a realm');
      return;
    }
    player.realm = realm;
  }

  const clients = io.sockets.adapter.rooms.get(room.id);
  const sockets = [...clients].map((socketId) =>
    io.sockets.sockets.get(socketId)
  );

  cardLibrary = await getCardsInternal();
  enchantmentLibrary = await getEnchantmentsInternal();

  room.game = new GameServer(
    room.players,
    // userID to socketID callback
    (userID) => {
      const player = room.getPlayerByUserID(userID);
      if (!player) {
        console.log('ERROR: player not found');
        return;
      }
      return player.socketId;
    },
    // send to player callback
    (messageType, data, playerUserID) => {
      const player = room.getPlayerByUserID(playerUserID);
      if (!player) {
        console.log('ERROR: player not found');
        return;
      }
      const playerSocketID = player.socketId;
      sendToPlayer(messageType, data, playerSocketID, io);
    },
    // end game callback
    (gameSummaryData) => {
      endGame(room, io, gameSummaryData, sockets);
    },
    cardLibrary,
    enchantmentLibrary
  );
  room.game.listen(sockets);
  room.game.startNewGame();
  room.gameInProgress = true;
  // we used to have to send this message before creating the server so that the clients
  // would get subscribed to the messages
  // this is now done in a separate context that is always listening, so it's fine
  io.to(room.id).emit('game-started', room.id);
};

const sendToPlayer = (messageType, data, playerSocketID, io) => {
  const client = io.sockets.sockets.get(playerSocketID);
  if (client) client.emit(messageType, data);
};

const endGame = (room, io, gameSummaryData, sockets) => {
  room.game.unlisten(sockets);
  room.gameInProgress = false;
  room.game = null;
  console.log(
    'save summary data to DB, update player stats, report to player, etc.: ',
    gameSummaryData
  );
  for (let player of room.players) {
    player.isReady = false;
  }
  io.to(room.id).emit('game-ended');
};

module.exports.startGame = startGame;
