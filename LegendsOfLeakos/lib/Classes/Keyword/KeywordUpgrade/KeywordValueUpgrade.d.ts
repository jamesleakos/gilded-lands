import { KeywordValueType } from '../../../Enums/Keyword';
import ModifiableInt from '../../ModifableInt/ModifiableInt';
declare class KeywordValueUpgrade {
    keywordValueType: KeywordValueType;
    valueChanges: ModifiableInt[];
    constructor(keywordValueType: KeywordValueType, valueChanges: ModifiableInt[]);
    toJSON(): any;
    static fromJSON(json: any): KeywordValueUpgrade;
}
export default KeywordValueUpgrade;
