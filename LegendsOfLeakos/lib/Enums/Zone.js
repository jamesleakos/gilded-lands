"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneOpponentVisibility = exports.ZoneOwnerVisibility = exports.ZoneRefreshType = exports.ZoneOwner = exports.ZoneEnumMethods = exports.ZoneEnum = void 0;
var ZoneEnum;
(function (ZoneEnum) {
    ZoneEnum[ZoneEnum["Deck"] = 0] = "Deck";
    ZoneEnum[ZoneEnum["Hand"] = 1] = "Hand";
    ZoneEnum[ZoneEnum["FrontBoard"] = 2] = "FrontBoard";
    ZoneEnum[ZoneEnum["BackBoard"] = 3] = "BackBoard";
    ZoneEnum[ZoneEnum["Graveyard"] = 4] = "Graveyard";
    ZoneEnum[ZoneEnum["BattleBoard"] = 5] = "BattleBoard";
})(ZoneEnum || (ZoneEnum = {}));
exports.ZoneEnum = ZoneEnum;
var ZoneEnumMethods = /** @class */ (function () {
    function ZoneEnumMethods() {
    }
    ZoneEnumMethods.isBoard = function (ze) {
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
    };
    return ZoneEnumMethods;
}());
exports.ZoneEnumMethods = ZoneEnumMethods;
var ZoneOwner;
(function (ZoneOwner) {
    ZoneOwner[ZoneOwner["Player"] = 0] = "Player";
    ZoneOwner[ZoneOwner["Shared"] = 1] = "Shared";
})(ZoneOwner || (ZoneOwner = {}));
exports.ZoneOwner = ZoneOwner;
/// <summary>
/// The available zone types.
/// </summary>
var ZoneRefreshType;
(function (ZoneRefreshType) {
    ZoneRefreshType[ZoneRefreshType["Static"] = 0] = "Static";
    ZoneRefreshType[ZoneRefreshType["Dynamic"] = 1] = "Dynamic";
})(ZoneRefreshType || (ZoneRefreshType = {}));
exports.ZoneRefreshType = ZoneRefreshType;
/// <summary>
/// The available zone owner visibilities.
/// </summary>
var ZoneOwnerVisibility;
(function (ZoneOwnerVisibility) {
    ZoneOwnerVisibility[ZoneOwnerVisibility["Visible"] = 0] = "Visible";
    ZoneOwnerVisibility[ZoneOwnerVisibility["Hidden"] = 1] = "Hidden";
})(ZoneOwnerVisibility || (ZoneOwnerVisibility = {}));
exports.ZoneOwnerVisibility = ZoneOwnerVisibility;
/// <summary>
/// The available zone opponent visibilities.
/// </summary>
var ZoneOpponentVisibility;
(function (ZoneOpponentVisibility) {
    ZoneOpponentVisibility[ZoneOpponentVisibility["Visible"] = 0] = "Visible";
    ZoneOpponentVisibility[ZoneOpponentVisibility["Hidden"] = 1] = "Hidden";
})(ZoneOpponentVisibility || (ZoneOpponentVisibility = {}));
exports.ZoneOpponentVisibility = ZoneOpponentVisibility;
