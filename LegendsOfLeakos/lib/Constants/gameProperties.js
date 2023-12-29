"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Phase_1 = require("../Enums/Phase");
var LibraryZone_1 = require("../Classes/Zone/LibraryZone");
var Phase_2 = __importDefault(require("../Classes/Phase/Phase"));
var Zone_1 = require("../Enums/Zone");
var GameProperties = /** @class */ (function () {
    function GameProperties() {
    }
    GameProperties.minPlayers = 2;
    GameProperties.maxPlayers = 2;
    GameProperties.realmLayout = [7, 10, 11, 12, 11, 12, 11, 10, 7];
    GameProperties.upgradeTreeShape = {
        width: 10,
        height: 6,
    };
    GameProperties.gameZones = [
        new LibraryZone_1.LibraryZone('Deck', Zone_1.ZoneEnum.Deck, Zone_1.ZoneOwner.Player, Zone_1.ZoneRefreshType.Static, Zone_1.ZoneOwnerVisibility.Hidden, Zone_1.ZoneOpponentVisibility.Hidden, false, 0),
        new LibraryZone_1.LibraryZone('Hand', Zone_1.ZoneEnum.Hand, Zone_1.ZoneOwner.Player, Zone_1.ZoneRefreshType.Dynamic, Zone_1.ZoneOwnerVisibility.Visible, Zone_1.ZoneOpponentVisibility.Hidden, false, 0),
        new LibraryZone_1.LibraryZone('FrontBoard', Zone_1.ZoneEnum.FrontBoard, Zone_1.ZoneOwner.Player, Zone_1.ZoneRefreshType.Dynamic, Zone_1.ZoneOwnerVisibility.Visible, Zone_1.ZoneOpponentVisibility.Visible, false, 0),
        new LibraryZone_1.LibraryZone('BackBoard', Zone_1.ZoneEnum.BackBoard, Zone_1.ZoneOwner.Player, Zone_1.ZoneRefreshType.Dynamic, Zone_1.ZoneOwnerVisibility.Visible, Zone_1.ZoneOpponentVisibility.Visible, false, 0),
        new LibraryZone_1.LibraryZone('Graveyard', Zone_1.ZoneEnum.Graveyard, Zone_1.ZoneOwner.Player, Zone_1.ZoneRefreshType.Static, Zone_1.ZoneOwnerVisibility.Visible, Zone_1.ZoneOpponentVisibility.Visible, false, 0),
        new LibraryZone_1.LibraryZone('BattleBoard', Zone_1.ZoneEnum.BattleBoard, Zone_1.ZoneOwner.Player, Zone_1.ZoneRefreshType.Dynamic, Zone_1.ZoneOwnerVisibility.Visible, Zone_1.ZoneOpponentVisibility.Visible, false, 0),
    ];
    GameProperties.gamePhases = [
        new Phase_2.default(Phase_1.PhaseEnum.Recruit),
        new Phase_2.default(Phase_1.PhaseEnum.Maneuver),
        new Phase_2.default(Phase_1.PhaseEnum.Skirmish),
        new Phase_2.default(Phase_1.PhaseEnum.Battle),
    ];
    // cards and enchantments should be pulled from elsewhere - everything here should be well-defined in the code itselt
    // phase actions
    GameProperties.phasesCardsCanUpgradeIn = [Phase_1.PhaseEnum.Skirmish, Phase_1.PhaseEnum.Battle];
    GameProperties.phasesCardsCanBePlayedIn = [Phase_1.PhaseEnum.Maneuver, Phase_1.PhaseEnum.Skirmish];
    GameProperties.phasesCardsCanMoveRowsIn = [
        Phase_1.PhaseEnum.Maneuver,
        Phase_1.PhaseEnum.Skirmish,
        Phase_1.PhaseEnum.Battle,
    ];
    return GameProperties;
}());
exports.default = GameProperties;
