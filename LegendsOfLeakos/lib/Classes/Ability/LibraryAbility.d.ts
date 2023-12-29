import PayResourceCost from '../PayResourceCost/PayResourceCost';
import { PhaseEnum } from '../../Enums/Phase';
import LibraryEffect from '../Effect/LibraryEffect';
declare class LibraryAbility {
    name: string;
    indexForUpgrades: number;
    image: string;
    effect: LibraryEffect;
    useableInPhases: PhaseEnum[];
    isActive: boolean;
    costs: PayResourceCost[];
    usesPerTurn: number;
    usesRemaining: number;
    constructor(indexForUpgrades: number, setName: string, setEffect: LibraryEffect, setCosts: PayResourceCost[], setUsesPerTurn: number, setUsesRemaining: number, useableInPhases: PhaseEnum[], isActive: boolean, image: string);
    toJSON(): any;
    static fromJSON(json: any): LibraryAbility;
}
export default LibraryAbility;
