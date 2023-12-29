"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// #region Imports
var GameState_1 = __importDefault(require("../Game/GameState"));
var EffectSolver_1 = __importDefault(require("../Game/EffectSolver"));
var PlayerInfo_1 = __importDefault(require("../Player/PlayerInfo"));
var NetworkProtocol_1 = require("../../Enums/NetworkProtocol");
var Zone_1 = require("../../Enums/Zone");
// messages
var StartGameMessage_1 = __importDefault(require("../Networking/GameLoop/Game/StartGameMessage"));
var QueueStartedMessage_1 = __importDefault(require("../Networking/GameLoop/PhaseAndQueue/QueueStartedMessage"));
var ServerMovedCardMessage_1 = __importDefault(require("../Networking/Cards/Move/ServerMovedCardMessage"));
// queuelines
var FightCreatureQueueline_1 = __importDefault(require("../Queueline/ServerQueueline/ServerQueuelines/FightCreatureQueueline"));
// handlers
var EffectSolverHandler_1 = __importDefault(require("./ServerHandlers/EffectSolverHandler"));
var ChatHandler_1 = __importDefault(require("./ServerHandlers/ChatHandler"));
var ConnectionHandler_1 = __importDefault(require("./ServerHandlers/ConnectionHandler"));
// lol stuff
var Phase_1 = require("../../Enums/Phase");
var ActivateAbilityQueueline_1 = __importDefault(require("../Queueline/ServerQueueline/ServerQueuelines/TargetsCostsQueueline/TargetCostsQueuelines/ActivateAbilityQueueline"));
var UpgradeCardQueueline_1 = __importDefault(require("../Queueline/ServerQueueline/ServerQueuelines/TargetsCostsQueueline/TargetCostsQueuelines/UpgradeCardQueueline"));
var MoveRowQueueline_1 = __importDefault(require("../Queueline/ServerQueueline/ServerQueuelines/MoveRowQueueline"));
var LandExporedMessage_1 = __importDefault(require("../Networking/Land/LandExporedMessage"));
var PlayCardQueueline_1 = __importDefault(require("../Queueline/ServerQueueline/ServerQueuelines/TargetsCostsQueueline/TargetCostsQueuelines/PlayCardQueueline"));
var MoveCardEffect_1 = __importDefault(require("../Effect/RuntimeEffects/MoveEffects/MoveCardEffect"));
var EndQueueExecutionMessage_1 = __importDefault(require("../Networking/GameLoop/PhaseAndQueue/EndQueueExecutionMessage"));
var PlayerDrewCardsMessage_1 = __importDefault(require("../Networking/Cards/Draw/PlayerDrewCardsMessage"));
var OpponentDrewCardsMessage_1 = __importDefault(require("../Networking/Cards/Draw/OpponentDrewCardsMessage"));
var NextPhaseReadyMessage_1 = __importDefault(require("../Networking/GameLoop/PhaseAndQueue/NextPhaseReadyMessage"));
var GameProperties_1 = __importDefault(require("../Game/GameProperties"));
var LibraryCard_1 = __importDefault(require("../Card/LibraryCard"));
var LibraryEnchantment_1 = __importDefault(require("../Enchantment/LibraryEnchantment"));
var Stat_1 = __importDefault(require("../Stat/Stat"));
var RuntimeZone_1 = __importDefault(require("../Zone/RuntimeZone"));
var RuntimeRealm_1 = __importDefault(require("../RealmsAndLand/Realm/RuntimeRealm"));
var GameManager_1 = __importDefault(require("../Game/GameManager"));
var LandAndBiome_1 = require("../../Enums/LandAndBiome");
var LibraryRealm_1 = __importDefault(require("../RealmsAndLand/Realm/LibraryRealm"));
// #endregion
var GameServer = /** @class */ (function () {
    // #endregion
    // #region Constructor
    function GameServer(players, userIdToSocketId, sendToPlayer, endGameCallback, cardLibraryJSON, enchantmentLibraryJSON) {
        this.handlers = [];
        this.queue = [];
        this.getPlayerInfo = function (userId, index, name, realmJSON, cardLibrary) {
            var libraryRealm = LibraryRealm_1.default.fromJSON(realmJSON);
            // Create a new player info for the registered player.
            var player = new PlayerInfo_1.default();
            player.id = index;
            player.userId = userId;
            player.name = name;
            player.isConnected = true;
            player.isHuman = true;
            player.currentEntityInstanceId = player.id * 100000;
            // Set the player stats based on the generic player definition.
            player.nameToStat = new Map();
            player.idToStat = new Map();
            for (var _i = 0, _a = GameProperties_1.default.playerStats; _i < _a.length; _i++) {
                var stat = _a[_i];
                var statCopy = new Stat_1.default(stat.statId, stat.name, stat.originalValue, stat.baseValue, stat.minValue, stat.maxValue, new Array(), new Array());
                player.stats.push(statCopy);
                player.nameToStat.set(statCopy.name, statCopy);
                player.idToStat.set(statCopy.statId, statCopy);
            }
            // Set the player zones based on the generic zone definitions.
            player.zones = [];
            var personalZones = GameProperties_1.default.gameZones.filter(function (x) { return x.owner !== Zone_1.ZoneOwner.Shared; });
            for (var _b = 0, personalZones_1 = personalZones; _b < personalZones_1.length; _b++) {
                var zone = personalZones_1[_b];
                var zoneCopy = new RuntimeZone_1.default(player.currentEntityInstanceId++, zone.name, zone.zoneEnum, player.userId, [], []);
                player.zones.push(zoneCopy);
            }
            // Adding the cards to the deck and getting the realm
            var deckZone = player.getFriendlyZoneFromZoneEnum(Zone_1.ZoneEnum.Deck);
            var realm = RuntimeRealm_1.default.registerRealmAndAddCardsToDeck(libraryRealm, deckZone, player, cardLibrary, GameProperties_1.default.realmLayout);
            player.realm = realm;
            // Add the new player to the server's list of players.
            return player;
        };
        // register the functions
        this.userIdToSocketId = userIdToSocketId;
        this.sendToPlayer = function (messageType, message, playerUserID) {
            if (!message.recipientUserId) {
                throw new Error('RecipientUserId is not set');
            }
            if (message.messageEnum !== messageType) {
                throw new Error('MessageEnum(' +
                    message.messageEnum +
                    ') !== MessageType(' +
                    messageType +
                    ').');
            }
            console.log('Sending message: ', NetworkProtocol_1.NetworkProtocol[messageType]);
            sendToPlayer(NetworkProtocol_1.NetworkProtocol[messageType], message.toJSON(), playerUserID);
        };
        this.endGameCallback = endGameCallback;
        // Game Properties
        this.turnDuration = 60;
        this.phaseList = GameProperties_1.default.gamePhases;
        var _loop_1 = function (key) {
            if (isNaN(Number(key))) {
                var phaseEnumKey_1 = Phase_1.PhaseEnum[key];
                if (!this_1.phaseList.find(function (x) { return x.phaseEnum === phaseEnumKey_1; })) {
                    throw new Error('1. PhaseList does not match PhaseEnum');
                }
            }
        };
        var this_1 = this;
        // Ensure this.phaseList matches PhaseEnum
        for (var key in Phase_1.PhaseEnum) {
            _loop_1(key);
        }
        var enumLength = Object.keys(Phase_1.PhaseEnum).filter(function (key) {
            return isNaN(Number(key));
        }).length;
        if (this.phaseList.length !== enumLength) {
            throw new Error('2. PhaseList does not match PhaseEnum');
        }
        // Create the Libraries
        var cardLibrary = [];
        for (var _i = 0, cardLibraryJSON_1 = cardLibraryJSON; _i < cardLibraryJSON_1.length; _i++) {
            var card = cardLibraryJSON_1[_i];
            cardLibrary.push(LibraryCard_1.default.fromJSON(card));
        }
        var enchantmentLibrary = [];
        for (var _a = 0, enchantmentLibraryJSON_1 = enchantmentLibraryJSON; _a < enchantmentLibraryJSON_1.length; _a++) {
            var enchantment = enchantmentLibraryJSON_1[_a];
            enchantmentLibrary.push(LibraryEnchantment_1.default.fromJSON(enchantment));
        }
        // need the GameManager
        var gameManager = new GameManager_1.default(cardLibrary, enchantmentLibrary);
        // Create the GameState
        // need the list of PlayerInfo
        var playerInfos = [];
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            if (!player.userId) {
                throw new Error('Player userId is not set');
            }
            if (!player.name) {
                throw new Error('Player name is not set');
            }
            if (!player.realm) {
                throw new Error('Player realm is not set');
            }
            playerInfos.push(this.getPlayerInfo(player.userId, i, player.name, player.realm, cardLibrary));
        }
        // Create the GameState
        this.gameState = new GameState_1.default(gameManager, playerInfos, 0, 0, Date.now(), []);
        // Load the Server Handlers
        this.handlers.push(new EffectSolverHandler_1.default(this));
        this.handlers.push(new ChatHandler_1.default(this));
        this.handlers.push(new ConnectionHandler_1.default(this));
    }
    // #endregion
    // #region Startup Functions Called Externally
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
        this.startGame();
    };
    // #endregion
    // #region Start and End Game
    GameServer.prototype.startGame = function () {
        var _this = this;
        // let us first make sure each player's city is explored
        this.gameState.players.forEach(function (player) {
            var cityTile = player.realm.landTiles.find(function (x) { return x.landType === LandAndBiome_1.LandType.city; });
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
        EffectSolver_1.default.onRecruitmentPhaseStarted(this.gameState);
        // Send a StartGame message to all the connected players.
        this.gameState.players.forEach(function (player, i) {
            var msg = new StartGameMessage_1.default(player.userId, i, _this.turnDuration, _this.gameState.players.map(function (player) { return player.name; }), // names
            player, _this.gameState.players.find(function (x) { return x !== player; }), _this.gameState.rngSeed, _this.gameState.gameManager);
            _this.sendToPlayer(NetworkProtocol_1.NetworkProtocol.StartGame, msg, player.userId);
        });
    };
    GameServer.prototype.endGame = function () {
        console.log('Ending game');
        this.endGameCallback('game statistics go here');
    };
    // #endregion
    // #region Land and Realm Messages
    GameServer.prototype.playerExploredLand = function (exploringPlayer, landTile) {
        var _this = this;
        exploringPlayer.realm.exploreLandTile(landTile.id);
        // send message to all players
        this.gameState.players.forEach(function (p) {
            var msg = new LandExporedMessage_1.default(p.userId, exploringPlayer.userId, true, landTile.id);
            _this.sendToPlayer(NetworkProtocol_1.NetworkProtocol.LandExplored, msg, p.userId);
        });
        this.playerFinishRecruitmentPhase(exploringPlayer);
    };
    // #endregion
    // #region Player Actions
    GameServer.prototype.playerReadyForQueueExecution = function (readyPlayer) {
        readyPlayer.readyForQueue = true;
        // check if ready player is in gamestate.players
        if (!this.gameState.players.includes(readyPlayer)) {
            throw new Error('Player is not in the game');
        }
        var allReady = this.gameState.players.every(function (player) { return player.readyForQueue; });
        if (allReady) {
            this.startTheQueue();
        }
    };
    GameServer.prototype.alreadyFightingBlockingOrMoving = function (cardInstanceId) {
        var card = this.gameState.getCardFromAnywhere(cardInstanceId);
        var alreadyFighting = this.queue.find(function (q) {
            return q instanceof FightCreatureQueueline_1.default &&
                q.sourceCardInstanceId === cardInstanceId;
        });
        if (alreadyFighting) {
            console.log('Already fighting');
            return true;
        }
        if (this.gameState.blocks.find(function (b) { return b.blockingCardInstanceId === cardInstanceId; })) {
            console.log('Already blocking');
            return true;
        }
        var alreadyMoving = this.queue.find(function (q) {
            return q instanceof MoveRowQueueline_1.default &&
                q.sourceCardInstanceId === cardInstanceId;
        });
        if (alreadyMoving) {
            console.log('Already moving');
            return true;
        }
        return false;
    };
    GameServer.prototype.queueFightCreature = function (clientMessageId, attackingCard, attackedCard, sourcePlayer, priority) {
        var line = new FightCreatureQueueline_1.default(clientMessageId, attackingCard.instanceId, attackedCard.instanceId, sourcePlayer.userId, priority);
        this.queue.push(line);
    };
    GameServer.prototype.queueActivateAbility = function (clientMessageId, card, sourcePlayerInfo, targetInfoList, paidCosts, effect, priority, abilityIndex) {
        // create the queueline
        var queueline = new ActivateAbilityQueueline_1.default(clientMessageId, card.instanceId, sourcePlayerInfo.userId, targetInfoList, paidCosts, effect, priority, abilityIndex);
        // add the queueline to the queue
        this.queue.push(queueline);
    };
    GameServer.prototype.queueUpgradeCard = function (clientMessageId, cardInstanceId, sourcePlayerUserId, targetInfoList, paidCosts, effect, priority, upgradeIndex) {
        // create the queueline
        // add the queueline to the queue
        var line = new UpgradeCardQueueline_1.default(clientMessageId, cardInstanceId, sourcePlayerUserId, targetInfoList, paidCosts, effect, priority, upgradeIndex);
        this.queue.push(line);
    };
    GameServer.prototype.queuePlayCard = function (clientMessageId, sourceCard, sourcePlayer, targetInfoList, paidCosts, priority, originZoneZoneEnum, destinationZoneZoneEnum) {
        var line = new PlayCardQueueline_1.default(clientMessageId, sourceCard.instanceId, sourcePlayer.userId, targetInfoList, paidCosts, priority, originZoneZoneEnum, destinationZoneZoneEnum);
        this.queue.push(line);
    };
    GameServer.prototype.queueCardMovedRow = function (clientMessageId, cardInstanceId, sourcePlayerUserId, priority, originZoneZoneEnum, destinationZoneEnum) {
        // create the queueline
        // add the queueline to the queue
        var line = new MoveRowQueueline_1.default(clientMessageId, cardInstanceId, sourcePlayerUserId, priority, originZoneZoneEnum, destinationZoneEnum);
        this.queue.push(line);
    };
    // #endregion
    // #region Game Flow - Queue and Queulines
    GameServer.queueSorter = function (a, b) {
        var p = a.priority - b.priority;
        if (p !== 0) {
            return p;
        }
        else {
            if (a.sourcePlayerUserId === b.sourcePlayerUserId) {
                return 0;
            }
            else {
                // return random number
                return Math.random() < 0.5 ? -1 : 1;
            }
        }
    };
    GameServer.prototype.startTheQueue = function () {
        var _this = this;
        this.queueStarted = true;
        var attackingCardInstanceIds = [];
        // if it is the BattlePhase, start by moving all attacking creatures into the battlerow
        if (this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
            Phase_1.PhaseEnum.Battle) {
            // now we move all attacking cards in the battlerow
            this.queue.forEach(function (q) {
                if (q instanceof FightCreatureQueueline_1.default) {
                    attackingCardInstanceIds.push(q.sourceCardInstanceId);
                    var moveEffect = MoveCardEffect_1.default.createMoveCardEffect(Zone_1.ZoneEnum.FrontBoard, Zone_1.ZoneEnum.BattleBoard);
                    EffectSolver_1.default.doEffect(_this.gameState, q.sourceCardInstanceId, moveEffect, new Array());
                }
            });
        }
        // first we must sort the queue
        // Sort Queue such that high priority executes first, with ties going to the active player.
        this.queue.sort(GameServer.queueSorter);
        this.queue.reverse();
        // get info
        var pausingQueueline = this.queue.find(function (c) {
            return c.areTargetsStillRequired(_this);
        });
        var queuelinesThisMessage = !!pausingQueueline
            ? this.queue.indexOf(pausingQueueline) + 1
            : this.queue.length;
        this.gameState.players.forEach(function (player) {
            // send a queue started message to the clients
            var queueStartedMessage = new QueueStartedMessage_1.default(player.userId, _this.queue.length, queuelinesThisMessage, !!pausingQueueline, !!pausingQueueline ? pausingQueueline.sourcePlayerUserId : null, attackingCardInstanceIds, _this.gameState.blocks);
            _this.sendToPlayer(NetworkProtocol_1.NetworkProtocol.QueueStarted, queueStartedMessage, player.userId);
        });
        // run the queue on the server
        this.executeNextQueueline();
    };
    GameServer.prototype.executeNextQueueline = function () {
        if (this.currentQueueIndex >= this.queue.length) {
            this.endQueue();
            return;
        }
        var currentQueueline = this.queue[this.currentQueueIndex];
        if (!currentQueueline) {
            throw new Error('this.currentQueueIndex is out of bounds');
        }
        if (currentQueueline.areTargetsStillRequired(this)) {
            if (!currentQueueline.areTargetsStillAvailable(this) ||
                !currentQueueline.areAllSelectedTargetInfoItemsValid(this)) {
                // Targets are not available. We therefore send this to the effectsolver and the players so that the effect will fizzle in the effect solver.
                currentQueueline.sendEffectToDoEffect(this, this.currentQueueIndex);
            }
            else {
                currentQueueline.goOutForTargets(this, this.currentQueueIndex);
                return;
            }
        }
        else {
            currentQueueline.sendEffectToDoEffect(this, this.currentQueueIndex);
        }
        this.currentQueueIndex += 1;
        this.executeNextQueueline();
    };
    GameServer.prototype.endQueue = function () {
        var _this = this;
        if (this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
            Phase_1.PhaseEnum.Battle) {
            this.moveBackAttackingCards();
        }
        this.currentQueueIndex = 0;
        this.queue = [];
        this.queueStarted = false;
        this.gameState.players.forEach(function (player) {
            player.readyForQueue = false;
            // send a queue ended message to the clients
            var msg = new EndQueueExecutionMessage_1.default(player.userId);
            _this.sendToPlayer(NetworkProtocol_1.NetworkProtocol.EndExecuteQueue, msg, player.userId);
        });
        this.endPhase();
    };
    // #endregion
    // #region Game Flow - Phases
    GameServer.prototype.startPhase = function () {
        // increment the phase index
        this.gameState.currentPhaseIndex =
            (this.gameState.currentPhaseIndex + 1) % this.phaseList.length;
        this.currentQueueIndex = 0;
        this.queue = [];
        // run phase start effects
        if (this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
            Phase_1.PhaseEnum.Recruit) {
            // we put this instead of in the solver because the player is going to run the solver
            // but we'd rather just take what we tell them
            this.gameState.currentTurn += 1;
            // effect solver
            EffectSolver_1.default.onRecruitmentPhaseStarted(this.gameState);
        }
        if (this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
            Phase_1.PhaseEnum.Maneuver) {
            // effect solver
            EffectSolver_1.default.onManeuverPhaseStarted(this.gameState);
        }
        if (this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
            Phase_1.PhaseEnum.Skirmish) {
            // effect solver
            EffectSolver_1.default.onSkirmishPhaseStarted(this.gameState);
        }
        if (this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
            Phase_1.PhaseEnum.Battle) {
            // effect solver
            EffectSolver_1.default.onBattlePhaseStarted(this.gameState);
        }
        var _loop_2 = function (player) {
            var msg = new NextPhaseReadyMessage_1.default(player.userId, this_2.gameState.currentTurn, this_2.gameState.currentPhaseIndex, player, this_2.gameState.players.find(function (x) { return x !== player; }));
            this_2.sendToPlayer(NetworkProtocol_1.NetworkProtocol.NextPhaseReady, msg, player.userId);
        };
        var this_2 = this;
        for (var _i = 0, _a = this.gameState.players; _i < _a.length; _i++) {
            var player = _a[_i];
            _loop_2(player);
        }
    };
    GameServer.prototype.endPhase = function () {
        var _this = this;
        if (this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
            Phase_1.PhaseEnum.Recruit) {
            // draw cards
            this.gameState.players.forEach(function (player) {
                if (_this.gameState.currentTurn === 1) {
                    _this.drawCards(player, 5);
                }
                else {
                    _this.drawCards(player, 1);
                }
            });
            EffectSolver_1.default.onRecruitmentPhaseEnded(this.gameState);
        }
        if (this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
            Phase_1.PhaseEnum.Maneuver) {
            EffectSolver_1.default.onManeuverPhaseEnded(this.gameState);
        }
        if (this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
            Phase_1.PhaseEnum.Skirmish) {
            EffectSolver_1.default.onSkirmishPhaseEnded(this.gameState);
        }
        if (this.phaseList[this.gameState.currentPhaseIndex].phaseEnum ===
            Phase_1.PhaseEnum.Battle) {
            EffectSolver_1.default.onBattlePhaseEnded(this.gameState);
            for (var _i = 0, _a = this.gameState.players; _i < _a.length; _i++) {
                var player = _a[_i];
                for (var _b = 0, _c = player.stats; _b < _c.length; _b++) {
                    var stat = _c[_b];
                    stat.onEndBattlePhase();
                }
                for (var _d = 0, _e = player.zones; _d < _e.length; _d++) {
                    var zone = _e[_d];
                    for (var _f = 0, _g = zone.cards; _f < _g.length; _f++) {
                        var card = _g[_f];
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
    };
    GameServer.prototype.playerFinishRecruitmentPhase = function (player) {
        if (this.gameState.players.indexOf(player) === 0) {
            this.p0_readyToProgressPhase = true;
        }
        else if (this.gameState.players.indexOf(player) === 1) {
            this.p1_readyToProgressPhase = true;
        }
        else {
            throw new Error('Player is not in the game');
        }
        if (this.p0_readyToProgressPhase && this.p1_readyToProgressPhase) {
            this.p0_readyToProgressPhase = false;
            this.p1_readyToProgressPhase = false;
            this.endPhase();
        }
    };
    GameServer.prototype.moveBackAttackingCards = function () {
        var _this = this;
        var _loop_3 = function (q) {
            if (q instanceof FightCreatureQueueline_1.default) {
                var attackingPlayer_1 = this_3.gameState.players.find(function (c) { return c.userId === q.sourcePlayerUserId; });
                var attackingCard_1 = attackingPlayer_1.getCardFromInstanceId(q.sourceCardInstanceId);
                var moveEffect = MoveCardEffect_1.default.createMoveCardEffect(Zone_1.ZoneEnum.BattleBoard, Zone_1.ZoneEnum.FrontBoard);
                EffectSolver_1.default.doEffect(this_3.gameState, attackingCard_1.instanceId, moveEffect, new Array());
                // send to players
                this_3.gameState.players.forEach(function (player) {
                    var cardMovedMsg = new ServerMovedCardMessage_1.default(player.userId, attackingPlayer_1.userId, attackingCard_1, Zone_1.ZoneEnum.BattleBoard, Zone_1.ZoneEnum.FrontBoard);
                    _this.sendToPlayer(NetworkProtocol_1.NetworkProtocol.CardMoved, cardMovedMsg, player.userId);
                });
            }
        };
        var this_3 = this;
        // move all attacking cards back
        for (var _i = 0, _a = this.queue; _i < _a.length; _i++) {
            var q = _a[_i];
            _loop_3(q);
        }
    };
    // #endregion
    // #region Draw Cards
    GameServer.prototype.drawCards = function (player, numberOfCards) {
        var _this = this;
        var deck = player.getFriendlyZoneFromZoneEnum(Zone_1.ZoneEnum.Deck);
        var hand = player.getFriendlyZoneFromZoneEnum(Zone_1.ZoneEnum.Hand);
        if (numberOfCards > deck.cards.length) {
            numberOfCards = deck.cards.length;
        }
        if (hand.getLibraryZone().hasMaxCards) {
            numberOfCards = Math.min(numberOfCards, hand.getLibraryZone().maxCards - hand.cards.length);
        }
        var exploredLandTiles = player.realm.landTiles.filter(function (x) { return x.explored; });
        var cardsInstanceIdsFromExploredBiomes = [];
        var _loop_4 = function (biome) {
            var biomeIsExplored = exploredLandTiles.filter(function (tile) { return biome.landTileIds.includes(tile.id); })
                .length > 0;
            if (biomeIsExplored) {
                cardsInstanceIdsFromExploredBiomes.push.apply(cardsInstanceIdsFromExploredBiomes, biome.cardInstanceIds);
            }
        };
        // get all cards in the biomes - this will include cads in play, in graveyard, etc - we will filter those out later
        for (var _i = 0, _a = player.realm.biomes; _i < _a.length; _i++) {
            var biome = _a[_i];
            _loop_4(biome);
        }
        // get distinct instance ids - there might be cards across biomes? unclear
        var distinctCardsInstanceIdsFromExploredBiomes = Array.from(new Set(cardsInstanceIdsFromExploredBiomes));
        // if distinct is not the same, I want to know - I think they should alwyas be the same, as currently
        // we consider parent biomes to be separate and cards live in them separately, though they may have landtiles
        // that are overlapping - but they shouldn't have overlapping cards
        if (distinctCardsInstanceIdsFromExploredBiomes.length !==
            cardsInstanceIdsFromExploredBiomes.length) {
            console.log('ERROR: Cards are overlapping - this should not happen');
        }
        // filter by still in the deck
        var drawableCardInstanceIDsInDeck = distinctCardsInstanceIdsFromExploredBiomes.filter(function (x) {
            return deck.cards.map(function (c) { return c.instanceId; }).includes(x);
        });
        // get the number of cards and move them to the hand
        var cardInstanceIdsToDraw = drawableCardInstanceIDsInDeck.slice(0, numberOfCards);
        var cardsToDraw = cardInstanceIdsToDraw.map(function (x) {
            return _this.gameState.getCardFromAnywhere(x);
        });
        if (cardsToDraw.length === 0) {
            console.log('GameServer.drawCards: NO CARDS TO DRAW');
            return;
        }
        for (var _b = 0, cardsToDraw_1 = cardsToDraw; _b < cardsToDraw_1.length; _b++) {
            var card = cardsToDraw_1[_b];
            var moveEffect = MoveCardEffect_1.default.createMoveCardEffect(Zone_1.ZoneEnum.Deck, Zone_1.ZoneEnum.Hand);
            EffectSolver_1.default.doEffect(this.gameState, card.instanceId, moveEffect, []);
        }
        // send to players
        this.gameState.players.forEach(function (p) {
            if (p.userId === player.userId) {
                var msg = new PlayerDrewCardsMessage_1.default(p.userId, cardsToDraw);
                _this.sendToPlayer(NetworkProtocol_1.NetworkProtocol.PlayerDrewCards, msg, p.userId);
            }
            else {
                var msg = new OpponentDrewCardsMessage_1.default(p.userId, cardsToDraw.length);
                _this.sendToPlayer(NetworkProtocol_1.NetworkProtocol.OpponentDrewCards, msg, p.userId);
            }
        });
    };
    // #endregion
    // #region Card Blocking
    GameServer.prototype.cardBlocking = function (blockingCard, blockedCard, blockOrder) {
        this.gameState.cardBlocking(blockingCard.instanceId, blockedCard.instanceId, blockOrder);
    };
    GameServer.prototype.reorderBlockingCard = function (blockingCard, originalBlockOrder) {
        this.gameState.reorderBlockingCard(blockingCard.instanceId, originalBlockOrder);
    };
    GameServer.prototype.stopCardBlocking = function (blockingCardInstance) {
        this.gameState.stopCardBlocking(blockingCardInstance);
    };
    return GameServer;
}());
exports.default = GameServer;
