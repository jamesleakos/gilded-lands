import { PhaseEnum } from '../../Enums/Phase';
import { LibraryZone } from '../Zone/LibraryZone';
import Phase from '../Phase/Phase';
import {
  ZoneEnum,
  ZoneEnumMethods,
  ZoneOwner,
  ZoneRefreshType,
  ZoneOwnerVisibility,
  ZoneOpponentVisibility,
} from '../../Enums/Zone';
import Stat from '../Stat/Stat';

export default class GameProperties {
  static minPlayers = 2;
  static maxPlayers = 2;
  static realmLayout = [7, 10, 11, 12, 11, 12, 11, 10, 7];
  static upgradeTreeShape = {
    width: 10,
    height: 6,
  };
  static gameZones = [
    new LibraryZone(
      'Deck',
      ZoneEnum.Deck,
      ZoneOwner.Player,
      ZoneRefreshType.Static,
      ZoneOwnerVisibility.Hidden,
      ZoneOpponentVisibility.Hidden,
      false,
      0
    ),
    new LibraryZone(
      'Hand',
      ZoneEnum.Hand,
      ZoneOwner.Player,
      ZoneRefreshType.Dynamic,
      ZoneOwnerVisibility.Visible,
      ZoneOpponentVisibility.Hidden,
      false,
      0
    ),
    new LibraryZone(
      'FrontBoard',
      ZoneEnum.FrontBoard,
      ZoneOwner.Player,
      ZoneRefreshType.Dynamic,
      ZoneOwnerVisibility.Visible,
      ZoneOpponentVisibility.Visible,
      false,
      0
    ),
    new LibraryZone(
      'BackBoard',
      ZoneEnum.BackBoard,
      ZoneOwner.Player,
      ZoneRefreshType.Dynamic,
      ZoneOwnerVisibility.Visible,
      ZoneOpponentVisibility.Visible,
      false,
      0
    ),
    new LibraryZone(
      'Graveyard',
      ZoneEnum.Graveyard,
      ZoneOwner.Player,
      ZoneRefreshType.Static,
      ZoneOwnerVisibility.Visible,
      ZoneOpponentVisibility.Visible,
      false,
      0
    ),
    new LibraryZone(
      'BattleBoard',
      ZoneEnum.BattleBoard,
      ZoneOwner.Player,
      ZoneRefreshType.Dynamic,
      ZoneOwnerVisibility.Visible,
      ZoneOpponentVisibility.Visible,
      false,
      0
    ),
  ];
  static gamePhases = [
    new Phase(PhaseEnum.Recruit),
    new Phase(PhaseEnum.Maneuver),
    new Phase(PhaseEnum.Skirmish),
    new Phase(PhaseEnum.Battle),
  ];
  // phase actions
  static phasesCardsCanUpgradeIn = [PhaseEnum.Skirmish, PhaseEnum.Battle];
  static phasesCardsCanBePlayedIn = [PhaseEnum.Maneuver, PhaseEnum.Skirmish];
  static phasesCardsCanMoveRowsIn = [
    PhaseEnum.Maneuver,
    PhaseEnum.Skirmish,
    PhaseEnum.Battle,
  ];
  static playerStats = [
    new Stat(0, 'Life', 20, 20, 0, 99, [], []),
    new Stat(1, 'ForestMana', 0, 0, 0, 99, [], []),
    new Stat(2, 'OceanMana', 0, 0, 0, 99, [], []),
    new Stat(3, 'DesertMana', 0, 0, 0, 99, [], []),
    new Stat(4, 'MountainMana', 0, 0, 0, 99, [], []),
    new Stat(5, 'PrairieMana', 0, 0, 0, 99, [], []),
    new Stat(6, 'FellsMana', 0, 0, 0, 99, [], []),
    new Stat(7, 'TundraMana', 0, 0, 0, 99, [], []),
    new Stat(8, 'AnyMana', 0, 0, 0, 99, [], []),
  ];
}
