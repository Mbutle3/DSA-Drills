import { writeFileSync } from "node:fs";
import { DS_SECTIONS } from "../src/data/dsSections.ts";
import { ALGO_SECTIONS } from "../src/data/algoSections.ts";
import type { ReorderExercise } from "../src/data/types.ts";

const dataStructures = DS_SECTIONS.flatMap((s) => s.exercises);
const algorithms = ALGO_SECTIONS.flatMap((s) => s.exercises);

const DS_GROUPS = [
  {
    id: "stacks-queues",
    label: "Stacks & Queues",
    ids: [
      "ds-stack",
      "ds-queue",
      "ds-deque-as-stack",
      "ds-stack-class",
      "ds-circular-buffer",
      "ds-priority-queue",
      "ds-lru-cache",
    ],
  },
  {
    id: "lists",
    label: "Linked Lists",
    ids: [
      "ds-linkedlist",
      "ds-doubly-linked-list",
      "ds-linked-list-length",
      "ds-dll-delete",
    ],
  },
  {
    id: "trees",
    label: "Trees & Tries",
    ids: ["ds-tree", "ds-bst-insert", "ds-nary-tree", "ds-trie"],
  },
  {
    id: "graphs",
    label: "Graphs",
    ids: [
      "ds-graph",
      "ds-adjacency-matrix",
      "ds-weighted-graph",
      "ds-edge-set",
      "ds-union-find",
    ],
  },
  {
    id: "heaps",
    label: "Heaps",
    ids: ["ds-heap", "ds-max-heap"],
  },
  {
    id: "hash-maps",
    label: "Hash Maps & Sets",
    ids: [
      "ds-set",
      "ds-defaultdict-groups",
      "ds-counter-multiset",
      "ds-sparse-map",
    ],
  },
  {
    id: "arrays",
    label: "Arrays & Matrices",
    ids: ["ds-2d-matrix"],
  },
] as const;

const ALGO_GROUPS = [
  {
    id: "sorting",
    label: "Sorting",
    ids: ["algo-bubble-sort", "algo-insertion-sort", "algo-selection-sort"],
  },
  {
    id: "divide-and-conquer",
    label: "Divide & Conquer",
    ids: [
      "algo-merge-sort",
      "algo-quicksort",
      "algo-quickselect",
      "algo-binary-search",
    ],
  },
  {
    id: "graph-traversal",
    label: "Graph Traversal & Shortest Path",
    ids: [
      "algo-bfs",
      "algo-dfs",
      "algo-dfs-iterative",
      "algo-dijkstra",
      "algo-topological-sort",
      "algo-num-islands",
    ],
  },
  {
    id: "dynamic-programming",
    label: "Dynamic Programming",
    ids: [
      "algo-fib-memo",
      "algo-knapsack",
      "algo-lcs",
      "algo-lis",
      "algo-edit-distance",
      "algo-kadane",
    ],
  },
  {
    id: "two-pointers",
    label: "Two Pointers",
    ids: [
      "algo-two-pointer-pair-sum",
      "algo-first-occurrence",
      "algo-floyd-cycle-detection",
      "algo-merge-two-sorted-lists",
    ],
  },
  {
    id: "sliding-window",
    label: "Sliding Window",
    ids: ["algo-sliding-window-max"],
  },
  {
    id: "hash-map",
    label: "Hash Map",
    ids: ["algo-two-sum"],
  },
  {
    id: "backtracking",
    label: "Backtracking",
    ids: [
      "algo-permutations",
      "algo-power-set",
      "algo-nqueens-safe-check",
    ],
  },
  {
    id: "linked-list",
    label: "Linked List Techniques",
    ids: ["algo-reverse-linked-list"],
  },
  {
    id: "stack-queue",
    label: "Stack & Queue",
    ids: ["algo-valid-parentheses"],
  },
  {
    id: "math",
    label: "Math & Number Theory",
    ids: ["algo-gcd", "algo-sieve-of-eratosthenes"],
  },
  {
    id: "arrays-matrices",
    label: "Arrays & Matrices",
    ids: ["algo-rotate-array", "algo-spiral-matrix"],
  },
  {
    id: "tries-union-find",
    label: "Tries & Union-Find",
    ids: ["algo-trie-insert", "algo-union-find-path-compression"],
  },
] as const;

function buildSections(exercises: ReorderExercise[], groups: typeof DS_GROUPS) {
  const byId = Object.fromEntries(exercises.map((e) => [e.id, e]));
  const used = new Set<string>();
  const sections = groups.map((g) => {
    const ex = g.ids.map((id) => {
      if (!byId[id]) throw new Error(`Missing ${id}`);
      used.add(id);
      return byId[id];
    });
    return { id: g.id, label: g.label, exercises: ex };
  });
  const missing = exercises.filter((e) => !used.has(e.id)).map((e) => e.id);
  if (missing.length) throw new Error(`Unassigned: ${missing.join(", ")}`);
  return sections;
}

const dsSections = buildSections(dataStructures, DS_GROUPS);
const algoSections = buildSections(algorithms, ALGO_GROUPS);

function serializeSections(
  varName: string,
  typeImport: string,
  sections: ReturnType<typeof buildSections>,
) {
  const body = JSON.stringify(sections, null, 2);
  return `import type { ${typeImport}, ExerciseSection } from "./types";\n\nexport const ${varName}: ExerciseSection<${typeImport}>[] = ${body};\n`;
}

writeFileSync("src/data/dsSections.ts", serializeSections("DS_SECTIONS", "DsGroupId", dsSections));
writeFileSync(
  "src/data/algoSections.ts",
  serializeSections("ALGO_SECTIONS", "AlgoGroupId", algoSections),
);

console.log(
  "Generated:",
  dsSections.length,
  "DS sections,",
  algoSections.length,
  "algo sections",
);
