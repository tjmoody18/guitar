import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './ScaleSelector.css'
import Modal from './Modal'
import ScaleSelectionContent from "./ScaleSelectionContent";

const ScaleSelector = ( { selectedKey, setSelectedKey, selectedScale, setSelectedScale }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const chromaticScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

  const handleKeyChange = (event) => {
    setSelectedKey(event.target.id);
  };

  return (
    <div>
      <div className="select-key-header">
        <h2>Select key: {selectedKey}</h2>
        <button onClick={() => setIsModalOpen(true)}>
          <div className="mode-title">{selectedScale.name}</div>
          <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} />
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
          <ScaleSelectionContent 
            selectedScale={selectedScale} 
            setSelectedScale={setSelectedScale} 
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      </div>
      <div className="note-selector-container">
        {chromaticScale.map((note, index) => (
        <React.Fragment key={index}>
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
        </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScaleSelector;