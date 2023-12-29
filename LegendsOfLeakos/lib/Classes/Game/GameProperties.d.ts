import { PhaseEnum } from '../../Enums/Phase';
import { LibraryZone } from '../Zone/LibraryZone';
import Phase from '../Phase/Phase';
import Stat from '../Stat/Stat';
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
    static playerStats: Stat[];
}
