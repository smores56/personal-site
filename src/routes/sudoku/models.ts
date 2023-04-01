export interface SudokuSquare {
  expected: number;
  current: SquareValue;
  notes: number[];
}

export type SquareValue =
  | { type: "pre-filled" }
  | { type: "empty" }
  | { type: "filled"; value: number };

export interface Coordinates {
  x: number;
  y: number;
}

export interface Timing {
  started: Date | null;
  finished: Date | null;
}

export type SudokuKeyEvent =
  | { type: "input-number"; num: number }
  | { type: "clear-selection"; }
  | { type: "clear-square"; }
  | { type: "toggle-notes-mode"; }
  | { type: "toggle-show-mistakes"; };
