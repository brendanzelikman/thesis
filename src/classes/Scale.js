export default class Scale {
  constructor(notes = []) {
    this.notes = notes; // MIDI notes
  }
  get length() {
    return this.notes.length;
  }
  transpose(int) {
    return this.notes.map((note) => note + int);
  }
}
