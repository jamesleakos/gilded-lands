"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameZoneType = void 0;
var LibraryZone = /** @class */ (function () {
    function LibraryZone(name, zoneEnum, owner, refreshType, ownerVisibility, opponentVisibility, hasMaxSize, maxSize) {
        this.name = name;
        this.zoneEnum = zoneEnum;
        this.owner = owner;
        this.refreshType = refreshType;
        this.ownerVisibility = ownerVisibility;
        this.opponentVisibility = opponentVisibility;
        this.hasMaxSize = hasMaxSize;
        this.maxSize = maxSize;
    }
    return LibraryZone;
}());
exports.GameZoneType = LibraryZone;
