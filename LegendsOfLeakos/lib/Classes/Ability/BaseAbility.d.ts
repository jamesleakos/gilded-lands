import { AbilityType } from '../../Enums/EntityFeatures';
import RuntimeEffect from '../Effect/RuntimeEffect';
import { PhaseEnum } from '../../Enums/Phase';
declare class BaseAbility {
    name: string;
    image: string;
    type: AbilityType;
    effect: RuntimeEffect;
    useableInPhases: PhaseEnum[];
}
export default BaseAbility;
