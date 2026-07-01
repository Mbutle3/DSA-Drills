import type { ReactNode } from "react";

interface ExerciseGroupSectionProps {
  label: string;
  count: number;
  total: number;
  children: ReactNode;
}

export function ExerciseGroupSection({
  label,
  count,
  total,
  children,
}: ExerciseGroupSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
        <h2 className="font-sans text-sm font-semibold text-text tracking-wide">
          {label}
        </h2>
        <span className="font-mono text-xs text-muted shrink-0">
          {count}/{total} solved
        </span>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
