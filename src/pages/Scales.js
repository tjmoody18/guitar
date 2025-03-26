import React from "react";
import Fretboard from "../components/Fretboard/Fretboard";
import './Scales.css'

function Scales() {
  return (
    <div>
      <h1>Guitar Scales</h1>
      <div class="container">
        <Fretboard />
      </div>
    </div>
  );
};

export default Scales;