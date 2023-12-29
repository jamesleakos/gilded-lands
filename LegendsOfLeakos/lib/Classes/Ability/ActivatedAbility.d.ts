import PayResourceCost from '../PayResourceCost/PayResourceCost';
import RuntimeEffect from '../Effect/RuntimeEffect';
import { PhaseEnum } from '../../Enums/Phase';
import GameState from '../Game/GameState';
import PlayerInfo from '../Player/PlayerInfo';
declare class RuntimeAbility {
    name: string;
    indexForUpgrades: number;
    image: string;
    effect: RuntimeEffect;
    useableInPhases: PhaseEnum[];
    isActive: boolean;
    costs: PayResourceCost[];
    usesPerTurn: number;
    usesRemaining: number;
    constructor(indexForUpgrades: number, setName: string, setEffect: RuntimeEffect, setCosts: PayResourceCost[], setUsesPerTurn: number, setUsesRemaining: number, useableInPhases: PhaseEnum[], isActive: boolean, image: string);
    isActivatable(owner: PlayerInfo, gameState: GameState): boolean;
    onEndTurn(): void;
    clone(): RuntimeAbility;
    toJSON(): any;
    static fromJSON(json: any): RuntimeAbility;
    static isJSONValid(json: any): boolean;
}
export default RuntimeAbility;
