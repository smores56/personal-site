import type { Coordinates, SudokuSquareState } from "./models";

export function toggleInList<T>(items: T[], item: T): T[] {
  if (items.includes(item)) {
    return items.filter((i) => i !== item);
  } else {
    return [...items, item];
  }
}

export const emptyBoard: SudokuSquareState[] = Array(81)
  .fill(undefined)
  .map(() => ({ expected: 0, current: { type: "empty" }, notes: [] }));

export function mapSquareAtCoords(
  { x, y }: Coordinates,
  squares: SudokuSquareState[],
  mapper: (square: SudokuSquareState) => SudokuSquareState,
) {
  return squares.map((square, index) =>
    y * 9 + x === index ? mapper(square) : square,
  );
}

export function zipBoardWithCoords(
  squares: SudokuSquareState[],
): { coords: Coordinates; square: SudokuSquareState }[] {
  return squares.map((square, index) => ({
    coords: { x: index % 9, y: Math.floor(index / 9) },
    square,
  }));
}

export const coordsAreEqual = (coords1: Coordinates, coords2: Coordinates) =>
  coords1.x === coords2.x && coords1.y === coords2.y;
