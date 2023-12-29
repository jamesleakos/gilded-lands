import { KeywordType } from '../../../Enums/Keyword';
import AbilityKeywordRuntimeEntity from '../../Entity/AbilityKeywordRuntimeEntity';
import RuntimeCondition from '../../Condition/RuntimeCondition';
import Stat from '../../Stat/Stat';
import RuntimeCard from '../../Card/RuntimeCard';
import GameState from '../../Game/GameState';
import RuntimeEffect from '../../Effect/RuntimeEffect';
import TargetInfo from '../../Target/TargetInfo';
import StatBuff from '../../Stat/StatBuff';
declare abstract class RuntimeKeyword {
    keywordType: KeywordType;
    myEntityInstanceId: number;
    indexForUpgrades: number;
    description: string;
    isPermanent: boolean;
    duration: number;
    isActive: boolean;
    imageName: string;
    conditions: RuntimeCondition[];
    addStatBuff(stat: Stat, statCard: RuntimeCard, gameState: GameState): StatBuff | null;
    preResolveEffect(e: RuntimeEffect, sourceEntity: AbilityKeywordRuntimeEntity, gameState: GameState, targetInfoList: TargetInfo[]): void;
    postResolveEffect(e: RuntimeEffect, sourceEntity: AbilityKeywordRuntimeEntity, gameState: GameState, targetInfoList: TargetInfo[]): void;
    onEndTurn(gameState: GameState): void;
    abstract toJSON(): any;
    abstract clone(): RuntimeKeyword;
    static fromRuntimeJSONMethods: {
        [key in KeywordType]?: (json: any) => RuntimeKeyword;
    };
    static registerFromRuntimeJSON(type: KeywordType, method: (json: any) => RuntimeKeyword): void;
    static fromRuntimeJSON(json: any): RuntimeKeyword;
    static fromLibraryJSONMethods: {
        [key in KeywordType]?: (myEntityInstanceId: number, json: any) => RuntimeKeyword;
    };
    static registerFromLibraryJSON(type: KeywordType, method: (myEntityInstanceId: number, json: any) => RuntimeKeyword): void;
    static fromLibraryJSON(myEntityInstanceId: number, json: any): RuntimeKeyword;
    static isLibraryJSONValidMethods: {
        [key in KeywordType]?: (json: any) => boolean;
    };
    static registerIsLibraryJSONValid(type: KeywordType, method: (json: any) => boolean): void;
    static isLibraryJSONValid(json: any): boolean;
    static sampleLibraryJSONMethods: {
        [key in KeywordType]?: () => any;
    };
    static registerSampleLibraryJSON(type: KeywordType, creator: () => any): void;
    static createSampleLibraryJSON(type: KeywordType): any;
}
export default RuntimeKeyword;
