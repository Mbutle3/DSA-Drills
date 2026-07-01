# DSA Drills

A local, self-quizzing web app for practicing common data structures, algorithms, and Python one-liners. Two exercise formats:

- **Reorder** — drag shuffled code lines back into the correct order
- **Fill-in-the-blank** — complete inline blanks in a code snippet

Progress is saved in `localStorage` and survives page refreshes.

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

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS
- [@dnd-kit](https://dndkit.com/) for accessible drag-and-drop reorder exercises

## License

MIT
