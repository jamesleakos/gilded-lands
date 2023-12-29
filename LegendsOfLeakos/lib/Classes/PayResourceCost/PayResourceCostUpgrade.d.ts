import ModifiableInt from '../ModifableInt/ModifiableInt';
declare class PayResourceCostUpgrade {
    statId: number;
    valueChange: ModifiableInt;
    constructor(statId: number, valueChange: ModifiableInt);
    toJSON(): any;
    static fromJSON(json: any): PayResourceCostUpgrade;
}
export default PayResourceCostUpgrade;
