import { PhaseEnum } from '../../Enums/Phase';

class Phase {
  /// <summary>
  /// The enum of the phase.
  /// </summary>
  phaseEnum: PhaseEnum;

  constructor(phaseEnum: PhaseEnum) {
    this.phaseEnum = phaseEnum;
  }
}

export default Phase;
