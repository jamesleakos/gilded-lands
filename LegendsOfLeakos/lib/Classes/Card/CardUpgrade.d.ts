import RuntimeAbility from '../Ability/RuntimeAbility';
import ActivatedAbilityUpgrade from '../Ability/RuntimeAbilityUpgrade';
import GameManager from '../Game/GameManager';
import PayResourceCost from '../PayResourceCost/PayResourceCost';
import RuntimeCard from './RuntimeCard';
import StatUpgrade from '../Stat/StatUpgrade';
import KeywordUpgrade from '../Keyword/KeywordUpgrade/KeywordUpgrade';
declare class CardUpgrade {
    name: string;
    upgradeIndex: number;
    isStartingUpgrade: boolean;
    activatedAbility: RuntimeAbility;
    costs: PayResourceCost[];
    upgradeNeighbors: number[];
    description: string;
    attackStatUpgrade: StatUpgrade;
    lifeStatUpgrade: StatUpgrade;
    priorityStatUpgrade: StatUpgrade;
    keywordUpgrades: KeywordUpgrade[];
    activatedAbilityUpgrades: ActivatedAbilityUpgrade[];
    potentialNeighbors(gameManager: GameManager): number[];
    upgradeCard(card: RuntimeCard): void;
    toJSON(): any;
    static fromJSON(json: any): CardUpgrade;
}
export default CardUpgrade;
