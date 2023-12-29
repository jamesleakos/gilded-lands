import PayResourceCost from '../PayResourceCost/PayResourceCost';
import RuntimeEffect from '../Effect/RuntimeEffect';
import { PhaseEnum } from '../../Enums/Phase';
import GameState from '../Game/GameState';
import GameProperties from '../Game/GameProperties';
import Player from '../Player/Player';
import PlayerInfo from '../Player/PlayerInfo';
// Import other required classes and types

class RuntimeAbility {
  name: string;
  indexForUpgrades: number;
  image: string;
  effect: RuntimeEffect;
  useableInPhases: PhaseEnum[] = [];
  // doubles as starts active if saved in the library
  isActive: boolean;
  costs: PayResourceCost[] = [];
  usesPerTurn: number;
  usesRemaining: number;

  constructor(
    indexForUpgrades: number,
    setName: string,
    setEffect: RuntimeEffect,
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

  isActivatable(owner: PlayerInfo, gameState: GameState): boolean {
    if (this.usesRemaining <= 0) {
      return false;
    }
    if (!this.isActive) {
      return false;
    }
    if (
      !this.useableInPhases.includes(
        GameProperties.gamePhases[gameState.currentPhaseIndex].phaseEnum
      )
    ) {
      return false;
    }
    if (!owner.canPayResourceCosts(this.costs)) {
      return false;
    }
    return true;
  }

  onEndTurn(): void {
    this.usesRemaining = this.usesPerTurn;
    // effect end turn
  }

  // #region JSON

  clone(): RuntimeAbility {
    return new RuntimeAbility(
      this.indexForUpgrades,
      this.name,
      this.effect.clone(),
      this.costs.map((cost) => cost.clone()),
      this.usesPerTurn,
      this.usesRemaining,
      this.useableInPhases,
      this.isActive,
      this.image
    );
  }

  toJSON(): any {
    return {
      indexForUpgrades: this.indexForUpgrades,
      name: this.name,
      effect: this.effect.toJSON(),
      costs: this.costs.map((cost) => cost.toJSON()),
      usesPerTurn: this.usesPerTurn,
      usesRemaining: this.usesRemaining,
      useableInPhases: this.useableInPhases.map((phase) => PhaseEnum[phase]),
      isActive: this.isActive,
      image: this.image,
    };
  }

  static fromRuntimeJSON(json: any): RuntimeAbility {
    return new RuntimeAbility(
      json.indexForUpgrades,
      json.name,
      RuntimeEffect.fromRuntimeJSON(json.effect),
      json.costs.map((cost: any) => PayResourceCost.fromJSON(cost)),
      json.usesPerTurn,
      json.usesRemaining,
      json.useableInPhases.map(
        (phase: any) => PhaseEnum[phase as keyof typeof PhaseEnum]
      ),
      json.isActive,
      json.image
    );
  }

  static fromLibraryJSON(json: any): RuntimeAbility {
    return new RuntimeAbility(
      json.indexForUpgrades,
      json.name,
      RuntimeEffect.fromLibraryJSON(json.effect),
      json.costs.map((cost: any) => PayResourceCost.fromJSON(cost)),
      json.usesPerTurn,
      json.usesRemaining,
      json.useableInPhases.map(
        (phase: any) => PhaseEnum[phase as keyof typeof PhaseEnum]
      ),
      json.isActive,
      json.image
    );
  }

  static isLibraryJSONValid(json: any): boolean {
    if (typeof json.indexForUpgrades !== 'number') {
      console.log('Invalid JSON: indexForUpgrades is not a number');
      return false;
    }
    if (typeof json.name !== 'string') {
      console.log('Invalid JSON: name is not a string');
      return false;
    }
    if (!RuntimeEffect.isLibraryJSONValid(json.effect)) {
      console.log('Invalid JSON: effect is not valid');
      return false;
    }
    if (
      !Array.isArray(json.costs) ||
      !json.costs.every((c: any) => PayResourceCost.isLibraryJSONValid(c))
    ) {
      console.log('Invalid JSON: costs is not an array');
      return false;
    }
    for (const cost of json.costs) {
      if (!PayResourceCost.isLibraryJSONValid(cost)) {
        console.log('Invalid JSON: cost is not valid');
        return false;
      }
    }
    if (typeof json.usesPerTurn !== 'number') {
      console.log('Invalid JSON: usesPerTurn is not a number');
      return false;
    }
    if (!Array.isArray(json.useableInPhases)) {
      console.log('Invalid JSON: useableInPhases is not an array');
      return false;
    }
    for (const phase of json.useableInPhases) {
      if (typeof phase !== 'string') {
        console.log('Invalid JSON: phase is not a string');
        return false;
      }
      if (!Object.values(PhaseEnum).includes(phase)) {
        console.log('Invalid JSON: phase is not a valid PhaseEnum');
        return false;
      }
    }
    return true;
  }

  // #endregion
}

export default RuntimeAbility;
