declare class TargetInfo {
    targetEntityInstanceIds: number[];
    noTargetWasSelected: boolean;
    targetsAreSelectedLater: boolean;
    constructor(targetEntityInstanceIds: number[], noTargetWasSelected: boolean, targetsAreSelectedLater: boolean);
    clone(): TargetInfo;
    toJSON(): any;
    static fromJSON(json: any): TargetInfo;
}
export default TargetInfo;
