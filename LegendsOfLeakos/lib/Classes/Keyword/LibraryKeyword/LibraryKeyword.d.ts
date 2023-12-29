import { KeywordType } from '../../../Enums/Keyword';
import LibraryCondition from '../../Condition/LibraryCondition';
declare class LibraryKeyword {
    keywordType: KeywordType;
    indexForUpgrades: number;
    designerDescription: string;
    isPermanent: boolean;
    duration: number;
    startsActive: boolean;
    conditions: Array<LibraryCondition>;
    imageName: string;
    data: any;
    constructor(keywordType: KeywordType, indexForUpgrades: number, designerDescription: string, isPermanent: boolean, duration: number, startsActive: boolean, conditions: Array<LibraryCondition>, imageName: string, data: any);
    toJSON(): any;
    static fromJSON(json: any): LibraryKeyword;
}
export default LibraryKeyword;
