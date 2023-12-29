"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryZone = void 0;
var LibraryZone = /** @class */ (function () {
    function LibraryZone(name, zoneEnum, owner, refreshType, ownerVisibility, opponentVisibility, hasMaxCards, maxCards) {
        this.name = name;
        this.zoneEnum = zoneEnum;
        this.owner = owner;
        this.refreshType = refreshType;
        this.ownerVisibility = ownerVisibility;
        this.opponentVisibility = opponentVisibility;
        this.hasMaxCards = hasMaxCards;
        this.maxCards = maxCards;
    }
    return LibraryZone;
}());
exports.LibraryZone = LibraryZone;
