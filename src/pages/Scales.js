import  React, { useState, useEffect } from "react";
import Fretboard from "../components/Fretboard/Fretboard";
import ScaleSelector from "../components/ScaleSelector"
import './Scales.css'

function Scales() {

  // console.log(Fretboard)
  // console.log(ScaleSelector)

  const [selectedKey, setSelectedKey] = useState("C");

  useEffect(() => {
    console.log(`Key: ${selectedKey}`)
  }, [selectedKey]);

  return (
    <div>
      <h1>Guitar Scales</h1>
      <div className="container">
        <Fretboard />
        <ScaleSelector 
          selectedKey={selectedKey} 
          setSelectedKey={setSelectedKey}
        />
      </div>
    </div>
  );
}

export default Scales;