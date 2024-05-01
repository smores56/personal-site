export interface Keyboard {
  name: string;
  link: string;
  imageUrl: string;
  description: string;
}

export interface SudokuSquareState {
  expected: number;
  current: SudokuSquareValue;
}

export type SudokuSquareValue =
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
