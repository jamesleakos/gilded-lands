declare const _default: {
    Constants: {
        gameProperties: typeof import("./Classes/Game/GameProperties").default;
        imageMapping: {
            landTypes: {
                mapping: any;
                stringsToUrl: (type: string, depth: string, mapObj?: any) => string;
                intsToUrl: (type: number, depth: number, mapObj?: any) => string;
            };
        };
    };
    Enums: {
        LandType: typeof import("./Enums/LandAndBiome").LandType;
        BiomeType: typeof import("./Enums/LandAndBiome").BiomeType;
        BiomeDepth: typeof import("./Enums/LandAndBiome").BiomeDepth;
        BiomeAddCardEnum: typeof import("./Enums/LandAndBiome").BiomeAddCardEnum;
        AbilityType: typeof import("./Enums/EntityFeatures").AbilityType;
        PhaseEnum: typeof import("./Enums/Phase").PhaseEnum;
        KeywordType: typeof import("./Enums/Keyword").KeywordType;
        Attribute: typeof import("./Enums/Keyword").Attribute;
        ZoneEnum: typeof import("./Enums/Zone").ZoneEnum;
        EffectType: typeof import("./Enums/Effect").EffectType;
        ZoneEnumMethods: typeof import("./Enums/Zone").ZoneEnumMethods;
        ZoneOwner: typeof import("./Enums/Zone").ZoneOwner;
        ZoneRefreshType: typeof import("./Enums/Zone").ZoneRefreshType;
        ZoneOwnerVisibility: typeof import("./Enums/Zone").ZoneOwnerVisibility;
        ZoneOpponentVisibility: typeof import("./Enums/Zone").ZoneOpponentVisibility;
        NetworkProtocol: typeof import("./Enums/NetworkProtocol").NetworkProtocol;
        TargetTypeEnum: typeof import("./Enums/Target").TargetTypeEnum;
        TargetableTypeSelectionEnum: typeof import("./Enums/Target").TargetableTypeSelectionEnum;
        BroadTargetTypeEnum: typeof import("./Enums/Target").BroadTargetTypeEnum;
        TargetMethods: typeof import("./Enums/Target").TargetMethods;
        ConditionType: typeof import("./Enums/Condition").ConditionType;
        ConditionTargetType: typeof import("./Enums/Condition").ConditionTargetType;
        ConditionMethods: typeof import("./Enums/Condition").ConditionMethods;
    };
    Classes: {
        Card: {
            CardUpgrade: typeof import("./Classes/Card/CardUpgrade").default;
            LibraryCard: typeof import("./Classes/Card/LibraryCard").default;
            RuntimeCard: typeof import("./Classes/Card/RuntimeCard").default;
        };
        Enchantment: {
            LibraryEnchantment: typeof import("./Classes/Enchantment/LibraryEnchantment").default;
            RuntimeEnchantment: typeof import("./Classes/Enchantment/RuntimeEnchantment").default;
        };
        Ability: {
            RuntimeAbility: typeof import("./Classes/Ability/RuntimeAbility").default;
            ActivatedAbilityUpgrade: typeof import("./Classes/Ability/RuntimeAbilityUpgrade").default;
            LibraryAbility: typeof import("./Classes/Ability/LibraryAbility").default;
        };
        Effect: {
            RuntimeEffect: typeof import("./Classes/Effect/RuntimeEffect").default;
            EffectUpgrade: typeof import("./Classes/Effect/EffectUpgrade").default;
            DealSetDamageEffect: typeof import("./Classes/Effect/RuntimeEffects/CardTargetEffects/DealSetDamageEffect").default;
            EnchantEffect: typeof import("./Classes/Effect/RuntimeEffects/EnchantEffects/EnchantEffect").default;
            LibraryEffect: typeof import("./Classes/Effect/LibraryEffect").default;
            MoveCardEffect: typeof import("./Classes/Effect/RuntimeEffects/MoveEffects/MoveCardEffect").default;
            AttackEffect: typeof import("./Classes/Effect/RuntimeEffects/AttackEffects/AttackEffect").default;
            UpgradeCardEffect: typeof import("./Classes/Effect/RuntimeEffects/UpgradeEffects/UpgradeCardEffect").default;
        };
        Keyword: {
            RuntimeKeyword: typeof import("./Classes/Keyword/RuntimeKeyword/RuntimeKeyword").default;
            LibraryKeyword: typeof import("./Classes/Keyword/LibraryKeyword/LibraryKeyword").default;
            AttributeKeyword: typeof import("./Classes/Keyword/RuntimeKeyword/RuntimeKeywords/AttributeKeyword").default;
            DamageModificationKeyword: typeof import("./Classes/Keyword/RuntimeKeyword/RuntimeKeywords/DamageModificationKeyword").default;
            WarleaderKeyword: typeof import("./Classes/Keyword/RuntimeKeyword/RuntimeKeywords/WarleaderKeyword").default;
        };
        RealmsAndLand: {
            RuntimeLandTile: typeof import("./Classes/RealmsAndLand/LandTile/RuntimeLandTile").default;
            LibraryLandTile: typeof import("./Classes/RealmsAndLand/LandTile/LibraryLandTile").default;
            LibraryCardEntry: typeof import("./Classes/RealmsAndLand/Biome/LibraryCardEntry").default;
            LibraryBiome: typeof import("./Classes/RealmsAndLand/Biome/LibraryBiome").default;
            LibraryRealm: typeof import("./Classes/RealmsAndLand/Realm/LibraryRealm").default;
        };
        Game: {
            GameManager: typeof import("./Classes/Game/GameManager").default;
            GameProperties: typeof import("./Classes/Game/GameProperties").default;
        };
        Server: {
            GameServer: typeof import("./Classes/Server/GameServer").default;
            ServerHandler: typeof import("./Classes/Server/ServerHandler").default;
        };
        Player: {
            Player: typeof import("./Classes/Player/Player").default;
            PlayerInfo: typeof import("./Classes/Player/PlayerInfo").default;
        };
        PayResourceCost: {
            PayResourceCost: typeof import("./Classes/PayResourceCost/PayResourceCost").default;
            PayResourceCostUpgrade: typeof import("./Classes/PayResourceCost/PayResourceCostUpgrade").default;
        };
        Target: {
            TargetCriteria: typeof import("./Classes/Target/TargetCriteria").default;
            TargetInfo: typeof import("./Classes/Target/TargetInfo").default;
            TargetTypeInfo: typeof import("./Classes/Target/TargetTypeInfo").default;
            TargetCriteriaUpgrade: typeof import("./Classes/Target/TargetCriteriaUpgrade").default;
        };
    };
};
export default _default;
