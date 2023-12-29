enum TargetTypeEnum {
  TargetCreature,
  TargetOpponentCreature,
  TargetFriendlyCreature,
  TargetRow,
  TargetOpponentRow,
  TargetFriendlyRow,
  OpponentFrontRow,
  OpponentBackRow,
  FriendlyFrontRow,
  FriendlyBackRow,
  FriendlyBattleRow,
  OpponentBattleRow,
}

enum BroadTargetTypeEnum {
  card,
  zone,
}

enum TargetableTypeSelectionEnum {
  TargetableOnActivation,
  TargetableOnQueueCall,
  AutoTarget,
}

class TargetMethods {
  static broadTargetType(targetTypeEnum: TargetTypeEnum): BroadTargetTypeEnum {
    switch (targetTypeEnum) {
      case TargetTypeEnum.TargetCreature:
        return BroadTargetTypeEnum.card;
      case TargetTypeEnum.TargetOpponentCreature:
        return BroadTargetTypeEnum.card;
      case TargetTypeEnum.TargetFriendlyCreature:
        return BroadTargetTypeEnum.card;
      case TargetTypeEnum.TargetOpponentRow:
        return BroadTargetTypeEnum.zone;
      case TargetTypeEnum.TargetRow:
        return BroadTargetTypeEnum.zone;
      case TargetTypeEnum.TargetFriendlyRow:
        return BroadTargetTypeEnum.zone;
      case TargetTypeEnum.OpponentFrontRow:
        return BroadTargetTypeEnum.zone;
      case TargetTypeEnum.OpponentBackRow:
        return BroadTargetTypeEnum.zone;
      case TargetTypeEnum.FriendlyFrontRow:
        return BroadTargetTypeEnum.zone;
      case TargetTypeEnum.FriendlyBackRow:
        return BroadTargetTypeEnum.zone;
      default:
        throw new Error(
          'Case Not Implemented for broadTargetType: ' + targetTypeEnum
        );
    }
  }
  static canBeTargetable(targetTypeEnum: TargetTypeEnum): boolean {
    switch (targetTypeEnum) {
      case TargetTypeEnum.TargetCreature:
        return true;
      case TargetTypeEnum.TargetOpponentCreature:
        return true;
      case TargetTypeEnum.TargetFriendlyCreature:
        return true;
      case TargetTypeEnum.TargetRow:
        return true;
      case TargetTypeEnum.TargetOpponentRow:
        return true;
      case TargetTypeEnum.TargetFriendlyRow:
        return true;
      case TargetTypeEnum.OpponentFrontRow:
        return false;
      case TargetTypeEnum.OpponentBackRow:
        return false;
      case TargetTypeEnum.FriendlyFrontRow:
        return false;
      case TargetTypeEnum.FriendlyBackRow:
        return false;
      default:
        throw new Error(
          'Case Not Implemented for canBeTargetable: ' + targetTypeEnum
        );
    }
  }
  static playerSelectsTargets(
    targetableTypeSelectionEnum: TargetableTypeSelectionEnum
  ): boolean {
    switch (targetableTypeSelectionEnum) {
      case TargetableTypeSelectionEnum.TargetableOnActivation:
        return true;
      case TargetableTypeSelectionEnum.TargetableOnQueueCall:
        return true;
      case TargetableTypeSelectionEnum.AutoTarget:
        return false;
      default:
        throw new Error(
          'Case Not Implemented for playerSelectsTarget: ' +
            targetableTypeSelectionEnum
        );
    }
  }
}

export {
  TargetTypeEnum,
  BroadTargetTypeEnum,
  TargetableTypeSelectionEnum,
  TargetMethods,
};
