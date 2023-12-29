declare class PayResourceCost {
    statId: number;
    value: number;
    constructor(statId: number, value: number);
    costName(): string;
    clone(): PayResourceCost;
    toJSON(): any;
    static fromJSON(json: any): PayResourceCost;
    static isLibraryJSONValid(json: any): boolean;
}
export default PayResourceCost;
