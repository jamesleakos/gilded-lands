import { PhaseEnum } from '../Enums/Phase';
import { LibraryZone } from '../Classes/Zone/LibraryZone';
import Phase from '../Classes/Phase/Phase';
export default class GameProperties {
    static minPlayers: number;
    static maxPlayers: number;
    static realmLayout: number[];
    static upgradeTreeShape: {
        width: number;
        height: number;
    };
    static gameZones: LibraryZone[];
    static gamePhases: Phase[];
    static phasesCardsCanUpgradeIn: PhaseEnum[];
    static phasesCardsCanBePlayedIn: PhaseEnum[];
    static phasesCardsCanMoveRowsIn: PhaseEnum[];
}
