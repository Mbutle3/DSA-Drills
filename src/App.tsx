import { useCallback, useState } from "react";
import { EXERCISES } from "./data";
import type { Category, Exercise } from "./data/types";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { ReorderExercise } from "./components/ReorderExercise";
import { FillBlankExercise } from "./components/FillBlankExercise";
import { useProgress } from "./hooks/useProgress";

function ExerciseCard({
  exercise,
  solved,
  onSolved,
  onUnsolved,
}: {
  exercise: Exercise;
  solved: boolean;
  onSolved: () => void;
  onUnsolved: () => void;
}) {
  if (exercise.type === "reorder") {
    return (
      <ReorderExercise
        exercise={exercise}
        solved={solved}
        onSolved={onSolved}
        onUnsolved={onUnsolved}
      />
    );
  }

  return (
    <FillBlankExercise
      exercise={exercise}
      solved={solved}
      onSolved={onSolved}
      onUnsolved={onUnsolved}
    />
  );
}

function CategoryPanel({
  category,
  active,
  solved,
  markSolved,
  markUnsolved,
}: {
  category: Category;
  active: boolean;
  solved: Set<string>;
  markSolved: (id: string) => void;
  markUnsolved: (id: string) => void;
}) {
  const exercises = EXERCISES[category];

  return (
    <section
      role="tabpanel"
      hidden={!active}
      aria-hidden={!active}
      className="space-y-6"
    >
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          solved={solved.has(exercise.id)}
          onSolved={() => markSolved(exercise.id)}
          onUnsolved={() => markUnsolved(exercise.id)}
        />
      ))}
    </section>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("ds");
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

  const handleResetAll = useCallback(() => {
    resetProgress();
    setActiveCategory("ds");
    setResetKey((k) => k + 1);
  }, [resetProgress]);

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
          active={activeCategory}
          onChange={setActiveCategory}
          solved={solved}
        />
        <CategoryPanel
          key={`ds-${resetKey}`}
          category="ds"
          active={activeCategory === "ds"}
          solved={solved}
          markSolved={markSolved}
          markUnsolved={markUnsolved}
        />
        <CategoryPanel
          key={`algo-${resetKey}`}
          category="algo"
          active={activeCategory === "algo"}
          solved={solved}
          markSolved={markSolved}
          markUnsolved={markUnsolved}
        />
        <CategoryPanel
          key={`oneliner-${resetKey}`}
          category="oneliner"
          active={activeCategory === "oneliner"}
          solved={solved}
          markSolved={markSolved}
          markUnsolved={markUnsolved}
        />
      </div>
    </div>
  );
}
