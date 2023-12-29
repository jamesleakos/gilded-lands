import RuntimeKeyword from '../../RuntimeKeyword';
import RuntimeKeywordValue from '../../RuntimeKeywordValue';
import TargetableRuntimeEntity from '../../../Entity/TargetableRuntimeEntity';
import GameState from '../../../Game/GameState';
import Effect from '../../../Effect/Effect';
import RuntimeCard from '../../../Card/RuntimeCard';
import TargetInfo from '../../../Target/TargetInfo';
import { KeywordType } from '../../../../Enums/Keyword';
import Condition from '../../../Condition/Condition';
declare class ShieldedKeyword extends RuntimeKeyword {
    constructor(setMyEntityId: number, keywordType: KeywordType, indexForUpgrades: number | null, setDescription: string, setIsPermanent: boolean, setDuration: number, keywordValueList: RuntimeKeywordValue[], isActive: boolean, conditions: Condition[], imageName: string);
    preResolveEffect(myEnt: TargetableRuntimeEntity, e: Effect, sourceCard: RuntimeCard, gameState: GameState, targetInfoList: TargetInfo[]): void;
    postResolveEffect(myEnt: TargetableRuntimeEntity, e: Effect, sourceCard: RuntimeCard, gameState: GameState, targetInfoList: TargetInfo[]): void;
}
export default ShieldedKeyword;
