import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
import EntityEffect from '../../EntityEffect';
declare abstract class GiveEnchantmentBaseEffect extends EntityEffect {
    myRequiredEffectValues(): EffectValueCreatorInfo[];
}
export default GiveEnchantmentBaseEffect;
