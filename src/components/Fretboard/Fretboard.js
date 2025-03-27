import React from "react";
import "./Fretboard.css"
import Note from "../Note/Note"


const Fretboard = ( { selectedKey, selectedScale }) => {
  
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

  function getScaleNotes(root, scalePattern) {
    let scaleNotes = []

    // start at root note
    let curIndex = chromaticScale.indexOf(root)

    // add root to scale
    scaleNotes.push(chromaticScale[curIndex])

    for (let step of scalePattern) {
      // move by scale pattern step, wrap to beginning of chromatic scale
      curIndex = (curIndex + step) % chromaticScale.length
      scaleNotes.push(chromaticScale[curIndex]);
    }
    return scaleNotes
  }


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

  let scaleNotes = getScaleNotes(selectedKey, selectedScale.pattern)

  return (
    <div
      className="fretboard">
        {fretboard.map((string, stringIndex) => (
          <div key={stringIndex} className={`fretboard-row ${string[0].noteName}-string`}>
            {string.map((fret, index) => (
              <>
              <div 
                className="string-line" 
                // set string size based on stringIndex
                style={{height: `${(fretboard.length - stringIndex) + 1}px`}} 
              />
              <div key={index} className="fret">
                <Note
                  key={index}
                  note={fret.noteName}
                  octave={fret.octave}
                  isInScale={scaleNotes.includes(fret.noteName)}
                  isRoot={selectedKey === fret.noteName}
                />
              </div>
              </>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Fretboard;