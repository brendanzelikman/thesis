import { removeWhitespace } from "../util";

export default class Timeline {
  constructor(notes = []) {
    this.notes = notes; // note contains depth + map index + offset
  }
  getNotes() {
    return this.notes;
  }
  // Stringify the contents of the timeline into a key
  get key() {
    if (!this.notes) return "";
    const notes = this.getNotes()
      .map((note) => (note.rest ? "r" : `${note.depth}:${note.index}`))
      .join(",");
    return `${notes}`;
  }
  static createFromKey(_key) {
    let timeline = new Timeline();
    if (!_key) return timeline;

    const key = removeWhitespace(_key);

    const notes = key.split(",");
    if (!notes.length) return timeline;

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (!note) continue;
      if (note === "r") {
        timeline = timeline.addRest();
      } else {
        let depth, index;
        const splitIndex = note.indexOf(":");
        if (splitIndex < 0) {
          depth = 0;
          index = note;
        } else {
          depth = note.slice(0, splitIndex);
          index = note.slice(splitIndex + 1, note.length);
        }
        depth = parseInt(depth);
        index = parseInt(index);
        timeline = timeline.addNote(depth, index);
      }
    }
    return timeline;
  }
  addNote(depth, index) {
    if (this.notes.length >= 32) return this;
    const newNote = { depth, index };
    return new Timeline([...this.notes, newNote]);
  }
  addRest() {
    return new Timeline([...this.notes, { rest: true }]);
  }
  popNote() {
    return new Timeline(
      this.notes.length ? this.notes.slice(0, this.notes.length - 1) : []
    );
  }
  removeNote(depth, index) {
    return new Timeline(
      this.notes.filter((note) => note.depth !== depth || note.index !== index)
    );
  }
  clearNotes() {
    return new Timeline([]);
  }
  removeNoteAtIndex(index) {
    return new Timeline(this.notes.filter((_, i) => i !== index));
  }
  removeNotesAtDepth(depth) {
    return new Timeline(this.notes.filter((note) => note.depth !== depth));
  }
  removeNotesFromDepth(depth) {
    return new Timeline(this.notes.filter((note) => note.depth < depth));
  }
  filter(system) {
    return new Timeline(
      this.notes.filter((x) => {
        if (x.rest) return true;
        const node = system.getNodeAtDepth(x.depth);
        if (!node) return false;
        const parent = node.getParent();
        if (x.index >= 0 && x.index < parent.length) return true;
      })
    );
  }
}
