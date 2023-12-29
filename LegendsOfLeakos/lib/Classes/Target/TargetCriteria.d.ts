import { TargetTypeEnum, TargetableTypeSelectionEnum } from '../../Enums/Target';
import RuntimeCondition from '../Condition/RuntimeCondition';
import GameState from '../Game/GameState';
import TargetInfo from './TargetInfo';
declare class TargetCriteria {
    name: string;
    targetTypeEnum: TargetTypeEnum;
    targetableTypeSelectionEnum: TargetableTypeSelectionEnum;
    minSelectionsRequired: number;
    maxSelectionsAllowed: number;
    minSelectionsThatMustRemain: number;
    conditions: Array<RuntimeCondition>;
    playerSelectsTarget: boolean;
    constructor(name: string, targetTypeEnum: TargetTypeEnum, minSelectionsRequired: number, maxSelectionsAllowed: number, minSelectionsThatMustRemain: number, targetableTypeSelectionEnum: TargetableTypeSelectionEnum, conditions: Array<RuntimeCondition>);
    autoSelectTargetInfo(sourceEntityInstanceId: number, gameState: GameState): TargetInfo;
    areTargetsAvailable(sourceEntityInstanceId: number, gameState: GameState): boolean;
    isTargetInfoValid(sourceEntityInstanceId: number, targetInfo: TargetInfo, gameState: GameState): boolean;
    isEntityAValidTarget(sourceEntityInstanceId: number, targetEntityInstanceId: number, gameState: GameState): boolean;
    clone(): TargetCriteria;
    toJSON(): any;
    static fromRuntimeJSON(targetTypeJSON: any): TargetCriteria;
    static fromLibraryJSON(targetTypeJSON: any): TargetCriteria;
    static isLibraryJSONValid(json: any): boolean;
}
export default TargetCriteria;
