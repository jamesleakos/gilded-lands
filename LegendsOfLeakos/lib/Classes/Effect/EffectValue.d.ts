import { EffectValueType } from '../../Enums/Effect';
import ModifiableInt from '../ModifableInt/ModifiableInt';
import TargetInfo from '../Target/TargetInfo';
declare class EffectValue {
    effectValueType: EffectValueType;
    setValue: number;
    modInts: ModifiableInt[];
    constructor(effectValueType: EffectValueType, setValue: number, modInts: ModifiableInt[]);
    fitToTargetInfo(targetInfo: TargetInfo): void;
    modifyEffectValueInt(index: number, modifyValue: number, modifyPermanent: boolean): void;
    postEffect(): void;
    contains(x: number): boolean;
    effectiveValues(): number[];
    toJSON(): any;
    static fromJSON(json: any): EffectValue;
    static isJSONValid(json: any): boolean;
}
export default EffectValue;
