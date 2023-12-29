import { KeywordValueType } from '../../Enums/Keyword';
declare class RuntimeKeywordValue {
    keywordValueType: KeywordValueType;
    values: number[];
    constructor(keywordValueType: KeywordValueType, values: number[]);
    toJSON(): any;
    static fromRuntimeJSON(json: any): RuntimeKeywordValue;
    static fromLibraryJSON(json: any): RuntimeKeywordValue;
}
export default RuntimeKeywordValue;
