import React, { useState } from "react";
import './Note.css'
import Soundfont from "soundfont-player"

let player;
let ac = new AudioContext()
Soundfont.instrument(ac, 'acoustic_guitar_nylon').then((guitar) => player = guitar);

const playNote = (note) => {
  if (player) player.play(note, ac.currentTime, {gain: 5})
}

const Note = ({ note, octave, isInScale, isRoot}) => {

  const [isSelected, setIsSelected] = useState(false)
  // const [isHighlighted, setIsHighlighted] = useState(false)

  const handleClick = () => {
    console.log(`Playing: ${note}${octave}`)
    playNote(`${note}${octave}`)
    // Add sound
  };

  const handleMouseEnter = () => {
    console.log("Mouse Enter")
    setIsSelected(true)
  }

  const handleMouseLeave = (e) => {
    // Don't trigger mouse leave when entering child element
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
      console.log("Mouse Leave")
      setIsSelected(false)
    }
   
  }

  return (
    <div
      className={
              `note${isSelected ? " is-selected" : ""}${isInScale ? " highlighted" : ""}${isRoot ? " root" : ""}`
              }
      onClick={handleClick} 
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseLeave}
    >
      <p>{note}</p>
    </div>
  );
};

export default Note;