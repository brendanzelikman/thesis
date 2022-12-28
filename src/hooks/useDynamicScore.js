import { useLayoutEffect, useContext } from "react";
import { Vex, StaveNote, Accidental } from "vexflow";
import { Midi } from "tone";
import { CHROMATIC_NOTES, COLL_COLORS, SCORE_ID_AT_DEPTH } from "../util";
import { UIContext } from "../components/UIProvider";

export default function useDynamicScore({ depth }) {
  const UI = useContext(UIContext);
  const VF = Vex.Flow;

  const scoreId = SCORE_ID_AT_DEPTH(depth);

  useLayoutEffect(() => {
    const score = document.getElementById(scoreId);
    if (!score) return;

    while (score.hasChildNodes()) {
      score.removeChild(score.lastChild);
    }

    const renderer = new VF.Renderer(score, VF.Renderer.Backends.SVG);
    const context = renderer.getContext();
    context.clear();

    const firstNotes = UI.getNodeAtDepth(depth).getNotes();

    const width = Math.min(600, 350 + 50 * firstNotes.length);
    renderer.resize(width, 100);

    const stave = new VF.Stave(0, 0, width);
    stave.addClef("treble");
    stave.setContext(context).draw();

    // const colors = ["black", "red", "blue", "green", "orange"];
    // const color = colors[i % colors.length];

    // Single Chord
    // const staveNote = new StaveNote({
    //   keys: notes.length
    //     ? notes.map((note) => {
    //         const pitch = Midi(note).toNote();
    //         return `${pitch.slice(0, -1)}/${pitch.slice(-1)}`;
    //       })
    //     : ["b/4"],
    //   duration: notes.length ? "q" : "qr",
    // });
    // staveNote.setStyle({ fillStyle: color });
    // const sortedNotes = nodes[i].getSortedNoteValues();
    // for (let a = 0; a < sortedNotes.length; a++) {
    //   if (sortedNotes[a].includes("#")) {
    //     staveNote.addModifier(new Accidental("#"), a);
    //   }
    // }

    const staveNotes = firstNotes
      .map((note) => {
        if (!note) return null;
        const pitch = Midi(note).toNote();
        const noteValue = CHROMATIC_NOTES[note % 12];

        const staveNote = new StaveNote({
          keys: [`${noteValue}/${pitch.slice(-1)}`],
          duration: "q",
        });

        const color = COLL_COLORS[depth % COLL_COLORS.length];
        staveNote.setStyle({ fillStyle: color });

        return staveNote;
      })
      .filter((x) => !!x);

    const modifiedNotes = staveNotes.map((note) =>
      note.keys.some((_) => _.includes("#"))
        ? note.addModifier(new Accidental("#"), 0)
        : note
    );

    const notes = modifiedNotes.length
      ? modifiedNotes
      : [new StaveNote({ keys: ["b/4"], duration: "qr" })];

    // Create a voice in 4/4 and add above notes
    const voice = new VF.Voice({ num_beats: notes.length, beat_value: 4 });
    voice.addTickables(notes);

    // // Format and justify the notes to 400 pixels.
    const formatter = new VF.Formatter();
    formatter.joinVoices([voice]).format([voice], width - 100);

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
      note.addEventListener("click", () => UI.addNoteToTimeline(depth, j));
    }
  }, [UI, scoreId]);
}
