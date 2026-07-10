import { EXERCISE_SECTIONS, ALL_EXERCISES } from "./data";
import type { Category, Exercise, SolveStatus, TabId } from "./data/types";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { SectionFilter } from "./components/SectionFilter";
import { StatusFilter } from "./components/StatusFilter";
import { ReorderExercise } from "./components/ReorderExercise";
import { FillBlankExercise } from "./components/FillBlankExercise";
import { ExerciseGroupSection } from "./components/ExerciseGroupSection";
import { CheatSheetPage } from "./components/CheatSheetPage";
import { useProgress } from "./hooks/useProgress";
import { useExerciseTags } from "./hooks/useExerciseTags";
import { useCallback, useEffect, useMemo, useState } from "react";

const HIGHLIGHT_DURATION_MS = 2500;

function matchesStatus(
  exercise: Exercise,
  status: SolveStatus,
  solved: Set<string>,
): boolean {
  if (status === "unsolved") return !solved.has(exercise.id);
  if (status === "solved") return solved.has(exercise.id);
  return true;
}

function getFilteredPool(
  category: Category,
  sectionFilter: string | "all",
  statusFilter: SolveStatus,
  solved: Set<string>,
): Exercise[] {
  const sections = EXERCISE_SECTIONS[category];
  const relevantSections =
    sectionFilter === "all"
      ? sections
      : sections.filter((s) => s.id === sectionFilter);
  return relevantSections
    .flatMap((s) => s.exercises)
    .filter((e) => matchesStatus(e, statusFilter, solved));
}

type PanelProps = {
  solved: Set<string>;
  isReview: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  toggleReview: (id: string) => void;
  toggleFavorite: (id: string) => void;
  markSolved: (id: string) => void;
  markUnsolved: (id: string) => void;
};

function ExerciseCard({
  exercise,
  solved,
  isReview,
  isFavorite,
  onToggleReview,
  onToggleFavorite,
  onSolved,
  onUnsolved,
}: {
  exercise: Exercise;
  solved: boolean;
  isReview: boolean;
  isFavorite: boolean;
  onToggleReview: () => void;
  onToggleFavorite: () => void;
  onSolved: () => void;
  onUnsolved: () => void;
}) {
  const tagProps = {
    isReview,
    isFavorite,
    onToggleReview,
    onToggleFavorite,
  };

  if (exercise.type === "reorder") {
    return (
      <ReorderExercise
        exercise={exercise}
        solved={solved}
        onSolved={onSolved}
        onUnsolved={onUnsolved}
        {...tagProps}
      />
    );
  }

  return (
    <FillBlankExercise
      exercise={exercise}
      solved={solved}
      onSolved={onSolved}
      onUnsolved={onUnsolved}
      {...tagProps}
    />
  );
}

function renderExerciseCards(
  exercises: Exercise[],
  props: PanelProps,
  highlightedId: string | null = null,
) {
  return exercises.map((exercise) => (
    <div
      key={exercise.id}
      id={`exercise-${exercise.id}`}
      className={
        highlightedId === exercise.id
          ? "rounded-xl ring-2 ring-amber/70 ring-offset-2 ring-offset-ink transition-shadow motion-reduce:transition-none"
          : undefined
      }
    >
      <ExerciseCard
        exercise={exercise}
        solved={props.solved.has(exercise.id)}
        isReview={props.isReview(exercise.id)}
        isFavorite={props.isFavorite(exercise.id)}
        onToggleReview={() => props.toggleReview(exercise.id)}
        onToggleFavorite={() => props.toggleFavorite(exercise.id)}
        onSolved={() => props.markSolved(exercise.id)}
        onUnsolved={() => props.markUnsolved(exercise.id)}
      />
    </div>
  ));
}

function GroupedCategoryPanel({
  category,
  active,
  sectionFilter,
  statusFilter,
  highlightedId,
  ...props
}: PanelProps & {
  category: Category;
  active: boolean;
  sectionFilter: string | "all";
  statusFilter: SolveStatus;
  highlightedId: string | null;
}) {
  const sections = EXERCISE_SECTIONS[category];
  const visibleSections = useMemo(() => {
    const bySection =
      sectionFilter === "all"
        ? sections
        : sections.filter((section) => section.id === sectionFilter);
    return bySection
      .map((section) => ({
        section,
        visibleExercises: section.exercises.filter((e) =>
          matchesStatus(e, statusFilter, props.solved),
        ),
      }))
      .filter(({ visibleExercises }) => visibleExercises.length > 0);
  }, [sections, sectionFilter, statusFilter, props.solved]);

  return (
    <section
      role="tabpanel"
      hidden={!active}
      aria-hidden={!active}
      className="space-y-10"
    >
      {visibleSections.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-panel/50 px-6 py-12 text-center">
          <p className="text-sm font-medium text-text">
            {statusFilter === "unsolved"
              ? "Nothing unsolved here — nice work!"
              : statusFilter === "solved"
                ? "No solved questions in this filter yet"
                : "No questions match this filter"}
          </p>
        </div>
      ) : (
        visibleSections.map(({ section, visibleExercises }) => {
          const solvedInGroup = section.exercises.filter((e) =>
            props.solved.has(e.id),
          ).length;
          return (
            <ExerciseGroupSection
              key={section.id}
              label={section.label}
              count={solvedInGroup}
              total={section.exercises.length}
            >
              {renderExerciseCards(visibleExercises, props, highlightedId)}
            </ExerciseGroupSection>
          );
        })
      )}
    </section>
  );
}

function CategorySectionFilters({
  category,
  active,
  sectionFilter,
  onSectionFilterChange,
  solved,
}: {
  category: Category;
  active: boolean;
  sectionFilter: string | "all";
  onSectionFilterChange: (id: string | "all") => void;
  solved: Set<string>;
}) {
  if (!active) return null;

  return (
    <SectionFilter
      category={category}
      sections={EXERCISE_SECTIONS[category]}
      active={sectionFilter}
      onChange={onSectionFilterChange}
      solved={solved}
    />
  );
}

function CategoryToolbar({
  category,
  active,
  sectionFilter,
  statusFilter,
  onStatusFilterChange,
  onRandom,
  solved,
}: {
  category: Category;
  active: boolean;
  sectionFilter: string | "all";
  statusFilter: SolveStatus;
  onStatusFilterChange: (status: SolveStatus) => void;
  onRandom: (category: Category) => void;
  solved: Set<string>;
}) {
  const pool = useMemo(
    () => getFilteredPool(category, sectionFilter, statusFilter, solved),
    [category, sectionFilter, statusFilter, solved],
  );

  if (!active) return null;

  return (
    <StatusFilter
      active={statusFilter}
      onChange={onStatusFilterChange}
      onRandom={() => onRandom(category)}
      randomDisabled={pool.length === 0}
    />
  );
}

function TaggedPanel({
  active,
  taggedIds,
  emptyTitle,
  emptyHint,
  ...props
}: PanelProps & {
  active: boolean;
  taggedIds: Set<string>;
  emptyTitle: string;
  emptyHint: string;
}) {
  const exercises = useMemo(
    () => ALL_EXERCISES.filter((e) => taggedIds.has(e.id)),
    [taggedIds],
  );

  return (
    <section
      role="tabpanel"
      hidden={!active}
      aria-hidden={!active}
      className="space-y-6"
    >
      {exercises.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-panel/50 px-6 py-12 text-center">
          <p className="text-sm font-medium text-text">{emptyTitle}</p>
          <p className="mt-2 text-sm text-muted max-w-sm mx-auto">{emptyHint}</p>
        </div>
      ) : (
        renderExerciseCards(exercises, props)
      )}
    </section>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("ds");
  const [sectionFilter, setSectionFilter] = useState<string | "all">("all");
  const [statusFilter, setStatusFilter] = useState<SolveStatus>("all");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const {
    solved,
    markSolved,
    markUnsolved,
    resetProgress,
    exportProgress,
    importProgress,
    solvedCount,
  } = useProgress();
  const {
    review,
    favorites,
    toggleReview,
    toggleFavorite,
    isReview,
    isFavorite,
    reviewCount,
    favoritesCount,
  } = useExerciseTags();

  const handleResetAll = useCallback(() => {
    resetProgress();
    setActiveTab("ds");
    setSectionFilter("all");
    setStatusFilter("all");
    setResetKey((k) => k + 1);
  }, [resetProgress]);

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    setSectionFilter("all");
    setStatusFilter("all");
  }, []);

  useEffect(() => {
    if (
      activeTab !== "ds" &&
      activeTab !== "algo" &&
      activeTab !== "oneliner"
    ) {
      return;
    }
    const sections = EXERCISE_SECTIONS[activeTab];
    if (
      sectionFilter !== "all" &&
      !sections.some((section) => section.id === sectionFilter)
    ) {
      setSectionFilter("all");
    }
  }, [activeTab, sectionFilter]);

  useEffect(() => {
    if (!highlightedId) return;
    const timer = setTimeout(() => setHighlightedId(null), HIGHLIGHT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [highlightedId]);

  const handleRandom = useCallback(
    (category: Category) => {
      const pool = getFilteredPool(category, sectionFilter, statusFilter, solved);
      if (pool.length === 0) return;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      setHighlightedId(pick.id);
      requestAnimationFrame(() => {
        document
          .getElementById(`exercise-${pick.id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    },
    [sectionFilter, statusFilter, solved],
  );

  const panelProps: PanelProps = {
    solved,
    isReview,
    isFavorite,
    toggleReview,
    toggleFavorite,
    markSolved,
    markUnsolved,
  };

  return (
    <div className="min-h-screen bg-ink dot-grid">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <Header
          solvedCount={solvedCount}
          onExport={exportProgress}
          onImport={importProgress}
          onResetAll={handleResetAll}
        />
        <Tabs
          active={activeTab}
          onChange={handleTabChange}
          solved={solved}
          reviewCount={reviewCount}
          favoritesCount={favoritesCount}
        />
        <CategorySectionFilters
          category="ds"
          active={activeTab === "ds"}
          sectionFilter={sectionFilter}
          onSectionFilterChange={setSectionFilter}
          solved={solved}
        />
        <CategoryToolbar
          category="ds"
          active={activeTab === "ds"}
          sectionFilter={sectionFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onRandom={handleRandom}
          solved={solved}
        />
        <CategorySectionFilters
          category="algo"
          active={activeTab === "algo"}
          sectionFilter={sectionFilter}
          onSectionFilterChange={setSectionFilter}
          solved={solved}
        />
        <CategoryToolbar
          category="algo"
          active={activeTab === "algo"}
          sectionFilter={sectionFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onRandom={handleRandom}
          solved={solved}
        />
        <CategorySectionFilters
          category="oneliner"
          active={activeTab === "oneliner"}
          sectionFilter={sectionFilter}
          onSectionFilterChange={setSectionFilter}
          solved={solved}
        />
        <CategoryToolbar
          category="oneliner"
          active={activeTab === "oneliner"}
          sectionFilter={sectionFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onRandom={handleRandom}
          solved={solved}
        />
        <GroupedCategoryPanel
          key={`ds-${resetKey}`}
          category="ds"
          active={activeTab === "ds"}
          sectionFilter={sectionFilter}
          statusFilter={statusFilter}
          highlightedId={highlightedId}
          {...panelProps}
        />
        <GroupedCategoryPanel
          key={`algo-${resetKey}`}
          category="algo"
          active={activeTab === "algo"}
          sectionFilter={sectionFilter}
          statusFilter={statusFilter}
          highlightedId={highlightedId}
          {...panelProps}
        />
        <GroupedCategoryPanel
          key={`oneliner-${resetKey}`}
          category="oneliner"
          active={activeTab === "oneliner"}
          sectionFilter={sectionFilter}
          statusFilter={statusFilter}
          highlightedId={highlightedId}
          {...panelProps}
        />
        <TaggedPanel
          key={`review-${resetKey}`}
          active={activeTab === "review"}
          taggedIds={review}
          emptyTitle="Nothing marked for review yet"
          emptyHint='Use the review button on any exercise card to add it here. Click review again to remove it.'
          {...panelProps}
        />
        <TaggedPanel
          key={`favorites-${resetKey}`}
          active={activeTab === "favorites"}
          taggedIds={favorites}
          emptyTitle="No favorites yet"
          emptyHint="Tap the ☆ on any exercise to save it here. Tap ★ to remove it."
          {...panelProps}
        />
        <CheatSheetPage active={activeTab === "cheatsheet"} />
      </div>
    </div>
  );
}
