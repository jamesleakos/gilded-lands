"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryLandTile = /** @class */ (function () {
    function LibraryLandTile() {
    }
    LibraryLandTile.getRealmEntryFromLandTile = function (landTile) {
        var tempTile = new LibraryLandTile();
        tempTile.id = landTile.id;
        tempTile.landType = landTile.landType;
        tempTile.depth = landTile.depth;
        tempTile.x = landTile.x;
        tempTile.y = landTile.y;
        tempTile.z = landTile.z;
        return tempTile;
    };
    LibraryLandTile.copyLandTile = function (oldEntry) {
        var tempTile = new LibraryLandTile();
        tempTile.id = oldEntry.id;
        tempTile.landType = oldEntry.landType;
        tempTile.depth = oldEntry.depth;
        tempTile.x = oldEntry.x;
        tempTile.y = oldEntry.y;
        tempTile.z = oldEntry.z;
        return tempTile;
    };
    return LibraryLandTile;
}());
