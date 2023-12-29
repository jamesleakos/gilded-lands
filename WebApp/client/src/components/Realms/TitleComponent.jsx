// external
import React, { useEffect, useState } from 'react';

const TitleComponent = ({
  selectedRealm,
  editName,
  editState,
  setEditState,
}) => {
  const [nameInput, setNameInput] = useState(selectedRealm?.name);
  useEffect(() => {
    setNameInput(selectedRealm?.name);
  }, [selectedRealm]);

  if (editState === 'display') {
    return (
      <div
        className='realm-title'
        onDoubleClick={() => {
          setEditState('edit');
        }}
      >
        {nameInput}
      </div>
    );
  } else if (editState === 'edit') {
    return (
      <input
        className='realm-title'
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
        onBlur={() => {
          setEditState('display');
          editName(nameInput);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setEditState('display');
            editName(nameInput);
          }
        }}
      />
    );
  }
};

export default TitleComponent;
