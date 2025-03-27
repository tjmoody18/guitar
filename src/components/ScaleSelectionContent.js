import React from "react";
import scales from '../data/scales.json'

const ScaleSelectionContent = ( { selectedScale, setSelectedScale, setIsModalOpen }) => {

  const handleClick = (e) => {
    let index = e.target.id
    setSelectedScale(scales[index])
    setIsModalOpen(false)
  }
  
  return (
    <>
     <h2>Select Scale:</h2>
     {scales.map((scale, index) => (
      <button id={index} key={index} onClick={handleClick}>
        {scale.name}
      </button>
     ))}
    </>
  );
};

export default ScaleSelectionContent;