import { KeywordValueType } from '../../../Enums/Keyword';
declare class LibraryKeywordValueInfo {
    keywordValueType: KeywordValueType;
    numberOfValuesNeeded: number;
    setByDesigner: boolean;
    constructor(keywordValueType: KeywordValueType, numberOfValuesNeeded: number, setByDesigner: boolean);
}
export default LibraryKeywordValueInfo;
