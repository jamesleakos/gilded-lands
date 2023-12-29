import IntModifier from './IntModifier';
declare class ModifiableInt {
    baseValue: number;
    intModifiers: IntModifier[];
    constructor(baseValue: number, effectValueIntModifiers: IntModifier[]);
    get effectiveValue(): number;
    toJSON(): any;
    clone(): ModifiableInt;
    static fromJSON(json: any): ModifiableInt;
    static isLibraryJSONValid(json: any): boolean;
}
export default ModifiableInt;
