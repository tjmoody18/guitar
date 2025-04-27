import { TabColumn, Tablature } from '../../logic/tabHelpers';

interface TabEditorProps {
  tab: Tablature;
  currentColumn: number;
}


const TabEditor: React.FC<TabEditorProps> = ( {
  tab,
  currentColumn
}) => {

  let strings = ["E", "A", "D", "G", "B", "E"].reverse()

  return (
    
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
  );
};

export default TabEditor;
