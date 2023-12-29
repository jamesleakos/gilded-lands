import RuntimeKeyword from '../../RuntimeKeyword';
import RuntimeKeywordValue from '../../RuntimeKeywordValue';
import { KeywordType } from '../../../../../Enums/Keyword';
import RuntimeCondition from '../../../../Condition/RuntimeCondition';
declare class OverkillKeyword extends RuntimeKeyword {
    constructor(myEntityId: number, keywordType: KeywordType, indexForUpgrades: number | null, setDescription: string, setIsPermanent: boolean, setDuration: number, keywordValueList: RuntimeKeywordValue[], isActive: boolean, conditions: RuntimeCondition[], imageName: string);
}
export default OverkillKeyword;
