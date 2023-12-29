import RuntimeEffect from '../../RuntimeEffect';
import TargetInfo from '../../../Target/TargetInfo';
import TargetCriteria from '../../../Target/TargetCriteria';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import { ZoneEnum } from '../../../../Enums/Zone';
declare class MoveCardEffect extends RuntimeEffect {
    originZoneZoneEnum: ZoneEnum;
    destinationZoneZoneEnum: ZoneEnum;
    targetCriterias(): TargetCriteria[];
    constructor(originZoneZoneEnum: ZoneEnum, destinationZoneZoneEnum: ZoneEnum);
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
    areTargetsAvailable(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity): boolean;
    isAllTargetInfoValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfoList: TargetInfo[]): boolean;
    effectToString(): string;
    static createMoveCardEffect(originZoneZoneEnum: ZoneEnum, destinationZoneZoneEnum: ZoneEnum): MoveCardEffect;
    toJSON(): any;
    clone(): RuntimeEffect;
}
export default MoveCardEffect;
