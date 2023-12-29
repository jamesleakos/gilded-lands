import Condition from './Condition';
import RuntimeZone from '../Zone/RuntimeZone';
import GameState from '../Game/GameState';
declare abstract class ZoneCondition extends Condition {
    /**
     * Returns true if this condition has been met on the specified zone and false otherwise.
     * @param zone The zone.
     * @returns True if this condition has been met on the specified zone; false otherwise.
     */
    abstract isTrue(zone: RuntimeZone, gameState: GameState): boolean;
}
export default ZoneCondition;
