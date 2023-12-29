import { KeywordType } from '../../../Enums/Keyword';
import ModifiableInt from '../../ModifableInt/ModifiableInt';
import RuntimeKeyword from '../RuntimeKeyword/RuntimeKeyword';
import { ConditionType } from '../../../Enums/Condition';
import RuntimeCondition from '../../Condition/RuntimeCondition';
declare class KeywordUpgrade {
    keywordType: KeywordType;
    keywordUpgradeIndex: number;
    isPermanent: boolean;
    durationChange: ModifiableInt;
    isActive: boolean;
    newConditions: RuntimeCondition[];
    removeConditionsOfType: ConditionType[];
    constructor(keywordType: KeywordType, keywordUpgradeIndex: number, isPermanent: boolean, durationChange: ModifiableInt, isActive: boolean);
    upgradeKeyword(keyword: RuntimeKeyword): void;
    toJSON(): any;
    static fromJSON(json: any): KeywordUpgrade;
}
export default KeywordUpgrade;
