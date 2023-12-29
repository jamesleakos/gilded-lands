import Stat from '../Stat/Stat';
import RuntimeZone from '../Zone/RuntimeZone';
import RuntimeCard from '../Card/RuntimeCard';
import { ZoneEnum } from '../../Enums/Zone';
import { LandType } from '../../Enums/LandAndBiome';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import RuntimeLandTile from '../RealmsAndLand/LandTile/RuntimeLandTile';
import RuntimeRealm from '../RealmsAndLand/Realm/RuntimeRealm';
import GameState from '../Game/GameState';

class PlayerInfo {
  userId: string;
  // essentially just the index of when they joined
  id: number;
  name: string;
  isConnected: boolean;
  isHuman: boolean;

  stats: Stat[] = [];
  nameToStat: Map<string, Stat>;
  idToStat: Map<number, Stat>;
  zones: RuntimeZone[];
  // landTiles: RuntimeLandTile[]; // i think I'd rather use the realm here, instead of duplicating objects
  realm: RuntimeRealm;

  /**
   * Each time an entity is created, it is given a unique instanceId. This is used to identify the entity.
   * It should thus be incremented each time an entity is created.
   */
  currentEntityInstanceId: number;
  readyForQueue: boolean;

  clone(): PlayerInfo {
    const clone = new PlayerInfo();
    clone.userId = this.userId;
    clone.id = this.id;
    clone.name = this.name;
    clone.isConnected = this.isConnected;
    clone.isHuman = this.isHuman;
    clone.stats = this.stats.map((stat) => stat.clone());
    clone.nameToStat = new Map<string, Stat>();
    clone.idToStat = new Map<number, Stat>();
    for (const stat of clone.stats) {
      clone.nameToStat.set(stat.name, stat);
      clone.idToStat.set(stat.statId, stat);
    }
    clone.zones = this.zones.map((zone) => zone.clone());
    clone.realm = this.realm.clone();
    clone.currentEntityInstanceId = this.currentEntityInstanceId;
    clone.readyForQueue = this.readyForQueue;
    return clone;
  }

  // #region Get Cards

  getCardFromInstanceId(cardInstanceId: number): RuntimeCard | null {
    for (const zone of this.zones) {
      const tempCard = zone.cards.find((x) => x.instanceId === cardInstanceId);
      if (tempCard !== undefined) {
        return tempCard;
      }
    }
    return null;
  }

  getAllFriendlyCardsInPlay(): Array<RuntimeCard> {
    const cardList: Array<RuntimeCard> = new Array<RuntimeCard>();
    6;

    cardList.push(
      ...this.getFriendlyZoneFromZoneEnum(ZoneEnum.BackBoard).cards
    );
    cardList.push(
      ...this.getFriendlyZoneFromZoneEnum(ZoneEnum.FrontBoard).cards
    );
    cardList.push(
      ...this.getFriendlyZoneFromZoneEnum(ZoneEnum.BattleBoard).cards
    );

    return cardList;
  }

  // #endregion

  // #region Get Zones

  getFriendlyZoneContainingCard(cardInstanceId: number): RuntimeZone {
    for (const zone of this.zones) {
      const tempCard = zone.cards.find((x) => x.instanceId === cardInstanceId);
      if (tempCard !== undefined) {
        return zone;
      }
    }
    return null;
  }

  getZoneFromInstanceId(zoneInstanceId: number): RuntimeZone {
    const zone = this.zones.find((x) => x.instanceId === zoneInstanceId);
    return this.zones.find((c) => c.instanceId === zoneInstanceId);
  }

  getFriendlyZoneFromZoneEnum(zoneEnum: ZoneEnum): RuntimeZone | undefined {
    return this.zones.find((c) => c.zoneEnum === zoneEnum);
  }

  // #endregion

  // #region Costs and Mana

  setPlayerManaFromLand(): void {
    this.nameToStat.get('ForestMana')!.baseValue = 0;
    this.nameToStat.get('OceanMana')!.baseValue = 0;
    this.nameToStat.get('DesertMana')!.baseValue = 0;
    this.nameToStat.get('MountainMana')!.baseValue = 0;
    this.nameToStat.get('PrairieMana')!.baseValue = 0;
    this.nameToStat.get('FellsMana')!.baseValue = 0;
    this.nameToStat.get('TundraMana')!.baseValue = 0;
    for (const landTile of this.realm.landTiles) {
      if (landTile.explored) {
        switch (landTile.landType) {
          case LandType.forest:
            this.nameToStat.get('ForestMana')!.baseValue += 1;
            break;
          case LandType.ocean:
            this.nameToStat.get('OceanMana')!.baseValue += 1;
            break;
          case LandType.desert:
            this.nameToStat.get('DesertMana')!.baseValue += 1;
            break;
          case LandType.mountain:
            this.nameToStat.get('MountainMana')!.baseValue += 1;
            break;
          case LandType.prairie:
            this.nameToStat.get('PrairieMana')!.baseValue += 1;
            break;
          case LandType.fells:
            this.nameToStat.get('FellsMana')!.baseValue += 1;
            break;
          case LandType.tundra:
            this.nameToStat.get('TundraMana')!.baseValue += 1;
            break;
        }
      }
    }
  }

  payResourceCosts(
    costs: Array<PayResourceCost>,
    goalManaSpend: Array<PayResourceCost> | null = null
  ): Array<PayResourceCost> | null {
    if (!this.canPayResourceCosts(costs)) {
      console.log('CANNOT PAY COSTS');
      return null;
    }

    const outList: Array<PayResourceCost> = new Array<PayResourceCost>();

    for (const cost of costs) {
      if (this.nameToStat.get('AnyMana')!.statId !== cost.statId) {
        this._payResourceCost(
          this.idToStat.get(cost.statId)!,
          cost.value,
          outList
        );
      }
    }

    const anyCost = costs.find(
      (x) => x.statId === this.nameToStat.get('AnyMana')!.statId
    );
    if (anyCost !== undefined) {
      let anyValueRemaining = anyCost.value;
      if (goalManaSpend != null) {
        for (const cost of goalManaSpend) {
          if (anyValueRemaining > 0) {
            this._payResourceCost(
              this.idToStat.get(cost.statId)!,
              Math.min(anyValueRemaining, cost.value),
              outList
            );
            anyValueRemaining -= cost.value;
          }
        }
      }

      for (const stat of this.stats) {
        if (anyValueRemaining > 0) {
          if (this.nameToStat.get('Life')!.statId !== stat.statId) {
            const reduceBy = Math.min(anyValueRemaining, stat.effectiveValue);
            this._payResourceCost(stat, reduceBy, outList);
            anyValueRemaining -= reduceBy;
          }
        }
      }
    }
    return outList;
  }

  private _payResourceCost(
    stat: Stat,
    cost: number,
    outlist: Array<PayResourceCost>
  ): void {
    // Pay the cost from this playerInfo's stats
    stat.baseValue -= cost;

    // Add the payment to the outlist

    // Check if this stat has already been used in outlist
    const tempCost = outlist.find((c) => c.statId === stat.statId);

    // If not, add it
    if (tempCost === undefined) {
      const newCost = new PayResourceCost(stat.statId, cost);
      outlist.push(newCost);
    }
    // If so, just increase the value
    else {
      tempCost.value += cost;
    }
  }

  canPayResourceCosts(costs: Array<PayResourceCost>): boolean {
    const availableResources: Array<PayResourceCost> = [];

    for (const playerResource of this.stats) {
      const tempPRC = new PayResourceCost(
        playerResource.statId,
        playerResource.effectiveValue
      );
      availableResources.push(tempPRC);
    }

    for (const cost of costs) {
      if (this.nameToStat.get('AnyMana').statId !== cost.statId) {
        const availableResource = availableResources.find(
          (ar) => ar.statId === cost.statId
        );
        if (availableResource && availableResource.value < cost.value) {
          return false;
        }
        if (availableResource) {
          availableResource.value -= cost.value;
        }
      }
    }

    let remainingMana = 0;
    for (const c of availableResources) {
      if (c.statId !== this.nameToStat.get('Life').statId) {
        remainingMana += c.value;
      }
    }

    const anyCost = costs.find(
      (x) => x.statId === this.nameToStat.get('AnyMana').statId
    );
    if (anyCost !== undefined) {
      if (anyCost.value > remainingMana) {
        return false;
      }
    }

    return true;
  }

  // #endregion

  // #region JSON

  /**
   * This is a complete copy of the player's state, to send to the player themselves.
   * It includes cards in zones that should be visible to them and not the opponent (hand)
   */
  toJSONForPlayer(): any {
    const json: any = {};
    json.name = this.name;
    json.userId = this.userId;
    json.id = this.id;
    json.currentEntityInstanceId = this.currentEntityInstanceId;

    // Copy player stats.
    json.stats = this.stats.map((stat) => stat.toJSON());

    // Copy player zones - zone.toJSONForPlayer() will not include cards that should be hidden from the player
    json.zones = this.zones.map((zone) => zone.toJSONForPlayer());

    // Copy realm
    json.realm = this.realm.toJSONFullCopy();

    return json;
  }

  /**
   * This is a complete copy of the player's state, to send to the opponent.
   * It does not include cards in zones that should be hidden from the opponent (hand)
   */
  toJSONForOpponent(): any {
    const json: any = {};
    json.name = this.name;
    json.userId = this.userId;
    json.id = this.id;
    json.currentEntityInstanceId = this.currentEntityInstanceId;

    // Copy player stats.
    json.stats = this.stats.map((stat) => stat.toJSON());

    // Copy player zones - zone.toJSONForOpponent() will not include cards that should be hidden from the opponent
    json.zones = this.zones.map((zone) => zone.toJSONForOpponent());

    // Copy land and realm
    json.realm = this.realm.toJSONForOpponent();

    return json;
  }

  /**
   * for use once the game is going - it's unclear to me, if this needs to be parsed away
   * if this will work because of the circular references inherant in giving the gameState
   */
  static fromRuntimeJSON(json: any): PlayerInfo {
    const playerInfo = new PlayerInfo();
    playerInfo.name = json.name;
    playerInfo.userId = json.userId;
    playerInfo.id = json.id;
    playerInfo.currentEntityInstanceId = json.currentEntityInstanceId;

    // Copy player stats.
    playerInfo.stats = json.stats.map((stat: any) =>
      Stat.fromRuntimeJSON(stat)
    );
    playerInfo.nameToStat = new Map<string, Stat>();
    playerInfo.idToStat = new Map<number, Stat>();
    for (const stat of playerInfo.stats) {
      playerInfo.nameToStat.set(stat.name, stat);
      playerInfo.idToStat.set(stat.statId, stat);
    }

    // Copy player zones.
    playerInfo.zones = json.zones.map((zone: any) =>
      RuntimeZone.fromRuntimeJSON(zone)
    );

    // Copy land and realm
    playerInfo.realm = RuntimeRealm.fromRuntimeJSON(json.realm);

    return playerInfo;
  }

  // #endregion
}

export default PlayerInfo;
