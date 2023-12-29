import { ConditionType } from '../../Enums/Condition';
import GameState from '../Game/GameState';
declare abstract class RuntimeCondition {
    conditionType: ConditionType;
    abstract isTrue(targetEntityInstanceId: number, sourceEntityInstanceId: number, state: GameState): boolean;
    abstract getReadableString(gameProperties: any): string;
    abstract toJSON(): any;
    abstract clone(): RuntimeCondition;
    static fromRuntimeJSONMethods: {
        [key in ConditionType]?: (json: any) => RuntimeCondition;
    };
    static registerFromRuntimeJSON(type: ConditionType, method: (json: any) => RuntimeCondition): void;
    static fromRuntimeJSON(json: any): RuntimeCondition;
    static fromLibraryJSONMethods: {
        [key in ConditionType]?: (json: any) => RuntimeCondition;
    };
    static registerFromLibraryJSON(type: ConditionType, method: (json: any) => RuntimeCondition): void;
    static fromLibraryJSON(json: any): RuntimeCondition;
    static isLibraryJSONValidMethods: {
        [key in ConditionType]?: (json: any) => boolean;
    };
    static registerIsLibraryJSONValid(type: ConditionType, method: (json: any) => boolean): void;
    static isLibraryJSONValid(json: any): boolean;
    static sampleLibraryJSONMethods: {
        [key in ConditionType]?: () => any;
    };
    static registerSampleLibraryJSON(type: ConditionType, creator: () => any): void;
    static createSampleLibraryJSON(type: ConditionType): any;
}
export default RuntimeCondition;
