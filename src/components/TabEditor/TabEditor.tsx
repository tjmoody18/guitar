import { TabColumn, Tablature } from '../../logic/tabHelpers';
import ClearButton from '../ClearButton';

interface TabEditorProps {
  tab: Tablature;
  currentColumn: number;
  clearTab: () => void;
}


const TabEditor: React.FC<TabEditorProps> = ( {
  tab,
  currentColumn,
  clearTab
}) => {

  let strings = ["E", "A", "D", "G", "B", "E"].reverse()

  return (
    <>
    <ClearButton clearTab={clearTab} />
    <div style={{ fontFamily: "monospace", fontSize: "18px" }}>
      {tab.map((string, stringIdx) => (
        <div key={stringIdx}>
          {strings[stringIdx]} |
          {string.map((note, noteIdx) => (
            <span key={noteIdx}>
              { note ? note.fret.toString().padEnd(2, '-') : '--' }-
            </span>
          ))}
          |
        </div>
      ))}
    </div>
    </>
  );
};

export default TabEditor;
