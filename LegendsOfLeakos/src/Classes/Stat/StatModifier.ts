class StatModifier {
  private static readonly PERMANENT = 0;
  value: number;
  duration: number;

  constructor(value: number, duration: number = StatModifier.PERMANENT) {
    this.value = value;
    this.duration = duration;
  }

  isPermanent(): boolean {
    return this.duration === StatModifier.PERMANENT;
  }

  toJSON(): any {
    return {
      value: this.value,
      duration: this.duration,
    };
  }

  static fromJSON(json: any): StatModifier {
    return new StatModifier(json.value, json.duration);
  }
}

export default StatModifier;
