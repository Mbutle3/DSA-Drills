import type { Exercise, ExerciseSection } from "../data/types";
import { CATEGORY_ACCENT, type Category } from "../data/types";

const ACCENT_STYLES: Record<string, string> = {
  sky: "data-[active=true]:border-sky data-[active=true]:text-sky data-[active=true]:bg-sky/10",
  violet:
    "data-[active=true]:border-violet data-[active=true]:text-violet data-[active=true]:bg-violet/10",
  amber:
    "data-[active=true]:border-amber data-[active=true]:text-amber data-[active=true]:bg-amber/10",
};

interface SectionFilterProps<G extends string> {
  category: Category;
  sections: ExerciseSection<G>[];
  active: G | "all";
  onChange: (id: G | "all") => void;
  solved: Set<string>;
}

function countSolved(exercises: Exercise[], solved: Set<string>): number {
  return exercises.filter((e) => solved.has(e.id)).length;
}

export function SectionFilter<G extends string>({
  category,
  sections,
  active,
  onChange,
  solved,
}: SectionFilterProps<G>) {
  const accent = CATEGORY_ACCENT[category];
  const activeClass = ACCENT_STYLES[accent] ?? ACCENT_STYLES.sky;
  const allTotal = sections.reduce((n, s) => n + s.exercises.length, 0);
  const allSolved = sections.reduce(
    (n, s) => n + countSolved(s.exercises, solved),
    0,
  );

  const pillClass = `rounded-md border border-border bg-panel px-2.5 py-1.5 text-xs font-medium text-muted transition-colors motion-reduce:transition-none hover:border-border hover:bg-panel-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-ink ${activeClass}`;

  return (
    <div
      className="flex flex-wrap gap-1.5 mb-6"
      role="group"
      aria-label="Filter by topic"
    >
      <button
        type="button"
        data-active={active === "all"}
        aria-pressed={active === "all"}
        onClick={() => onChange("all")}
        className={pillClass}
      >
        All
        <span className="ml-1.5 font-mono text-[10px] opacity-75">
          {allSolved}/{allTotal}
        </span>
      </button>
      {sections.map((section) => {
        const solvedInSection = countSolved(section.exercises, solved);
        return (
          <button
            key={section.id}
            type="button"
            data-active={active === section.id}
            aria-pressed={active === section.id}
            onClick={() => onChange(section.id)}
            className={pillClass}
          >
            {section.label}
            <span className="ml-1.5 font-mono text-[10px] opacity-75">
              {solvedInSection}/{section.exercises.length}
            </span>
          </button>
        );
      })}
    </div>
  );
}
