import { algorithms } from "./algorithms";
import { dataStructures } from "./dataStructures";
import { oneLiners } from "./oneLiners";
import type { Category, Exercise } from "./types";

export const EXERCISES: Record<Category, Exercise[]> = {
  ds: dataStructures,
  algo: algorithms,
  oneliner: oneLiners,
};

export const ALL_EXERCISES: Exercise[] = [
  ...dataStructures,
  ...algorithms,
  ...oneLiners,
];

export const TOTAL_EXERCISES = ALL_EXERCISES.length;

export { algorithms, dataStructures, oneLiners };
export type { Category, Exercise, FillBlankExercise, ReorderExercise } from "./types";
export { CATEGORY_ACCENT, CATEGORY_LABELS } from "./types";
