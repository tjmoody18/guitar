import React from "react";
import scales from '../data/scales.json'
import './ScaleSelectionContent.css'

interface ScaleSelectionContentProps {
    selectedScale: {name: string, pattern: number[]};
    setSelectedScale: React.Dispatch<React.SetStateAction<{name: string, pattern: number[]}>>;
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const ScaleSelectionContent: React.FC<ScaleSelectionContentProps> = ( { 
  selectedScale, 
  setSelectedScale, 
  setIsModalOpen 
}) => {

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let index: number = Number((event.target as HTMLButtonElement).id)
    setSelectedScale(scales[index])
    setIsModalOpen(false)
  }
  
  return (
    <>
     <h2>Select Scale:</h2>
     <div className="flex-container">
       {scales.map((scale, index) => (
        <button className="scale-btn" id={index.toString()} key={index} onClick={handleClick}>
          {scale.name}
        </button>
       ))}
     </div>
    </>
  );
};

export default ScaleSelectionContent;