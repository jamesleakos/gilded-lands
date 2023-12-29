class TargetInfo {
  targetEntityInstanceIds: number[] = [];
  noTargetWasSelected: boolean;
  targetsAreSelectedLater: boolean;

  constructor(
    targetEntityInstanceIds: number[],
    noTargetWasSelected: boolean,
    targetsAreSelectedLater: boolean
  ) {
    this.targetEntityInstanceIds = [...targetEntityInstanceIds];
    this.noTargetWasSelected = noTargetWasSelected;
    this.targetsAreSelectedLater = targetsAreSelectedLater;
  }

  clone(): TargetInfo {
    return TargetInfo.fromJSON(this);
  }

  toJSON(): any {
    return {
      targetEntityInstanceIds: this.targetEntityInstanceIds,
      noTargetWasSelected: this.noTargetWasSelected,
      targetsAreSelectedLater: this.targetsAreSelectedLater,
    };
  }

  static fromJSON(json: any): TargetInfo {
    return new TargetInfo(
      json.targetEntityInstanceIds,
      json.noTargetWasSelected,
      json.targetsAreSelectedLater
    );
  }
}

export default TargetInfo;
