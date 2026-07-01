import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "dsa-drills:solved";
const SAVE_FILE_VERSION = 1;
const APP_ID = "dsa-drills";

interface SaveFile {
  app: string;
  version: number;
  exportedAt: string;
  solved: string[];
}

function loadSolved(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const ids: string[] = JSON.parse(raw);
    return new Set(ids);
  } catch {
    return new Set();
  }
}

function persistSolved(solved: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...solved]));
  } catch {
    // fail silently — worst case, progress just doesn't persist this session
  }
}

function downloadJSON(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function useProgress() {
  const [solved, setSolved] = useState<Set<string>>(() => loadSolved());

  useEffect(() => {
    persistSolved(solved);
  }, [solved]);

  const markSolved = useCallback((id: string) => {
    setSolved((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const markUnsolved = useCallback((id: string) => {
    setSolved((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleSolved = useCallback((id: string) => {
    setSolved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isSolved = useCallback((id: string) => solved.has(id), [solved]);

  const resetProgress = useCallback(() => {
    setSolved(new Set());
  }, []);

  const exportProgress = useCallback(() => {
    const save: SaveFile = {
      app: APP_ID,
      version: SAVE_FILE_VERSION,
      exportedAt: new Date().toISOString(),
      solved: [...solved].sort(),
    };
    const stamp = new Date().toISOString().slice(0, 10);
    downloadJSON(save, `dsa-drills-progress-${stamp}.json`);
  }, [solved]);

  const importProgress = useCallback(
    (file: File, mode: "merge" | "replace" = "merge"): Promise<void> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsed = JSON.parse(reader.result as string) as Partial<SaveFile>;
            if (parsed.app !== APP_ID || !Array.isArray(parsed.solved)) {
              throw new Error("This doesn't look like a DSA Drills save file.");
            }
            const importedIds = parsed.solved as string[];
            setSolved((prev) =>
              mode === "replace"
                ? new Set(importedIds)
                : new Set([...prev, ...importedIds]),
            );
            resolve();
          } catch (err) {
            reject(
              err instanceof Error
                ? err
                : new Error("Could not read save file."),
            );
          }
        };
        reader.onerror = () =>
          reject(new Error("Could not read the selected file."));
        reader.readAsText(file);
      });
    },
    [],
  );

  return {
    solved,
    markSolved,
    markUnsolved,
    toggleSolved,
    isSolved,
    resetProgress,
    exportProgress,
    importProgress,
    solvedCount: solved.size,
  };
}
