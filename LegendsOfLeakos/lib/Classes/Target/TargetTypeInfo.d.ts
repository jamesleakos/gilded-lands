declare class TargetTypeInfo {
    name: string;
    description: string;
    targetTypeDescription: string;
    minMinSelectionsRequired: number | null;
    maxMaxSelectionsAllowed: number | null;
    constructor(name: string, description: string, targetTypeDescription: string, minMinSelectionsRequired: number | null, maxMaxSelectionsAllowed: number | null);
}
export default TargetTypeInfo;
