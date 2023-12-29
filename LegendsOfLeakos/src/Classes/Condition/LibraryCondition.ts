import { ConditionType } from '../../Enums/Condition';

class LibraryCondition {
  conditionType: ConditionType;
  data: any;

  constructor(conditionType: ConditionType, data: any) {
    this.conditionType = conditionType;
    this.data = data;
  }

  toJSON(): any {
    return {
      conditionType: this.conditionType,
      data: this.data,
    };
  }

  static fromJSON(json: any): LibraryCondition {
    return new LibraryCondition(json.conditionType, json.data);
  }
}

export default LibraryCondition;
