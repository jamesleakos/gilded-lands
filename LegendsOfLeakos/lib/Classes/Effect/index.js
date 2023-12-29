"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RuntimeEffect_1 = __importDefault(require("./RuntimeEffect"));
var EffectUpgrade_1 = __importDefault(require("./EffectUpgrade"));
var DealSetDamageEffect_1 = __importDefault(require("./RuntimeEffects/CardTargetEffects/DealSetDamageEffect"));
var EnchantEffect_1 = __importDefault(require("./RuntimeEffects/EnchantEffects/EnchantEffect"));
var LibraryEffect_1 = __importDefault(require("./LibraryEffect"));
var MoveCardEffect_1 = __importDefault(require("./RuntimeEffects/MoveEffects/MoveCardEffect"));
var AttackEffect_1 = __importDefault(require("./RuntimeEffects/AttackEffects/AttackEffect"));
var UpgradeCardEffect_1 = __importDefault(require("./RuntimeEffects/UpgradeEffects/UpgradeCardEffect"));
exports.default = {
    RuntimeEffect: RuntimeEffect_1.default,
    EffectUpgrade: EffectUpgrade_1.default,
    DealSetDamageEffect: DealSetDamageEffect_1.default,
    EnchantEffect: EnchantEffect_1.default,
    LibraryEffect: LibraryEffect_1.default,
    MoveCardEffect: MoveCardEffect_1.default,
    AttackEffect: AttackEffect_1.default,
    UpgradeCardEffect: UpgradeCardEffect_1.default,
};
