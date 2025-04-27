export type TabNote = {
  stringVal: number;
  fret: number;
  noteName?: string;
  midi?: number;
};

// note or null for rest
// single TabColumn stores list of TabNotes played at that time interval
export type TabColumn = (TabNote | null)[]; 

// array of TabColumns, stores an entire Tab
export type Tablature = TabColumn[];

// transpose tab to convert it between rows of notes played at a time interval
// (for storage/playback) to rows of notes played on a string (for rendering)
export function transposeTab(tab: Tablature): Tablature {
  if (tab.length === 0) return [];

  const numRows = tab[0].length;
  const transposed: TabColumn[] = Array.from({ length: numRows}, () => [])
  
  for (let col = 0; col < tab.length; col++) {
    for (let row = 0; row < numRows; row++) {
      transposed[row].push(tab[col][row]);
    }
  }
  return transposed;
}



export function initializeEmptyColumn(): Tablature {
  return [
    [null],
    [null],
    [null],
    [null],
    [null],
    [null]
  ]
}