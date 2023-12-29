declare enum TargetTypeEnum {
    TargetCreature = 0,
    TargetOpponentCreature = 1,
    TargetFriendlyCreature = 2,
    TargetRow = 3,
    TargetOpponentRow = 4,
    TargetFriendlyRow = 5,
    OpponentFrontRow = 6,
    OpponentBackRow = 7,
    FriendlyFrontRow = 8,
    FriendlyBackRow = 9,
    FriendlyBattleRow = 10,
    OpponentBattleRow = 11
}
declare enum BroadTargetTypeEnum {
    card = 0,
    zone = 1
}
declare enum TargetableTypeSelectionEnum {
    TargetableOnActivation = 0,
    TargetableOnQueueCall = 1,
    AutoTarget = 2
}
declare class TargetMethods {
    static broadTargetType(targetTypeEnum: TargetTypeEnum): BroadTargetTypeEnum;
    static canBeTargetable(targetTypeEnum: TargetTypeEnum): boolean;
    static playerSelectsTargets(targetableTypeSelectionEnum: TargetableTypeSelectionEnum): boolean;
}
export { TargetTypeEnum, BroadTargetTypeEnum, TargetableTypeSelectionEnum, TargetMethods, };
