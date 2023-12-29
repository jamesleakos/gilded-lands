"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = __importDefault(require("../../Enums"));
var mapping = {
    city: {
        all: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/city/all/hexPlainsTemple00.png',
        ],
        borders: {
            desert: [],
            fells: {},
            forest: {},
            mountain: [],
            ocean: [],
            prairie: [],
            tundra: {},
        },
        deep: {},
        mid: {},
        shallow: {},
    },
    desert: {
        all: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/all/hexDesertDunes00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/all/hexDesertDunes01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/all/hexDesertDunes02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/all/hexDesertDunes03.png',
        ],
        borders: {
            fells: [
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/borders/fells/hexDesertYellowHills00.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/borders/fells/hexDesertYellowHills01.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/borders/fells/hexDesertYellowHills02.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/borders/fells/hexDesertYellowHills03.png',
            ],
            forest: [
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/borders/forest/hexDesertYellowCactiForest00.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/borders/forest/hexDesertYellowCactiForest01.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/borders/forest/hexDesertYellowCactiForest02.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/borders/forest/hexDesertYellowCactiForest03.png',
            ],
            mountain: [],
            ocean: [],
            prairie: [],
            tundra: [
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/borders/tundra/hexDesertYellowSaltFlat00.png',
            ],
        },
        deep: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/deep/hexDesertDunes00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/deep/hexDesertDunes01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/deep/hexDesertDunes02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/deep/hexDesertDunes03.png',
        ],
        mid: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/mid/hexDesertYellowDirtDunes00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/mid/hexDesertYellowDirtDunes01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/mid/hexDesertYellowDirtDunes02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/mid/hexDesertYellowDirtDunes03.png',
        ],
        shallow: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/shallow/hexDesertYellowDirt00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/shallow/hexDesertYellowDirt01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/shallow/hexDesertYellowDirt02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/desert/shallow/hexDesertYellowDirt03.png',
        ],
    },
    fells: {
        all: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/fells/all/hexHighlands00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/fells/all/hexHighlands01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/fells/all/hexHighlands02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/fells/all/hexHighlands03.png',
        ],
        borders: {
            desert: {},
            forest: [],
            mountain: [],
            ocean: [],
            prairie: [],
            tundra: {},
        },
        deep: {},
        mid: {},
        shallow: {},
    },
    forest: {
        all: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/all/hexForestPine00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/all/hexForestPine01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/all/hexForestPine02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/all/hexForestPine03.png',
        ],
        borders: {
            desert: [],
            fells: [],
            mountain: [],
            ocean: [],
            prairie: [],
            tundra: [
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/borders/tundra/hexForestPineSnowCovered00.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/borders/tundra/hexForestPineSnowCovered01.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/borders/tundra/hexForestPineSnowCovered02.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/borders/tundra/hexForestPineSnowCovered03.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/borders/tundra/hexForestPineSnowCoveredClearing00.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/borders/tundra/hexForestPineSnowTransition00.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/borders/tundra/hexForestPineSnowTransition01.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/borders/tundra/hexForestPineSnowTransition02.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/borders/tundra/hexForestPineSnowTransition03.png',
            ],
        },
        deep: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/deep/hexForestPineSnowCovered00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/deep/hexForestPineSnowCovered01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/deep/hexForestPineSnowCovered02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/deep/hexForestPineSnowCovered03.png',
        ],
        mid: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/mid/hexForestPineSnowTransition00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/mid/hexForestPineSnowTransition01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/mid/hexForestPineSnowTransition02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/mid/hexForestPineSnowTransition03.png',
        ],
        shallow: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/shallow/hexForestPine00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/shallow/hexForestPine01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/shallow/hexForestPine02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/forest/shallow/hexForestPine03.png',
        ],
    },
    mountain: {
        all: [],
        borders: {
            desert: [
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/borders/desert/hexDesertYellowMesas00.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/borders/desert/hexDesertYellowMesas01.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/borders/desert/hexDesertYellowMesas02.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/borders/desert/hexDesertYellowMesas03.png',
            ],
            fells: [],
            forest: [],
            ocean: [],
            prairie: [],
            tundra: [
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/borders/tundra/hexHillsColdSnowCovered00.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/borders/tundra/hexHillsColdSnowCovered01.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/borders/tundra/hexHillsColdSnowCovered02.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/borders/tundra/hexHillsColdSnowCovered03.png',
            ],
        },
        deep: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/deep/hexMountainSnow00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/deep/hexMountainSnow01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/deep/hexMountainSnow02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/deep/hexMountainSnow03.png',
        ],
        mid: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/mid/hexMountain00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/mid/hexMountain01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/mid/hexMountain02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/mid/hexMountain03.png',
        ],
        shallow: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/shallow/hexHillsColdSnowTransition00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/shallow/hexHillsColdSnowTransition01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/shallow/hexHillsColdSnowTransition02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/mountain/shallow/hexHillsColdSnowTransition03.png',
        ],
    },
    ocean: {
        all: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/ocean/all/hexOcean00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/ocean/all/hexOcean01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/ocean/all/hexOcean02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/ocean/all/hexOcean03.png',
        ],
        borders: {
            desert: [],
            fells: [],
            forest: [],
            mountain: [],
            prairie: [],
            tundra: [],
        },
        deep: [],
        mid: [],
        shallow: [],
    },
    prairie: {
        all: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/all/hexPlains00_mod.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/all/hexPlains01_mod.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/all/hexPlains02_mod.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/all/hexPlains03_mod.png',
        ],
        borders: {
            desert: [
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/borders/desert/hexScrublands00.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/borders/desert/hexScrublands01.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/borders/desert/hexScrublands02.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/borders/desert/hexScrublands03.png',
            ],
            fells: [],
            forest: [],
            mountain: [],
            ocean: [],
            tundra: [
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/borders/tundra/hexPlainsColdSnowTransition00.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/borders/tundra/hexPlainsColdSnowTransition01.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/borders/tundra/hexPlainsColdSnowTransition02.png',
                'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/prairie/borders/tundra/hexPlainsColdSnowTransition03.png',
            ],
        },
        deep: [],
        mid: [],
        shallow: [],
    },
    tundra: {
        all: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/all/hexPlainsColdSnowCovered00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/all/hexPlainsColdSnowCovered01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/all/hexPlainsColdSnowCovered02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/all/hexPlainsColdSnowCovered03.png',
        ],
        borders: {
            desert: [],
            fells: [],
            forest: [],
            mountain: [],
            ocean: [],
            prairie: [],
        },
        deep: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/deep/hexSnowField00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/deep/hexSnowField01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/deep/hexSnowField02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/deep/hexSnowField03.png',
        ],
        mid: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/mid/hexSnowField00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/mid/hexSnowField01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/mid/hexSnowField02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/mid/hexSnowField03.png',
        ],
        shallow: [
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/shallow/hexPlainsColdSnowCovered00.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/shallow/hexPlainsColdSnowCovered01.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/shallow/hexPlainsColdSnowCovered02.png',
            'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/tundra/shallow/hexPlainsColdSnowCovered03.png',
        ],
    },
};
var stringsToUrl = function (type, depth, mapObj) {
    if (mapObj === void 0) { mapObj = mapping; }
    console.log('type: ', type);
    console.log('depth: ', depth);
    console.log('mapObj: ', mapObj);
    try {
        // the red tile
        var url = 'https://ik.imagekit.io/hfywj4j0a/LoL/LandTiles/red_hex.png';
        var typeObj = mapObj[type];
        // check the array at the depth - if there's nothing there, use the all array
        if (typeObj[depth].length > 0) {
            // choose random string from array
            var randomIndex = Math.floor(Math.random() * typeObj[depth].length);
            url = typeObj[depth][randomIndex];
        }
        else {
            var randomIndex = Math.floor(Math.random() * typeObj.all.length);
            url = typeObj.all[randomIndex];
        }
        return url;
    }
    catch (e) {
        console.log('e: ', e);
        throw new Error('type and depth must be strings, and type must be a valid land type - instead, type is ' +
            type +
            ' and depth is ' +
            depth);
    }
};
var intsToUrl = function (type, depth, mapObj) {
    if (mapObj === void 0) { mapObj = mapping; }
    if (typeof type !== 'number' ||
        typeof depth !== 'number' ||
        type < 0 ||
        type > 7) {
        throw new Error('type and depth must be numbers, and type must be between 0-7 - instead, type is ' +
            typeof type +
            ' and depth is ' +
            typeof depth);
    }
    var typeString = Enums_1.default.LandType[type];
    var depthString = Enums_1.default.BiomeDepth[Math.min(depth, 3)];
    return stringsToUrl(typeString, depthString, mapObj);
};
exports.default = {
    mapping: mapping,
    stringsToUrl: stringsToUrl,
    intsToUrl: intsToUrl,
};
