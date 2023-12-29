import TargetCriteria from '../../../Target/TargetCriteria';
import TargetInfo from '../../../Target/TargetInfo';
import GameState from '../../../Game/GameState';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
import RuntimeEffect from '../../RuntimeEffect';
import ModifiableInt from '../../../ModifableInt/ModifiableInt';
declare class AttackEffect extends RuntimeEffect {
    blockInfo: {
        blockingCardInstanceId: number;
        damageToBlockingCard: ModifiableInt;
        damageToAttackingCard: ModifiableInt;
        damageToBlockingCardPrevented: boolean;
        damageToAttackingCardPrevented: boolean;
    }[];
    damageToAttackedCard: ModifiableInt;
    damageToAttackedCardPrevented: boolean;
    damageToAttackingCard: ModifiableInt;
    damageToAttackingCardPrevented: boolean;
    targetCriterias(): TargetCriteria[];
    constructor();
    preEffect(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): boolean;
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): boolean;
    applyShieldToAttackedCard(shieldAmount: number): void;
    hitDivineShield(): void;
    areTargetsAvailable(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity): boolean;
    isAllTargetInfoValid(sourceEntity: AbilityKeywordRuntimeEntity, state: GameState, targetInfoList: TargetInfo[]): boolean;
    effectToString(): string;
    static createFightEffect(): AttackEffect;
    static createFightTargetInfoList(attackedCardInstanceId: number): TargetInfo[];
    toJSON(): any;
    clone(): RuntimeEffect;
}
export default AttackEffect;
