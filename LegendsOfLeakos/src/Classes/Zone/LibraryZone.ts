import {
  ZoneEnum,
  ZoneEnumMethods,
  ZoneOwner,
  ZoneRefreshType,
  ZoneOwnerVisibility,
  ZoneOpponentVisibility,
} from '../../Enums/Zone';

class LibraryZone {
  // The name of this zone.
  public name: string;

  // The main identifier of this zone.
  public zoneEnum: ZoneEnum;

  // The owner of this zone.
  public owner: ZoneOwner;

  // How this zone needs to be refreshed.
  public refreshType: ZoneRefreshType;

  // The visibility of this zone for the owner player.
  public ownerVisibility: ZoneOwnerVisibility;

  // The visibility of this zone for the opponent player.
  public opponentVisibility: ZoneOpponentVisibility;

  // True if this zone has a maximum size.
  public hasMaxCards: boolean;

  // The maximum size of this number.
  public maxCards: number;

  constructor(
    name: string,
    zoneEnum: ZoneEnum,
    owner: ZoneOwner,
    refreshType: ZoneRefreshType,
    ownerVisibility: ZoneOwnerVisibility,
    opponentVisibility: ZoneOpponentVisibility,
    hasMaxCards: boolean,
    maxCards: number
  ) {
    this.name = name;
    this.zoneEnum = zoneEnum;
    this.owner = owner;
    this.refreshType = refreshType;
    this.ownerVisibility = ownerVisibility;
    this.opponentVisibility = opponentVisibility;
    this.hasMaxCards = hasMaxCards;
    this.maxCards = maxCards;
  }
}

export { LibraryZone };
