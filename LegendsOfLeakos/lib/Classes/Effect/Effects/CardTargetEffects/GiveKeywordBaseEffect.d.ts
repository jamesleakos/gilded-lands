import EntityEffect from '../../EntityEffect';
import EffectValueCreatorInfo from '../../EffectValueCreatorInfo';
declare abstract class GiveKeywordBaseEffect extends EntityEffect {
    myRequiredEffectValues(): EffectValueCreatorInfo[];
}
export default GiveKeywordBaseEffect;
