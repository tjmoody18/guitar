import React, { useState } from "react";
import './Note.css'
import Soundfont from "soundfont-player"

let player: Soundfont.Player;
let ac = new AudioContext()
Soundfont.instrument(ac, 'acoustic_guitar_nylon').then((guitar) => player = guitar);

const playNote = (note: string) => {
  if (player) player.play(note, ac.currentTime, {gain: 5})
}

interface NoteProps {
  note: string;
  octave: number;
  isInScale: boolean;
  isRoot: boolean;
  onNoteClick: () => void;
}

const Note: React.FC<NoteProps> = ({ 
  note, 
  octave, 
  isInScale, 
  isRoot,
  onNoteClick
}) => {

  const [isSelected, setIsSelected] = useState(false)
  // const [isHighlighted, setIsHighlighted] = useState(false)

  const handleClick = () => {
    // console.log(`Playing: ${note}${octave}`)
    playNote(`${note}${octave}`)
    onNoteClick()
    // Add sound
  };

  const handleMouseEnter = () => {
    // console.log("Mouse Enter")
    setIsSelected(true)
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Don't trigger mouse leave when entering child element
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
      // console.log("Mouse Leave")
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