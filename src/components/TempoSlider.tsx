import { useState } from "react"
import './TempoSlider.css'

const MIN_TEMPO = 20
const MAX_TEMPO = 480

interface TempoSliderProps {
  tempo: number;
  setTempo: React.Dispatch<React.SetStateAction<number>>;
}

const TempoSlider: React.FC<TempoSliderProps> = ( {
  tempo,
  setTempo
}) => {

  const handleChange = (event: any) => {
      setTempo(Number(event.target.value))
  }

  const decrementTempo= () => {
    setTempo(tempo => Math.max(tempo - 1, MIN_TEMPO))
  }

  const incrementTempo = () => {
    setTempo(tempo => Math.min(tempo + 1, MAX_TEMPO))
  }

  return (
    <div className="tempo-container">
      <div className="tempo-label">{tempo} bpm</div>
      <div className="tempo-flex-container">
        <button onClick={decrementTempo}>-</button>
        <input 
          type="range"
          min={`${MIN_TEMPO}`}
          max={`${MAX_TEMPO}`}
          value={tempo}
          onChange={handleChange}
        />
        <button onClick={incrementTempo}>+</button>
       </div>
    </div>
  )
}

export default TempoSlider 