import { ZoneEnum, ZoneOwner, ZoneRefreshType, ZoneOwnerVisibility, ZoneOpponentVisibility } from '../../Enums/Zone';
declare class LibraryZone {
    name: string;
    zoneEnum: ZoneEnum;
    owner: ZoneOwner;
    refreshType: ZoneRefreshType;
    ownerVisibility: ZoneOwnerVisibility;
    opponentVisibility: ZoneOpponentVisibility;
    hasMaxSize: boolean;
    maxSize: number;
    constructor(name: string, zoneEnum: ZoneEnum, owner: ZoneOwner, refreshType: ZoneRefreshType, ownerVisibility: ZoneOwnerVisibility, opponentVisibility: ZoneOpponentVisibility, hasMaxSize: boolean, maxSize: number);
}
export { LibraryZone as GameZoneType };
