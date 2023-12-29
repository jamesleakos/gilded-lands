declare class StatModifier {
    private static readonly PERMANENT;
    value: number;
    duration: number;
    constructor(value: number, duration?: number);
    isPermanent(): boolean;
    toJSON(): any;
    static fromJSON(json: any): StatModifier;
}
export default StatModifier;
