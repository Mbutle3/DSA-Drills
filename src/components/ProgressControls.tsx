import { useRef, useState } from "react";

interface ProgressControlsProps {
  onExport: () => void;
  onImport: (file: File) => Promise<void>;
  onResetAll: () => void;
}

export function ProgressControls({
  onExport,
  onImport,
  onResetAll,
}: ProgressControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [justImported, setJustImported] = useState(false);

  const handleImportClick = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await onImport(file);
      setError(null);
      setJustImported(true);
      setTimeout(() => setJustImported(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed.");
    } finally {
      e.target.value = "";
    }
  };

  const handleResetAll = () => {
    if (
      confirm(
        "Reset ALL progress? This can't be undone unless you have a saved file.",
      )
    ) {
      onResetAll();
    }
  };

  const btnClass =
    "rounded-lg border border-border bg-panel-2 px-3 py-1.5 text-xs font-medium text-muted hover:text-text hover:bg-border/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/60 transition-colors motion-reduce:transition-none";

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          className={btnClass}
          onClick={onExport}
          title="Download your progress as a JSON file"
        >
          Save progress
        </button>
        <button
          type="button"
          className={btnClass}
          onClick={handleImportClick}
          title="Load progress from a JSON file"
        >
          Load progress
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={handleResetAll}
          className="text-xs text-muted underline-offset-2 hover:text-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/60 rounded"
        >
          reset progress
        </button>
      </div>
      {justImported && (
        <span className="text-xs text-correct" role="status">
          ✓ progress loaded
        </span>
      )}
      {error && (
        <span className="text-xs text-incorrect max-w-xs text-right" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
