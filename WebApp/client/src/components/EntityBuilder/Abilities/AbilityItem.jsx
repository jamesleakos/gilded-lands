import React, { useState, useEffect, useContext } from 'react';

// lol
import lol from '../../../../../lol_access/index.js';
const Ability = lol.Classes.Ability.ActivatedAbility;
const PhaseEnum = lol.Enums.PhaseEnum;

// internal
import EffectItem from './EffectItem.jsx';
// Utils
import Intcreaser from '../CardBuilder/Utility/Intcreaser.jsx';
import TitledIntcreaser from '../CardBuilder/Utility/TitledIntcreaser.jsx';
import TitledCycler from '../CardBuilder/Utility/TitledCycler.jsx';
import TitledCheckbox from '../CardBuilder/Utility/TitledCheckbox.jsx';
import EditableText from '../CardBuilder/Utility/EditableText.jsx';
import Costs from '../CardBuilder/Stats/Costs.jsx';

// css

import { AbilityItemStyled } from './styles/AbilityItem.styled.js';

function AbilityItem({ index, ability, abilities, save }) {
  const handlePhaseChange = (phase, isChecked) => {
    const ability = abilities[index];

    if (isChecked) {
      // Add the phase if it's not already in the array
      if (!ability.useableInPhases.includes(phase)) {
        ability.useableInPhases.push(phase);
      }
    } else {
      // Remove the phase from the array
      ability.useableInPhases = ability.useableInPhases.filter(
        (p) => p !== phase
      );
    }

    saveAbility(ability);
  };

  const saveAbility = (ability) => {
    const newAbilities = abilities.map((item, i) =>
      i === index ? ability : item
    );
    save(newAbilities);
  };

  return (
    <AbilityItemStyled>
      <div className='ability-item-content'>
        <button
          className='ability-delete-button'
          onClick={() => {
            const newAbilities = abilities.filter((item, i) => i !== index);
            save(newAbilities);
          }}
        >
          Delete
        </button>
        <EditableText
          text={ability.name}
          onTextChange={(text) => {
            ability.name = text;
            saveAbility(ability);
          }}
        />
        <EffectItem ability={ability} saveAbility={saveAbility} />
        <div className='costs-title'>Costs</div>
        <Costs
          costs={ability.costs}
          saveCosts={(costs) => {
            ability.costs = costs;
            saveAbility(ability);
          }}
        />
        <TitledIntcreaser
          title='Uses Per Turn'
          int={ability.usesPerTurn}
          onIntChange={(value) => {
            ability.usesPerTurn = value;
            saveAbility(ability);
          }}
          minValue={0}
          maxValue={100}
        />
        <TitledCheckbox
          title='Starts Active'
          checked={ability.isActive}
          onCheckedChange={(checked) => {
            ability.isActive = checked;
            saveAbility(ability);
          }}
        />
        <div className='phases'>
          {Object.keys(PhaseEnum)
            .filter((key) => isNaN(Number(key))) // Filter out numeric keys
            .map((phaseKey) => {
              const phaseValue = PhaseEnum[phaseKey];
              return (
                <div key={phaseKey}>
                  <label>
                    <input
                      type='checkbox'
                      checked={ability.useableInPhases.includes(phaseValue)}
                      onChange={(e) =>
                        handlePhaseChange(phaseValue, e.target.checked)
                      }
                    />
                    {phaseKey}
                  </label>
                </div>
              );
            })}
        </div>
      </div>
    </AbilityItemStyled>
  );
}

export default AbilityItem;
