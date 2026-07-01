import { useCallback, useState } from "react";

const STORAGE_KEY = "dsa-drills:solved";

function readSolved(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return new Set();
  }
}

function writeSolved(ids: Set<string>): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useProgress() {
  const [solved, setSolved] = useState<Set<string>>(() => readSolved());

  const markSolved = useCallback((id: string) => {
    setSolved((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      writeSolved(next);
      return next;
    });
  }, []);

  const isSolved = useCallback((id: string) => solved.has(id), [solved]);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSolved(new Set());
  }, []);

  return { solved, markSolved, isSolved, reset, solvedCount: solved.size };
}
