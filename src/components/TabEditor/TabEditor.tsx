import { TabColumn, Tablature } from '../../logic/tabHelpers';
import ClearButton from '../ClearButton';
import { useWindowDimension } from '../hooks/useWindowDimension';
import TempoSlider from '../TempoSlider';

import './TabEditor.css'

interface TabEditorProps {
  tab: Tablature;
  currentColumn: number;
  clearTab: () => void;
  tempo: number;
  setTempo: React.Dispatch<React.SetStateAction<number>>;
}


const TabEditor: React.FC<TabEditorProps> = ( {
  tab,
  currentColumn,
  clearTab,
  tempo,
  setTempo
}) => {

  const [width, height] = useWindowDimension();
  const chunkSize = Math.round(width / 50)
  console.log(`chunkSize: ${chunkSize}`)

  function chunkTab(tab: Tablature, chunkSize: number): Tablature[] {
    const groups: Tablature[] = [];

    for (let i = 0; i < tab[0].length; i += chunkSize) {
      const group = tab.map(stringLine => stringLine.slice(i, i + chunkSize));
      groups.push(group)
    }

    return groups;
  }

  

  let strings = ["E", "A", "D", "G", "B", "E"].reverse()

  const tabGroups = chunkTab(tab, chunkSize);

  return (
    <>
    <ClearButton clearTab={clearTab} />
    <TempoSlider tempo={tempo} setTempo={setTempo}/>
    <div className='tab-container' style={{ fontFamily: "monospace", fontSize: "18px" }}>
     {tabGroups.map((tabGroup, idx) => (
      <div className='tab-group'>
        {tabGroup.map((string, stringIdx) => (
          <div className='tab-string' key={stringIdx}>
            {strings[stringIdx]} |
            {string.map((note, noteIdx) => (
              <span className='tab-note' key={noteIdx}>
                { note ? note.fret.toString().padEnd(2, '-') : '--' }-
              </span>
            ))}
            |
          </div>
      ))}
     </div>
     ))}

     
    </div>
    </>
  );
};

export default TabEditor;
