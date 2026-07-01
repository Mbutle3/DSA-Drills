import { TOTAL_EXERCISES } from "../data";

interface HeaderProps {
  solvedCount: number;
  onReset: () => void;
}

export function Header({ solvedCount, onReset }: HeaderProps) {
  const pct = TOTAL_EXERCISES > 0 ? (solvedCount / TOTAL_EXERCISES) * 100 : 0;

  function handleReset() {
    if (
      window.confirm(
        "Reset all progress? This clears every solved exercise from local storage.",
      )
    ) {
      onReset();
    }
  }

  return (
    <header className="mb-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-text tracking-tight">
            DSA Drills
          </h1>
          <p className="mt-1 text-sm text-muted">
            Reorder code lines &amp; fill in the blanks — practice by doing.
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-sm text-text">
            <span className="text-correct font-semibold">{solvedCount}</span>
            <span className="text-muted"> / {TOTAL_EXERCISES} solved</span>
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-1 text-xs text-muted underline-offset-2 hover:text-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/60 rounded"
          >
            reset progress
          </button>
        </div>
      </div>

      <div
        className="h-1.5 w-full rounded-full bg-panel-2 overflow-hidden"
        role="progressbar"
        aria-valuenow={solvedCount}
        aria-valuemin={0}
        aria-valuemax={TOTAL_EXERCISES}
        aria-label="Exercise progress"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky via-violet to-amber transition-[width] duration-500 motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
    </header>
  );
}
