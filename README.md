# DSA Drills

A local, self-quizzing web app for practicing common data structures, algorithms, and Python one-liners. Two exercise formats:

- **Reorder** — drag shuffled code lines back into the correct order
- **Fill-in-the-blank** — complete inline blanks in a code snippet

Progress is saved automatically in `localStorage` and survives page refreshes. You can also export and import a JSON save file to move progress between browsers or machines.

## Setup

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Build

```bash
npm run build
```

Static output lands in `dist/` — deploy to Netlify, Vercel, GitHub Pages, or any static host.

Preview the production build locally:

```bash
npm run preview
```

## Adding a new exercise

Append an object to the relevant data file in `src/data/`. No other files need to change — the app picks up new exercises automatically.

### Reorder exercise (Data Structures or Algorithms)

Add to `src/data/dataStructures.ts` or `src/data/algorithms.ts`:

```ts
{
  id: "ds-my-structure",       // unique ID
  type: "reorder",
  category: "ds",              // or "algo"
  file: "my_structure.py",     // shown in the editor window chrome
  title: "My Structure",
  note: "One-line concept explanation.",
  lines: [
    "line one",
    "line two",
    "line three",
  ],
}
```

`lines` must be in the **correct** order. The app shuffles a copy for display.

### Fill-in-the-blank exercise (Python One-Liners)

Add to `src/data/oneLiners.ts`:

```ts
{
  id: "ol-my-oneliner",
  type: "fillblank",
  category: "oneliner",
  file: "my_oneliner.py",
  title: "My One-Liner",
  note: "One-line concept explanation.",
  template: "result = {{1}}(items)",
  answers: { "1": ["sorted", "list"] },  // accepted answers per blank
}
```

Use `{{1}}`, `{{2}}`, etc. in `template` for blanks. Answers are compared case-sensitively after trimming and collapsing internal whitespace.

## Save / load progress

Progress is stored automatically in `localStorage`. For a portable backup — or to move progress to another browser or machine — use the header controls:

### Save progress

Downloads a JSON file named `dsa-drills-progress-YYYY-MM-DD.json`:

```json
{
  "app": "dsa-drills",
  "version": 1,
  "exportedAt": "2026-07-01T12:34:56.000Z",
  "solved": ["ds-stack", "algo-bfs", "ol-freq-counter"]
}
```

### Load progress

Click **Load progress** and select a previously exported JSON file. The app validates that `app` is `"dsa-drills"` and `solved` is an array; invalid files show an inline error.

Imported IDs are **merged** with your current progress (union) — loading an older save will never erase exercises you've solved since exporting.

### Reset progress

**reset progress** in the header clears all solved state from `localStorage` and resets every exercise. You'll be asked to confirm first.

### Per-exercise reset

Once an exercise is solved, its card shows **✓ solved · reset** in the window chrome. Clicking it flips only that exercise back to unsolved (reshuffled for reorder exercises, cleared inputs for fill-blank ones) without affecting anything else.

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS
- [@dnd-kit](https://dndkit.com/) for accessible drag-and-drop reorder exercises

## License

MIT
