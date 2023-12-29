"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryCard = /** @class */ (function () {
    function LibraryCard() {
        this.costs = [];
        // TODO : add requirement class to replace 'any'
        this.deckRequirements = [];
        // TODO : add stats - not in a list of stats though
        // TODO : add properties - not in a list of properties though
        // TODO: add keywords class to replace 'any'
        this.libraryKeywords = [];
        // TODO: add abilities class to replace 'any'
        this.activatedAbilities = [];
        // TODO: add abilities class to replace 'any'
        this.battlecryAbilities = [];
        // TODO: add upgrades class to replace 'any'
        this.cardUpgrades = [];
    }
    LibraryCard.prototype.getCardUpgradeByUpgradeIndex = function (index) {
        return this.cardUpgrades.find(function (c) { return c.upgradeIndex === index; });
    };
    return LibraryCard;
}());
exports.default = LibraryCard;
