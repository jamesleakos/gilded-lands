import { EffectType } from '../../Enums/Effect';
declare class LibraryEffect {
    effectType: EffectType;
    data: any;
    constructor(effectType: EffectType, data: any);
    toJSON(): any;
    static fromJSON(json: any): LibraryEffect;
}
export default LibraryEffect;
