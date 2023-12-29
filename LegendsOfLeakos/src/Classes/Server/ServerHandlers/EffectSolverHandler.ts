// #region imports

import GameServer from '../GameServer';
import ServerHandler from '../ServerHandler';
import { NetworkProtocol } from '../../../Enums/NetworkProtocol';
import QueueActivateAbilityMessage from '../../Networking/Abilities/QueueActivateAbilityMessage';
import { ZoneEnum, ZoneEnumMethods } from '../../../Enums/Zone';
import { TargetableTypeSelectionEnum } from '../../../Enums/Target';
import QueueUpgradeCardMessage from '../../Networking/Upgrades/QueueUpgradeCardMessage';
import GameManager from '../../Game/GameManager';
import GameProperties from '../../Game/GameProperties';
import UpgradeCardQueueLine from '../../Queueline/ServerQueueline/ServerQueuelines/TargetsCostsQueueline/TargetCostsQueuelines/UpgradeCardQueueline';
import ReturnTargetsToServerMessage from '../../Networking/Abilities/ReturnTargetsToServerMessage';
import TargetsCostsQueueline from '../../Queueline/ServerQueueline/ServerQueuelines/TargetsCostsQueueline/TargetsCostsQueueline';
import CardIsBlockingMessage from '../../Networking/Blocking/CardIsBlockingMessage';
import { PhaseEnum } from '../../../Enums/Phase';
import ReorderBlockingCardMessage from '../../Networking/Blocking/ReorderBlockingCardMessage';
import StopCardBlockingMessage from '../../Networking/Blocking/StopCardBlockingMessage';
import QueueCardMovedRowMessage from '../../Networking/Cards/MovedRow/QueueCardMovedRowMessage';
import QueueFightCreatureMessage from '../../Networking/Attacking/QueueFightCreatureMessage';
import PlayerReadyForQueueMessage from '../../Networking/GameLoop/PhaseAndQueue/PlayerReadyForQueueMessage';
import PlayerExploredLandMessage from '../../Networking/Land/PlayerExporedLandMessage';
import RuntimeLandTile from '../../RealmsAndLand/LandTile/RuntimeLandTile';
import PlayerChangedLandTypeMessage from '../../Networking/Land/PlayerChangedLandTypeMessage';
import QueuePlayCardMessage from '../../Networking/Cards/Play/QueuePlayCardMessage';
import CancelActionMessage from '../../Networking/QueueManagement/CancelActionMessage';
import PlayCardQueueLine from '../../Queueline/ServerQueueline/ServerQueuelines/TargetsCostsQueueline/TargetCostsQueuelines/PlayCardQueueline';

// #endregion

export default class EffectSolverHandler extends ServerHandler {
  constructor(gameServer: GameServer) {
    super(gameServer);
  }

  public registerNetworkHandlers(playerSockets: any): void {
    for (let socket of playerSockets) {
      socket.on(
        NetworkProtocol[NetworkProtocol.QueueActivateAbility],
        (data: any) => {
          try {
            this.onQueueActivateAbility(socket, data);
          } catch (error) {
            console.log(error);
          }
        }
      );
      socket.on(
        NetworkProtocol[NetworkProtocol.QueueUpgradeCard],
        (data: any) => {
          try {
            this.onQueueUpgradeCard(socket, data);
          } catch (error) {
            console.log(error);
          }
        }
      );
      socket.on(
        NetworkProtocol[NetworkProtocol.ReturnTargetsToServer],
        (data: any) => {
          try {
            this.onReturnTargets(socket, data);
          } catch (error) {
            console.log(error);
          }
        }
      );
      socket.on(
        NetworkProtocol[NetworkProtocol.CardIsBlocking],
        (data: any) => {
          try {
            this.onCardBlocking(socket, data);
          } catch (error) {
            console.log(error);
          }
        }
      );
      socket.on(
        NetworkProtocol[NetworkProtocol.ReorderBlockingCard],
        (data: any) => {
          try {
            this.onReorderBlockingCard(socket, data);
          } catch (error) {
            console.log(error);
          }
        }
      );
      socket.on(
        NetworkProtocol[NetworkProtocol.StopCardBlocking],
        (data: any) => {
          try {
            this.onStopCardBlocking(socket, data);
          } catch (error) {
            console.log(error);
          }
        }
      );
      socket.on(
        NetworkProtocol[NetworkProtocol.PlayerCardMovedRow],
        (data: any) => {
          try {
            this.onCardMovedRow(socket, data);
          } catch (error) {
            console.log(error);
          }
        }
      );
      socket.on(
        NetworkProtocol[NetworkProtocol.QueueFightCreature],
        (data: any) => {
          try {
            this.onQueueFightCreature(socket, data);
          } catch (error) {
            console.log(error);
          }
        }
      );
      socket.on(
        NetworkProtocol[NetworkProtocol.PlayerReadyForQueue],
        (data: any) => {
          try {
            this.onPlayerFinishedAddedingToQueue(socket, data);
          } catch (error) {
            console.log(error);
          }
        }
      );
      socket.on(
        NetworkProtocol[NetworkProtocol.PlayerExploredLand],
        (data: any) => {
          try {
            this.onPlayerExploredLand(socket, data);
          } catch (error) {
            console.log(error);
          }
        }
      );
      socket.on(NetworkProtocol[NetworkProtocol.QueuePlayCard], (data: any) => {
        try {
          this.onQueuePlayCard(socket, data);
        } catch (error) {
          console.log(error);
        }
      });
      socket.on(NetworkProtocol[NetworkProtocol.CancelAction], (data: any) => {
        try {
          this.onCancelAction(socket, data);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }

  public unregisterNetworkHandlers(playerSockets: any): void {
    for (let socket of playerSockets) {
      socket.removeAllListeners(
        NetworkProtocol[NetworkProtocol.QueueActivateAbility]
      );
      socket.removeAllListeners(
        NetworkProtocol[NetworkProtocol.QueueUpgradeCard]
      );
      socket.removeAllListeners(
        NetworkProtocol[NetworkProtocol.ReturnTargetsToServer]
      );
      socket.removeAllListeners(
        NetworkProtocol[NetworkProtocol.CardIsBlocking]
      );
      socket.removeAllListeners(
        NetworkProtocol[NetworkProtocol.ReorderBlockingCard]
      );
      socket.removeAllListeners(
        NetworkProtocol[NetworkProtocol.StopCardBlocking]
      );
      socket.removeAllListeners(
        NetworkProtocol[NetworkProtocol.PlayerCardMovedRow]
      );
      socket.removeAllListeners(
        NetworkProtocol[NetworkProtocol.QueueFightCreature]
      );
      socket.removeAllListeners(
        NetworkProtocol[NetworkProtocol.PlayerReadyForQueue]
      );
      socket.removeAllListeners(
        NetworkProtocol[NetworkProtocol.PlayerExploredLand]
      );
      socket.removeAllListeners(NetworkProtocol[NetworkProtocol.QueuePlayCard]);
      socket.removeAllListeners(NetworkProtocol[NetworkProtocol.CancelAction]);
    }
  }

  protected onQueueActivateAbility = (playerSocket: any, data: any): void => {
    console.log('queueactivateability called on server');
    const msg = QueueActivateAbilityMessage.fromJSON(data);

    const sourcePlayerInfo = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );

    if (!sourcePlayerInfo) {
      throw new Error('Not a valid message');
    }

    // message specific checks
    // 3. Check for null card
    const entity = this.gameServer.gameState.getCardFromAnywhere(
      msg.sourceEntityInstanceId
    );
    if (!entity) throw new Error('Entity not found');

    const ability = entity.abilities[msg.abilityIndex];
    if (!ability) throw new Error('Ability not found');

    // 4. Check if the card using the ability is in a playable board somewhere
    const zone = this.gameServer.gameState.getZoneByInstanceId(
      entity.residingZoneInstanceId
    );
    if (
      ![ZoneEnum.FrontBoard, ZoneEnum.BackBoard, ZoneEnum.BattleBoard].includes(
        zone.zoneEnum
      )
    )
      throw new Error('Invalid zone');

    // 5. Check if right Phase
    const useableInPhases = entity.abilities[msg.abilityIndex].useableInPhases;
    if (!useableInPhases.includes(this.gameServer.gameState.currentPhaseIndex))
      throw new Error('Invalid phase');

    // 6. Check if the ability is active
    if (!ability.isActive) throw new Error('Ability is not active');

    // 7. Make sure that the costs that were paid were valid
    const costs = ability.costs;
    if (!sourcePlayerInfo.canPayResourceCosts(costs))
      throw new Error('Cannot pay resource costs');
    const paidCosts = sourcePlayerInfo.payResourceCosts(costs, msg.paidCosts);

    // 8. Make sure that the ability has uses remaining
    console.log('uses remaining: ', ability.usesRemaining);
    if (ability.usesRemaining <= 0)
      throw new Error('No uses remaining for the ability');
    entity.abilities[msg.abilityIndex].usesRemaining -= 1;

    // 9. Check Target Info is valid
    const effect = entity.abilities[msg.abilityIndex].effect;
    const areTargetsAvailable = effect.areTargetsAvailable(
      this.gameServer.gameState,
      entity
    );
    if (!areTargetsAvailable) throw new Error('Targets are not available');
    const targetInfo = msg.targetInfoList;

    // 10. Check that targets that were supposed to be selected were, and don't add info from ones that were not
    if (targetInfo.length !== effect.targetCriterias.length)
      throw new Error('Invalid target info length');
    for (let i = 0; i < targetInfo.length; i++) {
      if (
        effect.targetCriterias()[i].targetableTypeSelectionEnum !==
        TargetableTypeSelectionEnum.TargetableOnActivation
      ) {
        targetInfo[i].targetEntityInstanceIds = [];
        targetInfo[i].targetsAreSelectedLater = true;
        targetInfo[i].noTargetWasSelected = true;
      } else {
        if (
          !effect
            .targetCriterias()
            [i].isTargetInfoValid(
              entity.instanceId,
              targetInfo[i],
              this.gameServer.gameState
            )
        )
          throw new Error('Invalid target info');
      }
    }

    // 11. Check to make sure we can get the priority stat
    const priorityStat = entity
      .getStatList()
      .find((s) => s.name === 'Priority');
    if (!priorityStat) {
      throw new Error('No priority stat found');
    }

    this.gameServer.queueActivateAbility(
      msg.messageId,
      entity,
      sourcePlayerInfo,
      targetInfo,
      paidCosts,
      effect,
      priorityStat.effectiveValue,
      msg.abilityIndex
    );
  };

  public onQueueUpgradeCard = (playerSocket: any, data: any): void => {
    console.log('queueupgradecard called on server');
    const msg = QueueUpgradeCardMessage.fromJSON(data);
    if (!msg) throw new Error('Invalid message');

    const sourcePlayerInfo = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );
    if (!sourcePlayerInfo) throw new Error('Invalid player info');

    const card = this.gameServer.gameState.getCardFromAnywhere(
      msg.cardInstanceId
    );
    if (!card) throw new Error('Card not found');

    const zone = this.gameServer.gameState.getZoneByInstanceId(
      msg.cardInstanceId
    );
    if (
      ![ZoneEnum.FrontBoard, ZoneEnum.BackBoard, ZoneEnum.BattleBoard].includes(
        zone.zoneEnum
      )
    )
      throw new Error('Invalid zone');

    const useableInPhases = GameProperties.phasesCardsCanUpgradeIn;
    if (!useableInPhases.includes(this.gameServer.gameState.currentPhaseIndex))
      throw new Error('Invalid phase');

    const libraryCard = this.gameServer.gameState.gameManager.cardLibrary.find(
      (c) => c.libraryId === card.libraryId
    );
    if (!libraryCard) throw new Error('Library card not found');
    const costs = libraryCard.getCardUpgradeByUpgradeIndex(
      msg.upgradeIndex
    ).costs;
    if (!costs) throw new Error('Costs not found');
    if (!sourcePlayerInfo.canPayResourceCosts(costs))
      throw new Error('Cannot pay resource costs');
    const paidCosts = sourcePlayerInfo.payResourceCosts(costs, msg.paidCosts);

    if (card.upgradesApplied.includes(msg.upgradeIndex))
      throw new Error('Upgrade already applied');

    let ability = libraryCard.getCardUpgradeByUpgradeIndex(
      msg.upgradeIndex
    ).activatedAbility;
    if (
      ability &&
      !ability.effect.areTargetsAvailable(
        this.gameServer.gameState,
        card,
        ability.effect.targetCriterias
      )
    )
      ability = null;
    const targetInfo = msg.targetInfoList;

    if (ability) {
      if (targetInfo.length !== ability.effect.targetCriterias.length)
        throw new Error('Invalid target info length');
      for (let i = 0; i < targetInfo.length; i++) {
        if (
          ability.effect.targetCriterias()[i].targetableTypeSelectionEnum !==
          TargetableTypeSelectionEnum.TargetableOnActivation
        ) {
          targetInfo[i].targetEntityInstanceIds = [];
          targetInfo[i].targetsAreSelectedLater = true;
          targetInfo[i].noTargetWasSelected = true;
        } else {
          if (
            !ability.effect.isTargetInfoStillValid(
              card,
              this.gameServer.gameState,
              targetInfo[i],
              ability.effect.targetCriterias()[i]
            )
          )
            throw new Error('Invalid target info');
        }
      }
    }

    const priorityStat = card.getStatList().find((s) => s.name === 'Priority');
    if (!priorityStat) throw new Error('No priority stat found');

    this.gameServer.queueUpgradeCard(
      msg.messageId,
      card.instanceId,
      sourcePlayerInfo.userId,
      targetInfo,
      paidCosts,
      ability ? ability.effect : null,
      priorityStat.effectiveValue,
      msg.upgradeIndex
    );
  };

  protected onReturnTargets = (playerSocket: any, data: any): void => {
    console.log('ReceivedTargetsFromPlayer called on server');
    const msg = ReturnTargetsToServerMessage.fromJSON(data);

    const sourcePlayer = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );

    if (!sourcePlayer) {
      throw new Error('Not a valid message');
    }

    // check to see if the code is right - if it isn't, throw an error; if it is, erase it so that the player cannot use it again.
    if (msg.targetInfoCode !== this.gameServer.targetInfoCode)
      throw new Error('Invalid target info code');
    else this.gameServer.targetInfoCode = null;

    let preCurrentQueueline =
      this.gameServer.queue[this.gameServer.currentQueueIndex];

    // make sure the opponent doesn't try to skip the other players move
    if (preCurrentQueueline.sourcePlayerUserId !== sourcePlayer.userId)
      throw new Error('Invalid source player');

    if (!(preCurrentQueueline instanceof TargetsCostsQueueline)) {
      this.gameServer.executeNextQueueline();
      throw new Error('Invalid queueline instance');
    }

    const currentQueueline = preCurrentQueueline as TargetsCostsQueueline;

    let targetInfoList = msg.targetInfo;

    // if the player tries to prevent fizzle by messing with the target info, don't let them and send it straight to DoEffect
    if (
      currentQueueline.effect.targetCriterias.length !== targetInfoList.length
    ) {
      currentQueueline.sendEffectToDoEffect(
        this.gameServer,
        this.gameServer.currentQueueIndex
      );
      this.gameServer.currentQueueIndex += 1;
      this.gameServer.executeNextQueueline();
      throw new Error('Invalid target info length');
    }

    // update any target info that was supposed to be set later - but only that
    for (let i = 0; i < currentQueueline.effect.targetCriterias.length; i++) {
      let currentTargetInfo = currentQueueline.targetInfoList[i];
      let sentTargetInfo = targetInfoList[i];
      let currentTargetType = currentQueueline.effect.targetCriterias()[i];
      if (
        currentTargetInfo.targetsAreSelectedLater &&
        currentTargetType.playerSelectsTarget
      ) {
        currentTargetInfo.targetEntityInstanceIds = [];
        currentTargetInfo.targetEntityInstanceIds = [
          ...sentTargetInfo.targetEntityInstanceIds,
        ];
        currentTargetInfo.noTargetWasSelected = false;
      }
    }

    // if the target info isn't valid after updating the target info, we will try to autoselect the targets
    // if we don't get valid targets, we will send the effect to do effect and move on - the effect will fizzle, but that's okay
    // we wouldn't have added the queueline in the first place if the targets hadn't been valid at the time
    // we want the effect to try to happen and then fizzle
    if (!currentQueueline.areAllSelectedTargetInfoItemsValid(this.gameServer)) {
      if (
        currentQueueline.effect.areTargetsAvailable(
          this.gameServer.gameState,
          this.gameServer.gameState.getCardFromAnywhere(
            currentQueueline.sourceCardInstanceId
          )
        )
      ) {
        for (
          let i = 0;
          i < currentQueueline.effect.targetCriterias.length;
          i++
        ) {
          let currentTargetInfo = currentQueueline.targetInfoList[i];
          let sentTargetInfo = targetInfoList[i];
          let currentTargetType = currentQueueline.effect.targetCriterias()[i];

          if (
            currentTargetType.targetableTypeSelectionEnum ===
            TargetableTypeSelectionEnum.TargetableOnQueueCall
          ) {
            currentTargetInfo = currentTargetType.autoSelectTargetInfo(
              currentQueueline.sourceCardInstanceId,
              this.gameServer.gameState
            );
          }
        }
      }
    }

    currentQueueline.sendEffectToDoEffect(
      this.gameServer,
      this.gameServer.currentQueueIndex
    );
    this.gameServer.currentQueueIndex += 1;

    this.gameServer.executeNextQueueline();
  };

  protected onCardBlocking = (playerSocket: any, data: any): void => {
    const msg = CardIsBlockingMessage.fromJSON(data);

    const sourcePlayer = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );

    if (!sourcePlayer) {
      throw new Error('Not a valid message');
    }

    const blockingCard = this.gameServer.gameState.getCardFromAnywhere(
      msg.blockingCardInstanceId
    );

    if (!blockingCard) {
      throw new Error('Blocking Card not found');
    }

    const blockedCard = this.gameServer.gameState.getCardFromAnywhere(
      msg.blockedCardInstanceId
    );

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
    if (this.gameServer.gameState.currentPhaseIndex !== PhaseEnum.Battle) {
      throw new Error('Not during battle phase');
    }

    // blocking card already fighting, moving or blocking
    if (
      this.gameServer.alreadyFightingBlockingOrMoving(blockingCard.instanceId)
    ) {
      throw new Error('Card already fighting, moving or blocking');
    }

    const blockOrder = msg.blockOrder;

    this.gameServer.cardBlocking(blockingCard, blockedCard, blockOrder);
  };

  protected onReorderBlockingCard = (playerSocket: any, data: any): void => {
    const msg = ReorderBlockingCardMessage.fromJSON(data);

    const sourcePlayer = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );

    if (!sourcePlayer) {
      throw new Error('Not a valid message');
    }

    const blockingCard = this.gameServer.gameState.getCardFromAnywhere(
      msg.blockingCardInstanceId
    );

    if (!blockingCard) {
      throw new Error('Blocking Card not found');
    }

    // make sure the player owns the card
    if (blockingCard.ownerPlayerUserId !== sourcePlayer.userId) {
      throw new Error('Player does not own card');
    }

    // make sure the card is in play
    const zone = this.gameServer.gameState.getZoneByInstanceId(
      blockingCard.residingZoneInstanceId
    );
    if (!ZoneEnumMethods.isBoard(zone.zoneEnum)) {
      throw new Error('Card not in play');
    }

    // no restrictions on zone until the effect is actually evaluated
    // we will let the player do surprising things with movement effects

    const newOrder = msg.newBlockingPosition;

    this.gameServer.reorderBlockingCard(blockingCard, newOrder);
  };

  protected onStopCardBlocking = (playerSocket: any, data: any): void => {
    const msg = StopCardBlockingMessage.fromJSON(data);

    const sourcePlayer = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );

    if (!sourcePlayer) {
      throw new Error('Not a valid message');
    }

    const blockingCard = this.gameServer.gameState.getCardFromAnywhere(
      msg.blockingCardInstanceId
    );

    if (!blockingCard) {
      throw new Error('Blocking Card not found');
    }

    // make sure the player owns the card
    if (blockingCard.ownerPlayerUserId !== sourcePlayer.userId) {
      throw new Error('Player does not own card');
    }

    // make sure the card is in play
    const zone = this.gameServer.gameState.getZoneByInstanceId(
      blockingCard.residingZoneInstanceId
    );
    if (!ZoneEnumMethods.isBoard(zone.zoneEnum)) {
      throw new Error('Card not in play');
    }

    // no restrictions on zone until the effect is actually evaluated
    // we will let the player do surprising things with movement effects

    this.gameServer.stopCardBlocking(blockingCard.instanceId);
  };

  protected onCardMovedRow = (playerSocket: any, data: any): void => {
    const msg = QueueCardMovedRowMessage.fromJSON(data);

    const sourcePlayer = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );

    if (!sourcePlayer) {
      throw new Error('Not a valid message');
    }

    const movedCard = this.gameServer.gameState.getCardFromAnywhere(
      msg.movedCardInstanceId
    );

    if (!movedCard) {
      throw new Error('Card not found');
    }

    // make sure the player owns the card
    if (movedCard.ownerPlayerUserId !== sourcePlayer.userId) {
      throw new Error('Player does not own card');
    }

    // Check if the card is moving from front to back or back to front
    const zone = this.gameServer.gameState.getZoneByInstanceId(
      movedCard.residingZoneInstanceId
    );
    if (!zone) {
      throw new Error('Zone not found');
    }
    if (zone.ownerPlayerUserId !== sourcePlayer.userId) {
      throw new Error('Player does not own zone');
    }
    if (zone.zoneEnum === ZoneEnum.FrontBoard) {
      if (msg.originZoneZoneEnum !== ZoneEnum.FrontBoard) {
        throw new Error('Invalid origin zone');
      }
      if (msg.destinationZoneZoneEnum !== ZoneEnum.BackBoard) {
        throw new Error('Invalid destination zone');
      }
    }
    if (zone.zoneEnum === ZoneEnum.BackBoard) {
      if (msg.originZoneZoneEnum !== ZoneEnum.BackBoard) {
        throw new Error('Invalid origin zone');
      }
      if (msg.destinationZoneZoneEnum !== ZoneEnum.FrontBoard) {
        throw new Error('Invalid destination zone');
      }
    }

    // check if we're in the right phase
    if (
      GameProperties.phasesCardsCanMoveRowsIn.includes(
        this.gameServer.gameState.currentPhaseIndex
      )
    ) {
      throw new Error('Invalid phase');
    }

    // check if the card is already moving
    if (this.gameServer.alreadyFightingBlockingOrMoving(movedCard.instanceId)) {
      throw new Error('Card already fighting, moving or blocking');
    }

    this.gameServer.queueCardMovedRow(
      msg.messageId,
      movedCard.instanceId,
      sourcePlayer.userId,
      movedCard.getStatList().find((s) => s.name === 'Priority').effectiveValue,
      msg.originZoneZoneEnum,
      msg.destinationZoneZoneEnum
    );
  };

  protected onQueueFightCreature = (playerSocket: any, data: any): void => {
    const msg = QueueFightCreatureMessage.fromJSON(data);

    const sourcePlayer = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );

    if (!sourcePlayer) {
      throw new Error('Not a valid message');
    }

    const attackingCard = this.gameServer.gameState.getCardFromAnywhere(
      msg.attackingCardInstanceId
    );

    if (!attackingCard) {
      throw new Error('Attacking Card not found');
    }

    const attackedCard = this.gameServer.gameState.getCardFromAnywhere(
      msg.attackedCardInstanceId
    );

    if (!attackedCard) {
      throw new Error('Attacked Card not found');
    }

    // make sure the player owns the card
    if (attackingCard.ownerPlayerUserId !== sourcePlayer.userId) {
      throw new Error('Player does not own attacking card');
    }

    // make sure the card is in play
    const zone = this.gameServer.gameState.getZoneByInstanceId(
      attackingCard.residingZoneInstanceId
    );

    if (!ZoneEnumMethods.isBoard(zone.zoneEnum)) {
      throw new Error('Attacking card not in play');
    }

    // make sure the other card is the opponents and in play
    if (attackedCard.ownerPlayerUserId === sourcePlayer.userId) {
      throw new Error('Attacked card is owned by the player');
    }
    const attackedZone = this.gameServer.gameState.getZoneByInstanceId(
      attackedCard.residingZoneInstanceId
    );

    if (!ZoneEnumMethods.isBoard(attackedZone.zoneEnum)) {
      throw new Error('Attacked card not in play');
    }

    // make sure we're in the right phase
    if (PhaseEnum.Battle !== this.gameServer.gameState.currentPhaseIndex) {
      throw new Error('Invalid phase');
    }

    // make sure the attacking card isn't already fighting, moving or blocking
    if (
      this.gameServer.alreadyFightingBlockingOrMoving(attackingCard.instanceId)
    ) {
      throw new Error('Attacking card already fighting, moving or blocking');
    }

    // send to server
    this.gameServer.queueFightCreature(
      msg.messageId,
      attackingCard,
      attackedCard,
      sourcePlayer,
      attackingCard.getStatList().find((s) => s.name === 'Priority')
        .effectiveValue
    );
  };

  protected onPlayerFinishedAddedingToQueue(
    playerSocket: any,
    data: any
  ): void {
    // get the player from the socketId
    const msg = PlayerReadyForQueueMessage.fromJSON(data);

    const playerInfo = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );

    if (!playerInfo) {
      throw new Error('Message is not valid');
    }

    // make sure we're in the right phase
    // (any phase that can have a queue - all phases except recruit)
    if (this.gameServer.gameState.currentPhaseIndex === PhaseEnum.Recruit) {
      throw new Error('Invalid phase');
    }

    this.gameServer.playerReadyForQueueExecution(playerInfo);
  }

  protected onPlayerExploredLand(playerSocket: any, data: any): void {
    const msg = PlayerExploredLandMessage.fromJSON(data);

    if (!msg || !msg.validate()) {
      console.log('Message is not valid');
      console.log('msg: ' + JSON.stringify(msg));
      console.log('data: ' + JSON.stringify(data));
      throw new Error('Message is not valid');
    }

    const playerInfo = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );

    if (!playerInfo) {
      throw new Error('Message is not valid');
    }

    // get landtile
    const landTile = playerInfo.realm.getLandTile(msg.landTileId);

    if (!landTile) {
      console.log('Land tile not found:');
      console.log('msg.landTileId: ' + msg.landTileId);
      throw new Error('Land tile not found');
    }

    // make sure we're in the right phase
    if (PhaseEnum.Recruit !== this.gameServer.gameState.currentPhaseIndex) {
      throw new Error('Invalid phase');
    }

    // get explored tiles
    const exploredTiles = playerInfo.realm.landTiles.filter(
      (l: RuntimeLandTile) => l.explored
    );

    // make sure the player hasn't explored yet this turn
    if (this.gameServer.gameState.currentTurn < exploredTiles.length) {
      throw new Error(
        'Player has already explored this turn: ' +
          'this.gameServer.gameState.currentTurn < exploredTiles.length but currentTurn ' +
          this.gameServer.gameState.currentTurn +
          ' exploredTiles.length: ' +
          exploredTiles.length
      );
    }
    // make sure the land hasn't yet been explored
    if (landTile.explored) {
      throw new Error('Land tile has already been explored');
    }

    // make sure the tile is the neighbor of an explored tile
    // (the city tile should already be explored)
    if (!landTile.anyNeighborExplored(playerInfo.realm.landTiles)) {
      const exploredTiles = playerInfo.realm.landTiles.filter(
        (l) => l.explored
      );
      console.log(exploredTiles);
      throw new Error('Land tile is not adjacent to an explored tile');
    }

    this.gameServer.playerExploredLand(playerInfo, landTile);
  }

  protected onQueuePlayCard(playerSocket: any, data: any): void {
    const msg = QueuePlayCardMessage.fromJSON(data);

    const playerInfo = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );

    if (!playerInfo) {
      throw new Error('Message is not valid');
    }

    // card
    const card = this.gameServer.gameState.getCardFromAnywhere(
      msg.cardInstanceId
    );

    if (!card) {
      throw new Error('Card not found');
    }

    // make sure the player owns the card
    if (card.ownerPlayerUserId !== playerInfo.userId) {
      throw new Error('Player does not own card');
    }

    // make sure the card is in the hand and going to the board
    const confirmedOriginZone = playerInfo.getFriendlyZoneFromZoneEnum(
      ZoneEnum.Hand
    );
    if (!confirmedOriginZone) {
      throw new Error('Hand zone not found');
    }

    const confirmedDestinationZone = playerInfo.getFriendlyZoneFromZoneEnum(
      msg.destinationZoneZoneEnum
    );
    if (!confirmedDestinationZone) {
      throw new Error('Destination zone not found');
    }
    if (!ZoneEnumMethods.isBoard(confirmedDestinationZone.zoneEnum)) {
      throw new Error('Card not going to board');
    }

    // check if in right phase
    if (
      !GameProperties.phasesCardsCanBePlayedIn.includes(
        this.gameServer.gameState.currentPhaseIndex
      )
    ) {
      throw new Error('Invalid phase');
    }

    // make sure that the card hasn't been queued to be played already
    if (
      this.gameServer.queue.find(
        (q) =>
          q instanceof PlayCardQueueLine &&
          q.sourceCardInstanceId === card.instanceId
      )
    ) {
      throw new Error('Card already queued to be played');
    }

    // check that the costs were paid and were valid
    const libraryCard = this.gameServer.gameState.gameManager.cardLibrary.find(
      (c) => c.libraryId === card.libraryId
    );
    if (!libraryCard) {
      throw new Error('Library card not found');
    }

    const costs = libraryCard.costs;
    if (!costs) {
      throw new Error('Costs not found');
    }

    if (!playerInfo.canPayResourceCosts(costs)) {
      throw new Error('Cannot pay resource costs');
    }

    // pay the costs and save them
    const paidCosts = playerInfo.payResourceCosts(costs, msg.paidCosts);

    console.log('handler msg.messageId: ' + msg.messageId);

    this.gameServer.queuePlayCard(
      msg.messageId,
      card,
      playerInfo,
      msg.targetInfoList,
      paidCosts,
      card.getStatList().find((s) => s.name === 'Priority').effectiveValue,
      confirmedOriginZone.zoneEnum,
      confirmedDestinationZone.zoneEnum
    );
  }

  protected onCancelAction(playerSocket: any, data: any): void {
    const msg = CancelActionMessage.fromJSON(data);

    const playerInfo = this.validateMessageAndReturnPlayer(
      playerSocket.id,
      msg
    );

    if (!playerInfo) {
      throw new Error('Message is not valid');
    }

    // make sure that the player has not yet declared that they are finished with the queue
    if (playerInfo.readyForQueue) {
      throw new Error('Player has already declared that they are finished');
    }

    // find the queueline that the player is trying to cancel
    const queueline = this.gameServer.queue.find(
      (q) => q.clientMessageId === msg.messageIdToCancel
    );

    if (!queueline) {
      console.log('queue: ' + JSON.stringify(this.gameServer.queue));
      console.log('msg: ' + JSON.stringify(msg));
      throw new Error('Queueline not found');
    }

    // remove the queueline from the queue
    const index = this.gameServer.queue.indexOf(queueline);
    if (index > -1) {
      this.gameServer.queue.splice(index, 1);
    }

    // give the mana back to the player
    if (queueline instanceof TargetsCostsQueueline) {
      for (let cost of queueline.paidCosts) {
        playerInfo.idToStat.get(cost.statId).baseValue += cost.value;
      }
    }
  }
}
