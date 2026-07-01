import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { FillBlankExercise } from "../data/types";
import { CodeLine } from "./CodeLine";
import { ExerciseWindow } from "./ExerciseWindow";

function normalizeAnswer(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function isBlankCorrect(userValue: string, accepted: string[]): boolean {
  const normalized = normalizeAnswer(userValue);
  return accepted.some((a) => normalizeAnswer(a) === normalized);
}

type TemplatePart =
  | { kind: "text"; value: string }
  | { kind: "blank"; id: string };

function parseTemplate(template: string): TemplatePart[] {
  const parts: TemplatePart[] = [];
  const regex = /\{\{(\d+)\}\}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ kind: "text", value: template.slice(lastIndex, match.index) });
    }
    parts.push({ kind: "blank", id: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < template.length) {
    parts.push({ kind: "text", value: template.slice(lastIndex) });
  }

  return parts;
}

interface FillBlankExerciseProps {
  exercise: FillBlankExercise;
  solved: boolean;
  isReview: boolean;
  isFavorite: boolean;
  onToggleReview: () => void;
  onToggleFavorite: () => void;
  onSolved: () => void;
  onUnsolved: () => void;
}

export function FillBlankExercise({
  exercise,
  solved,
  isReview,
  isFavorite,
  onToggleReview,
  onToggleFavorite,
  onSolved,
  onUnsolved,
}: FillBlankExerciseProps) {
  const blankIds = useMemo(
    () => Object.keys(exercise.answers).sort((a, b) => Number(a) - Number(b)),
    [exercise.answers],
  );

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(blankIds.map((id) => [id, ""])),
  );
  const [checked, setChecked] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const parts = useMemo(() => parseTemplate(exercise.template), [exercise.template]);

  const handleChange = useCallback((id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setChecked(false);
    setStatus(null);
  }, []);

  const handleCheck = useCallback(() => {
    const results = blankIds.map((id) =>
      isBlankCorrect(values[id] ?? "", exercise.answers[id] ?? []),
    );
    const allCorrect = results.every(Boolean);
    setChecked(true);

    if (allCorrect) {
      setStatus("All blanks correct!");
      onSolved();
    } else {
      setStatus("Some blanks are off — check the highlighted inputs.");
    }
  }, [blankIds, values, exercise.answers, onSolved]);

  const handleShowSolution = useCallback(() => {
    const solution: Record<string, string> = {};
    for (const id of blankIds) {
      solution[id] = exercise.answers[id]?.[0] ?? "";
    }
    setValues(solution);
    setShowSolution(true);
    setChecked(false);
    setStatus("Solution shown — hit Clear to try again.");
  }, [blankIds, exercise.answers]);

  const handleClear = useCallback(() => {
    setValues(Object.fromEntries(blankIds.map((id) => [id, ""])));
    setShowSolution(false);
    setChecked(false);
    setStatus(null);
  }, [blankIds]);

  const handleExerciseReset = useCallback(() => {
    onUnsolved();
    setValues(Object.fromEntries(blankIds.map((id) => [id, ""])));
    setChecked(false);
    setShowSolution(false);
    setStatus(null);
  }, [blankIds, onUnsolved]);

  function blankFeedback(id: string): "correct" | "incorrect" | null {
    if (!checked) return null;
    return isBlankCorrect(values[id] ?? "", exercise.answers[id] ?? [])
      ? "correct"
      : "incorrect";
  }

  function renderLine(lineParts: TemplatePart[], lineKey: number): ReactNode {
    return (
      <div key={lineKey} className="flex flex-wrap items-baseline gap-x-0.5">
        {lineParts.map((part, i) => {
          if (part.kind === "text") {
            if (!part.value) return null;
            return <CodeLine key={i} line={part.value} />;
          }

          const feedback = blankFeedback(part.id);
          const borderClass =
            feedback === "correct"
              ? "border-correct/60 bg-correct/10"
              : feedback === "incorrect"
                ? "border-incorrect/60 bg-incorrect/10"
                : "border-border bg-ink/60";

          return (
            <input
              key={part.id}
              type="text"
              value={values[part.id] ?? ""}
              onChange={(e) => handleChange(part.id, e.target.value)}
              disabled={showSolution || solved}
              aria-label={`Blank ${part.id}`}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              className={`inline-block min-w-[4rem] max-w-full rounded border px-2 py-0.5 font-mono text-sm text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 disabled:opacity-70 ${borderClass}`}
              style={{
                width: `${Math.max(4, (values[part.id]?.length ?? 0) + 2)}ch`,
              }}
            />
          );
        })}
      </div>
    );
  }

  const lines = useMemo(() => {
    const result: TemplatePart[][] = [[]];
    for (const part of parts) {
      if (part.kind === "text" && part.value.includes("\n")) {
        const segments = part.value.split("\n");
        segments.forEach((seg, idx) => {
          if (idx > 0) result.push([]);
          if (seg) result[result.length - 1].push({ kind: "text", value: seg });
        });
      } else {
        result[result.length - 1].push(part);
      }
    }
    return result;
  }, [parts]);

  return (
    <ExerciseWindow
      file={exercise.file}
      category={exercise.category}
      title={exercise.title}
      note={exercise.note}
      solved={solved}
      isReview={isReview}
      isFavorite={isFavorite}
      onToggleReview={onToggleReview}
      onToggleFavorite={onToggleFavorite}
      onReset={solved ? handleExerciseReset : undefined}
    >
      {exercise.given.length > 0 && (
        <div className="rounded-lg border border-border bg-ink/50 p-4 mb-3 space-y-1">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted mb-2">
            Given (already defined)
          </p>
          {exercise.given.map((line, i) => (
            <div key={i}>
              <CodeLine line={line} />
            </div>
          ))}
        </div>
      )}
      <div className="rounded-lg border border-border bg-panel-2 p-4 space-y-1 overflow-x-auto">
        {lines.map((lineParts, i) => renderLine(lineParts, i))}
      </div>

      {status && (
        <p
          className={`mt-4 text-sm ${
            checked &&
            blankIds.every((id) =>
              isBlankCorrect(values[id] ?? "", exercise.answers[id] ?? []),
            )
              ? "text-correct"
              : "text-muted"
          }`}
          role="status"
        >
          {status}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCheck}
          disabled={showSolution}
          className="rounded-lg bg-amber/20 border border-amber/40 px-4 py-2 text-sm font-medium text-amber hover:bg-amber/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check
        </button>
        {showSolution ? (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-amber/40 bg-amber/10 px-4 py-2 text-sm font-medium text-amber hover:bg-amber/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60"
          >
            Clear
          </button>
        ) : (
          <button
            type="button"
            onClick={handleShowSolution}
            className="rounded-lg border border-border bg-panel-2 px-4 py-2 text-sm font-medium text-muted hover:text-text hover:bg-border/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60"
          >
            Show solution
          </button>
        )}
      </div>
    </ExerciseWindow>
  );
}
