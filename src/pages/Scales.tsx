import  React, { useState, useEffect } from "react";
import Fretboard from "../components/Fretboard/Fretboard";
import ScaleSelector from "../components/ScaleSelector";
import TabEditor from "../components/TabEditor/TabEditor";
import { TabNote, TabColumn, Tablature, transposeTab, initializeEmptyColumn } from "../logic/tabHelpers";
import './Scales.css';
import scales from '../data/scales.json';

function Scales() {

  // console.log(Fretboard)
  // console.log(ScaleSelector)

  const [selectedKey, setSelectedKey] = useState<string>("C");
  const [selectedScale, setSelectedScale] = useState(scales[0]);

  const [tab, setTab] = useState<Tablature>([[null, null, null, null, null, null]]);
  const [currentColumn, setCurrentColumn] = useState(0);

  function addTabColumn(tabColumn: TabColumn) {
    setTab((prevTab) => [...prevTab, tabColumn]);
    setCurrentColumn(currentColumn => currentColumn + 1)
  }

  function addNote(stringVal: number, fret: number) {
    let tabColumn: TabColumn = [null, null, null, null, null, null]
    tabColumn[stringVal] = {stringVal: stringVal, fret: fret}
    addTabColumn(tabColumn)
  }

  

  function clearTab() {
    setCurrentColumn(0)
    setTab((prevTab) => [[null, null, null, null, null, null]]);
  }

  useEffect(() => {
    console.log(currentColumn)
    console.log(tab[currentColumn])
  }, [tab, currentColumn])
  

  useEffect(() => {

    function removeNote() {
      if (currentColumn === 0) {
        return;
      }
      setTab(tab.filter((_, i) => i !== currentColumn))
      setCurrentColumn(currentColumn => Math.max(currentColumn - 1, 0))
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault()
        removeNote()
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    // clean up function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentColumn, tab]);

  // useEffect(() => {
  //   const cMaj: TabColumn = [
  //     {stringVal: 5, fret: 0}, 
  //     {stringVal: 4, fret: 1}, 
  //     {stringVal: 3, fret: 0}, 
  //     {stringVal: 2, fret: 2}, 
  //     {stringVal: 1, fret: 3}, 
  //     null
  //   ]

  //   addTabColumn(cMaj);
  // }, []);

  useEffect(() => {
    console.log(`Key: ${selectedKey}`)
  }, [selectedKey]);

  let myTab: Tablature = [
  [{ stringVal: 0, fret: 10, noteName: "E3" }, { stringVal: 1, fret: 1, noteName: "C4" }, null, null, null, { stringVal: 0, fret: 0, noteName: "E4" }], // E
  [{ stringVal: 3, fret: 10, noteName: "E3" }, { stringVal: 1, fret: 1, noteName: "C4" }, null, null, { stringVal: 1, fret: 1, noteName: "C4" }, null], // C
  [{ stringVal: 3, fret: 10, noteName: "E3" }, { stringVal: 1, fret: 1, noteName: "C4" }, null, { stringVal: 2, fret: 0, noteName: "G3" }, null, null], // G
  [{ stringVal: 3, fret: 10, noteName: "E3" }, { stringVal: 3, fret: 10, noteName: "E3" }, { stringVal: 3, fret: 2, noteName: "E3" }, null, null, null], // E
  [{ stringVal: 3, fret: 10, noteName: "E3" }, { stringVal: 1, fret: 1, noteName: "C4" }, { stringVal: 3, fret: 2, noteName: "E3" }, null, null, null],
  [{ stringVal: 3, fret: 10, noteName: "E3" }, { stringVal: 3, fret: 10, noteName: "E3" }, { stringVal: 3, fret: 2, noteName: "E3" }, { stringVal: 3, fret: 10, noteName: "E3" }, null, { stringVal: 3, fret: 10, noteName: "E3" }]
  ]

  // setTab(myTab)

  return (
    <div>
      <div className="container">
        {/* <FretboardGPT /> */}
        <Fretboard 
          selectedKey={selectedKey} 
          selectedScale={selectedScale}
          onNoteClick={addNote}  
        />
        <ScaleSelector 
          selectedKey={selectedKey} 
          setSelectedKey={setSelectedKey}
          selectedScale={selectedScale}
          setSelectedScale={setSelectedScale}
        />
        <TabEditor tab={transposeTab(tab)} currentColumn={currentColumn} clearTab={clearTab}/>

      </div>
    </div>
  );
}

export default Scales;