declare enum ZoneEnum {
    Deck = 0,
    Hand = 1,
    FrontBoard = 2,
    BackBoard = 3,
    Graveyard = 4,
    BattleBoard = 5
}
declare class ZoneEnumMethods {
    static isBoard(ze: ZoneEnum): boolean;
}
declare enum ZoneOwner {
    Player = 0,
    Shared = 1
}
declare enum ZoneRefreshType {
    Static = 0,
    Dynamic = 1
}
declare enum ZoneOwnerVisibility {
    Visible = 0,
    Hidden = 1
}
declare enum ZoneOpponentVisibility {
    Visible = 0,
    Hidden = 1
}
export { ZoneEnum, ZoneEnumMethods, ZoneOwner, ZoneRefreshType, ZoneOwnerVisibility, ZoneOpponentVisibility, };
