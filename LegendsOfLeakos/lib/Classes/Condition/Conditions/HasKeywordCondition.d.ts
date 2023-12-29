import RuntimeCondition from '../RuntimeCondition';
import { KeywordType } from '../../../Enums/Keyword';
import GameState from '../../Game/GameState';
declare class HasKeywordCondition extends RuntimeCondition {
    keywordType: KeywordType;
    constructor(keywordType: KeywordType);
    isTrue(entityInstanceId: number, sourceIntanceId: number, state: GameState): boolean;
    getReadableString(gameProperties: any): string;
    toJSON(): any;
    clone(): RuntimeCondition;
    static fromRuntimeJSON(json: any): RuntimeCondition;
    static fromLibraryJSON(json: any): RuntimeCondition;
    static isLibraryJSONValid(json: any): boolean;
    static createSampleLibraryJSON(): any;
}
export default HasKeywordCondition;
