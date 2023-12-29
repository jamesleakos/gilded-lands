import IntModifier from './IntModifier';

class ModifiableInt {
  baseValue: number;
  intModifiers: IntModifier[];

  constructor(baseValue: number, effectValueIntModifiers: IntModifier[]) {
    this.baseValue = baseValue;
    this.intModifiers = [];
    for (const i of effectValueIntModifiers) {
      this.intModifiers.push(new IntModifier(i.value, i.permanent));
    }
  }

  get effectiveValue(): number {
    let value = this.baseValue;

    for (const modifier of this.intModifiers) {
      value += modifier.value;
    }

    return value;
  }

  toJSON(): any {
    return {
      baseValue: this.baseValue,
    };
  }

  clone(): ModifiableInt {
    return new ModifiableInt(
      this.baseValue,
      this.intModifiers.map((i) => i.clone())
    );
  }

  static fromJSON(json: any): ModifiableInt {
    const newModifiableInt = new ModifiableInt(
      json.baseValue,
      new Array<IntModifier>()
    );
    return newModifiableInt;
  }

  static isLibraryJSONValid(json: any): boolean {
    if (typeof json.baseValue !== 'number') {
      console.log('Invalid JSON: baseValue is not a number');
      return false;
    }
    return true;
  }
}

export default ModifiableInt;
