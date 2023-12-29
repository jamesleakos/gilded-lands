enum ConditionType {
  HasKeywordOfType,
  EntitiesInSameZone,
  CardIsInAcceptableZone,
}

enum ConditionTargetType {
  SingleTarget,
  TargetEntityPlusSourceEntity,
  TargetEntityPlusReliantEntities,
}

class ConditionMethods {
  static conditionTargetType(
    conditionType: ConditionType
  ): ConditionTargetType {
    switch (conditionType) {
      case ConditionType.HasKeywordOfType:
        return ConditionTargetType.SingleTarget;
      case ConditionType.EntitiesInSameZone:
        return ConditionTargetType.TargetEntityPlusSourceEntity;
      case ConditionType.CardIsInAcceptableZone:
        return ConditionTargetType.SingleTarget;
      default:
        throw new Error('Invalid ConditionType');
    }
  }
}

export { ConditionType, ConditionTargetType, ConditionMethods };
