import RuntimeKeyword from '../../RuntimeKeyword';
import RuntimeKeywordValue from '../../RuntimeKeywordValue';
import TargetableRuntimeEntity from '../../../../Entity/TargetableRuntimeEntity';
import GameState from '../../../../Game/GameState';
import RuntimeEffect from '../../../../Effect/RuntimeEffect';
import RuntimeCard from '../../../../Card/RuntimeCard';
import TargetInfo from '../../../../Target/TargetInfo';
import { KeywordType } from '../../../../../Enums/Keyword';
import RuntimeCondition from '../../../../Condition/RuntimeCondition';
declare class DivineShieldKeyword extends RuntimeKeyword {
    constructor(myEntityId: number, keywordType: KeywordType, indexForUpgrades: number | null, setDescription: string, setIsPermanent: boolean, setDuration: number, keywordValueList: RuntimeKeywordValue[], isActive: boolean, conditions: RuntimeCondition[], imageName: string);
    useShield(gameState: GameState): void;
    preResolveEffect(myEnt: TargetableRuntimeEntity, e: RuntimeEffect, sourceCard: RuntimeCard, gameState: GameState, targetInfoList: TargetInfo[]): void;
}
export default DivineShieldKeyword;
