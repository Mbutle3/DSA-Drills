import { useCallback, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReorderExercise } from "../data/types";
import { CodeLine } from "./CodeLine";
import { ExerciseWindow } from "./ExerciseWindow";

function shuffleIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  if (length > 1 && indices.every((v, i) => v === i)) {
    [indices[0], indices[1]] = [indices[1], indices[0]];
  }
  return indices;
}

function isCorrectOrder(order: number[]): boolean {
  return order.every((lineIndex, position) => lineIndex === position);
}

interface SortableLineProps {
  id: number;
  line: string;
  lineNumber: number;
  feedback: "correct" | "incorrect" | null;
  disabled: boolean;
}

function SortableLine({
  id,
  line,
  lineNumber,
  feedback,
  disabled,
}: SortableLineProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const borderClass =
    feedback === "correct"
      ? "border-correct/50 bg-correct/10"
      : feedback === "incorrect"
        ? "border-incorrect/50 bg-incorrect/10"
        : "border-border bg-panel-2";

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-3 rounded-lg border px-3 py-2 ${borderClass} ${
        isDragging ? "z-10 opacity-90 shadow-lg" : ""
      } ${disabled ? "opacity-70" : ""}`}
    >
      <button
        type="button"
        className="mt-0.5 shrink-0 cursor-grab touch-none rounded p-1 text-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/60 active:cursor-grabbing disabled:cursor-default disabled:opacity-50"
        aria-label={`Drag line ${lineNumber}`}
        disabled={disabled}
        {...attributes}
        {...listeners}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <circle cx="4" cy="3" r="1.2" />
          <circle cx="10" cy="3" r="1.2" />
          <circle cx="4" cy="7" r="1.2" />
          <circle cx="10" cy="7" r="1.2" />
          <circle cx="4" cy="11" r="1.2" />
          <circle cx="10" cy="11" r="1.2" />
        </svg>
      </button>
      <span className="shrink-0 font-mono text-xs text-muted select-none w-5 text-right">
        {lineNumber}
      </span>
      <div className="min-w-0 flex-1 overflow-x-auto">
        <CodeLine line={line} />
      </div>
    </li>
  );
}

interface ReorderExerciseProps {
  exercise: ReorderExercise;
  solved: boolean;
  onSolved: () => void;
}

export function ReorderExercise({
  exercise,
  solved,
  onSolved,
}: ReorderExerciseProps) {
  const [order, setOrder] = useState<number[]>(() =>
    shuffleIndices(exercise.lines.length),
  );
  const [checked, setChecked] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrder((prev) => {
      const oldIndex = prev.indexOf(active.id as number);
      const newIndex = prev.indexOf(over.id as number);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
    setChecked(false);
    setStatus(null);
  }, []);

  const handleShuffle = useCallback(() => {
    setOrder(shuffleIndices(exercise.lines.length));
    setChecked(false);
    setShowSolution(false);
    setStatus(null);
  }, [exercise.lines.length]);

  const handleCheck = useCallback(() => {
    const correct = isCorrectOrder(order);
    setChecked(true);
    if (correct) {
      setStatus("Correct order — nice work!");
      onSolved();
    } else {
      setStatus("Not quite — green lines are in the right spot, red ones need to move.");
    }
  }, [order, onSolved]);

  const handleShowSolution = useCallback(() => {
    setOrder(exercise.lines.map((_, i) => i));
    setShowSolution(true);
    setChecked(false);
    setStatus("Solution shown — try shuffling and solving again.");
  }, [exercise.lines]);

  const displayOrder = showSolution
    ? exercise.lines.map((_, i) => i)
    : order;

  const lineFeedback = (position: number): "correct" | "incorrect" | null => {
    if (!checked) return null;
    return displayOrder[position] === position ? "correct" : "incorrect";
  };

  return (
    <ExerciseWindow
      file={exercise.file}
      category={exercise.category}
      title={exercise.title}
      note={exercise.note}
      solved={solved}
    >
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={displayOrder} strategy={verticalListSortingStrategy}>
          <ol className="space-y-2 list-none m-0 p-0">
            {displayOrder.map((lineIndex, position) => (
              <SortableLine
                key={lineIndex}
                id={lineIndex}
                line={exercise.lines[lineIndex]}
                lineNumber={position + 1}
                feedback={lineFeedback(position)}
                disabled={showSolution || solved}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>

      {status && (
        <p
          className={`mt-4 text-sm ${
            checked && isCorrectOrder(displayOrder) ? "text-correct" : "text-muted"
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
          className="rounded-lg bg-sky/20 border border-sky/40 px-4 py-2 text-sm font-medium text-sky hover:bg-sky/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/60 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check order
        </button>
        <button
          type="button"
          onClick={handleShuffle}
          className="rounded-lg border border-border bg-panel-2 px-4 py-2 text-sm font-medium text-text hover:bg-border/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/60"
        >
          Shuffle
        </button>
        <button
          type="button"
          onClick={handleShowSolution}
          className="rounded-lg border border-border bg-panel-2 px-4 py-2 text-sm font-medium text-muted hover:text-text hover:bg-border/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/60"
        >
          Show solution
        </button>
      </div>
    </ExerciseWindow>
  );
}
