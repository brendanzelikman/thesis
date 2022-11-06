import System from "./System";
import Timeline from "./Timeline";
import { Pattern, Midi } from "tone";
import { DEFAULT_INSTRUMENT, DEFAULT_VOLUME } from "../util";

export default class Part {
  constructor({
    system = new System(),
    timeline = new Timeline(),
    instrument = DEFAULT_INSTRUMENT,
    volume = DEFAULT_VOLUME,
    name = "",
    playing = false,
    loaded = false,
  }) {
    this.system = system;
    this.timeline = timeline;
    this.instrument = instrument;
    this.volume = volume;
    this.name = name;
    this.playing = playing;
    this.loaded = loaded;
  }
  getSystem() {
    return this.system;
  }
  getTimeline() {
    return this.timeline;
  }
  getKey() {
    return `${this.system.key};${this.timeline.key}`;
  }
  getVolume() {
    return this.volume;
  }
  getInstrument() {
    return this.instrument;
  }
  getName() {
    return this.name;
  }
  createSamplerPattern(sampler) {
    if (!sampler) return null;
    const timeline = this.timeline;
    const notes = timeline.getNotes();
    const realizedNotes = notes
      .map((note) => {
        if (note.rest) return "r";
        const node = this.system.getNodeAtDepth(note.depth);
        if (!node) return null;
        const notes = node.getNotes();
        if (note.index > notes.length - 1) return null;
        return notes[note.index];
      })
      .filter((x) => !!x);

    if (!realizedNotes.length) return null;

    const labeledNotes = realizedNotes.map((note) =>
      note !== "r" ? Midi(note).toNote() : note
    );
    const pattern = new Pattern(
      (time, note) => {
        if (note === "r") return;
        if (!sampler.loaded) return;
        sampler.triggerAttackRelease(note, "4n");
      },
      labeledNotes,
      "up"
    );
    pattern.interval = "8n";
    pattern.humanize = false;
    return pattern;
  }
  setSystem(system) {
    return new Part({ ...this, system });
  }
  setTimeline(timeline) {
    return new Part({ ...this, timeline });
  }
  addNoteToTimeline(depth, index) {
    return new Part({ ...this, timeline: this.timeline.addNote(depth, index) });
  }
  setInstrument(instrument) {
    return new Part({ ...this, instrument });
  }
  setName(name) {
    return new Part({ ...this, name });
  }
  setVolume(volume) {
    return new Part({ ...this, volume });
  }
  play() {
    return new Part({ ...this, playing: true });
  }
  stop() {
    return new Part({ ...this, playing: false });
  }
  load() {
    return new Part({ ...this, loaded: true });
  }
  unload() {
    return new Part({ ...this, loaded: false });
  }
}
