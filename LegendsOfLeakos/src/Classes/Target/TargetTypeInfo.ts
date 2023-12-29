class TargetTypeInfo {
  public name: string;
  public description: string;
  public targetTypeDescription: string;
  public minMinSelectionsRequired: number | null;
  public maxMaxSelectionsAllowed: number | null;

  constructor(
    name: string,
    description: string,
    targetTypeDescription: string,
    minMinSelectionsRequired: number | null,
    maxMaxSelectionsAllowed: number | null
  ) {
    this.name = name;
    this.description = description;
    this.targetTypeDescription = targetTypeDescription;
    this.minMinSelectionsRequired = minMinSelectionsRequired;
    this.maxMaxSelectionsAllowed = maxMaxSelectionsAllowed;
  }
}

export default TargetTypeInfo;
