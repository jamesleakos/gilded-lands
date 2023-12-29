"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiomeAddCardEnum = exports.BiomeDepth = exports.BiomeType = exports.LandType = void 0;
var LandType;
(function (LandType) {
    LandType[LandType["forest"] = 0] = "forest";
    LandType[LandType["ocean"] = 1] = "ocean";
    LandType[LandType["desert"] = 2] = "desert";
    LandType[LandType["prairie"] = 3] = "prairie";
    LandType[LandType["fells"] = 4] = "fells";
    LandType[LandType["mountain"] = 5] = "mountain";
    LandType[LandType["tundra"] = 6] = "tundra";
    LandType[LandType["city"] = 7] = "city";
})(LandType || (LandType = {}));
exports.LandType = LandType;
var BiomeType;
(function (BiomeType) {
    BiomeType[BiomeType["forest"] = 0] = "forest";
    BiomeType[BiomeType["ocean"] = 1] = "ocean";
    BiomeType[BiomeType["desert"] = 2] = "desert";
    BiomeType[BiomeType["prairie"] = 3] = "prairie";
    BiomeType[BiomeType["fells"] = 4] = "fells";
    BiomeType[BiomeType["mountain"] = 5] = "mountain";
    BiomeType[BiomeType["tundra"] = 6] = "tundra";
    BiomeType[BiomeType["city"] = 7] = "city";
    BiomeType[BiomeType["world"] = 8] = "world";
})(BiomeType || (BiomeType = {}));
exports.BiomeType = BiomeType;
var BiomeDepth;
(function (BiomeDepth) {
    BiomeDepth[BiomeDepth["all"] = 0] = "all";
    BiomeDepth[BiomeDepth["shallow"] = 1] = "shallow";
    BiomeDepth[BiomeDepth["mid"] = 2] = "mid";
    BiomeDepth[BiomeDepth["deep"] = 3] = "deep";
})(BiomeDepth || (BiomeDepth = {}));
exports.BiomeDepth = BiomeDepth;
var BiomeAddCardEnum;
(function (BiomeAddCardEnum) {
    BiomeAddCardEnum[BiomeAddCardEnum["Success"] = 0] = "Success";
    BiomeAddCardEnum[BiomeAddCardEnum["PartiallyAdded"] = 1] = "PartiallyAdded";
    BiomeAddCardEnum[BiomeAddCardEnum["Failure"] = 2] = "Failure";
})(BiomeAddCardEnum || (BiomeAddCardEnum = {}));
exports.BiomeAddCardEnum = BiomeAddCardEnum;
