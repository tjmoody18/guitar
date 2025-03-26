import React from "react";
import "./Fretboard.css"
import Note from "../Note/Note"


const Fretboard = () => {
  
  const numFrets = 21

  // array of array of note objects
  // each row represents a string
  // columns of each row represents a fret
  let fretboard = []

  const openStrings = [
    { noteName: "E", octave: 2},
    { noteName: "A", octave: 2},
    { noteName: "D", octave: 3},
    { noteName: "G", octave: 3},
    { noteName: "B", octave: 3},
    { noteName: "E", octave: 4},
  ]
  const chromaticScale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]



  openStrings.forEach((string, stringIndex) => {
    let stringNotes = [] // array of note objects
    let openNoteIndex = chromaticScale.indexOf(string.noteName)
    for (let fret = 0; fret <= numFrets; fret++) {
      let curNoteName = chromaticScale[(openNoteIndex + fret) % chromaticScale.length]
      let curOctave = string.octave + Math.floor((openNoteIndex + fret) / chromaticScale.length) // integer
      
      let curNote = {
        noteName: curNoteName,
        octave: curOctave
      }

      stringNotes.push(curNote)
    }
    fretboard.push(stringNotes)
  })

  return (
    <div
      className="fretboard">
        {fretboard.map((string, index) => (
          <div key={index} className={`fretboard-row ${string[0].noteName}-string`}>
            {string.map((fret, index) => (
              <div className="fret">
                <Note
                  key={index}
                  note={fret.noteName}
                  octave={fret.octave}
                />
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Fretboard;