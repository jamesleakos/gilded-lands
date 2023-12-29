declare enum ConditionType {
    HasKeywordOfType = 0,
    EntitiesInSameZone = 1,
    CardIsInAcceptableZone = 2
}
declare enum ConditionTargetType {
    SingleTarget = 0,
    TargetEntityPlusSourceEntity = 1,
    TargetEntityPlusReliantEntities = 2
}
declare class ConditionMethods {
    static conditionTargetType(conditionType: ConditionType): ConditionTargetType;
}
export { ConditionType, ConditionTargetType, ConditionMethods };
