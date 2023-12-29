import React, { useState, useEffect } from 'react';

function EditableText({ text, onTextChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const currentTextRef = React.useRef(currentText);
  const inputRef = React.useRef(null);

  useEffect(() => {
    setCurrentText(text);
    currentTextRef.current = text;
  }, [text]);

  const finishEditing = () => {
    setIsEditing(false);
    if (text === currentTextRef.current) {
      console.log('No change');
      return;
    }
    onTextChange(currentTextRef.current);
  };

  // setting isEditing

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      finishEditing();
    }
  };

  const handleChange = (event) => {
    setCurrentText(event.target.value);
    currentTextRef.current = event.target.value;
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isEditing &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        finishEditing();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  return isEditing ? (
    <input
      ref={inputRef}
      type='text'
      className='editable-text'
      value={currentText}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
    />
  ) : (
    <div className='editable-text-text' onClick={handleClick}>
      {currentText}
    </div>
  );
}

export default EditableText;
