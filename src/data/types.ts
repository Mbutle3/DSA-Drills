export type Category = "ds" | "algo" | "oneliner";

export interface ReorderExercise {
  id: string;
  type: "reorder";
  category: "ds" | "algo";
  file: string;
  title: string;
  note: string;
  lines: string[];
}

export interface FillBlankExercise {
  id: string;
  type: "fillblank";
  category: "oneliner";
  file: string;
  title: string;
  note: string;
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
