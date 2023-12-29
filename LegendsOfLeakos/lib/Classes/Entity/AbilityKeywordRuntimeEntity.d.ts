import TargetableRuntimeEntity from './TargetableRuntimeEntity';
import RuntimeKeyword from '../Keyword/RuntimeKeyword/RuntimeKeyword';
import RuntimeAbility from '../Ability/RuntimeAbility';
import { KeywordType } from '../../Enums/Keyword';
import RuntimeEffect from '../Effect/RuntimeEffect';
import GameState from '../Game/GameState';
import TargetInfo from '../Target/TargetInfo';
/**
 * This class extends TargetableRuntimeEntity and provides abilities and keywords to that class. It is currently used by
 * cards and enchantments.
 */
declare class AbilityKeywordRuntimeEntity extends TargetableRuntimeEntity {
    residingZoneInstanceId: number;
    keywords: RuntimeKeyword[];
    abilities: RuntimeAbility[];
    keywordsToRemove: RuntimeKeyword[];
    condemnKeywordToRemoval(k: RuntimeKeyword): void;
    clearKeywordsToRemove(): void;
    removeKeyword(keyword: RuntimeKeyword): void;
    hasKeyword(keywordType: KeywordType): boolean;
    onEndTurn(gameState: GameState): void;
    preResolveEffect(e: RuntimeEffect, sourceEntity: AbilityKeywordRuntimeEntity, gameState: GameState, targetInfoList: TargetInfo[]): void;
    postResolveEffect(e: RuntimeEffect, sourceEntity: AbilityKeywordRuntimeEntity, gameState: GameState, targetInfoList: TargetInfo[]): void;
}
export default AbilityKeywordRuntimeEntity;
