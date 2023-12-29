import StatModifier from './StatModifier';
import StatBuff from './StatBuff';
export declare class Stat {
    statId: number;
    name: string;
    private _baseValue;
    originalValue: number;
    minValue: number;
    maxValue: number;
    modifiers: StatModifier[];
    buffs: StatBuff[];
    onValueChanged?: (oldValue: number, newValue: number) => void;
    constructor(statId: number, name: string, originalValue: number, baseValue: number, minValue: number, maxValue: number, modifiers: StatModifier[], buffs: StatBuff[]);
    get baseValue(): number;
    set baseValue(value: number);
    get effectiveValue(): number;
    addModifier(modifier: StatModifier): void;
    addBuff(value: number, details: string): void;
    onEndBattlePhase(): void;
    clone(): Stat;
    toJSON(): any;
    static fromLibraryJSON(json: any): Stat;
    static fromRuntimeJSON(json: any): Stat;
}
export default Stat;
