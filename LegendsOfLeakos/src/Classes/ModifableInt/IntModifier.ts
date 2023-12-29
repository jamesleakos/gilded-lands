class IntModifier {
  value: number;
  permanent: boolean;

  constructor(value: number, permanent: boolean) {
    this.value = value;
    this.permanent = permanent;
  }

  clone(): IntModifier {
    return new IntModifier(this.value, this.permanent);
  }
}

export default IntModifier;
