import { TOTAL_EXERCISES } from "../data";
import { ProgressControls } from "./ProgressControls";

interface HeaderProps {
  solvedCount: number;
  onExport: () => void;
  onImport: (file: File) => Promise<void>;
  onResetAll: () => void;
}

export function Header({
  solvedCount,
  onExport,
  onImport,
  onResetAll,
}: HeaderProps) {
  const pct = TOTAL_EXERCISES > 0 ? (solvedCount / TOTAL_EXERCISES) * 100 : 0;

  return (
    <header className="mb-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-text tracking-tight">
            DSA Drills
          </h1>
          <p className="mt-1 text-sm text-muted">
            Reorder code lines &amp; fill in the blanks — practice by doing.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <p className="font-mono text-sm text-text">
            <span className="text-correct font-semibold">{solvedCount}</span>
            <span className="text-muted"> / {TOTAL_EXERCISES} solved</span>
          </p>
          <ProgressControls
            onExport={onExport}
            onImport={onImport}
            onResetAll={onResetAll}
          />
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
