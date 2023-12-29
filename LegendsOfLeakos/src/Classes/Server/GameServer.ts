// #region Imports
import GameState from '../Game/GameState';
import EffectSolver from '../Game/EffectSolver';
import ServerQueueline from '../Queueline/ServerQueueline/ServerQueueline';
import ServerHandler from './ServerHandler';
import PlayerInfo from '../Player/PlayerInfo';
import Phase from '../Phase/Phase';
import { NetworkProtocol } from '../../Enums/NetworkProtocol';
import { ZoneEnum, ZoneOwner } from '../../Enums/Zone';

// messages
import StartGameMessage from '../Networking/GameLoop/Game/StartGameMessage';
import QueueStartedMessage from '../Networking/GameLoop/PhaseAndQueue/QueueStartedMessage';
import ServerMovedCardMessage from '../Networking/Cards/Move/ServerMovedCardMessage';

// queuelines
import FightCreatureQueueline from '../Queueline/ServerQueueline/ServerQueuelines/FightCreatureQueueline';

// handlers
import EffectSolverHandler from './ServerHandlers/EffectSolverHandler';
import ChatHandler from './ServerHandlers/ChatHandler';
import ConnectionHandler from './ServerHandlers/ConnectionHandler';

// lol stuff
import { PhaseEnum } from '../../Enums/Phase';
import RuntimeCard from '../Card/RuntimeCard';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import TargetInfo from '../Target/TargetInfo';
import RuntimeEffect from '../Effect/RuntimeEffect';
import ActivateAbilityQueueLine from '../Queueline/ServerQueueline/ServerQueuelines/TargetsCostsQueueline/TargetCostsQueuelines/ActivateAbilityQueueline';
import UpgradeCardQueueline from '../Queueline/ServerQueueline/ServerQueuelines/TargetsCostsQueueline/TargetCostsQueuelines/UpgradeCardQueueline';
import MoveRowQueueLine from '../Queueline/ServerQueueline/ServerQueuelines/MoveRowQueueline';
import RuntimeLandTile from '../RealmsAndLand/LandTile/RuntimeLandTile';
import LandExploredMessage from '../Networking/Land/LandExporedMessage';
import PlayCardQueueLine from '../Queueline/ServerQueueline/ServerQueuelines/TargetsCostsQueueline/TargetCostsQueuelines/PlayCardQueueline';
import MoveCardEffect from '../Effect/RuntimeEffects/MoveEffects/MoveCardEffect';
import EndQueueExecutionMessage from '../Networking/GameLoop/PhaseAndQueue/EndQueueExecutionMessage';
import PlayerDrewCardsMessage from '../Networking/Cards/Draw/PlayerDrewCardsMessage';
import OpponentDrewCardsMessage from '../Networking/Cards/Draw/OpponentDrewCardsMessage';
import NextPhaseReadyMessage from '../Networking/GameLoop/PhaseAndQueue/NextPhaseReadyMessage';
import GameProperties from '../Game/GameProperties';
import LibraryCard from '../Card/LibraryCard';
import LibraryEnchantment from '../Enchantment/LibraryEnchantment';
import Stat from '../Stat/Stat';
import StatModifier from '../Stat/StatModifier';
import StatBuff from '../Stat/StatBuff';
import { LibraryZone } from '../Zone/LibraryZone';
import RuntimeZone from '../Zone/RuntimeZone';
import RuntimeRealm from '../RealmsAndLand/Realm/RuntimeRealm';
import GameManager from '../Game/GameManager';
import { LandType } from '../../Enums/LandAndBiome';
import LibraryRealm from '../RealmsAndLand/Realm/LibraryRealm';
import { ServerMessage } from '../Networking/MessageBase';
// #endregion

class GameServer {
  // #region Properties
  // networking variables from my WebApp
  userIdToSocketId: Function;
  sendToRoom: Function;
  sendToPlayer: (
    messageType: NetworkProtocol,
    message: ServerMessage,
    playerUserID: string
  ) => void;
  endGameCallback: Function;

  // Phase Variables
  p0_readyToProgressPhase: boolean;
  p1_readyToProgressPhase: boolean;

  phaseList: Phase[];

  // Turn Variables
  turnDuration: number;

  // References to Major Classes and Systems
  public gameState: GameState;
  protected handlers: ServerHandler[] = [];

  // Queue Variables
  public queueStarted: boolean;
  public currentQueueIndex: number;
  public queue: ServerQueueline[] = [];
  public targetInfoCode: number | null;

  // game over
  protected gameFinished: boolean;

  // #endregion

  // #region Constructor

  constructor(
    players: any[],
    userIdToSocketId: (userId: string) => string,
    sendToPlayer: (
      messageType: string,
      message: any,
      playerUserID: string
    ) => void,
    endGameCallback: Function,
    cardLibraryJSON: LibraryCard[],
    enchantmentLibraryJSON: LibraryEnchantment[]
  ) {
    // register the functions
    this.userIdToSocketId = userIdToSocketId;
    this.sendToPlayer = (
      messageType: NetworkProtocol,
      message: ServerMessage,
      playerUserID: string
    ) => {
      if (!message.recipientUserId) {
        throw new Error('RecipientUserId is not set');
      }
      if (message.messageEnum !== messageType) {
        throw new Error(
          'MessageEnum(' +
            message.messageEnum +
            ') !== MessageType(' +
            messageType +
            ').'
        );
      }
      console.log('Sending message: ', NetworkProtocol[messageType]);
      sendToPlayer(
        NetworkProtocol[messageType],
        message.toJSON(),
        playerUserID
      );
    };
    this.endGameCallback = endGameCallback;

    // Game Properties
    this.turnDuration = 60;
    this.phaseList = GameProperties.gamePhases;
    // Ensure this.phaseList matches PhaseEnum
    for (let key in PhaseEnum) {
      if (isNaN(Number(key))) {
        let phaseEnumKey = PhaseEnum[key as keyof typeof PhaseEnum];
        if (!this.phaseList.find((x) => x.phaseEnum === phaseEnumKey)) {
          throw new Error('1. PhaseList does not match PhaseEnum');
        }
      }
    }
    const enumLength = Object.keys(PhaseEnum).filter((key) =>
      isNaN(Number(key))
    ).length;
    if (this.phaseList.length !== enumLength) {
      throw new Error('2. PhaseList does not match PhaseEnum');
    }

    // Create the Libraries
    const cardLibrary: LibraryCard[] = [];
    for (let card of cardLibraryJSON) {
      cardLibrary.push(LibraryCard.fromJSON(card));
    }
    const enchantmentLibrary: LibraryEnchantment[] = [];
    for (let enchantment of enchantmentLibraryJSON) {
      enchantmentLibrary.push(LibraryEnchantment.fromJSON(enchantment));
    }

    // need the GameManager
    const gameManager = new GameManager(cardLibrary, enchantmentLibrary);

    // Create the GameState
    // need the list of PlayerInfo
    const playerInfos: PlayerInfo[] = [];
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (!player.userId) {
        throw new Error('Player userId is not set');
      }
      if (!player.name) {
        throw new Error('Player name is not set');
      }
      if (!player.realm) {
        throw new Error('Player realm is not set');
      }

      playerInfos.push(
        this.getPlayerInfo(
          player.userId,
          i,
          player.name,
          player.realm,
          cardLibrary
        )
      );
    }

    // Create the GameState
    this.gameState = new GameState(
      gameManager,
      playerInfos,
      0,
      0,
      Date.now(),
      []
    );

    // Load the Server Handlers
    this.handlers.push(new EffectSolverHandler(this));
    this.handlers.push(new ChatHandler(this));
    this.handlers.push(new ConnectionHandler(this));
  }

  getPlayerInfo = (
    userId: string,
    index: number,
    name: string,
    realmJSON: any,
    cardLibrary: LibraryCard[]
  ) => {
    const libraryRealm = LibraryRealm.fromJSON(realmJSON);

    // Create a new player info for the registered player.
    const player = new PlayerInfo();
    player.id = index;
    player.userId = userId;
    player.name = name;
    player.isConnected = true;
    player.isHuman = true;
    player.currentEntityInstanceId = player.id * 100000;

    // Set the player stats based on the generic player definition.
    player.nameToStat = new Map<string, Stat>();
    player.idToStat = new Map<number, Stat>();

    for (let stat of GameProperties.playerStats) {
      const statCopy = new Stat(
        stat.statId,
        stat.name,
        stat.originalValue,
        stat.baseValue,
        stat.minValue,
        stat.maxValue,
        new Array<StatModifier>(),
        new Array<StatBuff>()
      );
      player.stats.push(statCopy);

      player.nameToStat.set(statCopy.name, statCopy);
      player.idToStat.set(statCopy.statId, statCopy);
    }

    // Set the player zones based on the generic zone definitions.
    player.zones = [];
    const personalZones = GameProperties.gameZones.filter(
      (x: LibraryZone) => x.owner !== ZoneOwner.Shared
    );
    for (let zone of personalZones) {
      const zoneCopy = new RuntimeZone(
        player.currentEntityInstanceId++,
        zone.name,
        zone.zoneEnum,
        player.userId,
        [],
        []
      );
      player.zones.push(zoneCopy);
    }

    // Adding the cards to the deck and getting the realm
    let deckZone = player.getFriendlyZoneFromZoneEnum(ZoneEnum.Deck);
    const realm = RuntimeRealm.registerRealmAndAddCardsToDeck(
      libraryRealm,
      deckZone,
      player,
      cardLibrary,
      GameProperties.realmLayout
    );
    player.realm = realm;

    // Add the new player to the server's list of players.
    return player;
  };

  // #endregion

  // #region Startup Functions Called Externally

  // Registers the network handlers for the messages the server is interested in listening to.
  public listen(playerSockets: any): void {
    for (let handler of this.handlers) {
      handler.registerNetworkHandlers(playerSockets);
    }
  }

  // Unregisters the network handlers for the messages the server is interested in listening to.
  protected unlisten(playerSockets: any): void {
    for (let handler of this.handlers) {
      handler.unregisterNetworkHandlers(playerSockets);
    }
    this.handlers = [];
  }

  startNewGame() {
    this.startGame();
  }

  // #endregion

  // #region Start and End Game

  public startGame(): void {
    // let us first make sure each player's city is explored
    this.gameState.players.forEach((player) => {
      const cityTile = player.realm.landTiles.find(
        (x) => x.landType === LandType.city
      );

      if (!cityTile) {
        console.log('landtiles: ', player.realm.landTiles);
        throw new Error('Player does not have a city tile');
      }

      player.realm.exploreLandTile(cityTile.id);
    });

    // current turn = 1
    this.gameState.currentTurn = 1;
    this.currentQueueIndex = 0;
    this.queueStarted = false;

    // we add this here becuase we're going to skip the start phase message for the first turn
    EffectSolver.onRecruitmentPhaseStarted(this.gameState);

    // Send a StartGame message to all the connected players.
    this.gameState.players.forEach((player, i) => {
      let msg = new StartGameMessage(
        player.userId,
        i,
        this.turnDuration,
        this.gameState.players.map((player) => player.name), // names
        player,
        this.gameState.players.find((x) => x !== player),
        this.gameState.rngSeed,
        this.gameState.gameManager
      );
      this.sendToPlayer(NetworkProtocol.StartGame, msg, player.userId);
    });
  }

  public endGame() {
    console.log('Ending game');
    this.endGameCallback('game statistics go here');
  }

  // #endregion

  // #region Land and Realm Messages

  public playerExploredLand(
    exploringPlayer: PlayerInfo,
    landTile: RuntimeLandTile
  ) {
    exploringPlayer.realm.exploreLandTile(landTile.id);

    // send message to all players
    this.gameState.players.forEach((p) => {
      let msg = new LandExploredMessage(
        p.userId,
        exploringPlayer.userId,
        true,
        landTile.id
      );
      this.sendToPlayer(NetworkProtocol.LandExplored, msg, p.userId);
    });

    this.playerFinishRecruitmentPhase(exploringPlayer);
  }

  // #endregion

  // #region Player Actions

  public playerReadyForQueueExecution(readyPlayer: PlayerInfo): void {
    readyPlayer.readyForQueue = true;

    // check if ready player is in gamestate.players
    if (!this.gameState.players.includes(readyPlayer)) {
      throw new Error('Player is not in the game');
    }

    let allReady = this.gameState.players.every(
      (player) => player.readyForQueue
    );

    if (allReady) {
      this.startTheQueue();
    }
  }

  public alreadyFightingBlockingOrMoving(cardInstanceId: number): boolean {
    let card = this.gameState.getCardFromAnywhere(cardInstanceId);

    const alreadyFighting = this.queue.find(
      (q) =>
        q instanceof FightCreatureQueueline &&
        q.sourceCardInstanceId === cardInstanceId
    );

    if (alreadyFighting) {
      console.log('Already fighting');
      return true;
    }

    if (
      this.gameState.blocks.find(
        (b) => b.blockingCardInstanceId === cardInstanceId
      )
    ) {
      console.log('Already blocking');
      return true;
    }

    const alreadyMoving = this.queue.find(
      (q) =>
        q instanceof MoveRowQueueLine &&
        q.sourceCardInstanceId === cardInstanceId
    );

    if (alreadyMoving) {
      console.log('Already moving');
      return true;
    }

    return false;
  }

  public queueFightCreature(
    clientMessageId: string,
    attackingCard: RuntimeCard,
    attackedCard: RuntimeCard,
    sourcePlayer: PlayerInfo,
    priority: number
  ): void {
    const line = new FightCreatureQueueline(
      clientMessageId,
      attackingCard.instanceId,
      attackedCard.instanceId,
      sourcePlayer.userId,
      priority
    );

    this.queue.push(line);
  }

  public queueActivateAbility(
    clientMessageId: string,
    card: RuntimeCard,
    sourcePlayerInfo: PlayerInfo,
    targetInfoList: TargetInfo[],
    paidCosts: PayResourceCost[],
    effect: RuntimeEffect,
    priority: number,
    abilityIndex: number
  ): void {
    // create the queueline
    let queueline = new ActivateAbilityQueueLine(
      clientMessageId,
      card.instanceId,
      sourcePlayerInfo.userId,
      targetInfoList,
      paidCosts,
      effect,
      priority,
      abilityIndex
    );

    // add the queueline to the queue
    this.queue.push(queueline);
  }

  public queueUpgradeCard(
    clientMessageId: string,
    cardInstanceId: number,
    sourcePlayerUserId: string,
    targetInfoList: TargetInfo[],
    paidCosts: PayResourceCost[],
    effect: RuntimeEffect,
    priority: number,
    upgradeIndex: number
  ): void {
    // create the queueline
    // add the queueline to the queue
    const line = new UpgradeCardQueueline(
      clientMessageId,
      cardInstanceId,
      sourcePlayerUserId,
      targetInfoList,
      paidCosts,
      effect,
      priority,
      upgradeIndex
    );

    this.queue.push(line);
  }

  public queuePlayCard(
    clientMessageId: string,
    sourceCard: RuntimeCard,
    sourcePlayer: PlayerInfo,
    targetInfoList: TargetInfo[],
    paidCosts: PayResourceCost[],
    priority: number,
    originZoneZoneEnum: ZoneEnum,
    destinationZoneZoneEnum: ZoneEnum
  ): void {
    const line = new PlayCardQueueLine(
      clientMessageId,
      sourceCard.instanceId,
      sourcePlayer.userId,
      targetInfoList,
      paidCosts,
      priority,
      originZoneZoneEnum,
      destinationZoneZoneEnum
    );

    this.queue.push(line);
  }

  public queueCardMovedRow(
    clientMessageId: string,
    cardInstanceId: number,
    sourcePlayerUserId: string,
    priority: number,
    originZoneZoneEnum: ZoneEnum,
    destinationZoneEnum: ZoneEnum
  ): void {
    // create the queueline
    // add the queueline to the queue
    const line = new MoveRowQueueLine(
      clientMessageId,
      cardInstanceId,
      sourcePlayerUserId,
      priority,
      originZoneZoneEnum,
      destinationZoneEnum
    );

    this.queue.push(line);
  }

  // #endregion

  // #region Game Flow - Queue and Queulines

  static queueSorter(a: ServerQueueline, b: ServerQueueline): number {
    const p = a.priority - b.priority;
    if (p !== 0) {
      return p;
    } else {
      if (a.sourcePlayerUserId === b.sourcePlayerUserId) {
        return 0;
      } else {
        // return random number
        return Math.random() < 0.5 ? -1 : 1;
      }
    }
  }

  public startTheQueue(): void {
    this.queueStarted = true;
    const attackingCardInstanceIds: number[] = [];

    // if it is the BattlePhase, start by moving all attacking creatures into the battlerow
    if (
      this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
      PhaseEnum.Battle
    ) {
      // now we move all attacking cards in the battlerow
      this.queue.forEach((q) => {
        if (q instanceof FightCreatureQueueline) {
          attackingCardInstanceIds.push(q.sourceCardInstanceId);

          const moveEffect = MoveCardEffect.createMoveCardEffect(
            ZoneEnum.FrontBoard,
            ZoneEnum.BattleBoard
          );

          EffectSolver.doEffect(
            this.gameState,
            q.sourceCardInstanceId,
            moveEffect,
            new Array<TargetInfo>()
          );
        }
      });
    }

    // first we must sort the queue
    // Sort Queue such that high priority executes first, with ties going to the active player.
    this.queue.sort(GameServer.queueSorter);
    this.queue.reverse();

    // get info
    const pausingQueueline = this.queue.find((c) =>
      c.areTargetsStillRequired(this)
    );
    const queuelinesThisMessage = !!pausingQueueline
      ? this.queue.indexOf(pausingQueueline) + 1
      : this.queue.length;

    this.gameState.players.forEach((player) => {
      // send a queue started message to the clients

      let queueStartedMessage = new QueueStartedMessage(
        player.userId,
        this.queue.length,
        queuelinesThisMessage,
        !!pausingQueueline,
        !!pausingQueueline ? pausingQueueline.sourcePlayerUserId : null,
        attackingCardInstanceIds,
        this.gameState.blocks
      );

      this.sendToPlayer(
        NetworkProtocol.QueueStarted,
        queueStartedMessage,
        player.userId
      );
    });

    // run the queue on the server
    this.executeNextQueueline();
  }

  public executeNextQueueline(): void {
    if (this.currentQueueIndex >= this.queue.length) {
      this.endQueue();
      return;
    }

    let currentQueueline = this.queue[this.currentQueueIndex];

    if (!currentQueueline) {
      throw new Error('this.currentQueueIndex is out of bounds');
    }

    if (currentQueueline.areTargetsStillRequired(this)) {
      if (
        !currentQueueline.areTargetsStillAvailable(this) ||
        !currentQueueline.areAllSelectedTargetInfoItemsValid(this)
      ) {
        // Targets are not available. We therefore send this to the effectsolver and the players so that the effect will fizzle in the effect solver.
        currentQueueline.sendEffectToDoEffect(this, this.currentQueueIndex);
      } else {
        currentQueueline.goOutForTargets(this, this.currentQueueIndex);
        return;
      }
    } else {
      currentQueueline.sendEffectToDoEffect(this, this.currentQueueIndex);
    }

    this.currentQueueIndex += 1;
    this.executeNextQueueline();
  }

  public endQueue(): void {
    if (
      this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
      PhaseEnum.Battle
    ) {
      this.moveBackAttackingCards();
    }

    this.currentQueueIndex = 0;
    this.queue = [];
    this.queueStarted = false;

    this.gameState.players.forEach((player) => {
      player.readyForQueue = false;

      // send a queue ended message to the clients
      const msg = new EndQueueExecutionMessage(player.userId);
      this.sendToPlayer(NetworkProtocol.EndExecuteQueue, msg, player.userId);
    });

    this.endPhase();
  }
  // #endregion

  // #region Game Flow - Phases

  public startPhase(): void {
    // increment the phase index
    this.gameState.currentPhaseIndex =
      (this.gameState.currentPhaseIndex + 1) % this.phaseList.length;
    this.currentQueueIndex = 0;
    this.queue = [];

    // run phase start effects
    if (
      this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
      PhaseEnum.Recruit
    ) {
      // we put this instead of in the solver because the player is going to run the solver
      // but we'd rather just take what we tell them
      this.gameState.currentTurn += 1;
      // effect solver
      EffectSolver.onRecruitmentPhaseStarted(this.gameState);
    }
    if (
      this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
      PhaseEnum.Maneuver
    ) {
      // effect solver
      EffectSolver.onManeuverPhaseStarted(this.gameState);
    }
    if (
      this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
      PhaseEnum.Skirmish
    ) {
      // effect solver
      EffectSolver.onSkirmishPhaseStarted(this.gameState);
    }
    if (
      this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
      PhaseEnum.Battle
    ) {
      // effect solver
      EffectSolver.onBattlePhaseStarted(this.gameState);
    }

    for (let player of this.gameState.players) {
      let msg = new NextPhaseReadyMessage(
        player.userId,
        this.gameState.currentTurn,
        this.gameState.currentPhaseIndex,
        player,
        this.gameState.players.find((x) => x !== player)
      );
      this.sendToPlayer(NetworkProtocol.NextPhaseReady, msg, player.userId);
    }
  }

  public endPhase(): void {
    if (
      this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
      PhaseEnum.Recruit
    ) {
      // draw cards
      this.gameState.players.forEach((player) => {
        if (this.gameState.currentTurn === 1) {
          this.drawCards(player, 5);
        } else {
          this.drawCards(player, 1);
        }
      });
      EffectSolver.onRecruitmentPhaseEnded(this.gameState);
    }
    if (
      this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
      PhaseEnum.Maneuver
    ) {
      EffectSolver.onManeuverPhaseEnded(this.gameState);
    }
    if (
      this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
      PhaseEnum.Skirmish
    ) {
      EffectSolver.onSkirmishPhaseEnded(this.gameState);
    }
    if (
      this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
      PhaseEnum.Battle
    ) {
      EffectSolver.onBattlePhaseEnded(this.gameState);

      for (let player of this.gameState.players) {
        for (let stat of player.stats) {
          stat.onEndBattlePhase();
        }
        for (let zone of player.zones) {
          for (let card of zone.cards) {
            card.onEndTurn(this.gameState);
            card.attack.onEndBattlePhase();
            card.health.onEndBattlePhase();
            card.priority.onEndBattlePhase();
          }
        }
      }
    }

    // start the next phase
    this.startPhase();
  }

  public playerFinishRecruitmentPhase(player: PlayerInfo): void {
    if (this.gameState.players.indexOf(player) === 0) {
      this.p0_readyToProgressPhase = true;
    } else if (this.gameState.players.indexOf(player) === 1) {
      this.p1_readyToProgressPhase = true;
    } else {
      throw new Error('Player is not in the game');
    }

    if (this.p0_readyToProgressPhase && this.p1_readyToProgressPhase) {
      this.p0_readyToProgressPhase = false;
      this.p1_readyToProgressPhase = false;
      this.endPhase();
    }
  }

  public moveBackAttackingCards(): void {
    // move all attacking cards back
    for (let q of this.queue) {
      if (q instanceof FightCreatureQueueline) {
        const attackingPlayer = this.gameState.players.find(
          (c) => c.userId === q.sourcePlayerUserId
        );
        const attackingCard = attackingPlayer.getCardFromInstanceId(
          q.sourceCardInstanceId
        );
        const moveEffect = MoveCardEffect.createMoveCardEffect(
          ZoneEnum.BattleBoard,
          ZoneEnum.FrontBoard
        );
        EffectSolver.doEffect(
          this.gameState,
          attackingCard.instanceId,
          moveEffect,
          new Array<TargetInfo>()
        );
        // send to players
        this.gameState.players.forEach((player) => {
          let cardMovedMsg = new ServerMovedCardMessage(
            player.userId,
            attackingPlayer.userId,
            attackingCard,
            ZoneEnum.BattleBoard,
            ZoneEnum.FrontBoard
          );
          this.sendToPlayer(
            NetworkProtocol.CardMoved,
            cardMovedMsg,
            player.userId
          );
        });
      }
    }
  }
  // #endregion

  // #region Draw Cards

  public drawCards(player: PlayerInfo, numberOfCards: number): void {
    const deck = player.getFriendlyZoneFromZoneEnum(ZoneEnum.Deck);
    const hand = player.getFriendlyZoneFromZoneEnum(ZoneEnum.Hand);

    if (numberOfCards > deck.cards.length) {
      numberOfCards = deck.cards.length;
    }

    if (hand.getLibraryZone().hasMaxCards) {
      numberOfCards = Math.min(
        numberOfCards,
        hand.getLibraryZone().maxCards - hand.cards.length
      );
    }

    const exploredLandTiles = player.realm.landTiles.filter((x) => x.explored);
    const cardsInstanceIdsFromExploredBiomes = [];

    // get all cards in the biomes - this will include cads in play, in graveyard, etc - we will filter those out later
    for (let biome of player.realm.biomes) {
      const biomeIsExplored =
        exploredLandTiles.filter((tile) => biome.landTileIds.includes(tile.id))
          .length > 0;

      if (biomeIsExplored) {
        cardsInstanceIdsFromExploredBiomes.push(...biome.cardInstanceIds);
      }
    }

    // get distinct instance ids - there might be cards across biomes? unclear
    const distinctCardsInstanceIdsFromExploredBiomes = Array.from(
      new Set(cardsInstanceIdsFromExploredBiomes)
    );

    // if distinct is not the same, I want to know - I think they should alwyas be the same, as currently
    // we consider parent biomes to be separate and cards live in them separately, though they may have landtiles
    // that are overlapping - but they shouldn't have overlapping cards
    if (
      distinctCardsInstanceIdsFromExploredBiomes.length !==
      cardsInstanceIdsFromExploredBiomes.length
    ) {
      console.log('ERROR: Cards are overlapping - this should not happen');
    }
    // filter by still in the deck
    const drawableCardInstanceIDsInDeck =
      distinctCardsInstanceIdsFromExploredBiomes.filter((x) =>
        deck.cards.map((c) => c.instanceId).includes(x)
      );

    // get the number of cards and move them to the hand
    const cardInstanceIdsToDraw = drawableCardInstanceIDsInDeck.slice(
      0,
      numberOfCards
    );
    const cardsToDraw = cardInstanceIdsToDraw.map((x) =>
      this.gameState.getCardFromAnywhere(x)
    );

    if (cardsToDraw.length === 0) {
      console.log('GameServer.drawCards: NO CARDS TO DRAW');
      return;
    }

    for (let card of cardsToDraw) {
      const moveEffect = MoveCardEffect.createMoveCardEffect(
        ZoneEnum.Deck,
        ZoneEnum.Hand
      );
      EffectSolver.doEffect(this.gameState, card.instanceId, moveEffect, []);
    }

    // send to players
    this.gameState.players.forEach((p) => {
      if (p.userId === player.userId) {
        const msg = new PlayerDrewCardsMessage(p.userId, cardsToDraw);
        this.sendToPlayer(NetworkProtocol.PlayerDrewCards, msg, p.userId);
      } else {
        const msg = new OpponentDrewCardsMessage(p.userId, cardsToDraw.length);
        this.sendToPlayer(NetworkProtocol.OpponentDrewCards, msg, p.userId);
      }
    });
  }

  // #endregion

  // #region Card Blocking

  public cardBlocking(
    blockingCard: RuntimeCard,
    blockedCard: RuntimeCard,
    blockOrder: number
  ): void {
    this.gameState.cardBlocking(
      blockingCard.instanceId,
      blockedCard.instanceId,
      blockOrder
    );
  }

  public reorderBlockingCard(
    blockingCard: RuntimeCard,
    originalBlockOrder: number
  ) {
    this.gameState.reorderBlockingCard(
      blockingCard.instanceId,
      originalBlockOrder
    );
  }

  public stopCardBlocking(blockingCardInstance: number): void {
    this.gameState.stopCardBlocking(blockingCardInstance);
  }

  // #endregion
}

export default GameServer;
