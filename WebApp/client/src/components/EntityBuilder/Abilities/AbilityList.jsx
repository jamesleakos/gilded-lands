import React, { useState, useEffect, useContext } from 'react';

// lol
import lol from '../../../../../lol_access/index.js';
const ActivatedAbility = lol.Classes.Ability.ActivatedAbility;
const Effect = lol.Classes.Effect.Effect;
const EffectType = lol.Enums.EffectType;

// internal
import AbilityItem from './AbilityItem.jsx';

// css
import { AbilityListStyled } from './styles/AbilityList.styled.js';

function AbilityList({ abilities, save }) {
  const handleNewAbility = (effectType) => {
    const newAbility = createNewAbility(effectType);
    abilities.push(newAbility);
    save(abilities);
  };

  const createNewAbility = (effectType) => {
    let minIndex = 0;
    if (abilities.length > 0) {
      const indices = abilities.map((aa) => aa.indexForUpgrades);
      while (indices.includes(minIndex)) {
        minIndex++;
      }
    }

    const newAbility = new ActivatedAbility(
      minIndex, // index for upgrades
      'New Ability', // set name
      Effect.createSampleEffect(effectType), // effect
      [], // cost
      1, // uses per turn
      1, // uses remaining
      [], // useable in phases
      true, // is useable
      'image url'
    );
    return newAbility;
  };

  return (
    <AbilityListStyled>
      <button
        className='add-ability-button'
        onClick={() => handleNewAbility(EffectType.DealSetDamage)}
      >
        Add Ability
      </button>
      <div className='ability-items'>
        {abilities.map((ability, index) => (
          <AbilityItem
            index={index}
            key={index}
            ability={ability}
            abilities={abilities}
            save={save}
          />
        ))}
      </div>
    </AbilityListStyled>
  );
}

export default AbilityList;
