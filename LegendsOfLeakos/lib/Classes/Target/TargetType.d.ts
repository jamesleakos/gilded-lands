import { TargetTypeEnum, TargetableTypeSelectionEnum } from '../../Enums/Target';
import Condition from '../Condition/Condition';
import GameState from '../Game/GameState';
import TargetInfo from './TargetInfo';
declare class TargetCriteria {
    name: string;
    targetTypeEnum: TargetTypeEnum;
    targetableTypeSelectionEnum: TargetableTypeSelectionEnum;
    minSelectionsRequired: number;
    maxSelectionsAllowed: number;
    minSelectionsThatMustRemain: number;
    conditions: Array<Condition>;
    playerSelectsTarget: boolean;
    constructor(name: string, targetTypeEnum: TargetTypeEnum, minSelectionsRequired: number, maxSelectionsAllowed: number, minSelectionsThatMustRemain: number, targetableTypeSelectionEnum: TargetableTypeSelectionEnum, conditions: Array<Condition>);
    autoSelectTargetInfo(sourceEntityInstanceId: number, gameState: GameState): TargetInfo;
    entitySatisfiesConditions(targetEntityInstanceId: number, sourceEntityInstanceId: number, gameState: GameState): boolean;
    clone(): TargetCriteria;
    toJSON(): any;
    static fromJSON(targetTypeJSON: any): TargetCriteria;
    static isJSONValid(json: any): boolean;
}
export default TargetCriteria;
