import { EXERCISES } from "../data";
import {
  CATEGORY_ACCENT,
  CATEGORY_LABELS,
  type Category,
} from "../data/types";

const ACCENT_RING: Record<string, string> = {
  sky: "focus-visible:ring-sky/60 data-[active=true]:border-sky data-[active=true]:text-sky",
  violet:
    "focus-visible:ring-violet/60 data-[active=true]:border-violet data-[active=true]:text-violet",
  amber:
    "focus-visible:ring-amber/60 data-[active=true]:border-amber data-[active=true]:text-amber",
};

const CATEGORIES: Category[] = ["ds", "algo", "oneliner"];

interface TabsProps {
  active: Category;
  onChange: (category: Category) => void;
  solved: Set<string>;
}

export function Tabs({ active, onChange, solved }: TabsProps) {
  return (
    <nav
      className="flex flex-wrap gap-2 mb-6"
      role="tablist"
      aria-label="Exercise categories"
    >
      {CATEGORIES.map((cat) => {
        const total = EXERCISES[cat].length;
        const count = EXERCISES[cat].filter((e) => solved.has(e.id)).length;
        const accent = CATEGORY_ACCENT[cat];
        const ringClass = ACCENT_RING[accent] ?? ACCENT_RING.sky;

        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            data-active={active === cat}
            onClick={() => onChange(cat)}
            className={`rounded-lg border border-border bg-panel px-4 py-2.5 text-sm font-medium text-muted transition-colors motion-reduce:transition-none hover:border-border hover:bg-panel-2 focus-visible:outline-none focus-visible:ring-2 ${ringClass} data-[active=true]:bg-panel-2`}
          >
            {CATEGORY_LABELS[cat]}
            <span className="ml-2 font-mono text-xs opacity-80">
              {count}/{total}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
