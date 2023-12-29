import { EffectValueType } from '../../Enums/Effect';
declare class EffectValueCreatorInfo {
    effectValueType: EffectValueType;
    setByDesigner: boolean;
    constructor(effectValueType: EffectValueType, setByDesigner: boolean);
}
export default EffectValueCreatorInfo;
