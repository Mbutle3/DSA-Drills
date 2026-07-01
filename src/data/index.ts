import { DS_SECTIONS } from "./dsSections";
import { ALGO_SECTIONS } from "./algoSections";
import { oneLiners } from "./oneLiners";
import type { Category, Exercise, ExerciseSection } from "./types";
import type { AlgoGroupId, DsGroupId } from "./types";

export const dataStructures = DS_SECTIONS.flatMap((s) => s.exercises);
export const algorithms = ALGO_SECTIONS.flatMap((s) => s.exercises);

export const EXERCISES: Record<Category, Exercise[]> = {
  ds: dataStructures,
  algo: algorithms,
  oneliner: oneLiners,
};

export const EXERCISE_SECTIONS: {
  ds: ExerciseSection<DsGroupId>[];
  algo: ExerciseSection<AlgoGroupId>[];
} = {
  ds: DS_SECTIONS,
  algo: ALGO_SECTIONS,
};

export const ALL_EXERCISES: Exercise[] = [
  ...dataStructures,
  ...algorithms,
  ...oneLiners,
];

export const TOTAL_EXERCISES = ALL_EXERCISES.length;

export { DS_SECTIONS, ALGO_SECTIONS, oneLiners };
export type {
  AlgoGroupId,
  Category,
  DsGroupId,
  Exercise,
  ExerciseSection,
  FillBlankExercise,
  ReorderExercise,
  TabId,
} from "./types";
export {
  CATEGORY_ACCENT,
  CATEGORY_LABELS,
  TAB_ACCENT,
  TAB_LABELS,
} from "./types";
