enum ZoneEnum {
  Deck,
  Hand,
  FrontBoard,
  BackBoard,
  Graveyard,
  BattleBoard,
}

class ZoneEnumMethods {
  public static isBoard(ze: ZoneEnum): boolean {
    switch (ze) {
      case ZoneEnum.Deck:
      case ZoneEnum.Graveyard:
      case ZoneEnum.Hand:
        return false;
      case ZoneEnum.BackBoard:
      case ZoneEnum.FrontBoard:
      case ZoneEnum.BattleBoard:
        return true;
      default:
        throw new Error('Need to add this enum to this method');
    }
  }
}

enum ZoneOwner {
  Player,
  Shared,
}

/// <summary>
/// The available zone types.
/// </summary>
enum ZoneRefreshType {
  Static,
  Dynamic,
}

/// <summary>
/// The available zone owner visibilities.
/// </summary>
enum ZoneOwnerVisibility {
  Visible,
  Hidden,
}

/// <summary>
/// The available zone opponent visibilities.
/// </summary>
enum ZoneOpponentVisibility {
  Visible,
  Hidden,
}

export {
  ZoneEnum,
  ZoneEnumMethods,
  ZoneOwner,
  ZoneRefreshType,
  ZoneOwnerVisibility,
  ZoneOpponentVisibility,
};
