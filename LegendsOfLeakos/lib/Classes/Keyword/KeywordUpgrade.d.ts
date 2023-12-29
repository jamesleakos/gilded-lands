import { KeywordType } from '../../Enums/Keyword';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import KeywordValueUpgrade from './KeywordValueUpgrade';
import RuntimeKeyword from './RuntimeKeyword/RuntimeKeyword';
import CardCondition from '../Condition/CardCondition';
import { ConditionType } from '../../Enums/Condition';
declare class KeywordUpgrade {
    keywordType: KeywordType;
    keywordUpgradeIndex: number;
    isPermanent: boolean;
    durationChange: ModifiableInt;
    keywordValueUpgrades: KeywordValueUpgrade[];
    isActive: boolean;
    newConditions: CardCondition[];
    removeCondtionsOfType: ConditionType[];
    constructor(keywordType: KeywordType, keywordUpgradeIndex: number, isPermanent: boolean, durationChange: ModifiableInt, keywordValueUpgrades: KeywordValueUpgrade[], isActive: boolean);
    upgradeKeyword(keyword: RuntimeKeyword): void;
    toJSON(): any;
    static fromJSON(json: any): KeywordUpgrade;
}
export default KeywordUpgrade;
