enum NetworkProtocol {
  StartGame,
  EndGame,
  StartTurn,
  EndTurn,
  PlayerState,
  OpponentState,
  QueuePlayCard,
  CardPlayed,
  CardMoved,
  CardsMoved,
  PlayerAttacked,
  CreatureAttacked,
  AbilityActivated,
  SendChatTextMessage,
  BroadcastChatText,
  PlayerDrewCards,
  OpponentDrewCards,
  PlayerFinishedRecruiting,
  NextPhaseReady,
  QueueFightCreature,
  PlayerReadyForQueue,
  EndExecuteQueue,
  QueueActivateAbility,
  LandExplored,
  LandTypeChanged,
  CardUpgraded,
  QueueUpgradeCard,
  GetTargetsFromPlayer,
  ReturnTargetsToServer,
  QueueStarted,
  PlayerExploredLand,
  PlayerChangedLandType,
  CardIsBlocking,
  StopCardBlocking,
  ReorderBlockingCard,
  PlayerCardMovedRow,
  ServerCardMovedRow,
  Test,
  RejoinedGame,
  ServerSendingGamestateForRejoin,
  CancelAction,
}

export { NetworkProtocol };
