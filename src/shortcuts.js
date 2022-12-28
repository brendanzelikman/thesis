const addNote = { key: "1-9", command: "Add Note" };
const addRest = { key: "Space", command: "Add Rest" };
const deleteNote = { key: "Delete", command: "Remove Note" };
const deleteAllNotes = { key: "Shift + Delete", command: "Clear Timeline" };
const addPart = { key: "+", command: "Add Part" };
const removePart = { key: "_", command: "Remove Part" };
const previousPart = { key: "W", command: "Previous Part" };
const nextPart = { key: "S", command: "Next Part" };
const playPart = { key: "Enter", command: "Toggle Part" };
const playParts = { key: "P", command: "Toggle All Parts" };
const toggleParts = { key: "Shift + 1-9", command: "Toggle Part 1-9" };
const editPart = { key: "Shift + E", command: "Edit Part" };
const newFile = { key: "Shift + N", command: "New Song" };
const saveFile = { key: "Shift + S", command: "Export to File" };
const loadFile = { key: "Shift + O", command: "Load from File" };
const loadPreset = { key: "Shift + P", command: "Load Preset" };
const showShortcuts = { key: "?", command: "Show Shortcuts" };

export const SHORTCUTS = [
  addNote,
  addRest,
  deleteNote,
  deleteAllNotes,
  addPart,
  removePart,
  previousPart,
  nextPart,
  playPart,
  playParts,
  toggleParts,
  editPart,
  newFile,
  saveFile,
  loadFile,
  loadPreset,
  showShortcuts,
];
