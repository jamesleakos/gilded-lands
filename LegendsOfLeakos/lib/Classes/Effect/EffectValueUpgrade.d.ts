import { EffectValueType } from '../../Enums/Effect';
import ModifiableInt from '../ModifableInt/ModifiableInt';
declare class EffectValueUpgrade {
    effectValueType: EffectValueType;
    setValueChange: ModifiableInt;
    constructor(type: EffectValueType, modInt: ModifiableInt);
    toJSON(): any;
    static fromJSON(json: any): EffectValueUpgrade;
}
export default EffectValueUpgrade;
