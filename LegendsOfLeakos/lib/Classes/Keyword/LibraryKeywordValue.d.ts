import KeywordValue from './KeywordValue';
declare class LibraryKeywordValueInfo {
    keywordValue: KeywordValue;
    numberOfValuesNeeded: number;
    setByDesigner: boolean;
    constructor(keywordValue: KeywordValue, numberOfValuesNeeded: number, setByDesigner: boolean);
}
export default LibraryKeywordValueInfo;
