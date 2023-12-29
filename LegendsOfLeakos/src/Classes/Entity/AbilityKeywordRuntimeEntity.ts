import TargetableRuntimeEntity from './TargetableRuntimeEntity';
import RuntimeZone from '../Zone/RuntimeZone';
import RuntimeCard from '../Card/RuntimeCard';
import RuntimeKeyword from '../Keyword/RuntimeKeyword/RuntimeKeyword';
import RuntimeAbility from '../Ability/RuntimeAbility';
import PlayerInfo from '../Player/PlayerInfo';
import { KeywordType } from '../../Enums/Keyword';
import RuntimeCondition from '../Condition/RuntimeCondition';
import RuntimeEffect from '../Effect/RuntimeEffect';
import GameState from '../Game/GameState';
import TargetInfo from '../Target/TargetInfo';
import Player from '../Player/Player';

/**
 * This class extends TargetableRuntimeEntity and provides abilities and keywords to that class. It is currently used by
 * cards and enchantments.
 */
class AbilityKeywordRuntimeEntity extends TargetableRuntimeEntity {
  // this always lives in a zone
  public residingZoneInstanceId: number;
  public keywords: RuntimeKeyword[] = [];
  public abilities: RuntimeAbility[] = [];

  // I really don't like doing this like this --- let's try not to
  // /**
  //  * The callback that is called when a keyword is added to this card.
  //  */
  // public onKeywordAdded?: (k: RuntimeKeyword) => void;

  // /**
  //  * The callback that is called when a keyword is removed from this card.
  //  */
  // public onKeywordRemoved?: (k: RuntimeKeyword) => void;

  public keywordsToRemove: RuntimeKeyword[] = [];

  // Keywords Functions

  public condemnKeywordToRemoval(k: RuntimeKeyword): void {
    this.keywordsToRemove.push(k);
  }

  public clearKeywordsToRemove(): void {
    for (const k of this.keywordsToRemove) {
      this.removeKeyword(k);
    }

    this.keywordsToRemove = [];
  }

  public removeKeyword(keyword: RuntimeKeyword): void {
    const index = this.keywords.indexOf(keyword);
    if (index > -1) {
      this.keywords.splice(index, 1);
    }
    // if (this.onKeywordRemoved) {
    //   this.onKeywordRemoved(keyword);
    // }
  }

  public hasKeyword(keywordType: KeywordType): boolean {
    const k = this.keywords.find((x) => x.keywordType === keywordType);
    return k !== undefined;
  }

  // Functions for Effect / Keyword Interactions

  // END TURN
  public onEndTurn(gameState: GameState): void {
    for (const activatedAbility of this.abilities) {
      if (!activatedAbility.isActive) continue;
      activatedAbility.onEndTurn();
    }
    for (const k of this.keywords) {
      if (!k.isActive) continue;
      k.onEndTurn(gameState);
    }
  }

  // CARD EFFECT
  public preResolveEffect(
    e: RuntimeEffect,
    sourceEntity: AbilityKeywordRuntimeEntity,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const keyword of this.keywords) {
      if (!keyword.isActive) continue;
      keyword.preResolveEffect(e, sourceEntity, gameState, targetInfoList);
    }

    this.clearKeywordsToRemove();
  }

  public postResolveEffect(
    e: RuntimeEffect,
    sourceEntity: AbilityKeywordRuntimeEntity,
    gameState: GameState,
    targetInfoList: TargetInfo[]
  ): void {
    for (const keyword of this.keywords) {
      if (!keyword.isActive) continue;
      keyword.postResolveEffect(e, sourceEntity, gameState, targetInfoList);
    }
    this.clearKeywordsToRemove();
  }

  // endregion
}

export default AbilityKeywordRuntimeEntity;
