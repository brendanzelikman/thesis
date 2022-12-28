import { useState, useEffect } from "react";

const MODALS = [
  "addNote",
  "addPart",
  "bigTranspose",
  "editName",
  "editPart",
  "editTempo",
  "editVolume",
  "littleTranspose",
  "loadPreset",
  "newSong",
  "removeNote",
  "removePart",
  "renamePreset",
  "saveJSON",
  "savePreset",
  "shortcuts",
];

export default function useModalManager(systemManager) {
  const [modals, setModals] = useState(
    MODALS.reduce((pre, cur) => ({ ...pre, [cur]: false }), {})
  );
  const active = !!Object.keys(modals).filter((key) => !!modals[key]).length;
  const showing = (key) => modals[key];
  const show = (key) => setModals((modals) => ({ ...modals, [key]: true }));
  const hide = (key) => setModals((modals) => ({ ...modals, [key]: false }));
  const toggle = (key) =>
    setModals((modals) => ({ ...modals, [key]: !modals[key] }));

  const [tags, setTags] = useState(
    MODALS.reduce((pre, cur) => ({ ...pre, [cur]: 0 }), {})
  );
  const getTag = (key) => tags[key];
  const setTag = (key, tag) => setTags((tags) => ({ ...tags, [key]: tag }));

  useEffect(() => {
    setTag("editPart", systemManager.activePart);
  }, [systemManager.activePart]);

  return {
    ...systemManager,
    Modals: {
      active,
      showing,
      show,
      hide,
      toggle,
      getTag,
      setTag,
    },
  };
}
