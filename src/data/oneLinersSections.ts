import { oneLiners } from "./oneLiners";
import type { ExerciseSection, FillBlankExercise, OneLinerGroupId } from "./types";

const ONE_LINER_SECTION_DEFS: {
  id: OneLinerGroupId;
  label: string;
  exerciseIds: string[];
}[] = [
  {
    id: "comprehensions",
    label: "Comprehensions",
    exerciseIds: [
      "ol-freq-comprehension",
      "ol-flatten",
      "ol-even-squares",
      "ol-sum-squares-gen",
      "ol-index-comprehension",
      "ol-matrix-create",
    ],
  },
  {
    id: "counting",
    label: "Frequency & counting",
    exerciseIds: [
      "ol-freq-counter",
      "ol-counter-most-common",
      "ol-most-frequent",
      "ol-defaultdict-counter",
      "ol-counter-subtract",
      "ol-unique-count",
    ],
  },
  {
    id: "dicts-sets",
    label: "Dicts & sets",
    exerciseIds: [
      "ol-sort-dict",
      "ol-zip-dict",
      "ol-dict-merge",
      "ol-flatten-dict-values",
      "ol-sort-multi-key",
      "ol-set-union",
      "ol-set-intersection",
    ],
  },
  {
    id: "strings",
    label: "Strings",
    exerciseIds: [
      "ol-reverse-string",
      "ol-palindrome",
      "ol-join-strings",
      "ol-split-strip",
      "ol-anagram-check",
      "ol-fstring-format",
      "ol-string-to-chars",
      "ol-chars-to-string",
      "ol-title-case",
      "ol-remove-whitespace",
    ],
  },
  {
    id: "lists",
    label: "Lists & sequences",
    exerciseIds: [
      "ol-max-index",
      "ol-dedupe",
      "ol-any-negative",
      "ol-all-positive",
      "ol-slice-every-other",
      "ol-chunk-list",
      "ol-remove-falsy",
      "ol-shallow-copy",
      "ol-common-elements",
      "ol-symmetric-difference",
      "ol-second-largest",
      "ol-unzip",
      "ol-enumerate-start",
    ],
  },
  {
    id: "itertools-functools",
    label: "itertools & functools",
    exerciseIds: [
      "ol-flatten-chain",
      "ol-groupby",
      "ol-combinations",
      "ol-permutations",
      "ol-map-filter",
      "ol-reduce-product",
      "ol-two-sum-combinations",
    ],
  },
  {
    id: "matrices",
    label: "Matrices",
    exerciseIds: ["ol-transpose-matrix", "ol-sum-nested"],
  },
  {
    id: "heapq",
    label: "heapq",
    exerciseIds: ["ol-heapq-nlargest", "ol-heapq-nsmallest"],
  },
  {
    id: "python-idioms",
    label: "Python idioms",
    exerciseIds: [
      "ol-digit-sum",
      "ol-swap",
      "ol-ternary",
      "ol-walrus",
      "ol-chained-comparison",
      "ol-gcd-builtin",
      "ol-isqrt",
      "ol-int-to-binary",
      "ol-ascii-value",
    ],
  },
];

function buildOneLinerSections(): ExerciseSection<
  OneLinerGroupId,
  FillBlankExercise
>[] {
  const byId = new Map(oneLiners.map((e) => [e.id, e]));

  return ONE_LINER_SECTION_DEFS.map(({ id, label, exerciseIds }) => ({
    id,
    label,
    exercises: exerciseIds.map((exerciseId) => {
      const exercise = byId.get(exerciseId);
      if (!exercise) {
        throw new Error(`Unknown one-liner id in section "${id}": ${exerciseId}`);
      }
      return exercise;
    }),
  }));
}

export const ONE_LINER_SECTIONS = buildOneLinerSections();
