import type { ReactNode } from "react";
import {
  CATEGORY_ACCENT,
  CATEGORY_LABELS,
  type Category,
} from "../data/types";

const ACCENT_BG: Record<string, string> = {
  sky: "bg-sky/15 text-sky border-sky/30",
  violet: "bg-violet/15 text-violet border-violet/30",
  amber: "bg-amber/15 text-amber border-amber/30",
};

interface ExerciseWindowProps {
  file: string;
  category: Category;
  title: string;
  note: string;
  solved?: boolean;
  isReview?: boolean;
  isFavorite?: boolean;
  onToggleReview?: () => void;
  onToggleFavorite?: () => void;
  onReset?: () => void;
  children: ReactNode;
}

const tagBtnClass =
  "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/60";

export function ExerciseWindow({
  file,
  category,
  title,
  note,
  solved = false,
  isReview = false,
  isFavorite = false,
  onToggleReview,
  onToggleFavorite,
  onReset,
  children,
}: ExerciseWindowProps) {
  const accent = CATEGORY_ACCENT[category];
  const pillClass = ACCENT_BG[accent] ?? ACCENT_BG.sky;

  return (
    <article
      className={`rounded-xl border bg-panel overflow-hidden transition-colors motion-reduce:transition-none ${
        solved ? "border-correct/40" : "border-border"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 border-b border-border bg-panel-2 px-4 py-2.5">
        <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs text-muted truncate min-w-0 flex-1">
          {file}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {onToggleReview && (
            <button
              type="button"
              onClick={onToggleReview}
              aria-pressed={isReview}
              title={isReview ? "Remove from review" : "Mark for review"}
              className={`${tagBtnClass} ${
                isReview
                  ? "bg-review/20 text-review border border-review/40"
                  : "text-muted hover:text-review border border-transparent hover:border-review/30"
              }`}
            >
              review
            </button>
          )}
          {onToggleFavorite && (
            <button
              type="button"
              onClick={onToggleFavorite}
              aria-pressed={isFavorite}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className={`${tagBtnClass} ${
                isFavorite
                  ? "text-favorite"
                  : "text-muted hover:text-favorite"
              }`}
            >
              {isFavorite ? "★" : "☆"}
            </button>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${pillClass}`}
        >
          {CATEGORY_LABELS[category]}
        </span>
        {solved && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="shrink-0 text-xs text-correct hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/60 rounded whitespace-nowrap"
            title="Reset this exercise"
          >
            ✓ solved · reset
          </button>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <header className="mb-4">
          <h3 className="font-sans text-base font-semibold text-text">{title}</h3>
          <p className="mt-1 text-sm text-muted leading-relaxed">{note}</p>
        </header>
      {children}
      </div>
    </article>
  );
}
