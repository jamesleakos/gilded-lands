"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryCardEntry = /** @class */ (function () {
    function LibraryCardEntry(libraryId, amount) {
        this.libraryId = libraryId;
        this.amount = amount;
    }
    LibraryCardEntry.prototype.toJSON = function () {
        return {
            libraryId: this.libraryId,
            amount: this.amount,
        };
    };
    LibraryCardEntry.fromJSON = function (json) {
        return new LibraryCardEntry(json.libraryId, json.amount);
    };
    return LibraryCardEntry;
}());
exports.default = LibraryCardEntry;
