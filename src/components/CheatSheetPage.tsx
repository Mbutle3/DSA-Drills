import { useMemo, useState } from "react";
import {
  CHEAT_SHEET_PATTERN_PICKER,
  CHEAT_SHEET_SECTIONS,
} from "../data/cheatSheet";
import {
  CATEGORY_ACCENT,
  CATEGORY_LABELS,
  type Category,
  type CheatSheetSection,
} from "../data/types";

const CATEGORY_ACCENT_CLASS: Record<string, string> = {
  sky: "border-sky/30 bg-sky/10 text-sky",
  violet: "border-violet/30 bg-violet/10 text-violet",
  amber: "border-amber/30 bg-amber/10 text-amber",
};

const MNEMONIC_ACCENT: Record<string, string> = {
  sky: "border-sky/25 bg-sky/5",
  violet: "border-violet/25 bg-violet/5",
  amber: "border-amber/25 bg-amber/5",
};

type CategoryFilter = Category | "all";

interface CheatSheetPageProps {
  active: boolean;
}

function CheatSheetEntryCard({
  accent,
  entry,
}: {
  accent: string;
  entry: CheatSheetSection["entries"][number];
}) {
  return (
    <article className="rounded-lg border border-border bg-panel p-4 space-y-3">
      <h4 className="font-sans text-sm font-semibold text-text">{entry.title}</h4>

      <div
        className={`rounded-md border px-3 py-2 ${MNEMONIC_ACCENT[accent] ?? MNEMONIC_ACCENT.sky}`}
      >
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted mb-1">
          Mnemonic
        </p>
        <p className="text-sm text-text leading-relaxed italic">{entry.mnemonic}</p>
      </div>

      <div>
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted mb-1">
          Reach for this when
        </p>
        <p className="text-sm text-muted leading-relaxed">{entry.when}</p>
      </div>

      <ul className="space-y-1.5">
        {entry.points.map((point) => (
          <li key={point} className="flex gap-2 text-sm text-muted leading-relaxed">
            <span className="text-text shrink-0" aria-hidden="true">
              ·
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {entry.snippet && (
        <pre className="rounded-md border border-border bg-panel-2 px-3 py-2 overflow-x-auto">
          <code className="font-mono text-xs text-text">{entry.snippet}</code>
        </pre>
      )}
    </article>
  );
}

function CategoryFilterBar({
  active,
  onChange,
}: {
  active: CategoryFilter;
  onChange: (filter: CategoryFilter) => void;
}) {
  const options: { id: CategoryFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "ds", label: CATEGORY_LABELS.ds },
    { id: "algo", label: CATEGORY_LABELS.algo },
    { id: "oneliner", label: CATEGORY_LABELS.oneliner },
  ];

  const pillClass =
    "rounded-md border border-border bg-panel px-2.5 py-1.5 text-xs font-medium text-muted transition-colors motion-reduce:transition-none hover:bg-panel-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/60 data-[active=true]:border-emerald data-[active=true]:text-emerald data-[active=true]:bg-emerald/10";

  return (
    <div className="flex flex-wrap gap-1.5 mb-4" role="group" aria-label="Filter cheat sheet">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          data-active={active === option.id}
          aria-pressed={active === option.id}
          onClick={() => onChange(option.id)}
          className={pillClass}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function CheatSheetPage({ active }: CheatSheetPageProps) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [sectionFilter, setSectionFilter] = useState<string | "all">("all");

  const filteredSections = useMemo(() => {
    let sections = CHEAT_SHEET_SECTIONS;
    if (categoryFilter !== "all") {
      sections = sections.filter((s) => s.category === categoryFilter);
    }
    if (sectionFilter !== "all") {
      sections = sections.filter((s) => s.id === sectionFilter);
    }
    return sections;
  }, [categoryFilter, sectionFilter]);

  const sectionOptions = useMemo(() => {
    const pool =
      categoryFilter === "all"
        ? CHEAT_SHEET_SECTIONS
        : CHEAT_SHEET_SECTIONS.filter((s) => s.category === categoryFilter);
    return pool;
  }, [categoryFilter]);

  const handleCategoryChange = (next: CategoryFilter) => {
    setCategoryFilter(next);
    setSectionFilter("all");
  };

  return (
    <section
      role="tabpanel"
      hidden={!active}
      aria-hidden={!active}
      className="space-y-8"
    >
      <div className="rounded-xl border border-border bg-panel p-5 sm:p-6">
        <h2 className="font-sans text-lg font-semibold text-text">Pattern picker</h2>
        <p className="mt-1 text-sm text-muted leading-relaxed">
          When you recognize the signal, reach for the matching pattern.
        </p>
        <dl className="mt-4 grid gap-2 sm:grid-cols-2">
          {CHEAT_SHEET_PATTERN_PICKER.map((item) => (
            <div
              key={item.signal}
              className="rounded-lg border border-border bg-panel-2 px-3 py-2.5"
            >
              <dt className="text-xs font-medium text-text">{item.signal}</dt>
              <dd className="mt-0.5 text-xs text-emerald">{item.pattern}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <h2 className="font-sans text-lg font-semibold text-text mb-1">
          Concepts &amp; mnemonics
        </h2>
        <p className="text-sm text-muted mb-4 leading-relaxed">
          Mirrors the drill groups — use these while practicing or reviewing.
        </p>

        <CategoryFilterBar active={categoryFilter} onChange={handleCategoryChange} />

        {sectionOptions.length > 1 && (
          <div
            className="flex flex-wrap gap-1.5 mb-6"
            role="group"
            aria-label="Filter by topic"
          >
            <button
              type="button"
              data-active={sectionFilter === "all"}
              aria-pressed={sectionFilter === "all"}
              onClick={() => setSectionFilter("all")}
              className="rounded-md border border-border bg-panel px-2.5 py-1.5 text-xs font-medium text-muted transition-colors motion-reduce:transition-none hover:bg-panel-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/60 data-[active=true]:border-emerald data-[active=true]:text-emerald data-[active=true]:bg-emerald/10"
            >
              All topics
            </button>
            {sectionOptions.map((section) => (
              <button
                key={section.id}
                type="button"
                data-active={sectionFilter === section.id}
                aria-pressed={sectionFilter === section.id}
                onClick={() => setSectionFilter(section.id)}
                className="rounded-md border border-border bg-panel px-2.5 py-1.5 text-xs font-medium text-muted transition-colors motion-reduce:transition-none hover:bg-panel-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald/60 data-[active=true]:border-emerald data-[active=true]:text-emerald data-[active=true]:bg-emerald/10"
              >
                {section.label}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-10">
          {filteredSections.map((section) => {
            const accent = CATEGORY_ACCENT[section.category];
            const badgeClass =
              CATEGORY_ACCENT_CLASS[accent] ?? CATEGORY_ACCENT_CLASS.sky;

            return (
              <div key={section.id} className="space-y-4">
                <div className="border-b border-border pb-3 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-sans text-sm font-semibold text-text tracking-wide">
                      {section.label}
                    </h3>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${badgeClass}`}
                    >
                      {CATEGORY_LABELS[section.category]}
                    </span>
                  </div>
                  <p className="text-sm text-emerald italic leading-relaxed">
                    {section.groupMnemonic}
                  </p>
                </div>

                <div className="grid gap-4">
                  {section.entries.map((entry) => (
                    <CheatSheetEntryCard
                      key={entry.title}
                      accent={accent}
                      entry={entry}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
