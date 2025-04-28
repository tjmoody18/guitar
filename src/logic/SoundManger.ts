import Soundfont from "soundfont-player"

export type NoteEvent = {
  note: string,
  time: number
}

let player: Soundfont.Player;
let ac = new AudioContext()
Soundfont.instrument(ac, 'acoustic_guitar_nylon', {gain: 5}).then((guitar) => player = guitar);

export const playNote = (note: string) => {
  if (player) player.play(note, ac.currentTime, {gain: 5})
}

export const playNotes = (noteEvents: NoteEvent[]) => {
  if (player) {
    // stop any currently playing notes
    player.stop()
    player.schedule(ac.currentTime, noteEvents)
  }
}

export const stop = () => {
  if (player) {
    player.stop()
  }
}

