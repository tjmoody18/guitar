import React, { useState } from "react";
import './Note.css'
import Soundfont from "soundfont-player"

let player;

Soundfont.instrument(new AudioContext(), 'acoustic_guitar_nylon').then((guitar) => player = guitar);

const playNote = (note) => {
  if (player) player.play(note)
}

const Note = ({ note, octave}) => {
  const [isHighlighted, setIsHighlighted] = useState(false)

  const handleClick = () => {
    console.log(`Playing: ${note}${octave}`)
    playNote(`${note}${octave}`)
    // Add sound
  };

  const handleMouseEnter = () => {
    setIsHighlighted(true)
  }

  const handleMouseOut = () => {
    setIsHighlighted(false)
  }

  return (
    <div
      className={`note ${isHighlighted ? "highlighted" : ""}`}
      onClick={handleClick} 
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseOut}
    >
      {note}
    </div>
  );
};

export default Note;