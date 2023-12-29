import StatModifier from './StatModifier';
import StatBuff from './StatBuff';

export class Stat {
  statId: number;
  name: string;
  private _baseValue: number;
  // the baseValue can change (even apart from modifiers, but the original value never will)
  originalValue: number;
  minValue: number;
  maxValue: number;
  modifiers: StatModifier[] = [];
  buffs: StatBuff[] = [];

  onValueChanged?: (oldValue: number, newValue: number) => void;

  constructor(
    statId: number,
    name: string,
    originalValue: number,
    baseValue: number,
    minValue: number,
    maxValue: number,
    modifiers: StatModifier[],
    buffs: StatBuff[]
  ) {
    this.statId = statId;
    this.name = name;
    this.originalValue = originalValue;
    this.baseValue = baseValue;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.modifiers = modifiers;
    this.buffs = buffs;
  }

  get baseValue(): number {
    return this._baseValue;
  }

  set baseValue(value: number) {
    const oldValue = this._baseValue;
    this._baseValue = value;
    if (this.onValueChanged && oldValue !== this._baseValue) {
      this.onValueChanged(oldValue, value);
    }
  }

  get effectiveValue(): number {
    let value = this.baseValue;

    for (const modifier of this.modifiers) {
      value += modifier.value;
    }

    for (const buff of this.buffs) {
      value += buff.value;
    }

    if (value < this.minValue) {
      value = this.minValue;
    } else if (value > this.maxValue) {
      value = this.maxValue;
    }

    return value;
  }

  addModifier(modifier: StatModifier): void {
    const oldValue = this.effectiveValue;
    this.modifiers.push(modifier);
    if (this.onValueChanged) {
      this.onValueChanged(oldValue, this.effectiveValue);
    }
  }

  addBuff(value: number, details: string): void {
    this.buffs.push(new StatBuff(value, details));
    // we don't call it here because it's better to call it in DoEffect
  }

  onEndBattlePhase(): void {
    const oldValue = this.effectiveValue;

    const modifiersToRemove: StatModifier[] = [];

    const temporaryModifiers = this.modifiers.filter((x) => !x.isPermanent());
    for (const modifier of temporaryModifiers) {
      modifier.duration -= 1;
      if (modifier.duration <= 0) {
        modifiersToRemove.push(modifier);
      }
    }

    for (const modifier of modifiersToRemove) {
      const index = this.modifiers.indexOf(modifier);
      if (index !== -1) {
        this.modifiers.splice(index, 1);
      }
    }

    if (modifiersToRemove.length > 0 && this.onValueChanged) {
      this.onValueChanged(oldValue, this.effectiveValue);
    }
  }

  clone(): Stat {
    return Stat.fromRuntimeJSON(this);
  }

  toJSON(): any {
    return {
      statId: this.statId,
      name: this.name,
      originalValue: this.originalValue,
      baseValue: this.baseValue,
      minValue: this.minValue,
      maxValue: this.maxValue,
      modifiers: this.modifiers.map((modifier) => modifier.toJSON()),
      // buffs: this.buffs.map((buff) => buff.toJSON()), // we shouldn't need buffs - these are caluculated live at runtime
    };
  }

  static fromLibraryJSON(json: any): Stat {
    return new Stat(
      json.statId,
      json.name,
      json.originalValue,
      json.baseValue,
      json.minValue,
      json.maxValue,
      json.modifiers.map((modifier: any) => StatModifier.fromJSON(modifier)),
      // json.buffs.map((buff: any) => StatBuff.fromJSON(buff)) // again, shouldn't need this
      new Array<StatBuff>()
    );
  }

  static fromRuntimeJSON(json: any): Stat {
    if (
      json.statId === undefined ||
      json.name === undefined ||
      json.originalValue === undefined ||
      json.baseValue === undefined ||
      json.minValue === undefined ||
      json.maxValue === undefined ||
      json.modifiers === undefined
    ) {
      console.log('\nstat json: ', json);
      throw new Error('Invalid Stat JSON');
    }
    return new Stat(
      json.statId,
      json.name,
      json.originalValue,
      json.baseValue,
      json.minValue,
      json.maxValue,
      json.modifiers.map((modifier: any) => StatModifier.fromJSON(modifier)),
      // json.buffs.map((buff: any) => StatBuff.fromJSON(buff)) // again, shouldn't need this
      new Array<StatBuff>()
    );
  }
}

export default Stat;
