import BaseAbility from './BaseAbility';
import RuntimeEffect from '../Effect/RuntimeEffect';
import { PhaseEnum } from '../../Enums/Phase';
declare class BattlecryAbility extends BaseAbility {
    constructor(setName: string, setEffect: RuntimeEffect, useableInPhases: PhaseEnum[]);
    toJSON(): any;
    static fromJSON(json: any): BattlecryAbility;
    static isJSONValid(json: any): boolean;
}
export default BattlecryAbility;
