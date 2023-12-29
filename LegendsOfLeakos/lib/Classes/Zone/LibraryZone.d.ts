import { ZoneEnum, ZoneOwner, ZoneRefreshType, ZoneOwnerVisibility, ZoneOpponentVisibility } from '../../Enums/Zone';
declare class LibraryZone {
    name: string;
    zoneEnum: ZoneEnum;
    owner: ZoneOwner;
    refreshType: ZoneRefreshType;
    ownerVisibility: ZoneOwnerVisibility;
    opponentVisibility: ZoneOpponentVisibility;
    hasMaxCards: boolean;
    maxCards: number;
    constructor(name: string, zoneEnum: ZoneEnum, owner: ZoneOwner, refreshType: ZoneRefreshType, ownerVisibility: ZoneOwnerVisibility, opponentVisibility: ZoneOpponentVisibility, hasMaxCards: boolean, maxCards: number);
}
export { LibraryZone };
