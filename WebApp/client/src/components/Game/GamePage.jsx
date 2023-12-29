// external
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// lol imports
import lol from '../../../../lol_access';
const PayResourceCost = lol.Classes.PayResourceCost.PayResourceCost;
const TargetInfo = lol.Classes.Target.TargetInfo;
const TargetableTypeSelectionEnum = lol.Enums.TargetableTypeSelectionEnum;
const TargetMethods = lol.Enums.TargetMethods;
// internal context
import PlayerContext from '../../contexts/PlayerContext.js';
import SocketContext from '../../contexts/SocketContext.js';
import DisplayContext from '../../contexts/DisplayContext.js';
// internal components
import Realm from './Realm/Realm.jsx';
import Hand from './Hand/Hand.jsx';
import ManaBar from './Mana/ManaBar.jsx';
import Board from './PlayArea/Board/Board.jsx';
import Arrow from './Arrow/Arrow.jsx';
import QueueList from './Queue/QueueList.jsx';
// css
import { GamePageStyled } from './styles/GamePage.styled.js';
// components

function GamePage() {
  // #region location check
  // if I'm not in play, leave this screen and go to the lobby
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate(); // get the navigate function

  useEffect(() => {
    if (!socket) return;
    if (!navigate) return;

    // on page load, check if the user is already in a room
    socket.emit('check-for-play');

    socket.on('not-in-game', (room_id) => {
      console.log('GamePage - not in game. Sending back to Lobby.');
      navigate('/lobby');
    });

    socket.on('game-ended', (room_id) => {
      console.log('GamePage - game ended. Sending back to Lobby.');
      navigate('/lobby');
    });

    return () => {
      // have to leave everything here, otherwise the socket events will be subscribed to multiple times
      socket.off('not-in-game');
      socket.off('game-ended');
    };
  }, [socket, navigate]); // add navigate to the dependency array
  // #endregion

  // #region contexts and refs and vars
  // need to have it up here so that the competing useEffects can access it
  const {
    masterPlayer,
    tempPlayer,
    runQueue,
    endQueueReview,
    queuePlayCard,
    queueAttack,
    queueBlock,
    queueAbility,
  } = useContext(PlayerContext);
  const { setDisplayHeight } = useContext(DisplayContext);
  const gameContainerRef = useRef(null);

  // player info
  const [playerInfo, setPlayerInfo] = useState(null);
  const [opponentInfo, setOpponentInfo] = useState(null);

  // game flow
  const [readyForQueue, setReadyForQueue] = useState(false);
  const [phaseButtonMessage, setPhaseButtonMessage] =
    useState('Explore a land');
  const [phaseButtonActive, setPhaseButtonActive] = useState(false);
  const [masterPhaseIndex, setMasterPhaseIndex] = useState(null);
  const [tempPhaseIndex, setTempPhaseIndex] = useState(null);

  // mouse pos
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mousePositionRef = useRef(mousePosition);
  useEffect(() => {
    mousePositionRef.current = mousePosition;
  }, [mousePosition]);

  // attacking (inc arrow)
  // we use both isAttacking and attackingCard because it makes sokme of the tracking
  // way way easier
  const [amActingInCombat, setAmActingInCombat] = useState(false);
  const amActingInCombatRef = useRef(amActingInCombat);
  useEffect(() => {
    amActingInCombatRef.current = amActingInCombat;
  }, [amActingInCombat]);

  // acting card
  const [actingCard, setActingCard] = useState(null);
  const actingCardRef = useRef(actingCard);
  useEffect(() => {
    actingCardRef.current = actingCard;
  }, [actingCard]);

  const [actingCardPosition, setActingCardPosition] = useState({
    x: 0,
    y: 0,
  });

  // acting ability / effect flow
  // entity
  const [actingAbilityEntity, setActingAbilityEntity] = useState(null);
  const [actingAbilityEntityPosition, setActingAbilityEntityPosition] =
    useState({ x: 0, y: 0 });

  // ability
  const [actingAbility, setActingAbility] = useState(null);

  // targets
  const [currentTargetCriteriaIndex, setCurrentTargetCriteriaIndex] =
    useState(null);

  const [currentTargetCriteria, setCurrentTargetCriteria] = useState(null);
  useEffect(() => {
    if (!actingAbility) return;
    if (currentTargetCriteriaIndex === null) {
      setCurrentTargetCriteria(null);
      return;
    }
    console.log('currentTargetCriteriaIndex', currentTargetCriteriaIndex);
    const newTargetCriteria =
      actingAbility.effect.targetCriterias[currentTargetCriteriaIndex];
    if (!newTargetCriteria) {
      throw new Error(
        'GamePage - startAbility - targetCriteria is null. This should never happen.'
      );
    }
    setCurrentTargetCriteria(newTargetCriteria);
  }, [actingAbility, currentTargetCriteriaIndex]);

  const [targetInfoList, setTargetInfoList] = useState([]);
  const [currentTargetInfo, setCurrentTargetInfo] = useState(null);
  const [currentTargetInfoViable, setCurrentTargetInfoViable] = useState(false);
  const [addingTargets, setAddingTargets] = useState(false);

  // queue lines
  const [attackLineData, setAttackLineData] = useState([]);
  const [blockLineData, setBlockLineData] = useState([]);
  const [abilityLineData, setAbilityLineData] = useState([]);

  // hand card drag and drop
  const [draggedCard, setDraggedCard] = useState(null);
  const [draggedPos, setDraggedPos] = useState({ x: 0, y: 0 });
  const draggedCardRef = useRef(null);

  // show / hide realms
  const [isPlayerRealmVisible, setIsPlayerRealmVisible] = useState(false);
  const [isOpponentRealmVisible, setIsOpponentRealmVisible] = useState(false);

  // #endregion

  // #region playerinfo and phase index

  useEffect(() => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    setPlayerInfo(masterPlayer.getPlayerInfo());
    setOpponentInfo(masterPlayer.getOpponentInfo());
    if (masterPlayer.gameState.currentPhaseIndex !== masterPhaseIndex) {
      setMasterPhaseIndex(masterPlayer.gameState.currentPhaseIndex);
    }
  }, [masterPlayer]);

  useEffect(() => {
    if (!tempPlayer || !tempPlayer.gameState) return;
    if (tempPlayer.gameState.currentPhaseIndex !== tempPhaseIndex) {
      setTempPhaseIndex(tempPlayer.gameState.currentPhaseIndex);
    }
  }, [tempPlayer]);

  // #endregion

  // #region game flow logic

  useEffect(() => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    // setting realm is down in 'show / hide realms'
    setQueuedMana([]);
    setReadyForQueue(false);
    setAttackLineData([]);
    setBlockLineData([]);
  }, [masterPhaseIndex]);

  useEffect(() => {
    if (readyForQueue) {
      setPhaseButtonActive(false);
    }
  }, [readyForQueue]);

  useEffect(() => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (masterPlayer.queueReadyToRun) {
      setAttackLineData([]);
      setBlockLineData([]);
      runQueue();
    }
  }, [masterPlayer && masterPlayer.gameState && masterPlayer.queueReadyToRun]);

  // #endregion

  //#region phase button

  const handlePhaseButtonClick = () => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (masterPhaseIndex === tempPhaseIndex) {
      masterPlayer.finishedActions();
      setReadyForQueue(true);
      setPhaseButtonMessage('Waiting for opponent');
    } else {
      endQueueReview();
    }
  };

  useEffect(() => {
    if (masterPhaseIndex === tempPhaseIndex) {
      if (masterPhaseIndex === lol.Enums.PhaseEnum.Recruit) {
        setPhaseButtonMessage('Explore a land');
        setPhaseButtonActive(false);
      } else if (masterPhaseIndex === lol.Enums.PhaseEnum.Maneuver) {
        setPhaseButtonMessage('Done with actions');
        setPhaseButtonActive(true);
      } else if (masterPhaseIndex === lol.Enums.PhaseEnum.Skirmish) {
        setPhaseButtonMessage('Done with actions');
        setPhaseButtonActive(true);
      } else if (masterPhaseIndex === lol.Enums.PhaseEnum.Battle) {
        setPhaseButtonMessage('Done with actions');
        setPhaseButtonActive(true);
      }
    } else {
      setPhaseButtonActive(true);
      setPhaseButtonMessage('End Queue Review');
    }
  }, [masterPhaseIndex, tempPhaseIndex]);

  //#endregion

  // #region show / hide realms

  useEffect(() => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (
      masterPlayer.gameState.currentPhaseIndex ===
        lol.Enums.PhaseEnum.Recruit &&
      masterPlayer
        .getPlayerInfo()
        .realm.landTiles.filter((tile) => tile.explored).length <=
        masterPlayer.gameState.currentTurn
    ) {
      setIsPlayerRealmVisible(true);
      setIsOpponentRealmVisible(false);
    } else {
      setIsPlayerRealmVisible(false);
    }
  }, [masterPhaseIndex]);

  // #endregion

  // #region attacking and blocking (including arrow)
  // we use both isAttacking and attackingCard because it makes sokme of the tracking
  // way way easier

  const startCombatTargeting = (event, card) => {
    if (!masterPlayer || !masterPlayer.gameState) return;

    if (readyForQueue) {
      console.log('startCombatTargeting - ready for queue');
      return;
    }

    if (
      masterPlayer.gameState.currentPhaseIndex !== lol.Enums.PhaseEnum.Battle
    ) {
      console.log('startCombatTargeting - not in battle phase');
      return;
    }

    if (!card) {
      console.log('startCombatTargeting - no card');
      return;
    }

    setAmActingInCombat(true);
    setActingCard(card);

    const rect = event.target.getBoundingClientRect();
    setActingCardPosition({
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    });
  };

  const endAttackTargeting = (event, attackedCard) => {
    if (!!actingCardRef.current) {
      queueAttack(actingCardRef.current, attackedCard);
      const targetRect = event.target.getBoundingClientRect();
      const targetPos = {
        x: targetRect.x + targetRect.width / 2,
        y: targetRect.y + targetRect.height / 2,
      };
      setAttackLineData((oldData) => {
        return [
          ...oldData,
          {
            attackingCardInstanceId: actingCardRef.current.instanceId,
            from: actingCardPosition,
            to: targetPos,
          },
        ];
      });
      setActingCard(null);
    }
  };

  const endBlockTargeting = (event, blockedCard) => {
    if (!!actingCardRef.current) {
      if (!!actingCardRef.current.instanceId === blockedCard.instanceId) {
        console.log('endBlockTargeting - actingCard and blockedCard are same');
        return;
      }

      queueBlock(actingCardRef.current.instanceId, blockedCard.instanceId);
      const targetRect = event.target.getBoundingClientRect();
      const targetPos = {
        x: targetRect.x + targetRect.width / 2,
        y: targetRect.y + targetRect.height / 2,
      };
      setBlockLineData((oldData) => {
        return [
          ...oldData,
          {
            blockingCardInstanceId: actingCardRef.current.instanceId,
            from: actingCardPosition,
            to: targetPos,
          },
        ];
      });
      setActingCard(null);
    }
  };

  const cancelAttack = (attackingCardInstanceId) => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (!attackingCardInstanceId) {
      console.log('cancelAttack - no attackingCardInstanceId');
      return;
    }
    masterPlayer.cancelAttack(attackingCardInstanceId);
    setAttackLineData((oldData) => {
      return oldData.filter(
        (oldData) => oldData.attackingCardInstanceId !== attackingCardInstanceId
      );
    });
  };

  const cancelBlock = (blockingCardInstanceId) => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (!blockingCardInstanceId) {
      console.log('cancelBlock - no blockingCardInstanceId');
      return;
    }
    masterPlayer.cancelBlock(blockingCardInstanceId);
    setBlockLineData((oldData) => {
      return oldData.filter(
        (oldData) => oldData.blockingCardInstanceId !== blockingCardInstanceId
      );
    });
  };

  const cancelCombatArrow = () => {
    if (!amActingInCombatRef.current) return;
    setAmActingInCombat(false);
  };

  const onMouseMoveWhileAttackTargeting = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMoveWhileAttackTargeting);
    document.addEventListener('mouseup', cancelCombatArrow);
    return () => {
      document.removeEventListener(
        'mousemove',
        onMouseMoveWhileAttackTargeting
      );
      document.removeEventListener('mouseup', cancelCombatArrow);
    };
  }, []);

  // #endregion

  // #region activating abilities

  const startAbility = (event, entity, abilityIndex) => {
    if (!masterPlayer || !masterPlayer.gameState) return;

    if (readyForQueue) {
      console.log('startAbility - ready for queue');
      return;
    }

    if (!entity) {
      console.log('startAbility - no card');
      return;
    }

    const ability = entity.abilities[abilityIndex];

    if (!ability) {
      console.log('startAbility - no ability');
      return;
    }

    const effect = ability.effect;
    if (effect.targetCriterias.length === 0) {
      queueAbility(entity.instanceId, abilityIndex, queuedMana, []);
    } else {
      setActingAbilityEntity(entity);
      setActingAbility(ability);
      const rect = event.target.getBoundingClientRect();
      setActingAbilityEntityPosition({
        x: rect.x - rect.width / 2,
        y: rect.y,
      });
    }
  };

  const cancelAbility = () => {
    setActingAbilityEntity(null);
    setActingAbility(null);
    setCurrentTargetCriteriaIndex(null);
    setCurrentTargetCriteria(null);
    setTargetInfoList([]);
    setCurrentTargetInfo(null);
  };

  const finishedSelectingTargetsForCurrentTargetInfo = () => {
    if (!currentTargetInfo) return;
    if (!currentTargetCriteria) return;
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (!actingAbilityEntity || !actingAbility) return;

    if (
      currentTargetInfo.targetEntityInstanceIds.length <
      currentTargetCriteria.minSelectionsRequired
    ) {
      console.log(
        'finishedSelectingTargetsForCurrentTargetInfo - not enough targets'
      );
      return;
    }

    setTargetInfoList((prevList) => {
      return [...prevList, currentTargetInfo];
    });
    setAddingTargets(false);
  };

  // on new target info, we either queue the ability or we set up the next target criteria
  useEffect(() => {
    if (!targetInfoList) return;
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (!actingAbilityEntity || !actingAbility) return;

    const actingEffect = actingAbility.effect;
    if (
      actingEffect.isAllTargetInfoValid(
        actingAbilityEntity,
        masterPlayer.gameState,
        targetInfoList
      )
    ) {
      queueAbility(
        actingAbilityEntity.instanceId,
        actingAbilityEntity.abilities.indexOf(actingAbility),
        queuedMana,
        targetInfoList
      );
      setCurrentTargetCriteriaIndex(null);
      setCurrentTargetCriteria(null);
      setTargetInfoList([]);
      setCurrentTargetInfo(null);
      setActingAbilityEntity(null);
      setActingAbility(null);
      setQueuedMana([]);

      return;
    }

    // else
    setCurrentTargetCriteriaIndex((prevIndex) => {
      if (prevIndex === null) {
        return 0;
      }
      return prevIndex + 1;
    });
  }, [targetInfoList, actingAbilityEntity, actingAbility]);

  // on changing the current target criteria index, we need to set up the new target info
  useEffect(() => {
    if (currentTargetCriteria === null) return;
    if (!masterPlayer || !masterPlayer.gameState) return;

    const playerSelectsNow =
      currentTargetCriteria.targetableTypeSelectionEnum ===
      TargetableTypeSelectionEnum.TargetableOnActivation;

    const targetInfo = new TargetInfo(
      [],
      // no Targets were selected
      playerSelectsNow,
      // targets are selected later
      currentTargetCriteria.minSelectionsRequired > 0 &&
        TargetMethods.playerSelectsTargets(
          currentTargetCriteria.targetableTypeSelectionEnum
        )
    );

    if (!playerSelectsNow) {
      setTargetInfoList((prevList) => {
        return [...prevList, targetInfo];
      });
    } else {
      setCurrentTargetInfo(targetInfo);
    }
  }, [currentTargetCriteria]);

  // within a target info
  useEffect(() => {
    if (!currentTargetInfo) return;
    if (!currentTargetCriteria) return;
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (!actingAbilityEntity || !actingAbility) return;

    // setting viable
    if (
      actingAbility.effect.isTargetInfoValid(
        actingAbilityEntity,
        masterPlayer.gameState,
        currentTargetInfo,
        currentTargetCriteria
      )
    ) {
      setCurrentTargetInfoViable(true);
    }

    // if finished, force push it without the player needing to click
    if (
      currentTargetInfo.targetEntityInstanceIds.length >=
      currentTargetCriteria.maxSelectionsAllowed
    ) {
      setTargetInfoList((prevList) => {
        return [...prevList, currentTargetInfo];
      });
      setAddingTargets(false);
      return;
    } else {
      // otherwise, we don't do anything and wait for the player to add more
      setAddingTargets(true);
    }
  }, [currentTargetInfo]);

  const addTarget = (event, targetEntity) => {
    if (!currentTargetInfo) {
      console.log('addTarget - no currentTargetInfo');
      return;
    }
    if (!currentTargetCriteria) {
      console.log('addTarget - no currentTargetCriteria');
      return;
    }
    if (!masterPlayer || !masterPlayer.gameState) {
      console.log('addTarget - no masterPlayer or gameState');
      return;
    }
    if (!actingAbilityEntity || !actingAbility) {
      console.log('addTarget - no actingAbilityEntity or actingAbility');
      return;
    }

    if (!targetEntity) {
      console.log('addTargets - no targetEntity');
      return;
    }

    const targetInfo = new TargetInfo(
      [...currentTargetInfo.targetEntityInstanceIds, targetEntity.instanceId],
      // no Targets were selected
      false,
      // targets are selected later
      false
    );

    if (
      !actingAbility.effect.isTargetInfoValid(
        actingAbilityEntity,
        masterPlayer.gameState,
        targetInfo,
        currentTargetCriteria
      )
    ) {
      console.log('addTargets - targetInfo is not valid');
      return;
    }

    setCurrentTargetInfo(targetInfo);
  };

  // #endregion

  // #region Drag and Drop logic for HandCard

  const mouseDownOnHandCard = (event, card) => {
    const containerRect = gameContainerRef.current.getBoundingClientRect();
    setDraggedCard(card);
    draggedCardRef.current = card;
    setDraggedPos({
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top,
    });
  };

  const onDragCard = (event) => {
    if (!draggedCardRef || !gameContainerRef.current) {
      return;
    }
    const containerRect = gameContainerRef.current.getBoundingClientRect();
    setDraggedPos({
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top,
    });
  };

  const onMouseUpWhileDraggingCard = () => {
    setDraggedCard(null);
    draggedCardRef.current = null;
  };

  useEffect(() => {
    document.addEventListener('mousemove', onDragCard);
    document.addEventListener('mouseup', onMouseUpWhileDraggingCard);
    return () => {
      document.removeEventListener('mousemove', onDragCard);
      document.removeEventListener('mouseup', onMouseUpWhileDraggingCard);
    };
  }, []);

  // #endregion

  // #region update display height
  useEffect(() => {
    const updateDisplayHeight = () => {
      if (gameContainerRef.current) {
        const height = gameContainerRef.current.offsetHeight;
        setDisplayHeight(height);
      }
    };

    // Create a ResizeObserver instance and observe the .game-container
    const resizeObserver = new ResizeObserver(() => {
      updateDisplayHeight();
    });

    if (gameContainerRef.current) {
      resizeObserver.observe(gameContainerRef.current);
    }

    // Call it once immediately to set the initial height
    updateDisplayHeight();

    // Cleanup the observer to prevent memory leaks
    return () => {
      if (gameContainerRef.current) {
        resizeObserver.unobserve(gameContainerRef.current);
      }
    };
  }, []);

  // #endregion

  // #region play card

  const playCard = (card, zoneEnum) => {
    if (!masterPlayer || !masterPlayer.gameState) return;
    if (!card) {
      console.log('playCard - no card');
      return;
    }
    if (!zoneEnum) {
      console.log('playCard - no zoneEnum');
      return;
    }
    // check if the card is playable
    if (!card.isPlayable(masterPlayer.gameState)) {
      console.log('playCard - card is not playable');
      return;
    }

    const queuedCosts = queuedMana.map((mana) => {
      return new PayResourceCost(mana.statId, mana.value);
    });

    queuePlayCard(card.instanceId, zoneEnum, queuedCosts, 0, []);

    // clean up display states
    setQueuedMana([]);
  };

  // #endregion

  // #region mana

  const [queuedMana, setQueuedMana] = useState([]);

  // #endregion

  return (
    <GamePageStyled className='game-page'>
      <div
        className='dev-controls'
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 500,
        }}
      >
        <button
          onClick={() => {
            socket.emit('dev-player-end-game');
          }}
        >
          End Game
        </button>
      </div>
      <div className='game-container' ref={gameContainerRef}>
        {/* mana bars */}
        <ManaBar
          isPlayer={true}
          playerInfo={playerInfo}
          queue={queuedMana}
          setQueue={setQueuedMana}
        />
        <ManaBar isPlayer={false} playerInfo={opponentInfo} />
        {/* player realm */}
        <Realm
          isPlayerRealm={true}
          isVisible={isPlayerRealmVisible}
          setIsVisible={setIsPlayerRealmVisible}
          isButtonVisible={!isOpponentRealmVisible}
          setPhaseButtonMessage={setPhaseButtonMessage}
        />
        {/* opponent realm */}
        <Realm
          isPlayerRealm={false}
          isVisible={isOpponentRealmVisible}
          setIsVisible={setIsOpponentRealmVisible}
          isButtonVisible={!isPlayerRealmVisible}
        />
        {/* queue area */}
        {masterPlayer?.readyForQueue && <QueueList />}
        {/* player hand */}
        <Hand
          draggedCard={draggedCard}
          draggedPos={draggedPos}
          onMouseDown={mouseDownOnHandCard}
          readyForQueue={readyForQueue}
        />
        {/* opponent hand */}
        {/* phase button */}
        <div className='phase-button-container' style={{ zIndex: 500 }}>
          <button
            className={
              'phase-button' + (phaseButtonActive ? ' active' : ' inactive')
            }
            onClick={handlePhaseButtonClick}
          >
            {phaseButtonMessage}
          </button>
        </div>
        {/* board */}
        <div className='board-container'>
          <Board
            // identity
            isPlayer={false}
            playerInfo={opponentInfo}
            zoneEnum={lol.Enums.ZoneEnum.BackBoard}
            // queue
            isQueueReview={masterPhaseIndex !== tempPhaseIndex}
            // play card
            draggedCard={draggedCard}
            // attacking and blocking
            amActing={amActingInCombat}
            actingCard={actingCard}
            endCombatTargeting={endAttackTargeting}
            // ability
            startAbility={startAbility}
            actingAbilityEntity={actingAbilityEntity}
            actingAbility={actingAbility}
            currentTargetCriteria={currentTargetCriteria}
            addTarget={addTarget}
          />
          <Board
            // identity
            isPlayer={false}
            playerInfo={opponentInfo}
            zoneEnum={lol.Enums.ZoneEnum.FrontBoard}
            // queue
            isQueueReview={masterPhaseIndex !== tempPhaseIndex}
            // play card
            draggedCard={draggedCard}
            // attacking and blocking
            amActing={amActingInCombat}
            actingCard={actingCard}
            endCombatTargeting={endAttackTargeting}
            // ability
            startAbility={startAbility}
            actingAbilityEntity={actingAbilityEntity}
            actingAbility={actingAbility}
            currentTargetCriteria={currentTargetCriteria}
            addTarget={addTarget}
          />
          <Board
            // identity
            isPlayer={false}
            playerInfo={opponentInfo}
            zoneEnum={lol.Enums.ZoneEnum.BattleBoard}
            // queue
            isQueueReview={masterPhaseIndex !== tempPhaseIndex}
            // play card
            draggedCard={draggedCard}
            // attacking and blocking
            amActing={amActingInCombat}
            // ability
            startAbility={startAbility}
            actingAbilityEntity={actingAbilityEntity}
            actingAbility={actingAbility}
            currentTargetCriteria={currentTargetCriteria}
            addTarget={addTarget}
          />
          <Board
            // identity
            isPlayer={true}
            playerInfo={playerInfo}
            zoneEnum={lol.Enums.ZoneEnum.BattleBoard}
            // queue
            queueMessages={masterPlayer?.queueMessages}
            isQueueReview={masterPhaseIndex !== tempPhaseIndex}
            // play card
            draggedCard={draggedCard}
            playCard={playCard}
            // attacking and blocking
            amActing={amActingInCombat}
            // ability
            startAbility={startAbility}
            actingAbilityEntity={actingAbilityEntity}
            actingAbility={actingAbility}
            currentTargetCriteria={currentTargetCriteria}
            addTarget={addTarget}
          />
          <Board
            // identity
            isPlayer={true}
            playerInfo={playerInfo}
            zoneEnum={lol.Enums.ZoneEnum.FrontBoard}
            // queue
            queueMessages={masterPlayer?.queueMessages}
            isQueueReview={masterPhaseIndex !== tempPhaseIndex}
            // play card
            draggedCard={draggedCard}
            playCard={playCard}
            // attacking and blocking
            amActing={amActingInCombat}
            actingCard={actingCard}
            startCombatTargeting={startCombatTargeting}
            endCombatTargeting={endBlockTargeting}
            // ability
            startAbility={startAbility}
            actingAbilityEntity={actingAbilityEntity}
            actingAbility={actingAbility}
            currentTargetCriteria={currentTargetCriteria}
            addTarget={addTarget}
          />
          <Board
            // identity
            isPlayer={true}
            playerInfo={playerInfo}
            zoneEnum={lol.Enums.ZoneEnum.BackBoard}
            // queue
            isQueueReview={masterPhaseIndex !== tempPhaseIndex}
            queueMessages={masterPlayer?.queueMessages}
            // play card
            draggedCard={draggedCard}
            playCard={playCard}
            // attacking and blocking
            amActing={amActingInCombat}
            actingCard={actingCard}
            startCombatTargeting={startCombatTargeting}
            endCombatTargeting={endBlockTargeting}
            // ability
            startAbility={startAbility}
            actingAbilityEntity={actingAbilityEntity}
            actingAbility={actingAbility}
            currentTargetCriteria={currentTargetCriteria}
            addTarget={addTarget}
          />
        </div>
        {currentTargetInfo && (
          <div className='target-info-container'>
            <div className='target-info-header'>
              <p>
                Target Info:
                {
                  actingAbility.effect.targetTypeInfoList()[
                    currentTargetCriteriaIndex
                  ].name
                }
              </p>
              <p>
                Min Selections Required:
                {currentTargetCriteria.minSelectionsRequired}
              </p>
              <p>
                Max Selections Allowed:
                {currentTargetCriteria.maxSelectionsAllowed}
              </p>
              <p>
                Current Selections:
                {currentTargetInfo.targetEntityInstanceIds.length}
              </p>
            </div>
            <div className='target-info-body'>
              {currentTargetInfo.targetEntityInstanceIds.map(
                (instanceId, index) => {
                  const entity =
                    masterPlayer.gameState.getEntityFromAnywhere(instanceId);
                  if (!entity) {
                    return (
                      <p key={'key' + instanceId + index}>Entity not found</p>
                    );
                  }
                  return <p key={'key' + instanceId + index}>{entity.name}</p>;
                }
              )}
            </div>
            {currentTargetInfoViable && (
              <button
                className='ship-target-info-button'
                onClick={finishedSelectingTargetsForCurrentTargetInfo}
              >
                Finished Adding Targets
              </button>
            )}
            <button className='cancel-ability-button' onClick={cancelAbility}>
              Cancel
            </button>
          </div>
        )}
      </div>
      {/* arrows */}
      <div className='lines'>
        <div className='current-action-line'>
          {amActingInCombat && (
            <Arrow
              from={actingCardPosition}
              to={{ x: mousePosition.x, y: mousePosition.y }}
            />
          )}
        </div>
        <div className='current-target-line'>
          {!!currentTargetInfo && (
            <Arrow
              from={actingAbilityEntityPosition}
              to={{ x: mousePosition.x, y: mousePosition.y }}
            />
          )}
        </div>
        <div className='attack-lines'>
          {attackLineData.map((data, index) => {
            return (
              <Arrow
                key={index}
                from={data.from}
                to={data.to}
                cancelAction={() => cancelAttack(data.attackingCardInstanceId)}
                color={'red'}
              />
            );
          })}
        </div>
        <div className='blocking-lines'>
          {blockLineData.map((data, index) => {
            return (
              <Arrow
                key={index}
                from={data.from}
                to={data.to}
                cancelAction={() => cancelBlock(data.blockingCardInstanceId)}
                color={'blue'}
              />
            );
          })}
        </div>
      </div>
    </GamePageStyled>
  );
}

export default GamePage;
