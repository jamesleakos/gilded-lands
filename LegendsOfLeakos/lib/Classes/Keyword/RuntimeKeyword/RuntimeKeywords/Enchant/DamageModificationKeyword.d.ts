import RuntimeKeyword from '../../RuntimeKeyword';
import RuntimeKeywordValue from '../../RuntimeKeywordValue';
import TargetableRuntimeEntity from '../../../../Entity/TargetableRuntimeEntity';
import GameState from '../../../../Game/GameState';
import RuntimeEffect from '../../../../Effect/RuntimeEffect';
import TargetInfo from '../../../../Target/TargetInfo';
import { KeywordType } from '../../../../../Enums/Keyword';
import RuntimeCondition from '../../../../Condition/RuntimeCondition';
import AbilityKeywordRuntimeEntity from '../../../../Entity/AbilityKeywordRuntimeEntity';
import ModifiableInt from '../../../../ModifableInt/ModifiableInt';
declare class DamageModificationKeyword extends RuntimeKeyword {
    modifyAbilityDamageAmount: ModifiableInt;
    modifyAttackAmount: ModifiableInt;
    constructor(myEntityId: number, keywordType: KeywordType, indexForUpgrades: number | null, setDescription: string, setIsPermanent: boolean, setDuration: number, keywordValueList: RuntimeKeywordValue[], isActive: boolean, conditions: RuntimeCondition[], imageName: string);
    preResolveEffect(myEnt: TargetableRuntimeEntity, e: RuntimeEffect, sourceEntity: AbilityKeywordRuntimeEntity, gameState: GameState, targetInfoList: TargetInfo[]): void;
}
export default DamageModificationKeyword;
