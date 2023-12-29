import RuntimeKeyword from '../../RuntimeKeyword';
import Stat from '../../../../Stat/Stat';
import StatBuff from '../../../../Stat/StatBuff';
import RuntimeCard from '../../../../Card/RuntimeCard';
import GameState from '../../../../Game/GameState';
import RuntimeKeywordValue from '../../RuntimeKeywordValue';
import { KeywordType } from '../../../../../Enums/Keyword';
import RuntimeCondition from '../../../../Condition/RuntimeCondition';
declare class WarleaderKeyword extends RuntimeKeyword {
    constructor(setMyEntityId: number, keywordType: KeywordType, indexForUpgrades: number | null, setDescription: string, setIsPermanent: boolean, setDuration: number, keywordValueList: RuntimeKeywordValue[], isActive: boolean, conditions: RuntimeCondition[], imageName: string);
    addStatBuff(stat: Stat, statCard: RuntimeCard, gameState: GameState): StatBuff | null;
}
export default WarleaderKeyword;
