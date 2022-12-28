import samples from "./samples.json";
import { Sampler } from "tone";

export const mod = (n, m) => ((n % m) + m) % m;
export const shiftIndex = (i, int, length) => mod(i + int, length);
export const inBounds = (arr, i) => i >= 0 && i < arr.length;

export const removeWhitespace = (str = "") => str.replace(/\s/g, "");

export const INSTRUMENTS = Object.keys(samples);
export const DEFAULT_INSTRUMENT = "piano";
export const MIN_TEMPO = 1;
export const DEFAULT_TEMPO = 120;
export const MAX_TEMPO = 240;
export const MIN_VOLUME = -60;
export const DEFAULT_VOLUME = -30;
export const MAX_VOLUME = 0;
export const DEFAULT_PROJECT_NAME = "Untitled";

export const SCORE_ID = "score";
export const SCORE_ID_AT_DEPTH = (depth) => `score-${depth}`;

export const createSampler = (instrument, onload) =>
  new Sampler({
    urls: samples[instrument],
    baseUrl: `/samples/${instrument}/`,
    onload,
  }).toDestination();

export const CHROMATIC_NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const PLAYED_KEYS = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

export const COLL_COLORS = ["black", "red", "blue", "green", "orange"];
