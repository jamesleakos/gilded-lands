import EntityEffect from '../../EntityEffect';
import GameState from '../../../Game/GameState';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import TargetInfo from '../../../Target/TargetInfo';
import AbilityKeywordRuntimeEntity from '../../../Entity/AbilityKeywordRuntimeEntity';
declare abstract class AttackBaseEffect extends EntityEffect {
    resolve(state: GameState, sourceEntity: AbilityKeywordRuntimeEntity, targetInfoList: TargetInfo[]): void;
    myRequiredEffectValues(): EffectValueCreatorInfo[];
}
export default AttackBaseEffect;
