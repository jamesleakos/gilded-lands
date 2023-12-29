"use strict";
// #region imports
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServerHandler_1 = __importDefault(require("../ServerHandler"));
var NetworkProtocol_1 = require("../../../Enums/NetworkProtocol");
var QueueActivateAbilityMessage_1 = __importDefault(require("../../Networking/Abilities/QueueActivateAbilityMessage"));
var Zone_1 = require("../../../Enums/Zone");
var Target_1 = require("../../../Enums/Target");
var QueueUpgradeCardMessage_1 = __importDefault(require("../../Networking/Upgrades/QueueUpgradeCardMessage"));
var GameProperties_1 = __importDefault(require("../../Game/GameProperties"));
var ReturnTargetsToServerMessage_1 = __importDefault(require("../../Networking/Abilities/ReturnTargetsToServerMessage"));
var TargetsCostsQueueline_1 = __importDefault(require("../../Queueline/ServerQueueline/ServerQueuelines/TargetsCostsQueueline/TargetsCostsQueueline"));
var CardIsBlockingMessage_1 = __importDefault(require("../../Networking/Blocking/CardIsBlockingMessage"));
var Phase_1 = require("../../../Enums/Phase");
var ReorderBlockingCardMessage_1 = __importDefault(require("../../Networking/Blocking/ReorderBlockingCardMessage"));
var StopCardBlockingMessage_1 = __importDefault(require("../../Networking/Blocking/StopCardBlockingMessage"));
var QueueCardMovedRowMessage_1 = __importDefault(require("../../Networking/Cards/MovedRow/QueueCardMovedRowMessage"));
var QueueFightCreatureMessage_1 = __importDefault(require("../../Networking/Attacking/QueueFightCreatureMessage"));
var PlayerReadyForQueueMessage_1 = __importDefault(require("../../Networking/GameLoop/PhaseAndQueue/PlayerReadyForQueueMessage"));
var PlayerExporedLandMessage_1 = __importDefault(require("../../Networking/Land/PlayerExporedLandMessage"));
var QueuePlayCardMessage_1 = __importDefault(require("../../Networking/Cards/Play/QueuePlayCardMessage"));
var CancelActionMessage_1 = __importDefault(require("../../Networking/QueueManagement/CancelActionMessage"));
var PlayCardQueueline_1 = __importDefault(require("../../Queueline/ServerQueueline/ServerQueuelines/TargetsCostsQueueline/TargetCostsQueuelines/PlayCardQueueline"));
// #endregion
var EffectSolverHandler = /** @class */ (function (_super) {
    __extends(EffectSolverHandler, _super);
    function EffectSolverHandler(gameServer) {
        var _this = _super.call(this, gameServer) || this;
        _this.onQueueActivateAbility = function (playerSocket, data) {
            console.log('queueactivateability called on server');
            var msg = QueueActivateAbilityMessage_1.default.fromJSON(data);
            var sourcePlayerInfo = _this.validateMessageAndReturnPlayer(playerSocket.id, msg);
            if (!sourcePlayerInfo) {
                throw new Error('Not a valid message');
            }
            // message specific checks
            // 3. Check for null card
            var entity = _this.gameServer.gameState.getCardFromAnywhere(msg.sourceEntityInstanceId);
            if (!entity)
                throw new Error('Entity not found');
            var ability = entity.abilities[msg.abilityIndex];
            if (!ability)
                throw new Error('Ability not found');
            // 4. Check if the card using the ability is in a playable board somewhere
            var zone = _this.gameServer.gameState.getZoneByInstanceId(entity.residingZoneInstanceId);
            if (![Zone_1.ZoneEnum.FrontBoard, Zone_1.ZoneEnum.BackBoard, Zone_1.ZoneEnum.BattleBoard].includes(zone.zoneEnum))
                throw new Error('Invalid zone');
            // 5. Check if right Phase
            var useableInPhases = entity.abilities[msg.abilityIndex].useableInPhases;
            if (!useableInPhases.includes(_this.gameServer.gameState.currentPhaseIndex))
                throw new Error('Invalid phase');
            // 6. Check if the ability is active
            if (!ability.isActive)
                throw new Error('Ability is not active');
            // 7. Make sure that the costs that were paid were valid
            var costs = ability.costs;
            if (!sourcePlayerInfo.canPayResourceCosts(costs))
                throw new Error('Cannot pay resource costs');
            var paidCosts = sourcePlayerInfo.payResourceCosts(costs, msg.paidCosts);
            // 8. Make sure that the ability has uses remaining
            console.log('uses remaining: ', ability.usesRemaining);
            if (ability.usesRemaining <= 0)
                throw new Error('No uses remaining for the ability');
            entity.abilities[msg.abilityIndex].usesRemaining -= 1;
            // 9. Check Target Info is valid
            var effect = entity.abilities[msg.abilityIndex].effect;
            var areTargetsAvailable = effect.areTargetsAvailable(_this.gameServer.gameState, entity);
            if (!areTargetsAvailable)
                throw new Error('Targets are not available');
            var targetInfo = msg.targetInfoList;
            // 10. Check that targets that were supposed to be selected were, and don't add info from ones that were not
            if (targetInfo.length !== effect.targetCriterias.length)
                throw new Error('Invalid target info length');
            for (var i = 0; i < targetInfo.length; i++) {
                if (effect.targetCriterias()[i].targetableTypeSelectionEnum !==
                    Target_1.TargetableTypeSelectionEnum.TargetableOnActivation) {
                    targetInfo[i].targetEntityInstanceIds = [];
                    targetInfo[i].targetsAreSelectedLater = true;
                    targetInfo[i].noTargetWasSelected = true;
                }
                else {
                    if (!effect
                        .targetCriterias()[i].isTargetInfoValid(entity.instanceId, targetInfo[i], _this.gameServer.gameState))
                        throw new Error('Invalid target info');
                }
            }
            // 11. Check to make sure we can get the priority stat
            var priorityStat = entity
                .getStatList()
                .find(function (s) { return s.name === 'Priority'; });
            if (!priorityStat) {
                throw new Error('No priority stat found');
            }
            _this.gameServer.queueActivateAbility(msg.messageId, entity, sourcePlayerInfo, targetInfo, paidCosts, effect, priorityStat.effectiveValue, msg.abilityIndex);
        };
        _this.onQueueUpgradeCard = function (playerSocket, data) {
            console.log('queueupgradecard called on server');
            var msg = QueueUpgradeCardMessage_1.default.fromJSON(data);
            if (!msg)
                throw new Error('Invalid message');
            var sourcePlayerInfo = _this.validateMessageAndReturnPlayer(playerSocket.id, msg);
            if (!sourcePlayerInfo)
                throw new Error('Invalid player info');
            var card = _this.gameServer.gameState.getCardFromAnywhere(msg.cardInstanceId);
            if (!card)
                throw new Error('Card not found');
            var zone = _this.gameServer.gameState.getZoneByInstanceId(msg.cardInstanceId);
            if (![Zone_1.ZoneEnum.FrontBoard, Zone_1.ZoneEnum.BackBoard, Zone_1.ZoneEnum.BattleBoard].includes(zone.zoneEnum))
                throw new Error('Invalid zone');
            var useableInPhases = GameProperties_1.default.phasesCardsCanUpgradeIn;
            if (!useableInPhases.includes(_this.gameServer.gameState.currentPhaseIndex))
                throw new Error('Invalid phase');
            var libraryCard = _this.gameServer.gameState.gameManager.cardLibrary.find(function (c) { return c.libraryId === card.libraryId; });
            if (!libraryCard)
                throw new Error('Library card not found');
            var costs = libraryCard.getCardUpgradeByUpgradeIndex(msg.upgradeIndex).costs;
            if (!costs)
                throw new Error('Costs not found');
            if (!sourcePlayerInfo.canPayResourceCosts(costs))
                throw new Error('Cannot pay resource costs');
            var paidCosts = sourcePlayerInfo.payResourceCosts(costs, msg.paidCosts);
            if (card.upgradesApplied.includes(msg.upgradeIndex))
                throw new Error('Upgrade already applied');
            var ability = libraryCard.getCardUpgradeByUpgradeIndex(msg.upgradeIndex).activatedAbility;
            if (ability &&
                !ability.effect.areTargetsAvailable(_this.gameServer.gameState, card, ability.effect.targetCriterias))
                ability = null;
            var targetInfo = msg.targetInfoList;
            if (ability) {
                if (targetInfo.length !== ability.effect.targetCriterias.length)
                    throw new Error('Invalid target info length');
                for (var i = 0; i < targetInfo.length; i++) {
                    if (ability.effect.targetCriterias()[i].targetableTypeSelectionEnum !==
                        Target_1.TargetableTypeSelectionEnum.TargetableOnActivation) {
                        targetInfo[i].targetEntityInstanceIds = [];
                        targetInfo[i].targetsAreSelectedLater = true;
                        targetInfo[i].noTargetWasSelected = true;
                    }
                    else {
                        if (!ability.effect.isTargetInfoStillValid(card, _this.gameServer.gameState, targetInfo[i], ability.effect.targetCriterias()[i]))
                            throw new Error('Invalid target info');
                    }
                }
            }
            var priorityStat = card.getStatList().find(function (s) { return s.name === 'Priority'; });
            if (!priorityStat)
                throw new Error('No priority stat found');
            _this.gameServer.queueUpgradeCard(msg.messageId, card.instanceId, sourcePlayerInfo.userId, targetInfo, paidCosts, ability ? ability.effect : null, priorityStat.effectiveValue, msg.upgradeIndex);
        };
        _this.onReturnTargets = function (playerSocket, data) {
            console.log('ReceivedTargetsFromPlayer called on server');
            var msg = ReturnTargetsToServerMessage_1.default.fromJSON(data);
            var sourcePlayer = _this.validateMessageAndReturnPlayer(playerSocket.id, msg);
            if (!sourcePlayer) {
                throw new Error('Not a valid message');
            }
            // check to see if the code is right - if it isn't, throw an error; if it is, erase it so that the player cannot use it again.
            if (msg.targetInfoCode !== _this.gameServer.targetInfoCode)
                throw new Error('Invalid target info code');
            else
                _this.gameServer.targetInfoCode = null;
            var preCurrentQueueline = _this.gameServer.queue[_this.gameServer.currentQueueIndex];
            // make sure the opponent doesn't try to skip the other players move
            if (preCurrentQueueline.sourcePlayerUserId !== sourcePlayer.userId)
                throw new Error('Invalid source player');
            if (!(preCurrentQueueline instanceof TargetsCostsQueueline_1.default)) {
                _this.gameServer.executeNextQueueline();
                throw new Error('Invalid queueline instance');
            }
            var currentQueueline = preCurrentQueueline;
            var targetInfoList = msg.targetInfo;
            // if the player tries to prevent fizzle by messing with the target info, don't let them and send it straight to DoEffect
            if (currentQueueline.effect.targetCriterias.length !== targetInfoList.length) {
                currentQueueline.sendEffectToDoEffect(_this.gameServer, _this.gameServer.currentQueueIndex);
                _this.gameServer.currentQueueIndex += 1;
                _this.gameServer.executeNextQueueline();
                throw new Error('Invalid target info length');
            }
            // update any target info that was supposed to be set later - but only that
            for (var i = 0; i < currentQueueline.effect.targetCriterias.length; i++) {
                var currentTargetInfo = currentQueueline.targetInfoList[i];
                var sentTargetInfo = targetInfoList[i];
                var currentTargetType = currentQueueline.effect.targetCriterias()[i];
                if (currentTargetInfo.targetsAreSelectedLater &&
                    currentTargetType.playerSelectsTarget) {
                    currentTargetInfo.targetEntityInstanceIds = [];
                    currentTargetInfo.targetEntityInstanceIds = __spreadArray([], sentTargetInfo.targetEntityInstanceIds, true);
                    currentTargetInfo.noTargetWasSelected = false;
                }
            }
            // if the target info isn't valid after updating the target info, we will try to autoselect the targets
            // if we don't get valid targets, we will send the effect to do effect and move on - the effect will fizzle, but that's okay
            // we wouldn't have added the queueline in the first place if the targets hadn't been valid at the time
            // we want the effect to try to happen and then fizzle
            if (!currentQueueline.areAllSelectedTargetInfoItemsValid(_this.gameServer)) {
                if (currentQueueline.effect.areTargetsAvailable(_this.gameServer.gameState, _this.gameServer.gameState.getCardFromAnywhere(currentQueueline.sourceCardInstanceId))) {
                    for (var i = 0; i < currentQueueline.effect.targetCriterias.length; i++) {
                        var currentTargetInfo = currentQueueline.targetInfoList[i];
                        var sentTargetInfo = targetInfoList[i];
                        var currentTargetType = currentQueueline.effect.targetCriterias()[i];
                        if (currentTargetType.targetableTypeSelectionEnum ===
                            Target_1.TargetableTypeSelectionEnum.TargetableOnQueueCall) {
                            currentTargetInfo = currentTargetType.autoSelectTargetInfo(currentQueueline.sourceCardInstanceId, _this.gameServer.gameState);
                        }
                    }
                }
            }
            currentQueueline.sendEffectToDoEffect(_this.gameServer, _this.gameServer.currentQueueIndex);
            _this.gameServer.currentQueueIndex += 1;
            _this.gameServer.executeNextQueueline();
        };
        _this.onCardBlocking = function (playerSocket, data) {
            var msg = CardIsBlockingMessage_1.default.fromJSON(data);
            var sourcePlayer = _this.validateMessageAndReturnPlayer(playerSocket.id, msg);
            if (!sourcePlayer) {
                throw new Error('Not a valid message');
            }
            var blockingCard = _this.gameServer.gameState.getCardFromAnywhere(msg.blockingCardInstanceId);
            if (!blockingCard) {
                throw new Error('Blocking Card not found');
            }
            var blockedCard = _this.gameServer.gameState.getCardFromAnywhere(msg.blockedCardInstanceId);
            if (!blockedCard) {
                throw new Error('Blocked Card not found');
            }
            // don't let a card block itself
            if (blockingCard.instanceId === blockedCard.instanceId) {
                throw new Error('Cannot block self');
            }
            // we're not going to do any restrictions like this until the effect is actually evaluated - we will let the player do surprising things with movement effects
            // const zone = this.gameServer.gameState.getZone(blockingCard.instanceId);
            // if (zone.zoneEnum !== ZoneEnum.FrontBoard) return;
            // has to be during battle phas
            if (_this.gameServer.gameState.currentPhaseIndex !== Phase_1.PhaseEnum.Battle) {
                throw new Error('Not during battle phase');
            }
            // blocking card already fighting, moving or blocking
            if (_this.gameServer.alreadyFightingBlockingOrMoving(blockingCard.instanceId)) {
                throw new Error('Card already fighting, moving or blocking');
            }
            var blockOrder = msg.blockOrder;
            _this.gameServer.cardBlocking(blockingCard, blockedCard, blockOrder);
        };
        _this.onReorderBlockingCard = function (playerSocket, data) {
            var msg = ReorderBlockingCardMessage_1.default.fromJSON(data);
            var sourcePlayer = _this.validateMessageAndReturnPlayer(playerSocket.id, msg);
            if (!sourcePlayer) {
                throw new Error('Not a valid message');
            }
            var blockingCard = _this.gameServer.gameState.getCardFromAnywhere(msg.blockingCardInstanceId);
            if (!blockingCard) {
                throw new Error('Blocking Card not found');
            }
            // make sure the player owns the card
            if (blockingCard.ownerPlayerUserId !== sourcePlayer.userId) {
                throw new Error('Player does not own card');
            }
            // make sure the card is in play
            var zone = _this.gameServer.gameState.getZoneByInstanceId(blockingCard.residingZoneInstanceId);
            if (!Zone_1.ZoneEnumMethods.isBoard(zone.zoneEnum)) {
                throw new Error('Card not in play');
            }
            // no restrictions on zone until the effect is actually evaluated
            // we will let the player do surprising things with movement effects
            var newOrder = msg.newBlockingPosition;
            _this.gameServer.reorderBlockingCard(blockingCard, newOrder);
        };
        _this.onStopCardBlocking = function (playerSocket, data) {
            var msg = StopCardBlockingMessage_1.default.fromJSON(data);
            var sourcePlayer = _this.validateMessageAndReturnPlayer(playerSocket.id, msg);
            if (!sourcePlayer) {
                throw new Error('Not a valid message');
            }
            var blockingCard = _this.gameServer.gameState.getCardFromAnywhere(msg.blockingCardInstanceId);
            if (!blockingCard) {
                throw new Error('Blocking Card not found');
            }
            // make sure the player owns the card
            if (blockingCard.ownerPlayerUserId !== sourcePlayer.userId) {
                throw new Error('Player does not own card');
            }
            // make sure the card is in play
            var zone = _this.gameServer.gameState.getZoneByInstanceId(blockingCard.residingZoneInstanceId);
            if (!Zone_1.ZoneEnumMethods.isBoard(zone.zoneEnum)) {
                throw new Error('Card not in play');
            }
            // no restrictions on zone until the effect is actually evaluated
            // we will let the player do surprising things with movement effects
            _this.gameServer.stopCardBlocking(blockingCard.instanceId);
        };
        _this.onCardMovedRow = function (playerSocket, data) {
            var msg = QueueCardMovedRowMessage_1.default.fromJSON(data);
            var sourcePlayer = _this.validateMessageAndReturnPlayer(playerSocket.id, msg);
            if (!sourcePlayer) {
                throw new Error('Not a valid message');
            }
            var movedCard = _this.gameServer.gameState.getCardFromAnywhere(msg.movedCardInstanceId);
            if (!movedCard) {
                throw new Error('Card not found');
            }
            // make sure the player owns the card
            if (movedCard.ownerPlayerUserId !== sourcePlayer.userId) {
                throw new Error('Player does not own card');
            }
            // Check if the card is moving from front to back or back to front
            var zone = _this.gameServer.gameState.getZoneByInstanceId(movedCard.residingZoneInstanceId);
            if (!zone) {
                throw new Error('Zone not found');
            }
            if (zone.ownerPlayerUserId !== sourcePlayer.userId) {
                throw new Error('Player does not own zone');
            }
            if (zone.zoneEnum === Zone_1.ZoneEnum.FrontBoard) {
                if (msg.originZoneZoneEnum !== Zone_1.ZoneEnum.FrontBoard) {
                    throw new Error('Invalid origin zone');
                }
                if (msg.destinationZoneZoneEnum !== Zone_1.ZoneEnum.BackBoard) {
                    throw new Error('Invalid destination zone');
                }
            }
            if (zone.zoneEnum === Zone_1.ZoneEnum.BackBoard) {
                if (msg.originZoneZoneEnum !== Zone_1.ZoneEnum.BackBoard) {
                    throw new Error('Invalid origin zone');
                }
                if (msg.destinationZoneZoneEnum !== Zone_1.ZoneEnum.FrontBoard) {
                    throw new Error('Invalid destination zone');
                }
            }
            // check if we're in the right phase
            if (GameProperties_1.default.phasesCardsCanMoveRowsIn.includes(_this.gameServer.gameState.currentPhaseIndex)) {
                throw new Error('Invalid phase');
            }
            // check if the card is already moving
            if (_this.gameServer.alreadyFightingBlockingOrMoving(movedCard.instanceId)) {
                throw new Error('Card already fighting, moving or blocking');
            }
            _this.gameServer.queueCardMovedRow(msg.messageId, movedCard.instanceId, sourcePlayer.userId, movedCard.getStatList().find(function (s) { return s.name === 'Priority'; }).effectiveValue, msg.originZoneZoneEnum, msg.destinationZoneZoneEnum);
        };
        _this.onQueueFightCreature = function (playerSocket, data) {
            var msg = QueueFightCreatureMessage_1.default.fromJSON(data);
            var sourcePlayer = _this.validateMessageAndReturnPlayer(playerSocket.id, msg);
            if (!sourcePlayer) {
                throw new Error('Not a valid message');
            }
            var attackingCard = _this.gameServer.gameState.getCardFromAnywhere(msg.attackingCardInstanceId);
            if (!attackingCard) {
                throw new Error('Attacking Card not found');
            }
            var attackedCard = _this.gameServer.gameState.getCardFromAnywhere(msg.attackedCardInstanceId);
            if (!attackedCard) {
                throw new Error('Attacked Card not found');
            }
            // make sure the player owns the card
            if (attackingCard.ownerPlayerUserId !== sourcePlayer.userId) {
                throw new Error('Player does not own attacking card');
            }
            // make sure the card is in play
            var zone = _this.gameServer.gameState.getZoneByInstanceId(attackingCard.residingZoneInstanceId);
            if (!Zone_1.ZoneEnumMethods.isBoard(zone.zoneEnum)) {
                throw new Error('Attacking card not in play');
            }
            // make sure the other card is the opponents and in play
            if (attackedCard.ownerPlayerUserId === sourcePlayer.userId) {
                throw new Error('Attacked card is owned by the player');
            }
            var attackedZone = _this.gameServer.gameState.getZoneByInstanceId(attackedCard.residingZoneInstanceId);
            if (!Zone_1.ZoneEnumMethods.isBoard(attackedZone.zoneEnum)) {
                throw new Error('Attacked card not in play');
            }
            // make sure we're in the right phase
            if (Phase_1.PhaseEnum.Battle !== _this.gameServer.gameState.currentPhaseIndex) {
                throw new Error('Invalid phase');
            }
            // make sure the attacking card isn't already fighting, moving or blocking
            if (_this.gameServer.alreadyFightingBlockingOrMoving(attackingCard.instanceId)) {
                throw new Error('Attacking card already fighting, moving or blocking');
            }
            // send to server
            _this.gameServer.queueFightCreature(msg.messageId, attackingCard, attackedCard, sourcePlayer, attackingCard.getStatList().find(function (s) { return s.name === 'Priority'; })
                .effectiveValue);
        };
        return _this;
    }
    EffectSolverHandler.prototype.registerNetworkHandlers = function (playerSockets) {
        var _this = this;
        var _loop_1 = function (socket) {
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.QueueActivateAbility], function (data) {
                try {
                    _this.onQueueActivateAbility(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.QueueUpgradeCard], function (data) {
                try {
                    _this.onQueueUpgradeCard(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.ReturnTargetsToServer], function (data) {
                try {
                    _this.onReturnTargets(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.CardIsBlocking], function (data) {
                try {
                    _this.onCardBlocking(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.ReorderBlockingCard], function (data) {
                try {
                    _this.onReorderBlockingCard(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.StopCardBlocking], function (data) {
                try {
                    _this.onStopCardBlocking(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.PlayerCardMovedRow], function (data) {
                try {
                    _this.onCardMovedRow(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.QueueFightCreature], function (data) {
                try {
                    _this.onQueueFightCreature(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.PlayerReadyForQueue], function (data) {
                try {
                    _this.onPlayerFinishedAddedingToQueue(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.PlayerExploredLand], function (data) {
                try {
                    _this.onPlayerExploredLand(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.QueuePlayCard], function (data) {
                try {
                    _this.onQueuePlayCard(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.CancelAction], function (data) {
                try {
                    _this.onCancelAction(socket, data);
                }
                catch (error) {
                    console.log(error);
                }
            });
        };
        for (var _i = 0, playerSockets_1 = playerSockets; _i < playerSockets_1.length; _i++) {
            var socket = playerSockets_1[_i];
            _loop_1(socket);
        }
    };
    EffectSolverHandler.prototype.unregisterNetworkHandlers = function (playerSockets) {
        for (var _i = 0, playerSockets_2 = playerSockets; _i < playerSockets_2.length; _i++) {
            var socket = playerSockets_2[_i];
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.QueueActivateAbility]);
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.QueueUpgradeCard]);
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.ReturnTargetsToServer]);
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.CardIsBlocking]);
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.ReorderBlockingCard]);
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.StopCardBlocking]);
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.PlayerCardMovedRow]);
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.QueueFightCreature]);
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.PlayerReadyForQueue]);
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.PlayerExploredLand]);
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.QueuePlayCard]);
            socket.removeAllListeners(NetworkProtocol_1.NetworkProtocol[NetworkProtocol_1.NetworkProtocol.CancelAction]);
        }
    };
    EffectSolverHandler.prototype.onPlayerFinishedAddedingToQueue = function (playerSocket, data) {
        // get the player from the socketId
        var msg = PlayerReadyForQueueMessage_1.default.fromJSON(data);
        var playerInfo = this.validateMessageAndReturnPlayer(playerSocket.id, msg);
        if (!playerInfo) {
            throw new Error('Message is not valid');
        }
        // make sure we're in the right phase
        // (any phase that can have a queue - all phases except recruit)
        if (this.gameServer.gameState.currentPhaseIndex === Phase_1.PhaseEnum.Recruit) {
            throw new Error('Invalid phase');
        }
        this.gameServer.playerReadyForQueueExecution(playerInfo);
    };
    EffectSolverHandler.prototype.onPlayerExploredLand = function (playerSocket, data) {
        var msg = PlayerExporedLandMessage_1.default.fromJSON(data);
        if (!msg || !msg.validate()) {
            console.log('Message is not valid');
            console.log('msg: ' + JSON.stringify(msg));
            console.log('data: ' + JSON.stringify(data));
            throw new Error('Message is not valid');
        }
        var playerInfo = this.validateMessageAndReturnPlayer(playerSocket.id, msg);
        if (!playerInfo) {
            throw new Error('Message is not valid');
        }
        // get landtile
        var landTile = playerInfo.realm.getLandTile(msg.landTileId);
        if (!landTile) {
            console.log('Land tile not found:');
            console.log('msg.landTileId: ' + msg.landTileId);
            throw new Error('Land tile not found');
        }
        // make sure we're in the right phase
        if (Phase_1.PhaseEnum.Recruit !== this.gameServer.gameState.currentPhaseIndex) {
            throw new Error('Invalid phase');
        }
        // get explored tiles
        var exploredTiles = playerInfo.realm.landTiles.filter(function (l) { return l.explored; });
        // make sure the player hasn't explored yet this turn
        if (this.gameServer.gameState.currentTurn < exploredTiles.length) {
            throw new Error('Player has already explored this turn: ' +
                'this.gameServer.gameState.currentTurn < exploredTiles.length but currentTurn ' +
                this.gameServer.gameState.currentTurn +
                ' exploredTiles.length: ' +
                exploredTiles.length);
        }
        // make sure the land hasn't yet been explored
        if (landTile.explored) {
            throw new Error('Land tile has already been explored');
        }
        // make sure the tile is the neighbor of an explored tile
        // (the city tile should already be explored)
        if (!landTile.anyNeighborExplored(playerInfo.realm.landTiles)) {
            var exploredTiles_1 = playerInfo.realm.landTiles.filter(function (l) { return l.explored; });
            console.log(exploredTiles_1);
            throw new Error('Land tile is not adjacent to an explored tile');
        }
        this.gameServer.playerExploredLand(playerInfo, landTile);
    };
    EffectSolverHandler.prototype.onQueuePlayCard = function (playerSocket, data) {
        var msg = QueuePlayCardMessage_1.default.fromJSON(data);
        var playerInfo = this.validateMessageAndReturnPlayer(playerSocket.id, msg);
        if (!playerInfo) {
            throw new Error('Message is not valid');
        }
        // card
        var card = this.gameServer.gameState.getCardFromAnywhere(msg.cardInstanceId);
        if (!card) {
            throw new Error('Card not found');
        }
        // make sure the player owns the card
        if (card.ownerPlayerUserId !== playerInfo.userId) {
            throw new Error('Player does not own card');
        }
        // make sure the card is in the hand and going to the board
        var confirmedOriginZone = playerInfo.getFriendlyZoneFromZoneEnum(Zone_1.ZoneEnum.Hand);
        if (!confirmedOriginZone) {
            throw new Error('Hand zone not found');
        }
        var confirmedDestinationZone = playerInfo.getFriendlyZoneFromZoneEnum(msg.destinationZoneZoneEnum);
        if (!confirmedDestinationZone) {
            throw new Error('Destination zone not found');
        }
        if (!Zone_1.ZoneEnumMethods.isBoard(confirmedDestinationZone.zoneEnum)) {
            throw new Error('Card not going to board');
        }
        // check if in right phase
        if (!GameProperties_1.default.phasesCardsCanBePlayedIn.includes(this.gameServer.gameState.currentPhaseIndex)) {
            throw new Error('Invalid phase');
        }
        // make sure that the card hasn't been queued to be played already
        if (this.gameServer.queue.find(function (q) {
            return q instanceof PlayCardQueueline_1.default &&
                q.sourceCardInstanceId === card.instanceId;
        })) {
            throw new Error('Card already queued to be played');
        }
        // check that the costs were paid and were valid
        var libraryCard = this.gameServer.gameState.gameManager.cardLibrary.find(function (c) { return c.libraryId === card.libraryId; });
        if (!libraryCard) {
            throw new Error('Library card not found');
        }
        var costs = libraryCard.costs;
        if (!costs) {
            throw new Error('Costs not found');
        }
        if (!playerInfo.canPayResourceCosts(costs)) {
            throw new Error('Cannot pay resource costs');
        }
        // pay the costs and save them
        var paidCosts = playerInfo.payResourceCosts(costs, msg.paidCosts);
        console.log('handler msg.messageId: ' + msg.messageId);
        this.gameServer.queuePlayCard(msg.messageId, card, playerInfo, msg.targetInfoList, paidCosts, card.getStatList().find(function (s) { return s.name === 'Priority'; }).effectiveValue, confirmedOriginZone.zoneEnum, confirmedDestinationZone.zoneEnum);
    };
    EffectSolverHandler.prototype.onCancelAction = function (playerSocket, data) {
        var msg = CancelActionMessage_1.default.fromJSON(data);
        var playerInfo = this.validateMessageAndReturnPlayer(playerSocket.id, msg);
        if (!playerInfo) {
            throw new Error('Message is not valid');
        }
        // make sure that the player has not yet declared that they are finished with the queue
        if (playerInfo.readyForQueue) {
            throw new Error('Player has already declared that they are finished');
        }
        // find the queueline that the player is trying to cancel
        var queueline = this.gameServer.queue.find(function (q) { return q.clientMessageId === msg.messageIdToCancel; });
        if (!queueline) {
            console.log('queue: ' + JSON.stringify(this.gameServer.queue));
            console.log('msg: ' + JSON.stringify(msg));
            throw new Error('Queueline not found');
        }
        // remove the queueline from the queue
        var index = this.gameServer.queue.indexOf(queueline);
        if (index > -1) {
            this.gameServer.queue.splice(index, 1);
        }
        // give the mana back to the player
        if (queueline instanceof TargetsCostsQueueline_1.default) {
            for (var _i = 0, _a = queueline.paidCosts; _i < _a.length; _i++) {
                var cost = _a[_i];
                playerInfo.idToStat.get(cost.statId).baseValue += cost.value;
            }
        }
    };
    return EffectSolverHandler;
}(ServerHandler_1.default));
exports.default = EffectSolverHandler;
