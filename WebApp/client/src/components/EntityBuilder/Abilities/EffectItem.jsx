import React, { useState, useEffect, useContext } from 'react';

// lol
import lol from '../../../../../lol_access/index.js';
const Effect = lol.Classes.Effect.Effect;
const EffectType = lol.Enums.EffectType;
const EffectValueType = lol.Enums.EffectValueType;
const TargetTypeEnum = lol.Enums.TargetTypeEnum;
const TargetableTypeSelectionEnum = lol.Enums.TargetableTypeSelectionEnum;

// internal
// hooks
import CardLibraryContext from '../../../contexts/CardLibraryContext.js';

// components
// util comps
import Intcreaser from '../CardBuilder/Utility/Intcreaser.jsx';
import TitledIntcreaser from '../CardBuilder/Utility/TitledIntcreaser.jsx';
import TitledCycler from '../CardBuilder/Utility/TitledCycler.jsx';

function EffectItem({ ability, saveAbility }) {
  const { enchantmentLibrary } = useContext(CardLibraryContext);

  const evIntcreaser = (ev, i) => {
    if (
      ev.effectValueType ===
      EffectValueType.CreateEnchantmentEnchantmentLibraryID
    ) {
      return (
        <TitledCycler
          title='Enchantment'
          items={enchantmentLibrary.map((item) => item.name)}
          onItemChange={(value) => {
            ability.effect.effectValues[i].setValue = enchantmentLibrary.find(
              (item) => item.name === value
            ).libraryId;
            saveAbility(ability);
          }}
          currentItem={
            enchantmentLibrary.find((item) => item.libraryId === ev.setValue)
              .name
          }
        />
      );
    }

    return (
      <Intcreaser
        int={ev.setValue}
        onIntChange={(value) => {
          ability.effect.effectValues[i].setValue = value;
          saveAbility(ability);
        }}
        minValue={0}
        maxValue={100}
      />
    );
  };

  return (
    <div className='effect-item-content'>
      <TitledCycler
        title='Effect Type'
        items={Object.keys(Effect.sampleEffectCreators).map(
          (item) => EffectType[item]
        )}
        onItemChange={(effectString) => {
          const newEffect = Effect.createSampleEffect(EffectType[effectString]);
          ability.effect = newEffect;
          saveAbility(ability);
        }}
        currentItem={EffectType[ability.effect.effectTypeEnum]}
      />
      <div>
        {ability.effect.effectValues.map((ev, i) => (
          <div className='effect-value-item' key={i}>
            <div className='effect-value-item-type'>
              {EffectValueType[ev.effectValueType]}
            </div>
            <div>
              {!!ability.effect.myRequiredEffectValues()[i].setByDesigner ? (
                evIntcreaser(ev, i)
              ) : (
                <div>{ev.setValue}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        {ability.effect.targetCriterias.map((item, i) => (
          <div className='target-type-item' key={i}>
            <TitledIntcreaser
              title='Target Type'
              int={item.targetTypeEnum}
              onIntChange={(value) => {
                ability.effect.targetCriterias()[i].targetTypeEnum = value;
                saveAbility(ability);
              }}
              _enum={TargetTypeEnum}
            />
            <TitledIntcreaser
              title='Targetable Type Selection'
              int={item.targetableTypeSelectionEnum}
              onIntChange={(value) => {
                ability.effect.targetCriterias()[
                  i
                ].targetableTypeSelectionEnum = value;
                saveAbility(ability);
              }}
              _enum={TargetableTypeSelectionEnum}
            />
            <TitledIntcreaser
              title='Min Selections Required'
              int={item.minSelectionsRequired}
              onIntChange={(value) => {
                ability.effect.targetCriterias()[i].minSelectionsRequired =
                  value;
                saveAbility(ability);
              }}
              minValue={0}
              maxValue={100}
            />
            <TitledIntcreaser
              title='Max Selections Allowed'
              int={item.maxSelectionsAllowed}
              onIntChange={(value) => {
                ability.effect.targetCriterias()[i].maxSelectionsAllowed =
                  value;
                saveAbility(ability);
              }}
              minValue={0}
              maxValue={100}
            />
            <TitledIntcreaser
              title='Min Selections That Must Remain'
              int={item.minSelectionsThatMustRemain}
              onIntChange={(value) => {
                ability.effect.targetCriterias()[
                  i
                ].minSelectionsThatMustRemain = value;
                saveAbility(ability);
              }}
              minValue={0}
              maxValue={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EffectItem;
