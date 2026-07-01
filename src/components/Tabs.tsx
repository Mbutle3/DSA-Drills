import { EXERCISES } from "../data";
import { TAB_ACCENT, TAB_LABELS, type TabId } from "../data/types";

const ACCENT_RING: Record<string, string> = {
  sky: "focus-visible:ring-sky/60 data-[active=true]:border-sky data-[active=true]:text-sky",
  violet:
    "focus-visible:ring-violet/60 data-[active=true]:border-violet data-[active=true]:text-violet",
  amber:
    "focus-visible:ring-amber/60 data-[active=true]:border-amber data-[active=true]:text-amber",
  review:
    "focus-visible:ring-review/60 data-[active=true]:border-review data-[active=true]:text-review",
  favorite:
    "focus-visible:ring-favorite/60 data-[active=true]:border-favorite data-[active=true]:text-favorite",
  emerald:
    "focus-visible:ring-emerald/60 data-[active=true]:border-emerald data-[active=true]:text-emerald",
};

const TABS: TabId[] = ["ds", "algo", "oneliner", "cheatsheet", "review", "favorites"];

interface TabsProps {
  active: TabId;
  onChange: (tab: TabId) => void;
  solved: Set<string>;
  reviewCount: number;
  favoritesCount: number;
}

export function Tabs({
  active,
  onChange,
  solved,
  reviewCount,
  favoritesCount,
}: TabsProps) {
  return (
    <nav
      className="flex flex-wrap gap-2 mb-6"
      role="tablist"
      aria-label="Exercise categories"
    >
      {TABS.map((tab) => {
        const accent = TAB_ACCENT[tab];
        const ringClass = ACCENT_RING[accent] ?? ACCENT_RING.sky;

        let countLabel: string | null;
        if (tab === "review") {
          countLabel = String(reviewCount);
        } else if (tab === "favorites") {
          countLabel = String(favoritesCount);
        } else if (tab === "cheatsheet") {
          countLabel = null;
        } else {
          const total = EXERCISES[tab].length;
          const count = EXERCISES[tab].filter((e) => solved.has(e.id)).length;
          countLabel = `${count}/${total}`;
        }

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active === tab}
            data-active={active === tab}
            onClick={() => onChange(tab)}
            className={`rounded-lg border border-border bg-panel px-4 py-2.5 text-sm font-medium text-muted transition-colors motion-reduce:transition-none hover:border-border hover:bg-panel-2 focus-visible:outline-none focus-visible:ring-2 ${ringClass} data-[active=true]:bg-panel-2`}
          >
            {TAB_LABELS[tab]}
            {countLabel !== null && (
              <span className="ml-2 font-mono text-xs opacity-80">{countLabel}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
