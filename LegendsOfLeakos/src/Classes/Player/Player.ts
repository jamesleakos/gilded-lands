// #region imports

import GameState from '../Game/GameState';
import PlayerInfo from './PlayerInfo';
import PlayerQueueline from '../Queueline/PlayerQueueline/PlayerQueueline';
import ServerRequestsTargetsPlayerQueueline from '../Queueline/PlayerQueueline/PlayerQueuelines/ServerRequestsTargetsPlayerQueueline';
import Phase from '../Phase/Phase';
import TargetInfo from '../Target/TargetInfo';
import EffectSolver from '../Game/EffectSolver';
import RuntimeZone from '../Zone/RuntimeZone';
import RuntimeEffect from '../Effect/RuntimeEffect';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import StartGameMessage from '../Networking/GameLoop/Game/StartGameMessage';
import EndGameMessage from '../Networking/GameLoop/Game/EndGameMessage';
import ServerMovedCardMessage from '../Networking/Cards/Move/ServerMovedCardMessage';
import ServerCardMovedRowMessage from '../Networking/Cards/MovedRow/ServerCardMovedRowMessage';
import NextPhaseReadyMessage from '../Networking/GameLoop/PhaseAndQueue/NextPhaseReadyMessage';
import QueueStartedMessage from '../Networking/GameLoop/PhaseAndQueue/QueueStartedMessage';
import LibraryCard from '../Card/LibraryCard';
import LibraryEnchantment from '../Enchantment/LibraryEnchantment';
import GameManager from '../Game/GameManager';
import { NetworkProtocol } from '../../Enums/NetworkProtocol';
import { ClientMessage } from '../Networking/MessageBase';
import ServerSendingGamestateForRejoin from '../Networking/Connection/ServerSendingGamestateForRejoinMessage';
import RejoinedGameMessage from '../Networking/Connection/RejoinedGameMessage';
import CardPlayedMessage from '../Networking/Cards/Play/CardPlayedMessage';
import CreatureAttackedMessage from '../Networking/Attacking/CreatureAttackedMessage';
import AbilityActivatedMessage from '../Networking/Abilities/AbilityActivatedMessage';
import AbilityKeywordRuntimeEntity from '../Entity/AbilityKeywordRuntimeEntity';
import GetTargetsFromPlayerMessage from '../Networking/Abilities/GetTargetsFromPlayerMessage';
import OpponentDrewCardsMessage from '../Networking/Cards/Draw/OpponentDrewCardsMessage';
import PlayerDrewCardsMessage from '../Networking/Cards/Draw/PlayerDrewCardsMessage';
import MoveCardsMessage from '../Networking/Cards/Move/MoveCardsMessage';
import MoveCardEffect from '../Effect/RuntimeEffects/MoveEffects/MoveCardEffect';
import RuntimeCard from '../Card/RuntimeCard';
import {
  ZoneEnum,
  ZoneOpponentVisibility,
  ZoneOwnerVisibility,
} from '../../Enums/Zone';
import PlayCardPlayerQueueLine from '../Queueline/PlayerQueueline/PlayerQueuelines/PlayCardPlayerQueueline';
import ActivateAbilityPlayerQueueline from '../Queueline/PlayerQueueline/PlayerQueuelines/ActivateAbilityPlayerQueueline';
import CardUpgradedMessage from '../Networking/Upgrades/CardUpgradedMessage';
import UpgradeCardEffect from '../Effect/RuntimeEffects/UpgradeEffects/UpgradeCardEffect';
import MoveRowPlayerQueueline from '../Queueline/PlayerQueueline/PlayerQueuelines/MoveRowPlayerQueueline';
import QueuePlayCardMessage from '../Networking/Cards/Play/QueuePlayCardMessage';
import QueueActivateAbilityMessage from '../Networking/Abilities/QueueActivateAbilityMessage';
import TargetCriteria from '../Target/TargetCriteria';
import ReturnTargetsToServerMessage from '../Networking/Abilities/ReturnTargetsToServerMessage';
import PlayerExploredLandMessage from '../Networking/Land/PlayerExporedLandMessage';
import LandExploredMessage from '../Networking/Land/LandExporedMessage';
import RuntimeLandTile from '../RealmsAndLand/LandTile/RuntimeLandTile';
import PlayerReadyForQueueMessage from '../Networking/GameLoop/PhaseAndQueue/PlayerReadyForQueueMessage';
import CancelActionMessage from '../Networking/QueueManagement/CancelActionMessage';
import QueueFightCreatureMessage from '../Networking/Attacking/QueueFightCreatureMessage';
import FightCreaturePlayerQueueLine from '../Queueline/PlayerQueueline/PlayerQueuelines/FightCreaturePlayerQueueline';
import AttackEffect from '../Effect/RuntimeEffects/AttackEffects/AttackEffect';
import CardIsBlockingMessage from '../Networking/Blocking/CardIsBlockingMessage';
import StopCardBlockingMessage from '../Networking/Blocking/StopCardBlockingMessage';
import ReorderBlockingCardMessage from '../Networking/Blocking/ReorderBlockingCardMessage';

// #endregion

class Player {
  // #region Properties

  // send to server
  sendToServer: (messageName: NetworkProtocol, message: ClientMessage) => void;
  _sendToServer: (messageName: string, message: ClientMessage) => void;

  // Gamestate tracking
  gameState: GameState;

  // userID
  userId: string;

  // Queue
  // an event queue for events that the server sends
  queue: PlayerQueueline[] = [];
  // a store of the messages sent to the server, so that we can cancel them
  queueMessages: ClientMessage[] = [];
  requestLine: ServerRequestsTargetsPlayerQueueline = null;
  // the player has made their moves and is ready to recieve messages from the server
  // this is important to track because there's a change we get queue messages from the server
  // at the start of the phase, if the player has clicked through quickly
  // in that case, we will ignore them
  readyForQueue: boolean = false;
  // we have received all the queue messages that the server is planning to send this batch
  // and can start processing them
  queueReadyToRun: boolean = false;
  currentQueueIndex: number = 0; // where we are in the queue
  numQueuelinesInBatch: number = null; // the number of actions that we are expecting from the server in this batch - asking for targets doesn't count
  numQueuelinesTotal: number = null; // the number of actions that we are expecting total - asking for targets doesn't count
  numQueuelinesAlreadyProcessed: number = 0;
  breakingBeforeEndOfQueue: boolean = false; // whether we will break before the end of the queue
  amBreakingPlayer: boolean = false; // am I the breaking player

  // returning targets
  targetInfoCode: number;
  returningCardInstanceId: number;
  returningEffect: RuntimeEffect;
  returningTargetTypes: TargetCriteria[];

  // #endregion

  constructor(
    _sendToServer: (messageName: string, message: ClientMessage) => void
  ) {
    this._sendToServer = _sendToServer;
    this.sendToServer = (protocol: NetworkProtocol, message: ClientMessage) => {
      const messageString = NetworkProtocol[protocol];
      this._sendToServer(messageString, message);
    };
  }

  // #region clone

  public clone(): Player {
    const clone = new Player(this._sendToServer);
    clone.userId = this.userId;
    clone.gameState = this.gameState ? this.gameState.clone() : null;
    clone.queue = this.queue
      ? this.queue.map((queueline) => queueline.clone())
      : [];
    clone.queueMessages = this.queueMessages
      ? this.queueMessages.map((message) => message.clone())
      : [];
    clone.requestLine = this.requestLine ? this.requestLine.clone() : null;
    clone.readyForQueue = this.readyForQueue;
    clone.queueReadyToRun = this.queueReadyToRun;
    clone.currentQueueIndex = this.currentQueueIndex;
    clone.numQueuelinesInBatch = this.numQueuelinesInBatch;
    clone.numQueuelinesTotal = this.numQueuelinesTotal;
    clone.numQueuelinesAlreadyProcessed = this.numQueuelinesAlreadyProcessed;
    clone.breakingBeforeEndOfQueue = this.breakingBeforeEndOfQueue;
    clone.amBreakingPlayer = this.amBreakingPlayer;
    clone.targetInfoCode = this.targetInfoCode;
    clone.returningEffect = this.returningEffect;
    clone.returningCardInstanceId = this.returningCardInstanceId;
    clone.returningTargetTypes = this.returningTargetTypes
      ? this.returningTargetTypes.map((target) => target.clone())
      : [];
    return clone;
  }

  // #endregion

  // #region Utility Methods

  public getPlayerInfo(): PlayerInfo {
    try {
      return this.gameState.getPlayerInfoByUserId(this.userId);
    } catch (error) {
      console.log('Error getting player info: ', error);
      return null;
    }
  }

  public getOpponentInfo(): PlayerInfo {
    try {
      return this.gameState.players.find(
        (player) => player.userId !== this.userId
      );
    } catch (error) {
      console.log('Error getting opponent info: ', error);
      return null;
    }
  }

  // #endregion

  // #region Start and End Game

  public onStartGame(msg: StartGameMessage): void {
    const message = StartGameMessage.fromJSON(msg);
    if (!message || !message.validate()) {
      console.log('Invalid StartGameMessage: ', message);
      return;
    }

    this.userId = message.player.userId;

    this.gameState = new GameState(
      message.gameManager,
      [message.player, message.opponent],
      1,
      0,
      message.rngSeed,
      []
    );
  }

  public onEndGame(msg: EndGameMessage): void {
    console.log('onEndGame');
  }

  // #endregion

  // #region Connecting and Reconnecting

  public onGamestateForRejoin(msg: ServerSendingGamestateForRejoin): void {
    const message = ServerSendingGamestateForRejoin.fromJSON(msg);
    if (!message || !message.validate()) {
      console.log('Invalid ServerSendingGamestateForRejoin message: ', message);
      return;
    }

    this.userId = message.player.userId;
    this.gameState = new GameState(
      message.gameManager,
      [message.player, message.opponent],
      message.turn,
      message.phaseIndex,
      message.rngSeed,
      []
    );
  }

  public fetchUpdatedGamestate(): void {
    const message = new RejoinedGameMessage(ClientMessage.generateUniqueId());
    this.sendToServer(NetworkProtocol.RejoinedGame, message);
  }
  // #endregion

  // #region Turn and Phase

  public onStartPhase(msg: NextPhaseReadyMessage): void {
    const message = NextPhaseReadyMessage.fromJSON(msg);

    if (!message || !message.validate()) {
      console.log('Invalid NextPhaseReadyMessage');
      return;
    }
    // pull the general stuff over - reset queue, etc.
    // reset queue
    this.queue = [];
    this.queueMessages = [];
    this.requestLine = null;
    this.queueReadyToRun = false;
    this.readyForQueue = false;
    this.numQueuelinesInBatch = null;
    this.numQueuelinesTotal = null;
    this.numQueuelinesAlreadyProcessed = null;
    this.breakingBeforeEndOfQueue = false;
    this.amBreakingPlayer = false;

    // load the player states from the message
    this.gameState.players = [message.player, message.opponent];
    this.gameState.currentTurn = message.turn;
    this.gameState.currentPhaseIndex = message.phaseIndex;

    // update stat buffs in the effect solver
    EffectSolver.updateStatBuffs(this.gameState);

    // phase specific stuff
    // technically this should have already been done on the server and then incorporated
    // into the gamestate we just received
    // we may want to animate some of this later on
  }

  // #endregion

  // #region Queue

  public receivedQueueStartedMessage(msg: QueueStartedMessage): void {
    const message = QueueStartedMessage.fromJSON(msg);
    if (!message || !message.validate()) {
      throw new Error(
        'Invalid QueueStartedMessage: ' + JSON.stringify(message)
      );
    }

    // this will be set to true when we receive all the messages
    // we don't want to set it to false here though, becuase we may get this message after
    // receiving some messages from the server
    // this.queueReadyToRun = false;
    this.numQueuelinesInBatch = message.queuelinesThisMessage;
    this.numQueuelinesTotal = message.totalQueuelines;
    this.numQueuelinesAlreadyProcessed = 0;
    this.breakingBeforeEndOfQueue = message.breakBeforeEndOfQueue;
    this.amBreakingPlayer = this.userId === message.breakingPlayerUserId;
    this.gameState.blocks = message.blocks;

    // move the attacking cards into the battlerow
    // note that this will only work for the ones in the Front Row
    console.log('attackingCardInstanceIds: ', message.attackingCardInstanceIds);
    for (let attackingCardInstanceId of message.attackingCardInstanceIds) {
      const moveEffect = MoveCardEffect.createMoveCardEffect(
        ZoneEnum.FrontBoard,
        ZoneEnum.BattleBoard
      );

      EffectSolver.doEffect(
        this.gameState,
        attackingCardInstanceId,
        moveEffect,
        []
      );
    }

    // getting this vs getting the queuelines might happen out of order
    // this also handlers the case where nothing is in the queue
    if (this.queue.length === this.numQueuelinesInBatch) {
      this.startQueue();
    }
  }

  startQueue(): void {
    // sort queue
    this.queue.sort((a, b) => {
      return a.queuePosition - b.queuePosition;
    });

    this.queueReadyToRun = true;
  }

  returnPlayersFromQueue(): Player[] {
    const newPlayers: Player[] = [];
    newPlayers.push(this.clone());

    for (let i = 0; i < this.queue.length; i++) {
      const newPlayer = newPlayers[i].clone();
      newPlayer.runNextQueueline();
      newPlayers.push(newPlayer);
    }

    return newPlayers;
  }

  runNextQueueline(): void {
    if (!this.queueReadyToRun) {
      throw new Error('Queue not ready to run');
    }

    if (this.currentQueueIndex === this.queue.length) {
      throw new Error('Queue already finished');
    }

    const queueline = this.queue[this.currentQueueIndex];

    queueline.sendEffectToPlayer(this.gameState, this);

    this.currentQueueIndex++;
    this.numQueuelinesAlreadyProcessed++;
  }

  public finishedActions(): void {
    this.readyForQueue = true;
    const message = new PlayerReadyForQueueMessage(
      ClientMessage.generateUniqueId(),
      this.userId
    );
    this.sendToServer(NetworkProtocol.PlayerReadyForQueue, message.toJSON());
  }

  // #endregion

  // #region Playing Cards
  public queuePlayCard(
    cardInstanceId: number,
    boardZoneEnum: ZoneEnum,
    selectedCosts: PayResourceCost[],
    battlecryIndex: number,
    targetInfoList: TargetInfo[]
  ): void {
    const card = this.gameState.getCardFromAnywhere(cardInstanceId);
    if (!card) {
      throw new Error('Card not found');
    }

    const libraryCard = this.gameState.gameManager.cardLibrary.find((card) => {
      return card.libraryId === card.libraryId;
    });

    if (!libraryCard) {
      throw new Error('Library card not found');
    }

    // pay costs
    const libraryCosts = libraryCard.costs;

    const playerInfo = this.gameState.getPlayerInfoByUserId(this.userId);

    if (!playerInfo) {
      throw new Error('Player not found');
    }

    if (!playerInfo.canPayResourceCosts(libraryCosts)) {
      throw new Error('Player cannot pay resource costs');
    }

    // update the costs
    const paidCosts = playerInfo.payResourceCosts(libraryCosts, selectedCosts);

    const message = new QueuePlayCardMessage(
      QueuePlayCardMessage.generateUniqueId(),
      this.userId,
      cardInstanceId,
      boardZoneEnum,
      paidCosts,
      targetInfoList
    );

    this.queueMessages.push(message);
    this.sendToServer(NetworkProtocol.QueuePlayCard, message.toJSON());
  }

  public cancelPlayCard(cardInstanceId: number): void {
    const playCardMessages = this.queueMessages.filter((message) => {
      return message.messageEnum === NetworkProtocol.QueuePlayCard;
    }) as QueuePlayCardMessage[];
    const playCardMessage = playCardMessages.find((message) => {
      return message.cardInstanceId === cardInstanceId;
    });
    if (!playCardMessage) {
      throw new Error('Play card message not found');
    }

    // get the mana back
    const playerInfo = this.getPlayerInfo();
    playCardMessage.paidCosts.forEach((cost) => {
      playerInfo.idToStat.get(cost.statId).baseValue += cost.value;
    });

    const message = new CancelActionMessage(
      QueuePlayCardMessage.generateUniqueId(),
      this.userId,
      playCardMessage.messageId
    );

    // cancel from the queue
    this.queueMessages = this.queueMessages.filter((message) => {
      return message.messageId !== playCardMessage.messageId;
    });

    this.sendToServer(NetworkProtocol.CancelAction, message.toJSON());
  }

  public receivedPlayCardMessage(msg: CardPlayedMessage) {
    if (!this.readyForQueue) {
      throw new Error('Not ready for queue');
    }
    const message = CardPlayedMessage.fromJSON(msg);
    if (!message || !message.validate()) {
      console.log('Invalid CardPlayedMessage');
      return;
    }
    if (!message.card) {
      throw new Error('Card not found');
    }
    let sourceCard = this.gameState.getCardFromAnywhere(msg.card.instanceId);
    if (!sourceCard) {
      // if we couldn't find the card, it must be a card that we don't know about yet
      // let's first confirm that it didn't come from a place that we should have known about it
      const originZone = this.gameState.getZoneByZoneEnumAndUserId(
        msg.originZoneZoneEnum,
        msg.sourcePlayerUserId
      );
      const isPlayerZone = originZone.ownerPlayerUserId === this.userId;
      if (isPlayerZone) {
        if (
          originZone.getLibraryZone().ownerVisibility ===
          ZoneOwnerVisibility.Visible
        ) {
          throw new Error(
            'We should have known about this card. it was our card. msg.card.instanceId: ' +
              msg.card.instanceId
          );
        }
      } else if (
        originZone.getLibraryZone().opponentVisibility ===
        ZoneOpponentVisibility.Visible
      ) {
        throw new Error(
          'We should have known about this card,' +
            'though it was the opponent card, it was coming from: ' +
            ZoneEnum[msg.originZoneZoneEnum]
        );
      }

      // all good - we didn't know about this card, let's create it
      sourceCard = RuntimeCard.fromRuntimeJSON(msg.card);
      originZone.addCard(sourceCard);
      // we don't need to remove it from anywhere because it wasn't anywhere
    }

    const destinationZone = this.gameState.getZoneByZoneEnumAndUserId(
      msg.destinationZoneZoneEnum,
      msg.sourcePlayerUserId
    );
    if (!destinationZone) {
      throw new Error('Destination zone not found');
    }

    if (sourceCard.ownerPlayerUserId !== this.userId) {
      const opponent = this.gameState.getPlayerInfoByUserId(
        sourceCard.ownerPlayerUserId
      );
      if (!opponent) {
        throw new Error('Opponent not found');
      }
      opponent.payResourceCosts(message.paidCosts);
    }

    const queueline = new PlayCardPlayerQueueLine(
      this.userId,
      sourceCard.instanceId,
      message.sourcePlayerUserId,
      message.queuePosition,
      message.paidCosts,
      message.targetInfoList,
      message.originZoneZoneEnum,
      message.destinationZoneZoneEnum
    );

    this.queue.push(queueline);

    if (this.queue.length === this.numQueuelinesInBatch) {
      this.startQueue();
    }
  }

  public onCardPlayed(
    sourcePlayerUserId: any,
    sourceCardInstanceId: any,
    targetInfoList: any[],
    originZoneZoneEnum: ZoneEnum,
    destinationZoneZoneEnum: ZoneEnum
  ): void {
    const sourcePlayer =
      this.gameState.getPlayerInfoByUserId(sourcePlayerUserId);

    if (!sourcePlayer) {
      throw new Error('Source player not found');
    }

    // this will already have been added to the origin zone during receivedPlayCardMessageFromServer
    // if it didn't already exist
    const sourceCard = this.gameState.getCardFromAnywhere(sourceCardInstanceId);
    if (!sourceCard) {
      throw new Error('Source card not found');
    }

    // first we move the card
    const moveEffect = MoveCardEffect.createMoveCardEffect(
      originZoneZoneEnum,
      destinationZoneZoneEnum
    );

    EffectSolver.doEffect(
      this.gameState,
      sourceCardInstanceId,
      moveEffect,
      targetInfoList
    );
  }
  // #endregion

  // #region Drawing Cards

  public onPlayerDrewCards(msg: PlayerDrewCardsMessage): void {
    // TODO: Implement method
  }

  public onOpponentDrewCards(msg: OpponentDrewCardsMessage): void {
    // TODO: Implement method
  }

  // #endregion

  // #region Card Moved

  // for when the server moves the card - just move it, don't queue it
  public onCardMoved(msg: ServerMovedCardMessage): void {
    const message = ServerMovedCardMessage.fromJSON(msg);
    if (!message || !message.validate()) {
      console.log('Invalid ServerMovedCardMessage');
      return;
    }
    const moveEffect = MoveCardEffect.createMoveCardEffect(
      msg.originZoneZoneEnum,
      msg.destinationZoneZoneEnum
    );
    if (!msg.card) {
      throw new Error('Card not found');
    }
    let sourceCard = this.gameState.getCardFromAnywhere(msg.card.instanceId);
    if (!sourceCard) {
      // if we couldn't find the card, it must be a card that we don't know about yet
      // let's first confirm that it didn't come from a place that we should have known about it
      const originZone = this.gameState.getZoneByInstanceId(
        msg.originZoneZoneEnum
      );
      const isPlayerZone = originZone.ownerPlayerUserId === this.userId;
      if (isPlayerZone) {
        if (
          originZone.getLibraryZone().ownerVisibility ===
          ZoneOwnerVisibility.Visible
        ) {
          throw new Error('We should have known about this card');
        }
      } else if (
        originZone.getLibraryZone().opponentVisibility ===
        ZoneOpponentVisibility.Visible
      ) {
        throw new Error('We should have known about this card');
      }

      // all good - we didn't know about this card, let's create it
      sourceCard = RuntimeCard.fromRuntimeJSON(msg.card);
      originZone.addCard(sourceCard);
      // we don't need to remove it from anywhere because it wasn't anywhere
    }

    EffectSolver.doEffect(
      this.gameState,
      sourceCard.instanceId,
      moveEffect,
      []
    );
  }

  // for when the player moves a card between rows - queue it
  public receivedCardMovedRowMessage(msg: ServerCardMovedRowMessage): void {
    if (!this.readyForQueue) {
      throw new Error('Not ready for queue');
    }
    const message = ServerCardMovedRowMessage.fromJSON(msg);

    if (!message || !message.validate()) {
      console.log('Invalid ServerCardMovedRowMessage');
      return;
    }

    const queueline = new MoveRowPlayerQueueline(
      this.userId,
      message.movedCardInstanceId,
      message.ownerPlayerUserId,
      message.queuePosition,
      message.originZoneEnum,
      message.destinationZoneEnum
    );

    this.queue.push(queueline);
  }

  public onCardMovedRow(
    movedCardInstanceId: number,
    originZoneEnum: ZoneEnum,
    destinationZoneEnum: ZoneEnum
  ): void {
    const movedCard = this.gameState.getCardFromAnywhere(movedCardInstanceId);
    if (!movedCard) {
      throw new Error('Moved card not found');
    }

    const moveEffect = MoveCardEffect.createMoveCardEffect(
      originZoneEnum,
      destinationZoneEnum
    );

    EffectSolver.doEffect(this.gameState, movedCardInstanceId, moveEffect, []);
  }

  // #endregion

  // #region Upgrading Cards

  onCardUpgraded(
    upgradingCardInstanceId: number,
    targetInfoList: TargetInfo[],
    upgradeLevel: number
  ): void {
    const upgradingCard = this.gameState.getCardFromAnywhere(
      upgradingCardInstanceId
    );

    if (!upgradingCard) {
      throw new Error('Upgrading card not found');
    }

    const libraryCard = this.gameState.gameManager.cardLibrary.find((card) => {
      return card.libraryId === upgradingCard.libraryId;
    });

    if (!libraryCard) {
      throw new Error('Library card not found');
    }

    const upgrade = libraryCard.cardUpgrades[upgradeLevel];

    if (!upgrade) {
      throw new Error('Upgrade not found');
    }

    const upgradeEffect =
      UpgradeCardEffect.createUpgradeCardEffect(upgradeLevel);

    EffectSolver.doEffect(
      this.gameState,
      upgradingCardInstanceId,
      upgradeEffect,
      targetInfoList
    );

    // now do activated ability, if it has one
    const activatedEffect = upgrade.activatedAbility.effect;

    if (activatedEffect) {
      EffectSolver.doEffect(
        this.gameState,
        upgradingCardInstanceId,
        activatedEffect,
        targetInfoList
      );
    }
  }

  queueUpgradeCard(
    currentCardInstanceId: number,
    currentTrackingIndex: number,
    currentEffect: RuntimeEffect,
    upgradeLevel: number,
    useEffect: boolean
  ): void {
    // add to queued messages
    // send to server
  }

  receivedUpgradeCardMessageFromServer(msg: CardUpgradedMessage): void {
    if (!this.readyForQueue) {
      throw new Error('Not ready for queue');
    }
  }

  // #endregion

  // #region Combat and Attacking

  public queueAttack(
    attackingCardInstanceId: number,
    attackedCardInstanceId: number
  ): void {
    const attackingCard = this.gameState.getCardFromAnywhere(
      attackingCardInstanceId
    );
    if (!attackingCard) {
      throw new Error('Attacking card not found');
    }

    const attackedCard = this.gameState.getCardFromAnywhere(
      attackedCardInstanceId
    );
    if (!attackedCard) {
      throw new Error('Attacked card not found');
    }

    const message = new QueueFightCreatureMessage(
      QueueFightCreatureMessage.generateUniqueId(),
      this.userId,
      attackingCardInstanceId,
      attackedCardInstanceId
    );

    this.queueMessages.push(message);
    this.sendToServer(NetworkProtocol.QueueFightCreature, message.toJSON());
  }

  public cancelAttack(attackingCardInstanceId: number): void {
    const attackMessages = this.queueMessages.filter((message) => {
      return message.messageEnum === NetworkProtocol.QueueFightCreature;
    }) as QueueFightCreatureMessage[];

    const attackMessage = attackMessages.find((message) => {
      return message.attackingCardInstanceId === attackingCardInstanceId;
    });

    if (!attackMessage) {
      throw new Error('Attack message not found');
    }

    const message = new CancelActionMessage(
      ClientMessage.generateUniqueId(),
      this.userId,
      attackMessage.messageId
    );

    // cancel from the queue
    this.queueMessages = this.queueMessages.filter((message) => {
      return message.messageId !== attackMessage.messageId;
    });

    this.sendToServer(NetworkProtocol.CancelAction, message.toJSON());
  }

  public receivedAttackMessage(msg: CreatureAttackedMessage): void {
    if (!this.readyForQueue) {
      throw new Error('Not ready for queue');
    }

    const message = CreatureAttackedMessage.fromJSON(msg);
    if (!message || !message.validate()) {
      console.log('Invalid CreatureAttackedMessage');
      return;
    }

    const queueline = new FightCreaturePlayerQueueLine(
      this.userId,
      message.attackingCardInstanceId,
      message.attackedCardInstanceId,
      message.attackingPlayerUserId,
      message.queuePosition
    );

    this.queue.push(queueline);

    if (this.queue.length === this.numQueuelinesInBatch) {
      this.startQueue();
    }
  }

  public onCreatureAttacked(
    attackingCardInstanceId: number,
    attackedCardInstanceId: number
  ): void {
    const fightEffect = AttackEffect.createFightEffect();

    const tempTargetInfo = AttackEffect.createFightTargetInfoList(
      attackedCardInstanceId
    );

    EffectSolver.doEffect(
      this.gameState,
      attackingCardInstanceId,
      fightEffect,
      tempTargetInfo
    );
  }

  // #endregion

  // #region Blocking

  public queueBlock(
    blockingCardInstanceId: number,
    blockedCardInstanceId: number
  ): void {
    const blockingCard = this.gameState.getCardFromAnywhere(
      blockingCardInstanceId
    );

    if (!blockingCard) {
      throw new Error('Blocking card not found');
    }

    const blockedCard = this.gameState.getCardFromAnywhere(
      blockedCardInstanceId
    );

    if (!blockedCard) {
      throw new Error('Blocked card not found');
    }

    const blocksOnSameCard = this.gameState.blocks.filter(
      (block) => block.blockedCardInstanceId === blockedCardInstanceId
    );

    const blockOrder = blocksOnSameCard.length;

    this.gameState.cardBlocking(
      blockingCardInstanceId,
      blockedCardInstanceId,
      blockOrder
    );

    const message = new CardIsBlockingMessage(
      ClientMessage.generateUniqueId(),
      this.userId,
      blockingCardInstanceId,
      blockedCardInstanceId,
      blockOrder
    );

    this.sendToServer(NetworkProtocol.CardIsBlocking, message.toJSON());
  }

  public cancelBlock(blockingCardInstanceId: number): void {
    const blockingCard = this.gameState.getCardFromAnywhere(
      blockingCardInstanceId
    );

    if (!blockingCard) {
      throw new Error('Blocking card not found');
    }

    this.gameState.stopCardBlocking(blockingCardInstanceId);

    const message = new StopCardBlockingMessage(
      ClientMessage.generateUniqueId(),
      this.userId,
      blockingCardInstanceId
    );

    this.sendToServer(NetworkProtocol.StopCardBlocking, message.toJSON());
  }

  public changeBlockOrder(
    blockingCardInstanceId: number,
    newBlockOrder: number
  ): void {
    const blockingCard = this.gameState.getCardFromAnywhere(
      blockingCardInstanceId
    );

    if (!blockingCard) {
      throw new Error('Blocking card not found');
    }

    this.gameState.reorderBlockingCard(blockingCardInstanceId, newBlockOrder);

    const message = new ReorderBlockingCardMessage(
      ClientMessage.generateUniqueId(),
      this.userId,
      blockingCardInstanceId,
      newBlockOrder
    );

    this.sendToServer(NetworkProtocol.ReorderBlockingCard, message.toJSON());
  }

  // #endregion

  // #region Abilities

  public queueActivateAbility(
    sourceEntityInstanceId: number,
    abilityIndex: number,
    paidCosts: PayResourceCost[],
    targetInfoList: TargetInfo[]
  ): void {
    const sourceEntity = this.gameState.getEntityFromAnywhere(
      sourceEntityInstanceId
    ) as AbilityKeywordRuntimeEntity;
    if (!sourceEntity) {
      throw new Error('Entity not found');
    }

    const ability = sourceEntity.abilities[abilityIndex];

    if (!ability) {
      throw new Error('Ability not found');
    }

    if (!ability.effect.areTargetsAvailable(this.gameState, sourceEntity)) {
      throw new Error('No targets available');
    }

    if (
      !ability.effect.isAllTargetInfoValid(
        sourceEntity,
        this.gameState,
        targetInfoList
      )
    ) {
      throw new Error('Invalid target info');
    }

    const costs = ability.costs;

    const playerInfo = this.gameState.getPlayerInfoByUserId(this.userId);
    if (!playerInfo) {
      throw new Error('Player not found');
    }

    if (!playerInfo.canPayResourceCosts(costs)) {
      throw new Error('Player cannot pay resource costs');
    }

    if (ability.usesRemaining <= 0) {
      throw new Error('Ability has no uses remaining');
    }

    ability.usesRemaining--;
    console.log('ability.usesRemaining: ', ability.usesRemaining);

    playerInfo.payResourceCosts(costs, paidCosts);

    const message = new QueueActivateAbilityMessage(
      ClientMessage.generateUniqueId(),
      this.userId,
      sourceEntityInstanceId,
      abilityIndex,
      paidCosts,
      targetInfoList
    );

    this.queueMessages.push(message);
    this.sendToServer(NetworkProtocol.QueueActivateAbility, message.toJSON());
  }

  public receivedActivateAbilityMessageFromServer(
    msg: AbilityActivatedMessage
  ): void {
    if (!this.readyForQueue) {
      throw new Error('Not ready for queue');
    }
    const message = AbilityActivatedMessage.fromJSON(msg);
    if (!message || !message.validate()) {
      console.log('Invalid AbilityActivatedMessage');
      return;
    }

    if (message.playerUsingAbilityUserId !== this.userId) {
      const opponent = this.gameState.getPlayerInfoByUserId(
        message.playerUsingAbilityUserId
      );
      if (!opponent) {
        throw new Error('Opponent not found');
      }
      opponent.payResourceCosts(message.paidCosts);
    }

    const queueline = new ActivateAbilityPlayerQueueline(
      this.userId,
      message.entityUsingAbilityInstanceId,
      message.playerUsingAbilityUserId,
      message.queuePosition,
      message.paidCosts,
      message.targetInfoList,
      message.abilityIndex
    );

    this.queue.push(queueline);

    if (this.queue.length === this.numQueuelinesInBatch) {
      this.startQueue();
    }
  }

  public onActivateAbility(
    sourceEntityInstanceId: number,
    targetInfoList: TargetInfo[],
    abilityIndex: number
  ): void {
    const entity = this.gameState.getEntityFromAnywhere(
      sourceEntityInstanceId
    ) as AbilityKeywordRuntimeEntity;
    if (!entity) {
      throw new Error('Entity not found');
    }

    const ability = entity.abilities[abilityIndex];
    if (!ability) {
      throw new Error('Ability not found');
    }

    const effect = ability.effect;
    if (!effect) {
      throw new Error('Effect not found');
    }

    EffectSolver.doEffect(
      this.gameState,
      sourceEntityInstanceId,
      effect,
      targetInfoList
    );
  }

  // #endregion

  // #region Returning Targets

  receivedTargetsRequestedMessage(msg: GetTargetsFromPlayerMessage): void {
    if (!this.readyForQueue) {
      throw new Error('Not ready for queue');
    }
    const message = GetTargetsFromPlayerMessage.fromJSON(msg);
    if (!message || !message.validate()) {
      console.log('Invalid GetTargetsFromPlayerMessage');
      return;
    }

    const queueline = new ServerRequestsTargetsPlayerQueueline(
      this.userId,
      message.cardInstanceId,
      message.recipientUserId,
      message.queueOrder,
      message.effect,
      message.targetInfoCode
    );

    this.queue.push(queueline);

    if (this.queue.length === this.numQueuelinesInBatch) {
      this.startQueue();
    }
  }

  onServerRequestsTargets(
    effect: RuntimeEffect,
    cardInstanceId: number,
    targetCriterias: TargetCriteria[],
    targetInfoCode: number
  ): void {
    this.targetInfoCode = targetInfoCode;
    this.returningCardInstanceId = cardInstanceId;
    this.returningEffect = effect;
    this.returningTargetTypes = targetCriterias;
  }

  returnTargetsToServer(targetInfo: TargetInfo[]): void {
    const message = new ReturnTargetsToServerMessage(
      ClientMessage.generateUniqueId(),
      this.userId,
      targetInfo,
      this.targetInfoCode
    );

    this.sendToServer(NetworkProtocol.ReturnTargetsToServer, message.toJSON());

    // clear target tracking
    this.targetInfoCode = null;
    this.returningCardInstanceId = null;
    this.returningEffect = null;
    this.returningTargetTypes = null;
  }

  // #endregion

  // #region Land and Mana

  public exploreLand(landTile: RuntimeLandTile): void {
    const message = new PlayerExploredLandMessage(
      ClientMessage.generateUniqueId(),
      this.userId,
      true,
      landTile.id
    );

    this.sendToServer(NetworkProtocol.PlayerExploredLand, message.toJSON());
  }

  public onLandExplored(msg: LandExploredMessage): void {
    const message = LandExploredMessage.fromJSON(msg);

    if (!message || !message.validate()) {
      console.log('Invalid LandExploredMessage');
      return;
    }

    const player = this.gameState.getPlayerInfoByUserId(message.playerUserId);

    const landtile = player.realm.getLandTile(message.landTileId);

    if (!landtile) {
      throw new Error('Landtile not found');
    }

    landtile.explore(message.explored);
  }

  // #endregion
}

export default Player;
