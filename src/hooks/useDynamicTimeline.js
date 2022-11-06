import { useLayoutEffect, useState } from "react";
import { Vex, StaveNote, Accidental } from "vexflow";
import { Midi } from "tone";
import { CHROMATIC_NOTES, COLL_COLORS, SCORE_ID } from "../util";

export default function useDynamicTimeline(UI) {
  const VF = Vex.Flow;

  useLayoutEffect(() => {
    const score = document.getElementById(SCORE_ID);
    if (!score) return;

    while (score.hasChildNodes()) {
      score.removeChild(score.lastChild);
    }

    const timelineNotes = UI.timeline.getNotes();
    const realizedNotes = timelineNotes
      .map(({ depth, index, rest }) => {
        if (rest) return "r";
        const node = UI.getNodeAtDepth(depth);
        if (!node) return null;
        const notes = node.getNotes();
        if (index > notes.length - 1) return null;
        return notes[index];
      })
      .filter((x) => !!x);

    const firstNotes = realizedNotes.length ? realizedNotes : [];

    const width = Math.min(700, 600 + 50 * firstNotes.length);

    const renderer = new VF.Renderer(score, VF.Renderer.Backends.SVG);
    renderer.resize(width, 140);

    const context = renderer.getContext();
    context.clear();

    const stave = new VF.Stave(0, 10, width);
    stave.addClef("treble");

    stave.setContext(context).draw();

    const staveNotes = firstNotes.map((note, i) => {
      if (note === "r") {
        return new StaveNote({ keys: ["b/4"], duration: "qr" });
      }
      const pitch = Midi(note).toNote();
      const noteValue = CHROMATIC_NOTES[note % 12];

      const staveNote = new StaveNote({
        keys: [`${noteValue}/${pitch.slice(-1)}`],
        duration: "q",
      });

      const color =
        i < timelineNotes.length
          ? COLL_COLORS[timelineNotes[i].depth % COLL_COLORS.length]
          : "lightgray";
      staveNote.setStyle({ fillStyle: color });

      return staveNote;
    });

    const modifiedNotes = staveNotes.map((note, i) =>
      note.keys.some((_) => _.includes("#"))
        ? note.addModifier(new Accidental("#"), 0)
        : note
    );

    const notes = modifiedNotes.length
      ? modifiedNotes
      : [new StaveNote({ keys: ["b/4"], duration: "qr" })];

    const beats = modifiedNotes.length || 1;

    // Create a voice in 4/4 and add above notes
    const voice = new VF.Voice({ num_beats: beats, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to pixels.
    const formatter = new VF.Formatter();
    formatter.joinVoices([voice]).format([voice], 0.9 * width);

    // Render voice
    voice.draw(context, stave);

    if (!modifiedNotes.length) {
      const restNote = score.getElementsByClassName("vf-stavenote")[0];
      restNote.style.opacity = 0;
      return;
    }

    const scoreNotes = score.getElementsByClassName("vf-stavenote");
    for (let j = 0; j < scoreNotes.length; j++) {
      const note = scoreNotes[j];
      note.style.cursor = "pointer";
      note.addEventListener("click", () => {
        UI.removeNoteFromTimeline(j);
      });
    }
  }, [SCORE_ID, UI.parts]);
}
