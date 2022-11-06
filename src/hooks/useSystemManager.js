import { useState, useEffect } from "react";
import System from "../classes/System";
import Timeline from "../classes/Timeline";

import {
  removeWhitespace,
  inBounds,
  DEFAULT_TEMPO,
  DEFAULT_PROJECT_NAME,
} from "../util";
import Part from "../classes/Part";
import { Transport } from "tone";

export default function useSystemManager(defaultParts = [new Part({})]) {
  const [parts, setParts] = useState(defaultParts);
  const [activePart, setActivePart] = useState(0);

  useEffect(() => {
    if (!inBounds(parts, activePart)) setActivePart(parts.length - 1);
  }, [parts.length]);

  const addPart = (part = new Part()) => {
    setParts((parts) => [...parts, part]);
  };

  const removePart = (index) => {
    if (activePart >= parts.length - 1)
      setActivePart((activePart) => activePart - 1);

    setParts((parts) => parts.filter((_, i) => i !== index));
  };

  const resetParts = () => {
    setParts(defaultParts);
    setActivePart(0);
  };

  const system = parts[activePart].getSystem();
  const timeline = parts[activePart].getTimeline();
  const instrument = parts[activePart].getInstrument();
  const name = parts[activePart].getName();
  const volume = parts[activePart].getVolume();
  const playing = parts[activePart].playing;

  const [projectName, setProjectName] = useState(DEFAULT_PROJECT_NAME);
  const resetProjectName = () => setProjectName(DEFAULT_PROJECT_NAME);

  const [tempo, setTempo] = useState(DEFAULT_TEMPO);
  const resetTempo = () => setTempo(DEFAULT_TEMPO);

  useEffect(() => {
    Transport.bpm.rampTo(tempo, 0.1);
  }, [tempo]);

  const updateActivePart = (callback) => {
    setParts((parts) =>
      parts.map((part, i) => {
        return i === activePart ? callback(part) : part;
      })
    );
  };

  const updatePart = (i, callback) => {
    if (!inBounds(parts, i)) return;
    setParts((parts) =>
      parts.map((part, j) => {
        return i === j ? callback(part) : part;
      })
    );
  };

  const setSystem = (system) =>
    updateActivePart((part) => part.setSystem(system));

  const setTimeline = (timeline) =>
    updateActivePart((part) => part.setTimeline(timeline));

  const playPart = (i) =>
    setParts((parts) => parts.map((part, j) => (i === j ? part.play() : part)));

  const stopPart = (i) =>
    setParts((parts) => parts.map((part, j) => (i === j ? part.stop() : part)));

  const togglePart = (i) =>
    setParts((parts) =>
      parts.map((part, j) =>
        i === j ? (part.playing ? part.stop() : part.play()) : part
      )
    );

  const length = system.length;
  const key = parts[activePart].getKey();

  const getJSON = () => {
    let key = { parts: [] };
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const partData = {
        name: part.getName(),
        system: part.getSystem().key,
        timeline: part.getTimeline().key,
        volume: part.getVolume(),
        instrument: part.instrument,
      };
      key = { parts: [...key.parts, partData] };
    }
    key.tempo = tempo;
    return JSON.stringify(key);
  };

  const loadJSON = ({ JSON, filename = "Untitled.json" }) => {
    if (!!parseFloat(JSON.tempo)) setTempo(JSON.tempo);
    if (!JSON.parts.length) return;

    let newParts = JSON.parts.map((_) => new Part({}));

    for (let i = 0; i < newParts.length; i++) {
      const part = JSON.parts[i];
      newParts[i] = new Part({
        name: part.name,
        instrument: part.instrument,
        volume: part.volume,
        system: System.createFromKey(part.system),
        timeline: Timeline.createFromKey(part.timeline),
      });
    }
    setParts(newParts);

    const splitIndex = filename.indexOf(".json");
    const name = splitIndex > -1 ? filename.slice(0, splitIndex) : filename;
    setProjectName(name);
  };

  const saveToFile = (name = projectName) => {
    const key = getJSON();
    const file = new Blob([key], { type: "application/json" });
    const url = URL.createObjectURL(file);

    let a = document.createElement("a");
    a.href = url;

    let fileName = name;
    if (!name || !removeWhitespace(`${name}`).length) fileName = "Untitled";

    a.download = `${name}.json`;

    document.getElementById("App").appendChild(a);
    a.click();
    document.getElementById("App").removeChild(a);
  };

  const readFiles = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.hidden = true;

    input.onchange = (e) => {
      const files = e.target.files;
      if (!files.length) return;
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        const parsedJSON = JSON.parse(result);
        loadJSON({ JSON: parsedJSON, filename: file.name });
      };
      reader.readAsText(file);
    };

    document.getElementById("App").appendChild(input);
    input.click();
    document.getElementById("App").removeChild(input);
  };

  const loadSystemFromKey = (_key) => {
    const key = removeWhitespace(_key);
    setSystem(System.createFromKey(key));
  };
  const loadTimelineFromKey = (_key) => {
    const key = removeWhitespace(_key);
    setTimeline(Timeline.createFromKey(key));
  };
  const loadKey = (_key) => {
    const key = removeWhitespace(_key);
    let systemKey, timelineKey;
    const splitIndex = key.indexOf(";");
    if (splitIndex < 0) {
      systemKey = key;
      timelineKey = "";
    } else {
      systemKey = key.slice(0, splitIndex);
      timelineKey = key.slice(splitIndex + 1);
    }
    loadSystemFromKey(systemKey);
    loadTimelineFromKey(timelineKey);
  };

  const addNoteToTimeline = (depth, index) => {
    if (depth > system.length - 1) return;
    const node = system.getNodeAtDepth(depth);
    if (index > node.getNotes().length - 1) return;
    const newTimeline = timeline.addNote(depth, index);
    setTimeline(newTimeline);
  };

  const removeNoteFromTimeline = (index) =>
    setTimeline(timeline.removeNoteAtIndex(index));

  // Make sure timeline notes exist in system
  useEffect(() => {
    setTimeline(timeline.filter(system));
  }, [system]);

  const addRestToTimeline = () => {
    setTimeline(timeline.addRest());
  };

  const clearTimeline = () => setTimeline(new Timeline());

  const stopParts = () => setParts((parts) => parts.map((part) => part.stop()));

  const toggleTimeline = () =>
    updateActivePart((part) => (part.playing ? part.stop() : part.play()));

  const getNodes = () => system.getNodes();
  const getNodeAtDepth = (depth) => system.getNodeAtDepth(depth);

  const pushNode = () => setSystem(system.pushNode());
  const popNode = () => setSystem(system.popNode());

  const getNotesAtDepth = (depth) => system.getNotesAtDepth(depth);

  const addIndexAtDepth = (depth, index) =>
    setSystem(system.addIndexAtDepth(depth, index));

  const removeIndexAtDepth = (depth, i) =>
    setSystem(system.removeIndexAtDepth(depth, i));

  const TransposeNotesAtDepth = (depth, amount) =>
    setSystem(system.TransposeNotesAtDepth(depth, amount));

  const transposeNotesAtDepth = (depth, amount) =>
    setSystem(system.transposeNotesAtDepth(depth, amount));

  const clearNotesAtDepth = (depth) =>
    setSystem(system.clearNotesAtDepth(depth));

  const [customPresets, setCustomPresets] = useState([]);

  const updatePresets = () => {
    let loadedPresets = [];
    for (let i = 1; true; i++) {
      const key = localStorage.getItem(`key-${i}`);
      if (!key) break;
      loadedPresets = [...loadedPresets, key];
    }
    setCustomPresets(loadedPresets);
  };
  useEffect(updatePresets, []);

  const addPreset = (value) => {
    const length = customPresets.length;
    const newKey = `key-${length + 1}`;
    localStorage.setItem(newKey, value);
    updatePresets();
  };

  const removePreset = (i) => {
    const length = customPresets.length;
    const key = `key-${i}`;
    const oldValue = localStorage.getItem(key);
    if (!oldValue) return;
    localStorage.removeItem(key);
    const offset = "key-".length;
    const keyNumber = parseInt(key.slice(offset));
    for (let i = keyNumber - 1; i < length - 1; i++) {
      localStorage.setItem(`key-${i + 1}`, customPresets[i + 1]);
    }
    localStorage.removeItem(`key-${length}`);
    updatePresets();
  };

  const renamePreset = (i, name) => {
    if (!inBounds(customPresets, i - 1)) return;
    const value = customPresets[i - 1];
    const splitIndex = value.indexOf("_");
    if (splitIndex < 0) return;
    const oldUIKey = value.slice(splitIndex);
    let newName = `Preset ${i}`;
    if (!!removeWhitespace(name).length) newName = name;
    localStorage.setItem(`key-${i}`, `${newName}_${oldUIKey}`);
  };

  return {
    parts,
    setParts,
    activePart,
    setActivePart,
    updatePart,
    updateActivePart,
    addPart,
    removePart,
    playPart,
    stopPart,
    togglePart,
    resetParts,
    system,
    instrument,
    timeline,
    name,
    volume,
    playing,
    length,
    key,
    getJSON,
    loadJSON,
    saveToFile,
    readFiles,
    projectName,
    setProjectName,
    resetProjectName,
    tempo,
    setTempo,
    resetTempo,
    loadSystemFromKey,
    loadTimelineFromKey,
    loadKey,
    addNoteToTimeline,
    addRestToTimeline,
    removeNoteFromTimeline,
    clearTimeline,
    stopParts,
    toggleTimeline,
    getNodes,
    getNodeAtDepth,
    pushNode,
    popNode,
    getNotesAtDepth,
    addIndexAtDepth,
    removeIndexAtDepth,
    TransposeNotesAtDepth,
    transposeNotesAtDepth,
    clearNotesAtDepth,
    customPresets,
    addPreset,
    removePreset,
    renamePreset,
    updatePresets,
  };
}
