import { EffectType } from '../../Enums/Effect';

class LibraryEffect {
  effectType: EffectType;
  data: any;

  constructor(effectType: EffectType, data: any) {
    this.effectType = effectType;
    this.data = data;
  }

  toJSON(): any {
    return {
      effectType: this.effectType,
      data: this.data,
    };
  }

  static fromJSON(json: any): LibraryEffect {
    return new LibraryEffect(json.effectType, json.data);
  }
}

export default LibraryEffect;
