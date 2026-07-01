import { EXERCISE_SECTIONS, EXERCISES, ALL_EXERCISES } from "./data";
import type { Category, Exercise, TabId } from "./data/types";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { ReorderExercise } from "./components/ReorderExercise";
import { FillBlankExercise } from "./components/FillBlankExercise";
import { ExerciseGroupSection } from "./components/ExerciseGroupSection";
import { useProgress } from "./hooks/useProgress";
import { useExerciseTags } from "./hooks/useExerciseTags";
import { useCallback, useMemo, useState } from "react";

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
) {
  return exercises.map((exercise) => (
    <ExerciseCard
      key={exercise.id}
      exercise={exercise}
      solved={props.solved.has(exercise.id)}
      isReview={props.isReview(exercise.id)}
      isFavorite={props.isFavorite(exercise.id)}
      onToggleReview={() => props.toggleReview(exercise.id)}
      onToggleFavorite={() => props.toggleFavorite(exercise.id)}
      onSolved={() => props.markSolved(exercise.id)}
      onUnsolved={() => props.markUnsolved(exercise.id)}
    />
  ));
}

function GroupedCategoryPanel({
  category,
  active,
  ...props
}: PanelProps & { category: "ds" | "algo"; active: boolean }) {
  const sections = EXERCISE_SECTIONS[category];

  return (
    <section
      role="tabpanel"
      hidden={!active}
      aria-hidden={!active}
      className="space-y-10"
    >
      {sections.map((section) => {
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
            {renderExerciseCards(section.exercises, props)}
          </ExerciseGroupSection>
        );
      })}
    </section>
  );
}

function CategoryPanel({
  category,
  active,
  ...props
}: PanelProps & { category: Category; active: boolean }) {
  const exercises = EXERCISES[category];

  return (
    <section
      role="tabpanel"
      hidden={!active}
      aria-hidden={!active}
      className="space-y-6"
    >
      {renderExerciseCards(exercises, props)}
    </section>
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
    setResetKey((k) => k + 1);
  }, [resetProgress]);

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
          onChange={setActiveTab}
          solved={solved}
          reviewCount={reviewCount}
          favoritesCount={favoritesCount}
        />
        <GroupedCategoryPanel
          key={`ds-${resetKey}`}
          category="ds"
          active={activeTab === "ds"}
          {...panelProps}
        />
        <GroupedCategoryPanel
          key={`algo-${resetKey}`}
          category="algo"
          active={activeTab === "algo"}
          {...panelProps}
        />
        <CategoryPanel
          key={`oneliner-${resetKey}`}
          category="oneliner"
          active={activeTab === "oneliner"}
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
      </div>
    </div>
  );
}
