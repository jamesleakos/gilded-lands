import Stat from '../Stat/Stat';
import GameProperties from '../Game/GameProperties';

class PayResourceCost {
  statId: number;
  value: number;

  constructor(statId: number, value: number) {
    this.statId = statId;
    this.value = value;
  }

  costName(): string {
    return GameProperties.playerStats.find(
      (x: Stat) => x.statId === this.statId
    )!.name;
  }

  clone(): PayResourceCost {
    return PayResourceCost.fromJSON(this);
  }

  toJSON(): any {
    return {
      statId: this.statId,
      value: this.value,
    };
  }

  static fromJSON(json: any): PayResourceCost {
    return new PayResourceCost(json.statId, json.value);
  }

  static isLibraryJSONValid(json: any): boolean {
    const playerStat = GameProperties.playerStats.find(
      (x: Stat) => x.statId === json.statId
    );
    if (playerStat === undefined) return false;

    if (
      typeof json.value !== 'number' ||
      json.value < playerStat.minValue ||
      json.value > playerStat.maxValue
    )
      return false;

    return true;
  }
}

export default PayResourceCost;
