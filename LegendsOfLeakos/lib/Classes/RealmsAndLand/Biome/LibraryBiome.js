"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LibraryCardEntry_1 = __importDefault(require("./LibraryCardEntry"));
var LibraryLandTile_1 = __importDefault(require("../LandTile/LibraryLandTile"));
var LandAndBiome_1 = require("../../../Enums/LandAndBiome");
//#region Messages
var BiomeAddCardMessage = /** @class */ (function () {
    function BiomeAddCardMessage(result, numberAdded, message) {
        this.result = result;
        this.numberAdded = numberAdded;
        this.message = message;
    }
    return BiomeAddCardMessage;
}());
var BiomeValidMessage = /** @class */ (function () {
    function BiomeValidMessage(isValid, message) {
        this.isValid = isValid;
        this.message = message;
    }
    return BiomeValidMessage;
}());
//#endregion
var LibraryBiome = /** @class */ (function () {
    function LibraryBiome() {
        this.name = 'New Biome';
        this.cards = [];
        this.landTiles = [];
        this.subBiomes = [];
        // #endregion
    }
    //#region Landtiles
    LibraryBiome.prototype.getLandTiles = function () {
        var tiles = [];
        tiles.push.apply(tiles, this.landTiles);
        return tiles;
    };
    //#endregion
    // #region Biome / Card Requirement Validity
    LibraryBiome.prototype.wouldRemovingThisCardCauseErrors = function (card, gameManager) {
        var testBiome = LibraryBiome.copyBiome(this);
        testBiome.removeSingleCardFromBiomeOrSubbiome(card);
        return testBiome.areBiomeAndSubsValid(gameManager);
    };
    LibraryBiome.prototype.areBiomeAndSubsValid = function (gameManager, message) {
        if (message === void 0) { message = new BiomeValidMessage(true, ''); }
        var _loop_1 = function (entry) {
            var card = gameManager.cardLibrary.find(function (c) { return c.libraryId === entry.libraryId; });
            if (card === undefined) {
                throw new Error('The library is likely smaller than it used to be');
            }
            for (var _d = 0, _e = card.deckRequirements; _d < _e.length; _d++) {
                var req = _e[_d];
                if (!req.isRequirementMet(this_1, card.libraryId)) {
                    message.isValid = false;
                    message.message +=
                        'The requirement of ' +
                            req.requirementToText(gameManager) +
                            ' is not met; ';
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var entry = _a[_i];
            _loop_1(entry);
        }
        for (var _b = 0, _c = this.subBiomes; _b < _c.length; _b++) {
            var sub = _c[_b];
            var subResponse = sub.areBiomeAndSubsValid(gameManager, message);
            if (!subResponse.isValid) {
                message.isValid = false;
                message.message += subResponse.message;
            }
        }
        return message;
    };
    LibraryBiome.prototype.cardsCanBeAddedToBiomeOrSubbiome = function (card, amount, gameManager) {
        if (!card) {
            return new BiomeAddCardMessage(LandAndBiome_1.BiomeAddCardEnum.Failure, 0, 'Card is undefined');
        }
        if (card.biomeType !== this.biomeType) {
            return new BiomeAddCardMessage(LandAndBiome_1.BiomeAddCardEnum.Failure, 0, "".concat(card.name, " belongs in the ").concat(LandAndBiome_1.BiomeType[card.biomeType], " and this is a ").concat(LandAndBiome_1.BiomeType[this.biomeType]));
        }
        if (card.biomeDepth < Math.max.apply(Math, this.subBiomes.map(function (c) { return c.biomeDepth; }))) {
            return new BiomeAddCardMessage(LandAndBiome_1.BiomeAddCardEnum.Failure, 0, "".concat(card.name, " requires ").concat(LandAndBiome_1.BiomeDepth[card.biomeDepth], " ").concat(LandAndBiome_1.BiomeType[card.biomeType], " and this only has ").concat(LandAndBiome_1.BiomeDepth[this.biomeDepth], " ").concat(LandAndBiome_1.BiomeType[this.biomeType]));
        }
        var thisDeck = this.cardsCanBeAddedToThisBiome(card, amount, gameManager);
        if (thisDeck.result !== LandAndBiome_1.BiomeAddCardEnum.Failure || card.biomeDepth === 0) {
            return thisDeck;
        }
        else {
            var rightSub = this.subBiomes.find(function (c) { return c.biomeDepth === card.biomeDepth; });
            return rightSub.cardsCanBeAddedToThisBiome(card, amount, gameManager);
        }
    };
    LibraryBiome.prototype.cardsCanBeAddedToThisBiome = function (card, amount, gameManager) {
        if (card.biomeType !== this.biomeType) {
            return new BiomeAddCardMessage(LandAndBiome_1.BiomeAddCardEnum.Failure, 0, card.name +
                ' belongs in the ' +
                card.biomeType +
                ' and this is a ' +
                this.biomeType);
        }
        if (card.biomeDepth !== this.biomeDepth &&
            card.biomeDepth !== LandAndBiome_1.BiomeDepth.all) {
            return new BiomeAddCardMessage(LandAndBiome_1.BiomeAddCardEnum.Failure, 0, card.name +
                ' requires ' +
                card.biomeDepth +
                ' ' +
                card.biomeType +
                ' and this is a ' +
                this.biomeDepth +
                ' ' +
                this.biomeType);
        }
        var addedToDeck = 0;
        for (var i = 0; i < amount; i++) {
            var canAdd = true;
            var message = '';
            for (var _i = 0, _a = card.deckRequirements; _i < _a.length; _i++) {
                var req = _a[_i];
                if (!req.canBeAdded(this, card)) {
                    canAdd = false;
                    message = req.requirementToText(gameManager);
                    break;
                }
            }
            if (canAdd)
                addedToDeck++;
            else {
                if (addedToDeck === 0) {
                    return new BiomeAddCardMessage(LandAndBiome_1.BiomeAddCardEnum.Failure, 0, 'This ' +
                        this.biomeDepth +
                        ' ' +
                        this.biomeType +
                        ' does not satify ' +
                        card.name +
                        "'s requirement of " +
                        message);
                }
                else {
                    return new BiomeAddCardMessage(LandAndBiome_1.BiomeAddCardEnum.PartiallyAdded, 0, 'Copy ' +
                        (addedToDeck + 1) +
                        ' of ' +
                        card.name +
                        ' made the ' +
                        this.biomeDepth +
                        ' ' +
                        this.biomeType +
                        ' not satify ' +
                        card.name +
                        "'s requirement of " +
                        message);
                }
            }
        }
        return new BiomeAddCardMessage(LandAndBiome_1.BiomeAddCardEnum.Success, addedToDeck, 'Complete success');
    };
    // #endregion
    // #region CARDS
    // #region getting and counting cards
    LibraryBiome.prototype.getCardsCount = function () {
        var count = 0;
        // count here
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            count += card.amount;
        }
        // add subbiome counts
        for (var _b = 0, _c = this.subBiomes; _b < _c.length; _b++) {
            var sub = _c[_b];
            count += sub.getCardsCount();
        }
        // return
        return count;
    };
    LibraryBiome.prototype.getCardsCountByLibraryID = function (libraryId) {
        var count = 0;
        // count here
        var temp = this.cards.find(function (c) { return c.libraryId === libraryId; });
        if (temp != null)
            count += temp.amount;
        // add subbiome counts
        for (var _i = 0, _a = this.subBiomes; _i < _a.length; _i++) {
            var sub = _a[_i];
            count += sub.getCardsCountByLibraryID(libraryId);
        }
        // return
        return count;
    };
    // TODO : add corrent config type
    LibraryBiome.prototype.getCardsCountByCardType = function (config, cardTypeId) {
        var count = 0;
        var _loop_2 = function (card) {
            // TODO not sure what id meanns here
            var libraryCard = config.cards.find(function (x) { return x.id == card.libraryId; });
            if (libraryCard && libraryCard.cardTypeId === cardTypeId) {
                count += card.amount;
                return "break";
            }
        };
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            var state_1 = _loop_2(card);
            if (state_1 === "break")
                break;
        }
        return count;
    };
    LibraryBiome.prototype.getAllCardsInBiomeAndSubbiomes = function () {
        var cards = [];
        cards.push.apply(cards, this.cards);
        for (var _i = 0, _a = this.subBiomes; _i < _a.length; _i++) {
            var sub = _a[_i];
            cards.push.apply(cards, sub.getAllCardsInBiomeAndSubbiomes());
        }
        return cards;
    };
    // #endregion
    // #region adding cards
    LibraryBiome.prototype.addCardsToBiomeOrSubbiome = function (card, amount, gameManager) {
        var result = this.cardsCanBeAddedToBiomeOrSubbiome(card, amount, gameManager);
        if (result.result === LandAndBiome_1.BiomeAddCardEnum.Failure)
            return result;
        result = this.cardsCanBeAddedToThisBiome(card, amount, gameManager);
        if (result.result !== LandAndBiome_1.BiomeAddCardEnum.Failure) {
            this.addCard(card, result.numberAdded);
            return result;
        }
        else {
            var subbiome = this.subBiomes.find(function (c) { return c.biomeDepth === card.biomeDepth; });
            return subbiome.addCardsToBiomeOrSubbiome(card, amount, gameManager);
        }
    };
    LibraryBiome.prototype.addCard = function (card, amount) {
        var existingCard = this.cards.find(function (x) { return x.libraryId === card.libraryId; });
        if (existingCard !== undefined) {
            existingCard.amount += amount;
        }
        else {
            this.cards.push(new LibraryCardEntry_1.default(card.libraryId, amount));
        }
    };
    // #endregion
    // #region removing cards
    LibraryBiome.prototype.deleteAllCards = function () {
        this.cards = [];
        for (var _i = 0, _a = this.subBiomes; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.deleteAllCards();
        }
    };
    LibraryBiome.prototype.removeSingleCardFromBiomeOrSubbiome = function (card) {
        if (this.removeSingleCard(card)) {
            return true;
        }
        else {
            for (var _i = 0, _a = this.subBiomes; _i < _a.length; _i++) {
                var sub = _a[_i];
                if (sub.removeSingleCardFromBiomeOrSubbiome(card))
                    return true;
            }
        }
        return false;
    };
    LibraryBiome.prototype.removeCards = function (card) {
        var existingCard = this.cards.find(function (x) { return x.libraryId === card.libraryId; });
        if (existingCard !== undefined) {
            this.cards.splice(this.cards.indexOf(existingCard), 1);
        }
    };
    LibraryBiome.prototype.removeSingleCard = function (card) {
        var existingCard = this.cards.find(function (x) { return x.libraryId === card.libraryId; });
        if (existingCard !== undefined) {
            if (existingCard.amount === 1)
                this.cards.splice(this.cards.indexOf(existingCard), 1);
            else
                existingCard.amount--;
            return true;
        }
        else {
            return false;
        }
    };
    // #endregion
    // #endregion
    // #region JSON and COPY utils
    LibraryBiome.prototype.toJSON = function () {
        var json = {};
        json.biomeType = LandAndBiome_1.BiomeType[this.biomeType];
        json.biomeDepth = LandAndBiome_1.BiomeDepth[this.biomeDepth];
        json.cards = [];
        for (var _i = 0, _a = this.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            json.cards.push(card.toJSON());
        }
        json.subBiomes = [];
        for (var _b = 0, _c = this.subBiomes; _b < _c.length; _b++) {
            var sub = _c[_b];
            json.subBiomes.push(sub.toJSON());
        }
        json.landTiles = [];
        for (var _d = 0, _e = this.landTiles; _d < _e.length; _d++) {
            var tile = _e[_d];
            json.landTiles.push(tile.toJSON());
        }
        return json;
    };
    LibraryBiome.fromJSON = function (json) {
        var biome = new LibraryBiome();
        biome.biomeType = LandAndBiome_1.BiomeType[json.biomeType];
        biome.biomeDepth = LandAndBiome_1.BiomeDepth[json.biomeDepth];
        if (json.cards) {
            for (var _i = 0, _a = json.cards; _i < _a.length; _i++) {
                var card = _a[_i];
                biome.cards.push(LibraryCardEntry_1.default.fromJSON(card));
            }
        }
        if (json.subBiomes) {
            for (var _b = 0, _c = json.subBiomes; _b < _c.length; _b++) {
                var sub = _c[_b];
                biome.subBiomes.push(LibraryBiome.fromJSON(sub));
            }
        }
        if (json.landTiles) {
            for (var _d = 0, _e = json.landTiles; _d < _e.length; _d++) {
                var tile = _e[_d];
                biome.landTiles.push(LibraryLandTile_1.default.fromJSON(tile));
            }
        }
        return biome;
    };
    LibraryBiome.copyBiome = function (oldBiome) {
        var tempBiome = new LibraryBiome();
        tempBiome.biomeType = oldBiome.biomeType;
        tempBiome.biomeDepth = oldBiome.biomeDepth;
        tempBiome.cards = [];
        tempBiome.landTiles = [];
        for (var _i = 0, _a = oldBiome.cards; _i < _a.length; _i++) {
            var newCard = _a[_i];
            var tempCardEntry = new LibraryCardEntry_1.default(newCard.libraryId, newCard.amount);
            tempBiome.cards.push(tempCardEntry);
        }
        for (var _b = 0, _c = oldBiome.landTiles; _b < _c.length; _b++) {
            var tile = _c[_b];
            var tempLandTile = LibraryLandTile_1.default.fromJSON(tile.toJSON());
            tempBiome.landTiles.push(tempLandTile);
        }
        for (var _d = 0, _e = oldBiome.subBiomes; _d < _e.length; _d++) {
            var subBiome = _e[_d];
            tempBiome.subBiomes.push(LibraryBiome.copyBiome(subBiome));
        }
        return tempBiome;
    };
    LibraryBiome.copyAllCardsBetweenBiomes = function (oldBiome, newBiome) {
        newBiome.cards = [];
        for (var _i = 0, _a = oldBiome.cards; _i < _a.length; _i++) {
            var card = _a[_i];
            newBiome.cards.push(new LibraryCardEntry_1.default(card.libraryId, card.amount));
        }
        var _loop_3 = function (subBiome) {
            var newSubBiome = newBiome.subBiomes.find(function (c) { return c.biomeDepth === subBiome.biomeDepth; });
            if (newSubBiome !== undefined) {
                LibraryBiome.copyAllCardsBetweenBiomes(subBiome, newSubBiome);
            }
        };
        for (var _b = 0, _c = oldBiome.subBiomes; _b < _c.length; _b++) {
            var subBiome = _c[_b];
            _loop_3(subBiome);
        }
    };
    return LibraryBiome;
}());
// export
exports.default = LibraryBiome;
