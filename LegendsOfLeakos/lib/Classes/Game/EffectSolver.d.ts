import GameState from './GameState';
import RuntimeEffect from '../Effect/RuntimeEffect';
import TargetInfo from '../Target/TargetInfo';
declare abstract class EffectSolver {
    static onRecruitmentPhaseStarted(gameState: GameState): void;
    static onRecruitmentPhaseEnded(gameState: GameState): void;
    static onManeuverPhaseStarted(gameState: GameState): void;
    static onManeuverPhaseEnded(gameState: GameState): void;
    static onSkirmishPhaseStarted(gameState: GameState): void;
    static onSkirmishPhaseEnded(gameState: GameState): void;
    static onBattlePhaseStarted(gameState: GameState): void;
    static onBattlePhaseEnded(gameState: GameState): void;
    static resetBlockers(gameState: GameState): void;
    static getRandomNumber(max: number): number;
    static getRandomNumberInRange(min: number, max: number): number;
    static doEffect(gameState: GameState, sourceEntityInstanceId: number, effect: RuntimeEffect, targetInfoList: TargetInfo[]): void;
    static updateStatBuffs(gameState: GameState): void;
    static checkForDeadCards(gameState: GameState): void;
}
export default EffectSolver;
