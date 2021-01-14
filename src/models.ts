export interface Job {
  company: string;
  location: string;
  position: string;
  startedAt: string;
  left: string;
  description: string;
  accomplishments: string[];
  responsibilities: string[];
  tools: Tool[];
}

export interface Tool {
  name: string;
  url: string;
}

export interface Project {
  name: string;
  github: string;
  description: string;
  toolsUsed: Tool[];
}

export interface Review {
  title: string;
  year: number | null;
  rating: number | null;
  review: string | null;
  link: string | null;
}

export interface Recipe {
  name: string;
  tags: string[];
  image: string | null;
  links: string[];
  steps: string[];
  ingredients: IngredientsForComponent[];
  nutrition: Nutrition | null;
}

export interface IngredientsForComponent {
  component: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  item: string;
  quantity: string | null;
  notes: string | null;
  substitutes: string[];
  optional: boolean;
}

export interface Nutrition {
  servings: number | null;
  servingSize: string | null;
  calories: number | null;
  fat: number | null;
  carbs: number | null;
  netCarbs: number | null;
  protein: number | null;
  fiber: number | null;
}

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
