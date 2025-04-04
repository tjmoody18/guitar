import  React, { useState, useEffect } from "react";
import Fretboard from "../components/Fretboard/Fretboard";
import ScaleSelector from "../components/ScaleSelector"
import './Scales.css'
import scales from '../data/scales.json'

function Scales() {

  // console.log(Fretboard)
  // console.log(ScaleSelector)

  const [selectedKey, setSelectedKey] = useState("C");
  const [selectedScale, setSelectedScale] = useState(scales[0]);

  useEffect(() => {
    console.log(`Key: ${selectedKey}`)
  }, [selectedKey]);

  return (
    <div>
      <h1>Guitar Scales</h1>
      <div className="container">
        {/* <FretboardGPT /> */}
        <Fretboard selectedKey={selectedKey} selectedScale={selectedScale}/>
        <ScaleSelector 
          selectedKey={selectedKey} 
          setSelectedKey={setSelectedKey}
          selectedScale={selectedScale}
          setSelectedScale={setSelectedScale}
        />
      </div>
    </div>
  );
}

export default Scales;