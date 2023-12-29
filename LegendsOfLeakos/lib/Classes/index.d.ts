declare const _default: {
    Card: {
        CardUpgrade: typeof import("./Card/CardUpgrade").default;
        LibraryCard: typeof import("./Card/LibraryCard").default;
        RuntimeCard: typeof import("./Card/RuntimeCard").default;
    };
    Enchantment: {
        LibraryEnchantment: typeof import("./Enchantment/LibraryEnchantment").default;
        RuntimeEnchantment: typeof import("./Enchantment/RuntimeEnchantment").default;
    };
    Ability: {
        RuntimeAbility: typeof import("./Ability/RuntimeAbility").default;
        ActivatedAbilityUpgrade: typeof import("./Ability/RuntimeAbilityUpgrade").default;
        LibraryAbility: typeof import("./Ability/LibraryAbility").default;
    };
    Effect: {
        RuntimeEffect: typeof import("./Effect/RuntimeEffect").default;
        EffectUpgrade: typeof import("./Effect/EffectUpgrade").default;
        DealSetDamageEffect: typeof import("./Effect/RuntimeEffects/CardTargetEffects/DealSetDamageEffect").default;
        EnchantEffect: typeof import("./Effect/RuntimeEffects/EnchantEffects/EnchantEffect").default;
        LibraryEffect: typeof import("./Effect/LibraryEffect").default;
        MoveCardEffect: typeof import("./Effect/RuntimeEffects/MoveEffects/MoveCardEffect").default;
        AttackEffect: typeof import("./Effect/RuntimeEffects/AttackEffects/AttackEffect").default;
        UpgradeCardEffect: typeof import("./Effect/RuntimeEffects/UpgradeEffects/UpgradeCardEffect").default;
    };
    Keyword: {
        RuntimeKeyword: typeof import("./Keyword/RuntimeKeyword/RuntimeKeyword").default;
        LibraryKeyword: typeof import("./Keyword/LibraryKeyword/LibraryKeyword").default;
        AttributeKeyword: typeof import("./Keyword/RuntimeKeyword/RuntimeKeywords/AttributeKeyword").default;
        DamageModificationKeyword: typeof import("./Keyword/RuntimeKeyword/RuntimeKeywords/DamageModificationKeyword").default;
        WarleaderKeyword: typeof import("./Keyword/RuntimeKeyword/RuntimeKeywords/WarleaderKeyword").default;
    };
    RealmsAndLand: {
        RuntimeLandTile: typeof import("./RealmsAndLand/LandTile/RuntimeLandTile").default;
        LibraryLandTile: typeof import("./RealmsAndLand/LandTile/LibraryLandTile").default;
        LibraryCardEntry: typeof import("./RealmsAndLand/Biome/LibraryCardEntry").default;
        LibraryBiome: typeof import("./RealmsAndLand/Biome/LibraryBiome").default;
        LibraryRealm: typeof import("./RealmsAndLand/Realm/LibraryRealm").default;
    };
    Game: {
        GameManager: typeof import("./Game/GameManager").default;
        GameProperties: typeof import("./Game/GameProperties").default;
    };
    Server: {
        GameServer: typeof import("./Server/GameServer").default;
        ServerHandler: typeof import("./Server/ServerHandler").default;
    };
    Player: {
        Player: typeof import("./Player/Player").default;
        PlayerInfo: typeof import("./Player/PlayerInfo").default;
    };
    PayResourceCost: {
        PayResourceCost: typeof import("./PayResourceCost/PayResourceCost").default;
        PayResourceCostUpgrade: typeof import("./PayResourceCost/PayResourceCostUpgrade").default;
    };
    Target: {
        TargetCriteria: typeof import("./Target/TargetCriteria").default;
        TargetInfo: typeof import("./Target/TargetInfo").default;
        TargetTypeInfo: typeof import("./Target/TargetTypeInfo").default;
        TargetCriteriaUpgrade: typeof import("./Target/TargetCriteriaUpgrade").default;
    };
};
export default _default;
