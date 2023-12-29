import Condition from './Condition';
import RuntimeCard from '../Card/RuntimeCard';
import GameState from '../Game/GameState';
declare abstract class CardCondition extends Condition {
    /**
     * Returns true if this condition has been met on the specified card and false otherwise.
     * @param card The card.
     * @returns True if this condition has been met on the specified card; false otherwise.
     */
    abstract isTrue(card: RuntimeCard, gameState: GameState): boolean;
}
export default CardCondition;
