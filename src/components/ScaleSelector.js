import React, { useState } from "react";
import './ScaleSelector.css'

const ScaleSelector = ( { selectedKey, setSelectedKey }) => {

  const chromaticScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

  const handleKeyChange = (event) => {
    setSelectedKey(event.target.value);
  };

  return (
    <div>
      <h2>Select key: </h2>
      <div className="note-selector-container">
        {chromaticScale.map((note, index) => (
        <>
          <input 
          className="note-selector-option"
          type="radio"
          id={note}
          name="key"
          value={note}
          checked={selectedKey === note}
          onChange={handleKeyChange}
          />
          <label htmlFor={note}> {note} </label>
        </>
        ))}
      </div>
    </div>
  );
};

export default ScaleSelector;