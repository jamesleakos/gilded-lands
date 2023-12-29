import { KeywordType } from '../../Enums/Keyword';
import LibraryKeywordValueInfo from './LibraryKeywordValueInfo';
import RuntimeCondition from '../Condition/RuntimeCondition';
import LibraryKeywordValue from './LibraryKeywordValue';
declare class LibraryKeyword {
    keywordType: KeywordType;
    indexForUpgrades: number;
    designerDescription: string;
    isPermanent: boolean;
    duration: number;
    startsActive: boolean;
    keywordValueList: Array<LibraryKeywordValue>;
    conditions: Array<RuntimeCondition>;
    imageName: string;
    constructor(keywordType: KeywordType, indexForUpgrades: number, designerDescription: string, isPermanent: boolean, duration: number, startsActive: boolean, keywordValueList: Array<LibraryKeywordValue>, conditions: Array<RuntimeCondition>, imageName: string);
    static canBeAssignedToCardByCreator(keywordType: KeywordType): boolean;
    static typesOfKeywordsThatCanBeAssignedToCardByCreator(): KeywordType[];
    static libraryKeywordValueInfoForType(keywordType: KeywordType): LibraryKeywordValueInfo[];
    toJSON(): any;
    static fromJSON(json: any): LibraryKeyword;
    static isJSONValid(json: any): boolean;
}
export default LibraryKeyword;
