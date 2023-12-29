import RuntimeKeyword from '../RuntimeKeyword';
import GameState from '../../../Game/GameState';
import RuntimeEffect from '../../../Effect/RuntimeEffect';
import TargetInfo from '../../../Target/TargetInfo';
import RuntimeCondition from '../../../Condition/RuntimeCondition';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import ModifiableInt from '../../../ModifableInt/ModifiableInt';
declare class DamageModificationKeyword extends RuntimeKeyword {
    modifyAbilityDamageAmount: ModifiableInt;
    modifyAttackAmount: ModifiableInt;
    constructor(myEntityId: number, indexForUpgrades: number, setDescription: string, setIsPermanent: boolean, setDuration: number, isActive: boolean, imageName: string, conditions: RuntimeCondition[], modifyAbilityDamageAmount: ModifiableInt, modifyAttackAmount: ModifiableInt);
    preResolveEffect(e: RuntimeEffect, sourceEntity: AbilityKeywordRuntimeEntity, gameState: GameState, targetInfoList: TargetInfo[]): void;
    toJSON(): any;
    clone(): RuntimeKeyword;
    static fromRuntimeJSON(json: any): RuntimeKeyword;
    static fromLibraryJSON(myEntityInstanceId: number, json: any): RuntimeKeyword;
    static isLibraryJSONValid(json: any): boolean;
    static createSampleLibraryJSON(): any;
}
export default DamageModificationKeyword;
