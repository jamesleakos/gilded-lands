"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectType = void 0;
var EffectType;
(function (EffectType) {
    // Attack Effects
    EffectType[EffectType["NormalAttack"] = 0] = "NormalAttack";
    // Aggressive Effects
    EffectType[EffectType["DealSetDamage"] = 1] = "DealSetDamage";
    EffectType[EffectType["DealDamageEqualToAttack"] = 2] = "DealDamageEqualToAttack";
    // Give Keywords
    EffectType[EffectType["GiveShieldedKeyword"] = 3] = "GiveShieldedKeyword";
    EffectType[EffectType["GiveShieldedKeywordBasedOnOtherUnits"] = 4] = "GiveShieldedKeywordBasedOnOtherUnits";
    // Give Enchantments
    EffectType[EffectType["Enchant"] = 5] = "Enchant";
    // Move Card
    EffectType[EffectType["MoveCardEffect"] = 6] = "MoveCardEffect";
    // Upgrade Card
    EffectType[EffectType["UpgradeCardEffect"] = 7] = "UpgradeCardEffect";
})(EffectType || (EffectType = {}));
exports.EffectType = EffectType;
