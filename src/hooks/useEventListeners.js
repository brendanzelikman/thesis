import { useState, useEffect } from "react";
import { inBounds, PLAYED_KEYS } from "../util";

export default function useEventListeners(UI) {
  const [pressingShift, setPressingShift] = useState(false);

  useEffect(() => {
    setPressingShift(false);
  }, [UI.parts]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.target.type === "text") return;
      const key = event.key.toLowerCase();

      if (UI.Modals.active) return;

      if (key === "backspace") {
        if (pressingShift) {
          UI.updateActivePart((part) =>
            part.setTimeline(part.getTimeline().clearNotes())
          );
        } else {
          UI.updateActivePart((part) =>
            part.setTimeline(part.getTimeline().popNote())
          );
        }
      }
      // if (pressingShift && key === "t") {
      //   UI.Modals.show("editTempo");
      // }
      if (pressingShift && key === "o") {
        UI.readFiles();
      }
      if (key === "p") {
        if (pressingShift) {
          UI.Modals.show("loadPreset");
        } else {
          const playing = UI.parts[UI.activePart].playing;
          for (let i = 0; i < UI.parts.length; i++) {
            playing ? UI.stopPart(i) : UI.playPart(i);
          }
        }
      }
      if (!pressingShift && key === "w") {
        const lastPart = UI.parts.length - 1;
        UI.setActivePart((prev) => (prev > 0 ? prev - 1 : lastPart));
        UI.setTag("editPart", UI.activePart > 0 ? UI.activePart - 1 : lastPart);
      }
      if (key === "s") {
        if (pressingShift) {
          UI.Modals.show("saveJSON");
        } else {
          const lastPart = UI.parts.length - 1;
          UI.setActivePart((prev) => (prev < lastPart ? prev + 1 : 0));
          UI.setTag(
            "editPart",
            UI.activePart < lastPart ? UI.activePart + 1 : 0
          );
        }
      }
      if (pressingShift && key === "e") {
        UI.Modals.show("editPart");
      }
      // if (pressingShift && key === "v") {
      //   UI.Modals.show("editVolume");
      // }
      if (pressingShift && key === "+") {
        UI.Modals.show("addPart");
      }
      if (pressingShift && key === "_") {
        UI.Modals.show("removePart");
      }
      if (pressingShift && key === "n") {
        UI.Modals.show("newSong");
      }
      if (pressingShift && key === "?") {
        UI.Modals.toggle("shortcuts");
      }
      for (let i = 0; i < PLAYED_KEYS.length; i++) {
        if (!inBounds(UI.parts, i)) break;
        if (key === PLAYED_KEYS[i]) {
          UI.togglePart(i);
        }
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [UI.parts, UI.Modals.active, pressingShift]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.target.type === "text") return;

      const key = event.key.toLowerCase();

      if (key === "shift") {
        setPressingShift(true);
      }

      if (UI.Modals.active) return;

      if (key === " ") {
        UI.updateActivePart((part) =>
          part.setTimeline(part.getTimeline().addRest())
        );
      }
      if (key === "tab") {
        event.preventDefault();
      }
      if (key === "enter") {
        UI.togglePart(UI.activePart);
      }
      for (let i = 0; i < 9; i++) {
        const tail = UI.getNodeAtDepth(UI.system.length - 1);
        if (!inBounds(tail.getNotes(), i)) break;
        if (key === `${i + 1}`) {
          UI.updateActivePart((part) =>
            part.addNoteToTimeline(part.getSystem().length - 1, i)
          );
        }
      }
    };
    const keyUpHandler = (event) => {
      const key = event.key.toLowerCase();
      if (key === "shift") {
        setPressingShift(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [UI.parts, UI.Modals.active]);
}
