import { CHROMATIC_NOTES, mod } from "../util";
import { inRange, shuffle, random } from "lodash";
import { Midi } from "tone";

export default class Coll {
  constructor(parent, map = [], child = null) {
    this.parent = parent;
    this.map = map.filter((x) => inRange(x.index, 0, parent.length));
    this.child = child;
  }
  get length() {
    return this.map.length;
  }
  getParent() {
    return this.parent;
  }
  setParent(parent) {
    return new Coll(parent, this.map, this.child);
  }
  getMap() {
    return this.map;
  }
  setMap(map) {
    return new Coll(this.parent, map, this.child);
  }
  getChild() {
    return this.child;
  }
  setChild(child) {
    return new Coll(this.parent, this.map, child);
  }
  getNotes() {
    return this.map.map((x) => this.parent[x.index] + x.offset);
  }
  getNoteValues() {
    return this.getNotes().map((note) => CHROMATIC_NOTES[note % 12]);
  }
  getPitches() {
    return this.getNotes().map((note) => Midi(note).toNote());
  }
  getUniqueNotes() {
    const notes = this.getNotes();
    const noteValues = this.getNoteValues();
    let noteIndices = [];
    for (const i in noteValues) {
      if (!noteIndices.includes(noteValues[i])) noteIndices.push(i);
    }
    return noteIndices.map((i) => notes[i]);
  }
  getUniqueNoteValues() {
    const noteValues = this.getNoteValues();
    let uniqueValues = [];
    for (const value of noteValues) {
      if (!uniqueValues.includes(value)) uniqueValues.push(value);
    }
    return uniqueValues;
  }
  getSortedNoteValues() {
    const uniqueValues = this.getUniqueNoteValues();
    uniqueValues.sort(
      (a, b) => CHROMATIC_NOTES.indexOf(a) - CHROMATIC_NOTES.indexOf(b)
    );
    return uniqueValues;
  }
  addNote(note) {
    if (!this.parent.includes(note)) return this;
    const index = this.parent.indexOf(note);
    return this.setMap([...this.map, { index, offset: 0 }]);
  }
  addNote(note) {
    if (!this.parent.includes(note)) return this;
    const index = this.parent.indexOf(note);
    return this.setMap([...this.map, { index, offset: 0 }]);
  }
  removeNote(note) {
    if (!this.parent.includes(note)) return this;
    const index = this.parent.indexOf(note);
    return this.setMap(this.map.filter((x) => x.index !== index));
  }
  removeNoteAtIndex(index) {
    if (!inRange(index, 0, this.map.length)) return this;
    return this.setMap(this.map.filter((_, i) => i !== index));
  }
  containsNote(note) {
    return this.getNotes().includes(note);
  }
  randomizeNotes() {
    const size = random(1, this.parent.length);
    const randomMap = () => ({
      index: random(0, this.parent.length - 1),
      offset: 0,
    });
    return this.setMap(Array.from({ length: size }, randomMap));
  }
  shuffleNotes() {
    return this.setMap(shuffle(this.map.slice()));
  }
  reverseNotes() {
    return this.setMap(this.map.slice().reverse());
  }
  clearNotes() {
    return this.setMap([]);
  }
  Transpose(int) {
    return this.setMap(
      this.map.map((x) => {
        const summedIndex = x.index + int;
        const newIndex = mod(summedIndex, this.parent.length);
        const octaveDistance = Math.floor(summedIndex / this.parent.length);
        const offset = x.offset + octaveDistance * 12;
        return { index: newIndex, offset };
      })
    );
  }
  transpose(int) {
    return this.setMap(
      this.map.map((x, i) => {
        const summedIndex = i + int;
        const newIndex = mod(summedIndex, this.map.length);
        const octaveDistance =
          Math.floor(int / this.map.length) +
          (this.map[newIndex].index < x.index);
        const offset = x.offset + octaveDistance * 12;
        return { index: this.map[newIndex].index, offset };
      })
    );
  }
}
