"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RealmsAndLand_1 = __importDefault(require("./RealmsAndLand"));
var Game_1 = __importDefault(require("./Game"));
var Card_1 = __importDefault(require("./Card"));
var Enchantment_1 = __importDefault(require("./Enchantment"));
var Effect_1 = __importDefault(require("./Effect"));
var Ability_1 = __importDefault(require("./Ability"));
var Keyword_1 = __importDefault(require("./Keyword"));
var Server_1 = __importDefault(require("./Server"));
var Player_1 = __importDefault(require("./Player"));
var Target_1 = __importDefault(require("./Target"));
var PayResourceCost_1 = __importDefault(require("./PayResourceCost"));
exports.default = {
    Card: Card_1.default,
    Enchantment: Enchantment_1.default,
    Ability: Ability_1.default,
    Effect: Effect_1.default,
    Keyword: Keyword_1.default,
    RealmsAndLand: RealmsAndLand_1.default,
    Game: Game_1.default,
    Server: Server_1.default,
    Player: Player_1.default,
    PayResourceCost: PayResourceCost_1.default,
    Target: Target_1.default,
};
