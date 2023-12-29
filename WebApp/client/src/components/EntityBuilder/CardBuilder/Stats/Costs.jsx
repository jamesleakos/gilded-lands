import React from 'react';

// internal
import TitledIntcreaser from '../Utility/TitledIntcreaser.jsx';

// lol
import lol from '../../../../../../lol_access/index.js';
const { Classes, Enums } = lol;
const PayResourceCost = Classes.PayResourceCost.PayResourceCost;
const playerStats = Classes.Game.GameProperties.playerStats;

function Costs({ costs, saveCosts }) {
  const addCost = (statId, newValue) => {
    const newCost = new PayResourceCost(statId, newValue);
    if (costs.find((cost) => cost.statId === statId)) {
      if (newValue === 0) {
        costs = costs.filter((cost) => cost.statId !== statId);
        saveCosts(costs);
        return;
      }
      costs = costs.map((cost) => {
        if (cost.statId === statId) {
          return newCost;
        }
        return cost;
      });
    } else {
      costs.push(newCost);
    }
    saveCosts(costs);
  };

  return (
    <div className='costs'>
      <div className='stat-area-body'>
        {playerStats.map((stat) => {
          return (
            <TitledIntcreaser
              key={stat.statId}
              title={stat.name}
              int={
                costs.find((cost) => cost.statId === stat.statId)?.value || 0
              }
              onIntChange={(newValue) => {
                addCost(stat.statId, newValue);
              }}
              minValue={stat.minValue}
              maxValue={stat.maxValue}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Costs;
