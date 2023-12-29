"use strict";
// #region imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameState_1 = __importDefault(require("../Game/GameState"));
var ServerRequestsTargetsPlayerQueueline_1 = __importDefault(require("../Queueline/PlayerQueueline/PlayerQueuelines/ServerRequestsTargetsPlayerQueueline"));
var EffectSolver_1 = __importDefault(require("../Game/EffectSolver"));
var StartGameMessage_1 = __importDefault(require("../Networking/GameLoop/Game/StartGameMessage"));
var ServerMovedCardMessage_1 = __importDefault(require("../Networking/Cards/Move/ServerMovedCardMessage"));
var ServerCardMovedRowMessage_1 = __importDefault(require("../Networking/Cards/MovedRow/ServerCardMovedRowMessage"));
var NextPhaseReadyMessage_1 = __importDefault(require("../Networking/GameLoop/PhaseAndQueue/NextPhaseReadyMessage"));
var QueueStartedMessage_1 = __importDefault(require("../Networking/GameLoop/PhaseAndQueue/QueueStartedMessage"));
var NetworkProtocol_1 = require("../../Enums/NetworkProtocol");
var MessageBase_1 = require("../Networking/MessageBase");
var ServerSendingGamestateForRejoinMessage_1 = __importDefault(require("../Networking/Connection/ServerSendingGamestateForRejoinMessage"));
var RejoinedGameMessage_1 = __importDefault(require("../Networking/Connection/RejoinedGameMessage"));
var CardPlayedMessage_1 = __importDefault(require("../Networking/Cards/Play/CardPlayedMessage"));
var CreatureAttackedMessage_1 = __importDefault(require("../Networking/Attacking/CreatureAttackedMessage"));
var AbilityActivatedMessage_1 = __importDefault(require("../Networking/Abilities/AbilityActivatedMessage"));
var GetTargetsFromPlayerMessage_1 = __importDefault(require("../Networking/Abilities/GetTargetsFromPlayerMessage"));
var MoveCardEffect_1 = __importDefault(require("../Effect/RuntimeEffects/MoveEffects/MoveCardEffect"));
var RuntimeCard_1 = __importDefault(require("../Card/RuntimeCard"));
var Zone_1 = require("../../Enums/Zone");
var PlayCardPlayerQueueline_1 = __importDefault(require("../Queueline/PlayerQueueline/PlayerQueuelines/PlayCardPlayerQueueline"));
var ActivateAbilityPlayerQueueline_1 = __importDefault(require("../Queueline/PlayerQueueline/PlayerQueuelines/ActivateAbilityPlayerQueueline"));
var UpgradeCardEffect_1 = __importDefault(require("../Effect/RuntimeEffects/UpgradeEffects/UpgradeCardEffect"));
var MoveRowPlayerQueueline_1 = __importDefault(require("../Queueline/PlayerQueueline/PlayerQueuelines/MoveRowPlayerQueueline"));
var QueuePlayCardMessage_1 = __importDefault(require("../Networking/Cards/Play/QueuePlayCardMessage"));
var QueueActivateAbilityMessage_1 = __importDefault(require("../Networking/Abilities/QueueActivateAbilityMessage"));
var ReturnTargetsToServerMessage_1 = __importDefault(require("../Networking/Abilities/ReturnTargetsToServerMessage"));
var PlayerExporedLandMessage_1 = __importDefault(require("../Networking/Land/PlayerExporedLandMessage"));
var LandExporedMessage_1 = __importDefault(require("../Networking/Land/LandExporedMessage"));
var PlayerReadyForQueueMessage_1 = __importDefault(require("../Networking/GameLoop/PhaseAndQueue/PlayerReadyForQueueMessage"));
var CancelActionMessage_1 = __importDefault(require("../Networking/QueueManagement/CancelActionMessage"));
var QueueFightCreatureMessage_1 = __importDefault(require("../Networking/Attacking/QueueFightCreatureMessage"));
var FightCreaturePlayerQueueline_1 = __importDefault(require("../Queueline/PlayerQueueline/PlayerQueuelines/FightCreaturePlayerQueueline"));
var AttackEffect_1 = __importDefault(require("../Effect/RuntimeEffects/AttackEffects/AttackEffect"));
var CardIsBlockingMessage_1 = __importDefault(require("../Networking/Blocking/CardIsBlockingMessage"));
var StopCardBlockingMessage_1 = __importDefault(require("../Networking/Blocking/StopCardBlockingMessage"));
var ReorderBlockingCardMessage_1 = __importDefault(require("../Networking/Blocking/ReorderBlockingCardMessage"));
// #endregion
var Player = /** @class */ (function () {
    // #endregion
    function Player(_sendToServer) {
        var _this = this;
        // Queue
        // an event queue for events that the server sends
        this.queue = [];
        // a store of the messages sent to the server, so that we can cancel them
        this.queueMessages = [];
        this.requestLine = null;
        // the player has made their moves and is ready to recieve messages from the server
        // this is important to track because there's a change we get queue messages from the server
        // at the start of the phase, if the player has clicked through quickly
        // in that case, we will ignore them
        this.readyForQueue = false;
        // we have received all the queue messages that the server is planning to send this batch
        // and can start processing them
        this.queueReadyToRun = false;
        this.currentQueueIndex = 0; // where we are in the queue
        this.numQueuelinesInBatch = null; // the number of actions that we are expecting from the server in this batch - asking for targets doesn't count
        this.numQueuelinesTotal = null; // the number of actions that we are expecting total - asking for targets doesn't count
        this.numQueuelinesAlreadyProcessed = 0;
        this.breakingBeforeEndOfQueue = false; // whether we will break before the end of the queue
        this.amBreakingPlayer = false; // am I the breaking player
        this._sendToServer = _sendToServer;
        this.sendToServer = function (protocol, message) {
            var messageString = NetworkProtocol_1.NetworkProtocol[protocol];
            _this._sendToServer(messageString, message);
        };
    }
    // #region clone
    Player.prototype.clone = function () {
        var clone = new Player(this._sendToServer);
        clone.userId = this.userId;
        clone.gameState = this.gameState ? this.gameState.clone() : null;
        clone.queue = this.queue
            ? this.queue.map(function (queueline) { return queueline.clone(); })
            : [];
        clone.queueMessages = this.queueMessages
            ? this.queueMessages.map(function (message) { return message.clone(); })
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
            ? this.returningTargetTypes.map(function (target) { return target.clone(); })
            : [];
        return clone;
    };
    // #endregion
    // #region Utility Methods
    Player.prototype.getPlayerInfo = function () {
        try {
            return this.gameState.getPlayerInfoByUserId(this.userId);
        }
        catch (error) {
            console.log('Error getting player info: ', error);
            return null;
        }
    };
    Player.prototype.getOpponentInfo = function () {
        var _this = this;
        try {
            return this.gameState.players.find(function (player) { return player.userId !== _this.userId; });
        }
        catch (error) {
            console.log('Error getting opponent info: ', error);
            return null;
        }
    };
    // #endregion
    // #region Start and End Game
    Player.prototype.onStartGame = function (msg) {
        var message = StartGameMessage_1.default.fromJSON(msg);
        if (!message || !message.validate()) {
            console.log('Invalid StartGameMessage: ', message);
            return;
        }
        this.userId = message.player.userId;
        this.gameState = new GameState_1.default(message.gameManager, [message.player, message.opponent], 1, 0, message.rngSeed, []);
    };
    Player.prototype.onEndGame = function (msg) {
        console.log('onEndGame');
    };
    // #endregion
    // #region Connecting and Reconnecting
    Player.prototype.onGamestateForRejoin = function (msg) {
        var message = ServerSendingGamestateForRejoinMessage_1.default.fromJSON(msg);
        if (!message || !message.validate()) {
            console.log('Invalid ServerSendingGamestateForRejoin message: ', message);
            return;
        }
        this.userId = message.player.userId;
        this.gameState = new GameState_1.default(message.gameManager, [message.player, message.opponent], message.turn, message.phaseIndex, message.rngSeed, []);
    };
    Player.prototype.fetchUpdatedGamestate = function () {
        var message = new RejoinedGameMessage_1.default(MessageBase_1.ClientMessage.generateUniqueId());
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.RejoinedGame, message);
    };
    // #endregion
    // #region Turn and Phase
    Player.prototype.onStartPhase = function (msg) {
        var message = NextPhaseReadyMessage_1.default.fromJSON(msg);
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
        EffectSolver_1.default.updateStatBuffs(this.gameState);
        // phase specific stuff
        // technically this should have already been done on the server and then incorporated
        // into the gamestate we just received
        // we may want to animate some of this later on
    };
    // #endregion
    // #region Queue
    Player.prototype.receivedQueueStartedMessage = function (msg) {
        var message = QueueStartedMessage_1.default.fromJSON(msg);
        if (!message || !message.validate()) {
            throw new Error('Invalid QueueStartedMessage: ' + JSON.stringify(message));
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
        for (var _i = 0, _a = message.attackingCardInstanceIds; _i < _a.length; _i++) {
            var attackingCardInstanceId = _a[_i];
            var moveEffect = MoveCardEffect_1.default.createMoveCardEffect(Zone_1.ZoneEnum.FrontBoard, Zone_1.ZoneEnum.BattleBoard);
            EffectSolver_1.default.doEffect(this.gameState, attackingCardInstanceId, moveEffect, []);
        }
        // getting this vs getting the queuelines might happen out of order
        // this also handlers the case where nothing is in the queue
        if (this.queue.length === this.numQueuelinesInBatch) {
            this.startQueue();
        }
    };
    Player.prototype.startQueue = function () {
        // sort queue
        this.queue.sort(function (a, b) {
            return a.queuePosition - b.queuePosition;
        });
        this.queueReadyToRun = true;
    };
    Player.prototype.returnPlayersFromQueue = function () {
        var newPlayers = [];
        newPlayers.push(this.clone());
        for (var i = 0; i < this.queue.length; i++) {
            var newPlayer = newPlayers[i].clone();
            newPlayer.runNextQueueline();
            newPlayers.push(newPlayer);
        }
        return newPlayers;
    };
    Player.prototype.runNextQueueline = function () {
        if (!this.queueReadyToRun) {
            throw new Error('Queue not ready to run');
        }
        if (this.currentQueueIndex === this.queue.length) {
            throw new Error('Queue already finished');
        }
        var queueline = this.queue[this.currentQueueIndex];
        queueline.sendEffectToPlayer(this.gameState, this);
        this.currentQueueIndex++;
        this.numQueuelinesAlreadyProcessed++;
    };
    Player.prototype.finishedActions = function () {
        this.readyForQueue = true;
        var message = new PlayerReadyForQueueMessage_1.default(MessageBase_1.ClientMessage.generateUniqueId(), this.userId);
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.PlayerReadyForQueue, message.toJSON());
    };
    // #endregion
    // #region Playing Cards
    Player.prototype.queuePlayCard = function (cardInstanceId, boardZoneEnum, selectedCosts, battlecryIndex, targetInfoList) {
        var card = this.gameState.getCardFromAnywhere(cardInstanceId);
        if (!card) {
            throw new Error('Card not found');
        }
        var libraryCard = this.gameState.gameManager.cardLibrary.find(function (card) {
            return card.libraryId === card.libraryId;
        });
        if (!libraryCard) {
            throw new Error('Library card not found');
        }
        // pay costs
        var libraryCosts = libraryCard.costs;
        var playerInfo = this.gameState.getPlayerInfoByUserId(this.userId);
        if (!playerInfo) {
            throw new Error('Player not found');
        }
        if (!playerInfo.canPayResourceCosts(libraryCosts)) {
            throw new Error('Player cannot pay resource costs');
        }
        // update the costs
        var paidCosts = playerInfo.payResourceCosts(libraryCosts, selectedCosts);
        var message = new QueuePlayCardMessage_1.default(QueuePlayCardMessage_1.default.generateUniqueId(), this.userId, cardInstanceId, boardZoneEnum, paidCosts, targetInfoList);
        this.queueMessages.push(message);
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.QueuePlayCard, message.toJSON());
    };
    Player.prototype.cancelPlayCard = function (cardInstanceId) {
        var playCardMessages = this.queueMessages.filter(function (message) {
            return message.messageEnum === NetworkProtocol_1.NetworkProtocol.QueuePlayCard;
        });
        var playCardMessage = playCardMessages.find(function (message) {
            return message.cardInstanceId === cardInstanceId;
        });
        if (!playCardMessage) {
            throw new Error('Play card message not found');
        }
        // get the mana back
        var playerInfo = this.getPlayerInfo();
        playCardMessage.paidCosts.forEach(function (cost) {
            playerInfo.idToStat.get(cost.statId).baseValue += cost.value;
        });
        var message = new CancelActionMessage_1.default(QueuePlayCardMessage_1.default.generateUniqueId(), this.userId, playCardMessage.messageId);
        // cancel from the queue
        this.queueMessages = this.queueMessages.filter(function (message) {
            return message.messageId !== playCardMessage.messageId;
        });
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.CancelAction, message.toJSON());
    };
    Player.prototype.receivedPlayCardMessage = function (msg) {
        if (!this.readyForQueue) {
            throw new Error('Not ready for queue');
        }
        var message = CardPlayedMessage_1.default.fromJSON(msg);
        if (!message || !message.validate()) {
            console.log('Invalid CardPlayedMessage');
            return;
        }
        if (!message.card) {
            throw new Error('Card not found');
        }
        var sourceCard = this.gameState.getCardFromAnywhere(msg.card.instanceId);
        if (!sourceCard) {
            // if we couldn't find the card, it must be a card that we don't know about yet
            // let's first confirm that it didn't come from a place that we should have known about it
            var originZone = this.gameState.getZoneByZoneEnumAndUserId(msg.originZoneZoneEnum, msg.sourcePlayerUserId);
            var isPlayerZone = originZone.ownerPlayerUserId === this.userId;
            if (isPlayerZone) {
                if (originZone.getLibraryZone().ownerVisibility ===
                    Zone_1.ZoneOwnerVisibility.Visible) {
                    throw new Error('We should have known about this card. it was our card. msg.card.instanceId: ' +
                        msg.card.instanceId);
                }
            }
            else if (originZone.getLibraryZone().opponentVisibility ===
                Zone_1.ZoneOpponentVisibility.Visible) {
                throw new Error('We should have known about this card,' +
                    'though it was the opponent card, it was coming from: ' +
                    Zone_1.ZoneEnum[msg.originZoneZoneEnum]);
            }
            // all good - we didn't know about this card, let's create it
            sourceCard = RuntimeCard_1.default.fromRuntimeJSON(msg.card);
            originZone.addCard(sourceCard);
            // we don't need to remove it from anywhere because it wasn't anywhere
        }
        var destinationZone = this.gameState.getZoneByZoneEnumAndUserId(msg.destinationZoneZoneEnum, msg.sourcePlayerUserId);
        if (!destinationZone) {
            throw new Error('Destination zone not found');
        }
        if (sourceCard.ownerPlayerUserId !== this.userId) {
            var opponent = this.gameState.getPlayerInfoByUserId(sourceCard.ownerPlayerUserId);
            if (!opponent) {
                throw new Error('Opponent not found');
            }
            opponent.payResourceCosts(message.paidCosts);
        }
        var queueline = new PlayCardPlayerQueueline_1.default(this.userId, sourceCard.instanceId, message.sourcePlayerUserId, message.queuePosition, message.paidCosts, message.targetInfoList, message.originZoneZoneEnum, message.destinationZoneZoneEnum);
        this.queue.push(queueline);
        if (this.queue.length === this.numQueuelinesInBatch) {
            this.startQueue();
        }
    };
    Player.prototype.onCardPlayed = function (sourcePlayerUserId, sourceCardInstanceId, targetInfoList, originZoneZoneEnum, destinationZoneZoneEnum) {
        var sourcePlayer = this.gameState.getPlayerInfoByUserId(sourcePlayerUserId);
        if (!sourcePlayer) {
            throw new Error('Source player not found');
        }
        // this will already have been added to the origin zone during receivedPlayCardMessageFromServer
        // if it didn't already exist
        var sourceCard = this.gameState.getCardFromAnywhere(sourceCardInstanceId);
        if (!sourceCard) {
            throw new Error('Source card not found');
        }
        // first we move the card
        var moveEffect = MoveCardEffect_1.default.createMoveCardEffect(originZoneZoneEnum, destinationZoneZoneEnum);
        EffectSolver_1.default.doEffect(this.gameState, sourceCardInstanceId, moveEffect, targetInfoList);
    };
    // #endregion
    // #region Drawing Cards
    Player.prototype.onPlayerDrewCards = function (msg) {
        // TODO: Implement method
    };
    Player.prototype.onOpponentDrewCards = function (msg) {
        // TODO: Implement method
    };
    // #endregion
    // #region Card Moved
    // for when the server moves the card - just move it, don't queue it
    Player.prototype.onCardMoved = function (msg) {
        var message = ServerMovedCardMessage_1.default.fromJSON(msg);
        if (!message || !message.validate()) {
            console.log('Invalid ServerMovedCardMessage');
            return;
        }
        var moveEffect = MoveCardEffect_1.default.createMoveCardEffect(msg.originZoneZoneEnum, msg.destinationZoneZoneEnum);
        if (!msg.card) {
            throw new Error('Card not found');
        }
        var sourceCard = this.gameState.getCardFromAnywhere(msg.card.instanceId);
        if (!sourceCard) {
            // if we couldn't find the card, it must be a card that we don't know about yet
            // let's first confirm that it didn't come from a place that we should have known about it
            var originZone = this.gameState.getZoneByInstanceId(msg.originZoneZoneEnum);
            var isPlayerZone = originZone.ownerPlayerUserId === this.userId;
            if (isPlayerZone) {
                if (originZone.getLibraryZone().ownerVisibility ===
                    Zone_1.ZoneOwnerVisibility.Visible) {
                    throw new Error('We should have known about this card');
                }
            }
            else if (originZone.getLibraryZone().opponentVisibility ===
                Zone_1.ZoneOpponentVisibility.Visible) {
                throw new Error('We should have known about this card');
            }
            // all good - we didn't know about this card, let's create it
            sourceCard = RuntimeCard_1.default.fromRuntimeJSON(msg.card);
            originZone.addCard(sourceCard);
            // we don't need to remove it from anywhere because it wasn't anywhere
        }
        EffectSolver_1.default.doEffect(this.gameState, sourceCard.instanceId, moveEffect, []);
    };
    // for when the player moves a card between rows - queue it
    Player.prototype.receivedCardMovedRowMessage = function (msg) {
        if (!this.readyForQueue) {
            throw new Error('Not ready for queue');
        }
        var message = ServerCardMovedRowMessage_1.default.fromJSON(msg);
        if (!message || !message.validate()) {
            console.log('Invalid ServerCardMovedRowMessage');
            return;
        }
        var queueline = new MoveRowPlayerQueueline_1.default(this.userId, message.movedCardInstanceId, message.ownerPlayerUserId, message.queuePosition, message.originZoneEnum, message.destinationZoneEnum);
        this.queue.push(queueline);
    };
    Player.prototype.onCardMovedRow = function (movedCardInstanceId, originZoneEnum, destinationZoneEnum) {
        var movedCard = this.gameState.getCardFromAnywhere(movedCardInstanceId);
        if (!movedCard) {
            throw new Error('Moved card not found');
        }
        var moveEffect = MoveCardEffect_1.default.createMoveCardEffect(originZoneEnum, destinationZoneEnum);
        EffectSolver_1.default.doEffect(this.gameState, movedCardInstanceId, moveEffect, []);
    };
    // #endregion
    // #region Upgrading Cards
    Player.prototype.onCardUpgraded = function (upgradingCardInstanceId, targetInfoList, upgradeLevel) {
        var upgradingCard = this.gameState.getCardFromAnywhere(upgradingCardInstanceId);
        if (!upgradingCard) {
            throw new Error('Upgrading card not found');
        }
        var libraryCard = this.gameState.gameManager.cardLibrary.find(function (card) {
            return card.libraryId === upgradingCard.libraryId;
        });
        if (!libraryCard) {
            throw new Error('Library card not found');
        }
        var upgrade = libraryCard.cardUpgrades[upgradeLevel];
        if (!upgrade) {
            throw new Error('Upgrade not found');
        }
        var upgradeEffect = UpgradeCardEffect_1.default.createUpgradeCardEffect(upgradeLevel);
        EffectSolver_1.default.doEffect(this.gameState, upgradingCardInstanceId, upgradeEffect, targetInfoList);
        // now do activated ability, if it has one
        var activatedEffect = upgrade.activatedAbility.effect;
        if (activatedEffect) {
            EffectSolver_1.default.doEffect(this.gameState, upgradingCardInstanceId, activatedEffect, targetInfoList);
        }
    };
    Player.prototype.queueUpgradeCard = function (currentCardInstanceId, currentTrackingIndex, currentEffect, upgradeLevel, useEffect) {
        // add to queued messages
        // send to server
    };
    Player.prototype.receivedUpgradeCardMessageFromServer = function (msg) {
        if (!this.readyForQueue) {
            throw new Error('Not ready for queue');
        }
    };
    // #endregion
    // #region Combat and Attacking
    Player.prototype.queueAttack = function (attackingCardInstanceId, attackedCardInstanceId) {
        var attackingCard = this.gameState.getCardFromAnywhere(attackingCardInstanceId);
        if (!attackingCard) {
            throw new Error('Attacking card not found');
        }
        var attackedCard = this.gameState.getCardFromAnywhere(attackedCardInstanceId);
        if (!attackedCard) {
            throw new Error('Attacked card not found');
        }
        var message = new QueueFightCreatureMessage_1.default(QueueFightCreatureMessage_1.default.generateUniqueId(), this.userId, attackingCardInstanceId, attackedCardInstanceId);
        this.queueMessages.push(message);
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.QueueFightCreature, message.toJSON());
    };
    Player.prototype.cancelAttack = function (attackingCardInstanceId) {
        var attackMessages = this.queueMessages.filter(function (message) {
            return message.messageEnum === NetworkProtocol_1.NetworkProtocol.QueueFightCreature;
        });
        var attackMessage = attackMessages.find(function (message) {
            return message.attackingCardInstanceId === attackingCardInstanceId;
        });
        if (!attackMessage) {
            throw new Error('Attack message not found');
        }
        var message = new CancelActionMessage_1.default(MessageBase_1.ClientMessage.generateUniqueId(), this.userId, attackMessage.messageId);
        // cancel from the queue
        this.queueMessages = this.queueMessages.filter(function (message) {
            return message.messageId !== attackMessage.messageId;
        });
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.CancelAction, message.toJSON());
    };
    Player.prototype.receivedAttackMessage = function (msg) {
        if (!this.readyForQueue) {
            throw new Error('Not ready for queue');
        }
        var message = CreatureAttackedMessage_1.default.fromJSON(msg);
        if (!message || !message.validate()) {
            console.log('Invalid CreatureAttackedMessage');
            return;
        }
        var queueline = new FightCreaturePlayerQueueline_1.default(this.userId, message.attackingCardInstanceId, message.attackedCardInstanceId, message.attackingPlayerUserId, message.queuePosition);
        this.queue.push(queueline);
        if (this.queue.length === this.numQueuelinesInBatch) {
            this.startQueue();
        }
    };
    Player.prototype.onCreatureAttacked = function (attackingCardInstanceId, attackedCardInstanceId) {
        var fightEffect = AttackEffect_1.default.createFightEffect();
        var tempTargetInfo = AttackEffect_1.default.createFightTargetInfoList(attackedCardInstanceId);
        EffectSolver_1.default.doEffect(this.gameState, attackingCardInstanceId, fightEffect, tempTargetInfo);
    };
    // #endregion
    // #region Blocking
    Player.prototype.queueBlock = function (blockingCardInstanceId, blockedCardInstanceId) {
        var blockingCard = this.gameState.getCardFromAnywhere(blockingCardInstanceId);
        if (!blockingCard) {
            throw new Error('Blocking card not found');
        }
        var blockedCard = this.gameState.getCardFromAnywhere(blockedCardInstanceId);
        if (!blockedCard) {
            throw new Error('Blocked card not found');
        }
        var blocksOnSameCard = this.gameState.blocks.filter(function (block) { return block.blockedCardInstanceId === blockedCardInstanceId; });
        var blockOrder = blocksOnSameCard.length;
        this.gameState.cardBlocking(blockingCardInstanceId, blockedCardInstanceId, blockOrder);
        var message = new CardIsBlockingMessage_1.default(MessageBase_1.ClientMessage.generateUniqueId(), this.userId, blockingCardInstanceId, blockedCardInstanceId, blockOrder);
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.CardIsBlocking, message.toJSON());
    };
    Player.prototype.cancelBlock = function (blockingCardInstanceId) {
        var blockingCard = this.gameState.getCardFromAnywhere(blockingCardInstanceId);
        if (!blockingCard) {
            throw new Error('Blocking card not found');
        }
        this.gameState.stopCardBlocking(blockingCardInstanceId);
        var message = new StopCardBlockingMessage_1.default(MessageBase_1.ClientMessage.generateUniqueId(), this.userId, blockingCardInstanceId);
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.StopCardBlocking, message.toJSON());
    };
    Player.prototype.changeBlockOrder = function (blockingCardInstanceId, newBlockOrder) {
        var blockingCard = this.gameState.getCardFromAnywhere(blockingCardInstanceId);
        if (!blockingCard) {
            throw new Error('Blocking card not found');
        }
        this.gameState.reorderBlockingCard(blockingCardInstanceId, newBlockOrder);
        var message = new ReorderBlockingCardMessage_1.default(MessageBase_1.ClientMessage.generateUniqueId(), this.userId, blockingCardInstanceId, newBlockOrder);
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.ReorderBlockingCard, message.toJSON());
    };
    // #endregion
    // #region Abilities
    Player.prototype.queueActivateAbility = function (sourceEntityInstanceId, abilityIndex, paidCosts, targetInfoList) {
        var sourceEntity = this.gameState.getEntityFromAnywhere(sourceEntityInstanceId);
        if (!sourceEntity) {
            throw new Error('Entity not found');
        }
        var ability = sourceEntity.abilities[abilityIndex];
        if (!ability) {
            throw new Error('Ability not found');
        }
        if (!ability.effect.areTargetsAvailable(this.gameState, sourceEntity)) {
            throw new Error('No targets available');
        }
        if (!ability.effect.isAllTargetInfoValid(sourceEntity, this.gameState, targetInfoList)) {
            throw new Error('Invalid target info');
        }
        var costs = ability.costs;
        var playerInfo = this.gameState.getPlayerInfoByUserId(this.userId);
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
        var message = new QueueActivateAbilityMessage_1.default(MessageBase_1.ClientMessage.generateUniqueId(), this.userId, sourceEntityInstanceId, abilityIndex, paidCosts, targetInfoList);
        this.queueMessages.push(message);
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.QueueActivateAbility, message.toJSON());
    };
    Player.prototype.receivedActivateAbilityMessageFromServer = function (msg) {
        if (!this.readyForQueue) {
            throw new Error('Not ready for queue');
        }
        var message = AbilityActivatedMessage_1.default.fromJSON(msg);
        if (!message || !message.validate()) {
            console.log('Invalid AbilityActivatedMessage');
            return;
        }
        if (message.playerUsingAbilityUserId !== this.userId) {
            var opponent = this.gameState.getPlayerInfoByUserId(message.playerUsingAbilityUserId);
            if (!opponent) {
                throw new Error('Opponent not found');
            }
            opponent.payResourceCosts(message.paidCosts);
        }
        var queueline = new ActivateAbilityPlayerQueueline_1.default(this.userId, message.entityUsingAbilityInstanceId, message.playerUsingAbilityUserId, message.queuePosition, message.paidCosts, message.targetInfoList, message.abilityIndex);
        this.queue.push(queueline);
        if (this.queue.length === this.numQueuelinesInBatch) {
            this.startQueue();
        }
    };
    Player.prototype.onActivateAbility = function (sourceEntityInstanceId, targetInfoList, abilityIndex) {
        var entity = this.gameState.getEntityFromAnywhere(sourceEntityInstanceId);
        if (!entity) {
            throw new Error('Entity not found');
        }
        var ability = entity.abilities[abilityIndex];
        if (!ability) {
            throw new Error('Ability not found');
        }
        var effect = ability.effect;
        if (!effect) {
            throw new Error('Effect not found');
        }
        EffectSolver_1.default.doEffect(this.gameState, sourceEntityInstanceId, effect, targetInfoList);
    };
    // #endregion
    // #region Returning Targets
    Player.prototype.receivedTargetsRequestedMessage = function (msg) {
        if (!this.readyForQueue) {
            throw new Error('Not ready for queue');
        }
        var message = GetTargetsFromPlayerMessage_1.default.fromJSON(msg);
        if (!message || !message.validate()) {
            console.log('Invalid GetTargetsFromPlayerMessage');
            return;
        }
        var queueline = new ServerRequestsTargetsPlayerQueueline_1.default(this.userId, message.cardInstanceId, message.recipientUserId, message.queueOrder, message.effect, message.targetInfoCode);
        this.queue.push(queueline);
        if (this.queue.length === this.numQueuelinesInBatch) {
            this.startQueue();
        }
    };
    Player.prototype.onServerRequestsTargets = function (effect, cardInstanceId, targetCriterias, targetInfoCode) {
        this.targetInfoCode = targetInfoCode;
        this.returningCardInstanceId = cardInstanceId;
        this.returningEffect = effect;
        this.returningTargetTypes = targetCriterias;
    };
    Player.prototype.returnTargetsToServer = function (targetInfo) {
        var message = new ReturnTargetsToServerMessage_1.default(MessageBase_1.ClientMessage.generateUniqueId(), this.userId, targetInfo, this.targetInfoCode);
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.ReturnTargetsToServer, message.toJSON());
        // clear target tracking
        this.targetInfoCode = null;
        this.returningCardInstanceId = null;
        this.returningEffect = null;
        this.returningTargetTypes = null;
    };
    // #endregion
    // #region Land and Mana
    Player.prototype.exploreLand = function (landTile) {
        var message = new PlayerExporedLandMessage_1.default(MessageBase_1.ClientMessage.generateUniqueId(), this.userId, true, landTile.id);
        this.sendToServer(NetworkProtocol_1.NetworkProtocol.PlayerExploredLand, message.toJSON());
    };
    Player.prototype.onLandExplored = function (msg) {
        var message = LandExporedMessage_1.default.fromJSON(msg);
        if (!message || !message.validate()) {
            console.log('Invalid LandExploredMessage');
            return;
        }
        var player = this.gameState.getPlayerInfoByUserId(message.playerUserId);
        var landtile = player.realm.getLandTile(message.landTileId);
        if (!landtile) {
            throw new Error('Landtile not found');
        }
        landtile.explore(message.explored);
    };
    return Player;
}());
exports.default = Player;
