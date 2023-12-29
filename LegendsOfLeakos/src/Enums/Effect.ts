enum EffectType {
  // Attack Effects
  NormalAttack,

  // Aggressive Effects
  DealSetDamage,
  DealDamageEqualToAttack,

  // Give Keywords
  GiveShieldedKeyword,
  GiveShieldedKeywordBasedOnOtherUnits,

  // Give Enchantments
  Enchant,

  // Move Card
  MoveCardEffect,

  // Upgrade Card
  UpgradeCardEffect,
}

export { EffectType };
