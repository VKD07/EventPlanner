// The 12-key row shown in the UI. Mixes sharps/flats the way most chord
// charts do (Eb and Bb read more naturally than D# and A# for players).
export const KEYS = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];

// Every enharmonic spelling a pasted chord might use, mapped to its
// position in KEYS, so transposition math works regardless of how the
// original chart spelled its notes.
const NOTE_TO_INDEX = {
  C: 0, "B#": 0,
  "C#": 1, Db: 1,
  D: 2,
  "D#": 3, Eb: 3,
  E: 4, Fb: 4,
  F: 5, "E#": 5,
  "F#": 6, Gb: 6,
  G: 7,
  "G#": 8, Ab: 8,
  A: 9,
  "A#": 10, Bb: 10,
  B: 11, Cb: 11,
};

const CHORD_TOKEN = /^([A-G](?:#|b)?)((?:maj|min|dim|aug|sus|add|m)?[0-9]*(?:sus[24]?)?[+-]?)(\/([A-G](?:#|b)?))?$/;

export function isChordToken(token) {
  return CHORD_TOKEN.test(token);
}

// A line "is a chord line" if every non-whitespace token on it parses as
// a chord (or a bar-line/dash separator). Empty lines are never chord lines.
export function isChordLine(line) {
  const tokens = line.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return false;
  return tokens.every((t) => isChordToken(t) || /^[|\-–]+$/.test(t));
}

function transposeNote(note, shift) {
  const index = NOTE_TO_INDEX[note];
  if (index === undefined) return note;
  const targetIndex = ((index + shift) % 12 + 12) % 12;
  return KEYS[targetIndex];
}

export function transposeToken(token, shift) {
  const match = token.match(CHORD_TOKEN);
  if (!match) return token;
  const [, root, suffix, , bass] = match;
  const newRoot = transposeNote(root, shift);
  const newBass = bass ? transposeNote(bass, shift) : null;
  return `${newRoot}${suffix}${newBass ? "/" + newBass : ""}`;
}

// Chord lines use runs of whitespace to position each chord above the
// matching lyric — we preserve that by transposing tokens in place and
// leaving whitespace untouched, rather than re-measuring column widths.
export function transposeLine(line, shift) {
  if (!shift) return line;
  return line.replace(/\S+/g, (token) =>
    isChordToken(token) ? transposeToken(token, shift) : token
  );
}

export function semitoneShift(originalKey, targetKey) {
  const from = KEYS.indexOf(originalKey);
  const to = KEYS.indexOf(targetKey);
  if (from === -1 || to === -1) return 0;
  return to - from;
}
