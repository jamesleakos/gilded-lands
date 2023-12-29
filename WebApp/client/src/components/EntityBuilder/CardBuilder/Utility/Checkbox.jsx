import React, { useState, useEffect } from 'react';

function Checkbox({ checked, onCheckedChange }) {
  const [currentChecked, setCurrentChecked] = useState(checked);

  useEffect(() => {
    setCurrentChecked(checked);
  }, [checked]);

  const handleCheckedChange = () => {
    setCurrentChecked(!currentChecked);
    onCheckedChange(!currentChecked);
  };

  return (
    <div>
      <input
        type='checkbox'
        checked={currentChecked}
        onChange={handleCheckedChange}
      />
    </div>
  );
}

export default Checkbox;
