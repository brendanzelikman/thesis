const chromaticScale = {
  name: "Chromatic Scale",
  key: "chromatic scale",
  aliases: ["chromatic"],
  system: "0,1,2,3,4,5,6,7,8,9,10,11",
  timeline: "0,1,2,3,4,5,6,7,8,9,10,11",
};
const majorScale = {
  name: "Major Scale",
  key: "major scale",
  aliases: ["major"],
  system: "0,2,4,5,7,9,11",
  timeline: "0,1,2,3,4,5,6",
};
const naturalMinorScale = {
  name: "Natural Minor Scale",
  key: "minor scale",
  aliases: ["minor"],
  system: "0,2,3,5,7,8,10",
  timeline: "0,1,2,3,4,5,6",
};
const harmonicMinorScale = {
  name: "Harmonic Minor Scale",
  key: "harmonic minor scale",
  aliases: ["harmonic minor", "harmonic"],
  system: "0,2,3,5,7,8,11",
  timeline: "0,1,2,3,4,5,6",
};
const melodicMinorScale = {
  name: "Melodic Minor Scale",
  key: "melodic minor scale",
  aliases: ["melodic minor, melodic"],
  system: "0,2,3,5,7,9,11",
  timeline: "0,1,2,3,4,5,6",
};

const pentatonicScale = {
  name: "Pentatonic Scale",
  key: "penatonic scale",
  aliases: ["pentatonic"],
  system: "0,2,4,7,9",
  timeline: "0,1,2,3,4",
};
const bluesScale = {
  name: "Blues Scale",
  key: "blues scale",
  aliases: ["blues"],
  system: "0,3,5,6,7,10",
  timeline: "0,1,2,3,4,5",
};
const bebopScale = {
  name: "Bebop Scale",
  key: "bebop scale",
  aliases: ["bebop"],
  system: "0,2,4,5,7,9,10,11",
  timeline: "0,1,2,3,4,5,6,7",
};
const acousticScale = {
  name: "Acoustic Scale",
  key: "acoustic scale",
  aliases: ["acoustic", "lydian dominant", "lydian b7"],
  system: "0,2,4,6,7,9,10",
  timeline: "0,1,2,3,4,5,6",
};

const basicScales = [
  chromaticScale,
  majorScale,
  naturalMinorScale,
  harmonicMinorScale,
  melodicMinorScale,
  pentatonicScale,
  bluesScale,
  bebopScale,
  acousticScale,
];

const doubleHarmonicMajorScale = {
  name: "Double Harmonic Scale",
  key: "double harmonic scale",
  aliases: ["double harmonic", "double harmonic major"],
  system: "0,1,4,5,7,8,11",
  timeline: "0,1,2,3,4,5,6",
};
const doubleHarmonicMinorScale = {
  name: "Hungarian Minor Scale",
  key: "hungarian minor scale",
  aliases: ["hungarian minor", "double harmonic minor"],
  system: "0,2,4,5,7,8,11",
  timeline: "0,1,2,3,4,5,6",
};

const phrygianDominantScale = {
  name: "Phrygian Dominant Scale",
  key: "phrygian dominant scale",
  aliases: ["phrygian dominant"],
  system: "0,1,4,5,7,8,10",
  timeline: "0,1,2,3,4,5,6",
};
const aeolianDominantScale = {
  name: "Aeolian Dominant Scale",
  key: "aeolian dominant scale",
  aliases: ["aeolian dominant", "melodic major", "mixolydian b6"],
  system: "0,2,4,5,7,8,10",
  timeline: "0,1,2,3,4,5,6",
};

const alteredDominantScale = {
  name: "Altered Dominant Scale",
  key: "altered dominant scale",
  aliases: ["altered scale", "altered", "super locrian"],
  system: "0,1,3,4,6,8,10",
  timeline: "0,1,2,3,4,5,6",
};

const octatonicHWScale = {
  name: "Octatonic (H-W) Scale",
  key: "octatonic scale 1",
  aliases: ["octatonic1", "octatonic", "half whole scale"],
  system: "0,1,3,4,6,7,9,10",
  timeline: "0,1,2,3,4,5,6,7",
};
const octatonicWHScale = {
  name: "Octatonic (W-H) Scale",
  key: "octatonic scale 2",
  aliases: ["octatonic2", "whole half scale"],
  system: "0,2,3,5,6,8,9,11",
  timeline: "0,1,2,3,4,5,6,7",
};

const augmentedScale = {
  name: "Augmented Scale",
  key: "augmented scale",
  aliases: ["augmented"],
  system: "0,3,4,7,8,11",
  timeline: "0,1,2,3,4,5",
};

const wholeToneScale = {
  name: "Whole Tone Scale",
  key: "whole tone scale",
  aliases: ["whole tone"],
  system: "0,2,4,6,8,10",
  timeline: "0,1,2,3,4,5",
};

const uncommonScales = [
  doubleHarmonicMajorScale,
  doubleHarmonicMinorScale,
  phrygianDominantScale,
  aeolianDominantScale,
  alteredDominantScale,
  octatonicHWScale,
  octatonicWHScale,
  augmentedScale,
  wholeToneScale,
];

const ionianMode = {
  name: "Ionian Mode",
  key: "ionian",
  aliases: [],
  system: "0,2,4,5,7,9,11",
  timeline: "0,1,2,3,4,5,6",
};
const dorianMode = {
  name: "Dorian Mode",
  key: "dorian",
  aliases: [],
  system: "0,2,3,5,7,9,10",
  timeline: "0,1,2,3,4,5,6",
};
const phrygianMode = {
  name: "Phrygian Mode",
  key: "phrygian",
  aliases: [],
  system: "0,1,3,5,7,8,10",
  timeline: "0,1,2,3,4,5,6",
};
const lydianMode = {
  name: "Lydian Mode",
  key: "lydian",
  aliases: [],
  system: "0,2,4,6,7,9,11",
  timeline: "0,1,2,3,4,5,6",
};
const mixolydianMode = {
  name: "Mixolydian Mode",
  key: "mixolydian",
  aliases: [],
  system: "0,2,4,5,7,9,10",
  timeline: "0,1,2,3,4,5,6",
};
const aeolianMode = {
  name: "Aeolian Mode",
  key: "aeolian",
  aliases: [],
  system: "0,2,3,5,7,8,10",
  timeline: "0,1,2,3,4,5,6",
};
const locrianMode = {
  name: "Locrian Mode",
  key: "locrian",
  aliases: [],
  system: "0,1,3,5,6,8,10",
  timeline: "0,1,2,3,4,5,6",
};

const modes = [
  ionianMode,
  dorianMode,
  phrygianMode,
  lydianMode,
  mixolydianMode,
  aeolianMode,
  locrianMode,
];

const majorChord = {
  name: "Major Chord",
  key: "major chord",
  aliases: ["major", "M"],
  system: "0,2,4,5,7,9,11*0,2,4",
  timeline: "1:0,1:1,1:2",
};
const minorChord = {
  name: "Minor Chord",
  key: "minor chord",
  aliases: ["minor", "m"],
  system: "0,2,3,5,7,8,10*0,2,4",
  timeline: "1:0,1:1,1:2",
};
const diminishedChord = {
  name: "Diminished Chord",
  key: "diminished chord",
  aliases: ["dim chord", "dim", "o"],
  system: "0,1,3,4,6,7,9,10*0,2,4",
  timeline: "1:0,1:1,1:2",
};
const augmentedChord = {
  name: "Augmented Chord",
  key: "augmented chord",
  aliases: ["augmented", "aug"],
  system: "0,3,4,7,8,11*0,2,4",
  timeline: "1:0,1:1,1:2",
};
const majorSeventhChord = {
  name: "Major 7th Chord",
  key: "major 7th chord",
  aliases: ["major 7th", "maj7"],
  system: "0,2,4,5,7,9,11*0,2,4,6",
  timeline: "1:0,1:1,1:2,1:3",
};
const minorSeventhChord = {
  name: "Minor 7th Chord",
  key: "minor 7th chord",
  aliases: ["minor 7th", "min7"],
  system: "0,2,3,5,7,8,10*0,2,4,6",
  timeline: "1:0,1:1,1:2,1:3",
};
const domSeventhChord = {
  name: "Dominant 7th Chord",
  key: "dominant 7th chord",
  aliases: ["dom 7th chord", "dom7", "7"],
  system: "0,2,4,5,7,9,10*0,2,4,6",
  timeline: "1:0,1:1,1:2,1:3",
};
const minmajSeventhChord = {
  name: "Minor Major 7th Chord",
  key: "minor major 7th chord",
  aliases: ["minor major 7th", "minmaj7"],
  system: "0,2,3,5,7,8,11*0,2,4,6",
  timeline: "1:0,1:1,1:2,1:3",
};
const dimSeventhChord = {
  name: "Diminished 7th Chord",
  key: "diminished 7th chord",
  aliases: ["dim 7th chord", "dim 7th", "dim7", "o7"],
  system: "0,1,3,4,6,7,9,10*0,2,4,6",
  timeline: "1:0,1:1,1:2,1:3",
};

const chords = [
  majorChord,
  minorChord,
  diminishedChord,
  augmentedChord,
  majorSeventhChord,
  minorSeventhChord,
  domSeventhChord,
  minmajSeventhChord,
  dimSeventhChord,
];

const straightWholeRhythm = {
  name: "Straight Wholes",
  key: "straight wholes",
  aliases: [],
  system: "0",
  timeline: "0,r,r,r,r,r,r,r",
};
const offbeatWholeRhythm = {
  name: "Offbeat Wholes",
  key: "offbeat wholes",
  aliases: [],
  system: "0",
  timeline: "r,r,r,r,0,r,r,r",
};
const straightHalfRhythm = {
  name: "Straight Halfs",
  key: "straight halfs",
  aliases: [],
  system: "0",
  timeline: "0,r,r,r,0,r,r,r",
};
const offbeatHalfRhythm = {
  name: "Offbeat Halfs",
  key: "offbeat halfs",
  aliases: [],
  system: "0",
  timeline: "r,r,0,r,r,r,0,r",
};
const straightQuarterRhythm = {
  name: "Straight Quarters",
  key: "straight quarters",
  aliases: [],
  system: "0",
  timeline: "0,r,0,r,0,r,0,r",
};
const offbeatQuarterRhythm = {
  name: "Offbeat Quarters",
  key: "offbeat quarters",
  aliases: [],
  system: "0",
  timeline: "r,0,r,0,r,0,r,0",
};
const threeZeroRhythm = {
  name: "3+0 Quarters",
  key: "3+0 quarters",
  aliases: [],
  system: "0",
  timeline: "0,r,0,r,0,r,r,r",
};
const twoOneRhythm = {
  name: "2+1 Quarters",
  key: "2+1 quarters",
  aliases: [],
  system: "0",
  timeline: "0,r,0,r,r,r,0,r",
};
const oneTwoRhythm = {
  name: "1+2 Quarters",
  key: "1+2 quarters",
  aliases: [],
  system: "0",
  timeline: "0,r,r,r,0,r,0,r",
};
const zeroThreeRhythm = {
  name: "0+3 Quarters",
  key: "0+3 quarters",
  aliases: [],
  system: "0",
  timeline: "r,r,0,r,0,r,0,r",
};
const eighthPulseRhythm = {
  name: "Eighth Pulse",
  key: "eighth pulse",
  aliases: [],
  system: "0",
  timeline: "0,0,0,0,0,0,0,0",
};
const tresilloRhythm = {
  name: "Tresillo",
  key: "tresillo",
  aliases: [],
  system: "0",
  timeline: "0,r,r,0,r,r,0,r,",
};

const rhythms = [
  straightWholeRhythm,
  offbeatWholeRhythm,
  straightHalfRhythm,
  offbeatHalfRhythm,
  straightQuarterRhythm,
  offbeatQuarterRhythm,
  threeZeroRhythm,
  twoOneRhythm,
  oneTwoRhythm,
  zeroThreeRhythm,
  eighthPulseRhythm,
  tresilloRhythm,
];

export const PRESETS = {
  basicScales,
  uncommonScales,
  modes,
  chords,
  rhythms,
};
