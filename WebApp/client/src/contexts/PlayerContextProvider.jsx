// external
import React, { useRef, useState, useEffect, useContext } from 'react';

// internal
import PlayerContext from './PlayerContext.js';
import SocketContext from './SocketContext.js';

// lol imports
import lol from '../../../lol_access/index.js';
const Player = lol.Classes.Player.Player;
const Keyword = lol.Classes.Keyword.Keyword;
const DivineShieldKeyword = lol.Classes.Keyword.DivineShieldKeyword;
const PhaseEnum = lol.Enums.PhaseEnum;
const { NetworkProtocol } = lol.Enums;

//
const PlayerContextProvider = ({ children }) => {
  // socket
  const { socket } = useContext(SocketContext);
  // master player state
  const [tempPlayer, setTempPlayer] = useState(null);

  // player state for display
  const [masterPlayer, setMasterPlayer] = useState(null);
  // saved player states for review
  const [savedPlayers, setSavedPlayers] = useState([]);

  // ref for masterPlayer for socket listeners
  const masterPlayerRef = useRef();
  masterPlayerRef.current = masterPlayer;

  // send to server
  const sendToServer = (messageName, data) => {
    console.log('client sending to server:', messageName, data);
    socket.emit(messageName, data);
  };

  // #region setting player and socket listeners

  // on start or on a new socket, we need to set up the player
  useEffect(() => {
    if (!socket) {
      return;
    }

    let newPlayer = null;

    if (!!masterPlayer) {
      newPlayer = masterPlayer.clone();
      newPlayer._sendToServer = sendToServer;
    } else {
      newPlayer = new Player(sendToServer);
    }

    setMasterPlayer(newPlayer);
    newPlayer.fetchUpdatedGamestate();
    subscribe(socket);

    return () => {
      unsubscribe(socket);
    };
  }, [socket]);

  // #endregion

  // #region subscribe

  const subscribe = (socket) => {
    if (!socket) {
      throw new Error('No socket provided');
    }

    // gamestate included, these get special functions
    socket.on(NetworkProtocol[NetworkProtocol.StartGame], onStartGame);
    socket.on(
      NetworkProtocol[NetworkProtocol.ServerSendingGamestateForRejoin],
      onGamestateForRejoin
    );
    socket.on(NetworkProtocol[NetworkProtocol.LandExplored], onLandExplored);
    socket.on(
      NetworkProtocol[NetworkProtocol.CreatureAttacked],
      receivedCreatureAttackedMessage
    );
    socket.on(
      NetworkProtocol[NetworkProtocol.CardPlayed],
      receivedPlayCardMessage
    );
    socket.on(
      NetworkProtocol[NetworkProtocol.QueueStarted],
      receivedQueueStartedMessage
    );
    socket.on(
      NetworkProtocol[NetworkProtocol.AbilityActivated],
      receivedAbilityActivatedMessage
    );
    // onNextPhase - gets special function becuase it doesn't update masterPlayer
    socket.on(NetworkProtocol[NetworkProtocol.NextPhaseReady], onNextPhase);
    // logging all message for development
    socket.on('message', (msg) => {
      console.log('message received:', msg);
    });
  };

  const unsubscribe = (socket) => {
    socket.removeAllListeners(NetworkProtocol[NetworkProtocol.StartGame]);
    socket.removeAllListeners(NetworkProtocol[NetworkProtocol.EndGame]);
    socket.removeAllListeners(
      NetworkProtocol[NetworkProtocol.ServerSendingGamestateForRejoin]
    );
    socket.removeAllListeners(NetworkProtocol[NetworkProtocol.NextPhaseReady]);
    socket.removeAllListeners(NetworkProtocol[NetworkProtocol.LandExplored]);
    socket.removeAllListeners(
      NetworkProtocol[NetworkProtocol.CreatureAttacked]
    );
    socket.removeAllListeners(NetworkProtocol[NetworkProtocol.CardPlayed]);
    socket.removeAllListeners(NetworkProtocol[NetworkProtocol.QueueStarted]);
    socket.removeAllListeners(
      NetworkProtocol[NetworkProtocol.AbilityActivated]
    );

    socket.removeAllListeners('message');
  };

  // #endregion

  // #region 'on' functions

  const onStartGame = (msg) => {
    const newPlayer = new Player(sendToServer);
    newPlayer.onStartGame(msg);
    setMasterPlayer(newPlayer);
    // we do this here mainly just so gamePage can get the temp phase index
    setTempPlayer(newPlayer);
    console.log('onStartGame, newPlayer:', newPlayer);
  };

  const onGamestateForRejoin = (msg) => {
    const newPlayer = new Player(sendToServer);
    newPlayer.onGamestateForRejoin(msg);
    setMasterPlayer(newPlayer);
    // we do this here mainly just so gamePage can get the temp phase index
    setTempPlayer(newPlayer);
    console.log('onGamestateForRejoin, newPlayer:', newPlayer);
  };

  const onLandExplored = (msg) => {
    if (!checkForSavedPlayer('onLandExplored')) return;

    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      newMasterPlayer.onLandExplored(msg);
      console.log('onLandExplored - newMasterPlayer: ', newMasterPlayer);
      return newMasterPlayer;
    });
  };

  // updates tempPlayer, to later replace masterPlayer
  const onNextPhase = (msg) => {
    try {
      if (!checkForSavedPlayer('onNextPhase')) return;

      const newPlayer = masterPlayerRef.current.clone();
      newPlayer._sendToServer = sendToServer;
      try {
        newPlayer.onStartPhase(msg);
      } catch (err) {
        console.log(err);
      }
      if (msg.phaseIndex === PhaseEnum.Maneuver) {
        setMasterPlayer(newPlayer);
      }
      setTempPlayer(newPlayer);
      console.log(
        'onNextPhase - setting temp player to newPlayer: ',
        newPlayer
      );
    } catch (err) {
      console.log(err);
    }
  };

  const receivedCreatureAttackedMessage = (msg) => {
    if (!checkForSavedPlayer('onCreatureAttacked')) return;

    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      try {
        newMasterPlayer.receivedAttackMessage(msg);
      } catch (err) {
        console.log(err);
      }
      console.log(
        'receiveCreatureAttackedMessage - newMasterPlayer: ',
        newMasterPlayer
      );
      return newMasterPlayer;
    });
  };

  const receivedPlayCardMessage = (msg) => {
    try {
      if (!checkForSavedPlayer('receivedPlayCardMessage')) return;

      setMasterPlayer((prevMasterPlayer) => {
        const newMasterPlayer = prevMasterPlayer.clone();
        newMasterPlayer.receivedPlayCardMessage(msg);
        console.log(
          'receivedPlayCardMessage - newMasterPlayer: ',
          newMasterPlayer
        );
        return newMasterPlayer;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const receivedQueueStartedMessage = (msg) => {
    if (!checkForSavedPlayer('onQueueStarted')) return;

    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      try {
        newMasterPlayer.receivedQueueStartedMessage(msg);
      } catch (err) {
        console.log(err);
      }
      console.log(
        'receivedQueueStartedMessage - newMasterPlayer: ',
        newMasterPlayer
      );
      return newMasterPlayer;
    });
  };

  const receivedAbilityActivatedMessage = (msg) => {
    if (!checkForSavedPlayer('onAbilityActivated')) return;

    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      try {
        newMasterPlayer.receivedActivateAbilityMessageFromServer(msg);
      } catch (err) {
        console.log(err);
      }
      console.log(
        'receivedAbilityActivatedMessage - newMasterPlayer: ',
        newMasterPlayer
      );
      return newMasterPlayer;
    });
  };

  // #endregion

  // #region queue actions

  const queuePlayCard = (
    cardInstanceId,
    zoneEnum,
    queuedCosts,
    battlecryIndex,
    targetInfoList
  ) => {
    if (!checkForSavedPlayer('queuePlayCard')) return;
    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      try {
        newMasterPlayer.queuePlayCard(
          cardInstanceId,
          zoneEnum,
          queuedCosts,
          battlecryIndex,
          targetInfoList
        );
      } catch (err) {
        console.log(err);
      }
      console.log('queuePlayCard - newMasterPlayer: ', newMasterPlayer);
      return newMasterPlayer;
    });
  };

  const cancelPlayCard = (cardInstanceId) => {
    if (!checkForSavedPlayer('cancelPlayCard')) return;
    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      try {
        newMasterPlayer.cancelPlayCard(cardInstanceId);
      } catch (err) {
        console.log(err);
      }
      console.log('cancelPlayCard - newMasterPlayer: ', newMasterPlayer);
      return newMasterPlayer;
    });
  };

  const queueAttack = (attackingCard, targetCard) => {
    if (!checkForSavedPlayer('queueAttack')) return;
    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      try {
        newMasterPlayer.queueAttack(
          attackingCard.instanceId,
          targetCard.instanceId
        );
      } catch (err) {
        console.log(err);
      }
      console.log('queueAttack - newMasterPlayer: ', newMasterPlayer);
      return newMasterPlayer;
    });
  };

  const cancelAttack = (attackingCardInstanceId) => {
    if (!checkForSavedPlayer('cancelAttack')) return;
    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      try {
        newMasterPlayer.cancelAttack(attackingCardInstanceId);
      } catch (err) {
        console.log(err);
      }
      console.log('cancelAttack - newMasterPlayer: ', newMasterPlayer);
      return newMasterPlayer;
    });
  };

  const queueAbility = (
    entityInstanceId,
    abilityIndex,
    queuedCosts,
    targetInstanceIds
  ) => {
    if (!checkForSavedPlayer('queueAbility')) return;

    console.log('playerContext - queueAbility: ', {
      entityInstanceId,
      abilityIndex,
      queuedCosts,
      targetInstanceIds,
    });

    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      try {
        newMasterPlayer.queueActivateAbility(
          entityInstanceId,
          abilityIndex,
          queuedCosts,
          targetInstanceIds
        );
      } catch (err) {
        console.log(err);
      }
      console.log('queueAbility - newMasterPlayer: ', newMasterPlayer);
      return newMasterPlayer;
    });
  };

  // #endregion

  // #region queue review

  const endQueueReview = () => {
    setMasterPlayer(tempPlayer);
  };

  const loadSavedPlayer = (index) => {
    const player = savedPlayers[index];
    if (!player) {
      throw new Error('No saved player at index ' + index);
    }
    const newPlayer = player.clone();
    setMasterPlayer(newPlayer);
  };

  const runQueue = async () => {
    if (!masterPlayer || !masterPlayer.queueReadyToRun) return;

    for (
      let i = masterPlayer.currentQueueIndex;
      i < masterPlayer.queue.length;
      i++
    ) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for 1 second

        setMasterPlayer((prevMasterPlayer) => {
          try {
            const newMasterPlayer = prevMasterPlayer.clone();
            newMasterPlayer.runNextQueueline();
            return newMasterPlayer;
          } catch (err) {
            console.log('probably ran the queue too soon after');
            console.log(err);
            return prevMasterPlayer;
          }
        });
      } catch (err) {
        console.log(err);
        break; // stop the loop if there's an error
      }
    }
  };

  useEffect(() => {
    if (!masterPlayer) return;
    if (!masterPlayer.queueReadyToRun) return;

    const newPlayers = masterPlayer.returnPlayersFromQueue();
    setSavedPlayers(newPlayers);
  }, [masterPlayer && masterPlayer.queueReadyToRun]);

  // #endregion

  // #region blocking

  const queueBlock = (blockingCardInstanceId, blockedCardInstanceId) => {
    if (!checkForSavedPlayer('queueBlock')) return;
    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      try {
        newMasterPlayer.queueBlock(
          blockingCardInstanceId,
          blockedCardInstanceId
        );
      } catch (err) {
        console.log(err);
      }
      console.log('queueBlock - newMasterPlayer: ', newMasterPlayer);
      return newMasterPlayer;
    });
  };

  const cancelBlock = (blockingCardInstanceId) => {
    if (!checkForSavedPlayer('cancelBlock')) return;
    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      try {
        newMasterPlayer.cancelBlock(blockingCardInstanceId);
      } catch (err) {
        console.log(err);
      }
      console.log('cancelBlock - newMasterPlayer: ', newMasterPlayer);
      return newMasterPlayer;
    });
  };

  const changeBlockOrder = (blockingCardInstanceId, newBlockOrder) => {
    if (!checkForSavedPlayer('changeBlockOrder')) return;
    setMasterPlayer((prevMasterPlayer) => {
      const newMasterPlayer = prevMasterPlayer.clone();
      try {
        newMasterPlayer.changeBlockOrder(blockingCardInstanceId, newBlockOrder);
      } catch (err) {
        console.log(err);
      }
      console.log('changeBlockOrder - newMasterPlayer: ', newMasterPlayer);
      return newMasterPlayer;
    });
  };

  // #endregion

  // #region utility

  const checkForSavedPlayer = (msg) => {
    if (!masterPlayerRef.current) {
      console.log(
        'DID NOT FIND THE PLAYER during',
        msg,
        '- FETCHING NEW GAMESTATE'
      );
      const newPlayer = new Player(sendToServer);
      newPlayer.fetchUpdatedGamestate();
      return false;
    }

    return true;
  };

  // #endregion

  const value = {
    masterPlayer,
    tempPlayer,
    savedPlayers,
    loadSavedPlayer,
    endQueueReview,
    runQueue,
    queuePlayCard,
    cancelPlayCard,
    queueAttack,
    cancelAttack,
    queueBlock,
    cancelBlock,
    changeBlockOrder,
    queueAbility,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
