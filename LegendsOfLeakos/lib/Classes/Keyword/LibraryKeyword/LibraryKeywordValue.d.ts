import { KeywordValueType } from '../../../Enums/Keyword';
declare class LibraryKeywordValue {
    keywordValueType: KeywordValueType;
    values: number[];
    setByDesigner: boolean;
    constructor(keywordValueType: KeywordValueType, values: number[], setByDesigner: boolean);
    toJSON(): any;
    static fromLibraryJSON(json: any): LibraryKeywordValue;
}
export default LibraryKeywordValue;
