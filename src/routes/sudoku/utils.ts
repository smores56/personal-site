import type { Coordinates, SudokuSquare } from "../../models";

export const emptyBoard: SudokuSquare[] =
  Array(81).fill(undefined).map(() => ({ expected: 0, current: { type: "empty" }, notes: [] }));

export const mapSquareAtCoords = ({ x, y }: Coordinates, squares: SudokuSquare[], mapper: (square: SudokuSquare) => SudokuSquare) =>
  squares.map((square, index) => (y * 9 + x) === index ? mapper(square) : square);

export const zipBoardWithCoords = (squares: SudokuSquare[]): { coords: Coordinates; square: SudokuSquare }[] =>
  squares.map((square, index) => ({ coords: { x: index % 9, y: Math.floor(index / 9) }, square }));

export const coordsAreEqual = (coords1: Coordinates, coords2: Coordinates) =>
  coords1.x === coords2.x && coords1.y === coords2.y;
