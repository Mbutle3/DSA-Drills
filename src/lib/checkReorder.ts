/**
 * Validates a user's reordering of a reorder-type exercise.
 *
 * `displayedOrder[position]` = the ORIGINAL index (0-based, into the exercise's
 * `lines` array) of the line currently shown at `position`. This is what you get
 * by reading each rendered block's stored original index, in DOM order.
 *
 * `interchangeable` is an optional list of index groups — each group a list of
 * original indices where any internal order is accepted, because those specific
 * lines don't depend on each other and their relative order doesn't change the
 * program's behavior (e.g. independent attribute assignments in a constructor,
 * or heap pushes where the heap invariant makes insertion order irrelevant).
 *
 * IMPORTANT constraint on `interchangeable` groups (enforced by data authoring,
 * not by this function): each group must be a CONTIGUOUS run of indices in the
 * canonical order — e.g. [2, 3, 4], never [2, 4, 6]. The group's own valid
 * position range is derived from min(group)..max(group).
 */

export interface ReorderCheckResult {
  allCorrect: boolean;
  /** correctness[position] — true if the line sitting at that position belongs there */
  correctness: boolean[];
}

export function checkReorder(
  displayedOrder: number[],
  interchangeable: number[][] = [],
): ReorderCheckResult {
  const n = displayedOrder.length;
  const correctness = new Array<boolean>(n).fill(false);
  const handledPositions = new Set<number>();

  for (const group of interchangeable) {
    const expected = new Set(group);
    const rangeStart = Math.min(...group);
    const rangeEnd = Math.max(...group);

    const actual = new Set<number>();
    for (let pos = rangeStart; pos <= rangeEnd; pos++) {
      actual.add(displayedOrder[pos]);
      handledPositions.add(pos);
    }

    const groupCorrect =
      actual.size === expected.size &&
      [...actual].every((v) => expected.has(v));

    for (let pos = rangeStart; pos <= rangeEnd; pos++) {
      correctness[pos] = groupCorrect;
    }
  }

  for (let pos = 0; pos < n; pos++) {
    if (handledPositions.has(pos)) continue;
    correctness[pos] = displayedOrder[pos] === pos;
  }

  return { allCorrect: correctness.every(Boolean), correctness };
}
