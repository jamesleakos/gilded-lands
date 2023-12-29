import PayResourceCost from '../PayResourceCost/PayResourceCost';
import { PhaseEnum } from '../../Enums/Phase';
import LibraryEffect from '../Effect/LibraryEffect';

class LibraryAbility {
  name: string;
  indexForUpgrades: number;
  image: string;
  effect: LibraryEffect;
  useableInPhases: PhaseEnum[] = [];
  // doubles as starts active if saved in the library
  isActive: boolean;
  costs: PayResourceCost[] = [];
  usesPerTurn: number;
  usesRemaining: number;

  constructor(
    indexForUpgrades: number,
    setName: string,
    setEffect: LibraryEffect,
    setCosts: PayResourceCost[],
    setUsesPerTurn: number,
    setUsesRemaining: number,
    useableInPhases: PhaseEnum[],
    isActive: boolean,
    image: string
  ) {
    this.name = setName;
    this.indexForUpgrades = indexForUpgrades;
    this.effect = setEffect;
    this.isActive = isActive;

    setCosts.forEach((cost) => {
      const temp = new PayResourceCost(cost.statId, cost.value);
      this.costs.push(temp);
    });

    this.usesPerTurn = setUsesPerTurn;
    this.usesRemaining = setUsesRemaining;

    useableInPhases.forEach((phase) => {
      this.useableInPhases.push(phase);
    });

    this.image = image;
  }

  toJSON(): any {
    return {
      name: this.name,
      indexForUpgrades: this.indexForUpgrades,
      image: this.image,
      effect: this.effect.toJSON(),
      useableInPhases: this.useableInPhases,
      isActive: this.isActive,
      costs: this.costs.map((c) => c.toJSON()),
      usesPerTurn: this.usesPerTurn,
      usesRemaining: this.usesRemaining,
    };
  }

  static fromJSON(json: any): LibraryAbility {
    const newAbility = new LibraryAbility(
      json.indexForUpgrades,
      json.name,
      LibraryEffect.fromJSON(json.effect),
      json.costs.map((c: any) => PayResourceCost.fromJSON(c)),
      json.usesPerTurn,
      json.usesRemaining,
      json.useableInPhases,
      json.isActive,
      json.image
    );
    return newAbility;
  }
}

export default LibraryAbility;
