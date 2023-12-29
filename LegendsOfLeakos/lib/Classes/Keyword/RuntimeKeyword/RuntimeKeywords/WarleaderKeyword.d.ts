import RuntimeKeyword from '../RuntimeKeyword';
import Stat from '../../../Stat/Stat';
import StatBuff from '../../../Stat/StatBuff';
import RuntimeCard from '../../../Card/RuntimeCard';
import GameState from '../../../Game/GameState';
import RuntimeCondition from '../../../Condition/RuntimeCondition';
import ModifiableInt from '../../../ModifableInt/ModifiableInt';
declare class WarleaderKeyword extends RuntimeKeyword {
    buffAttackStatAmount: ModifiableInt;
    buffHealthStatAmount: ModifiableInt;
    constructor(myEntityInstanceId: number, indexForUpgrades: number, setDescription: string, setIsPermanent: boolean, setDuration: number, isActive: boolean, conditions: RuntimeCondition[], imageName: string, buffAttackStatAmount: ModifiableInt, buffHealthStatAmount: ModifiableInt);
    addStatBuff(stat: Stat, statCard: RuntimeCard, gameState: GameState): StatBuff | null;
    toJSON(): any;
    clone(): RuntimeKeyword;
    static fromRuntimeJSON(json: any): RuntimeKeyword;
    static fromLibraryJSON(myEntityInstanceId: number, json: any): RuntimeKeyword;
    static isLibraryJSONValid(json: any): boolean;
    static createSampleLibraryJSON(): any;
}
export default WarleaderKeyword;
