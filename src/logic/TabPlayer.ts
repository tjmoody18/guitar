import * as SoundManager from '../logic/SoundManger'
import { NoteEvent } from '../logic/SoundManger'
import { TabColumn, TabNote, Tablature } from './tabHelpers'


export function play(tab: Tablature, tempoInBpm: number) {
  // create an array of note names from tablature

  const noteDuration = 60 / tempoInBpm
  let noteEvents: NoteEvent[] = []
  let time = 0
  tab.forEach(tabColumn => {
    tabColumn.forEach(tabNote => {
      if (tabNote !== null) {
        noteEvents.push({
          note: tabNote.noteName,
          time: time
        })
      }
    })
    time += noteDuration
  });
  SoundManager.playNotes(noteEvents)
}

export function stop() {
  return
}

export function pause() {
  return
}

export function resume() {
  return
}

export function setTempo() {
  return
}

export function setLooping() {
  return
}