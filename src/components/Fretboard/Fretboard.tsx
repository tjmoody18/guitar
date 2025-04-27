import React from "react";
import "./Fretboard.css"
import Note from "../Note/Note"
import tunings from '../../data/tunings.json'

interface FretboardProps {
  selectedKey: string;
  selectedScale: {name: string, pattern: number[]}
  onNoteClick: (stringVal: number, fret: number, noteName: string) => void;
}

interface Note {
  noteName: string;
  octave: number;
}

const Fretboard: React.FC<FretboardProps> = ( { 
  selectedKey, 
  selectedScale,
  onNoteClick
 }) => {

  const numFrets: number = 21
  const fretNumsList: number[] = []
  for (let i = 0; i <= numFrets; i++) {
    fretNumsList.push(i)
  }

  // array of array of note objects
  // each row represents a string
  // columns of each row represents a fret
  let fretboard: Note[][] = []

  function parseTuning(tuningArray: string[]): Note[] {
    let result: Note[] = []
    for (let note of tuningArray) {
      // console.log(note)
      let curNoteName: string = note.substring(0, note.length - 1)
      let curOctave: number = Number(note[note.length - 1])
      // console.log(curNoteName)
      // console.log(curOctave)
      result.push({noteName: curNoteName, octave: curOctave})
    }
    return result.reverse()
  }

  let tuning: string[] = tunings.guitar.standard

  const openStrings: Note[]  = parseTuning(tuning)

  // Bass
  // const openStrings: Note[]  = [
  //   { noteName: "G", octave: 2 },
  //   { noteName: "D", octave: 2 },
  //   { noteName: "A", octave: 1 },
  //   { noteName: "E", octave: 1 }
  // ]


  const chromaticScale: string[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

  function getScaleNotes(root: string, scalePattern: number[]): string[] {
    let scaleNotes: string[] = []

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
    let stringNotes: Note[] = [] // array of note objects
    let openNoteIndex = chromaticScale.indexOf(string.noteName)
    for (let fret = 0; fret <= numFrets; fret++) {
      let curNoteName = chromaticScale[(openNoteIndex + fret) % chromaticScale.length]
      let curOctave = string.octave + Math.floor((openNoteIndex + fret) / chromaticScale.length) // integer
      
      let curNote: Note = {
        noteName: curNoteName,
        octave: curOctave
      }

      stringNotes.push(curNote)
    }
    fretboard.push(stringNotes)
  })

  let scaleNotes = getScaleNotes(selectedKey, selectedScale.pattern)

  return (
   <div className="grid-container">
        {/* Fret Numbers Row */}
        <div 
          className="fret-numbers"
          style={{ gridTemplateColumns: `40px repeat(${numFrets + 1}, minmax(30px, 1fr))` }}>
            {/* Add empty fret-number so it starts on 0 with open string */}
            <div className="fret-number"></div>  
          {fretNumsList.map((num) => (
            <div key={num} className="fret-number">
              {num}
            </div>
          ))}
        </div>
        
        {/* Fretboard */}
        <div 
          className="fretboard">
          {fretboard.map((string, stringIndex) => (
            <div 
              className="fretboard-row" 
              key={stringIndex}
              style={{ gridTemplateColumns: `40px repeat(${numFrets + 1}, minmax(30px, 1fr))` }}>
              <div className="string-label">{string[0].noteName}</div>
              {string.map((fret, index) => (
                <>
                <div
                  className="string-line"
                  // set string size based on stringIndex
                  style={{height: `${(stringIndex) + 1}px`}}
                />
                <div key={index} className="fret">
                  <Note
                    key={index}
                    note={fret.noteName}
                    octave={fret.octave}
                    isInScale={scaleNotes.includes(fret.noteName)}
                    isRoot={selectedKey === fret.noteName}
                    onNoteClick={() => onNoteClick(stringIndex, index, `${fret.noteName}${fret.octave}`)}
                  />
                </div>
                </>
              ))}
            </div>
       
        ))}
         </div>
      </div>
  );
};
export default Fretboard;