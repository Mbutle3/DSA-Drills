export type Category = "ds" | "algo" | "oneliner";

export type TabId = Category | "review" | "favorites";

export type DsGroupId =
  | "stacks-queues"
  | "lists"
  | "trees"
  | "graphs"
  | "heaps"
  | "hash-maps"
  | "arrays";

export type AlgoGroupId =
  | "sorting"
  | "divide-and-conquer"
  | "graph-traversal"
  | "dynamic-programming"
  | "two-pointers"
  | "sliding-window"
  | "hash-map"
  | "backtracking"
  | "linked-list"
  | "stack-queue"
  | "math"
  | "arrays-matrices"
  | "tries-union-find";

export type OneLinerGroupId =
  | "comprehensions"
  | "counting"
  | "dicts-sets"
  | "strings"
  | "lists"
  | "itertools-functools"
  | "matrices"
  | "heapq"
  | "python-idioms";

export interface ExerciseSection<G extends string, E extends Exercise = Exercise> {
  id: G;
  label: string;
  exercises: E[];
}

export interface ReorderExercise {
  id: string;
  type: "reorder";
  category: "ds" | "algo";
  file: string;
  title: string;
  note: string;
  lines: string[];
  interchangeable?: number[][];
}

export interface FillBlankExercise {
  id: string;
  type: "fillblank";
  category: "oneliner";
  file: string;
  title: string;
  note: string;
  /** Variables already in scope — shown as read-only setup above the snippet. */
  given: string[];
  template: string;
  answers: Record<string, string[]>;
}

export type Exercise = ReorderExercise | FillBlankExercise;

export const CATEGORY_LABELS: Record<Category, string> = {
  ds: "Data Structures",
  algo: "Algorithms",
  oneliner: "Python One-Liners",
};

export const CATEGORY_ACCENT: Record<Category, string> = {
  ds: "sky",
  algo: "violet",
  oneliner: "amber",
};

export const TAB_LABELS: Record<TabId, string> = {
  ds: "Data Structures",
  algo: "Algorithms",
  oneliner: "Python One-Liners",
  review: "Review",
  favorites: "Favorites",
};

export const TAB_ACCENT: Record<TabId, string> = {
  ds: "sky",
  algo: "violet",
  oneliner: "amber",
  review: "review",
  favorites: "favorite",
};
