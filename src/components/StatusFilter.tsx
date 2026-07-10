import type { SolveStatus } from "../data/types";

const OPTIONS: { value: SolveStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unsolved", label: "Unsolved" },
  { value: "solved", label: "Solved" },
];

interface StatusFilterProps {
  active: SolveStatus;
  onChange: (value: SolveStatus) => void;
  onRandom: () => void;
  randomDisabled: boolean;
}

export function StatusFilter({
  active,
  onChange,
  onRandom,
  randomDisabled,
}: StatusFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
      <div
        className="flex flex-wrap gap-1.5"
        role="group"
        aria-label="Filter by solved status"
      >
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            data-active={active === opt.value}
            aria-pressed={active === opt.value}
            onClick={() => onChange(opt.value)}
            className="rounded-md border border-border bg-panel px-2.5 py-1.5 text-xs font-medium text-muted transition-colors motion-reduce:transition-none hover:border-border hover:bg-panel-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-ink data-[active=true]:border-text data-[active=true]:text-text data-[active=true]:bg-panel-2"
          >
            {opt.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onRandom}
        disabled={randomDisabled}
        title="Jump to a random question matching the current filters"
        className="shrink-0 rounded-md border border-border bg-panel px-3 py-1.5 text-xs font-medium text-text transition-colors motion-reduce:transition-none hover:border-border hover:bg-panel-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        🎲 Random
      </button>
    </div>
  );
}
