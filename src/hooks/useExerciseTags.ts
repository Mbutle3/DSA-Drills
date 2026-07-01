import { useState, useEffect, useCallback } from "react";

const REVIEW_KEY = "dsa-drills:review";
const FAVORITES_KEY = "dsa-drills:favorites";

function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    const ids: string[] = JSON.parse(raw);
    return new Set(ids);
  } catch {
    return new Set();
  }
}

function persistSet(key: string, ids: Set<string>) {
  try {
    localStorage.setItem(key, JSON.stringify([...ids]));
  } catch {
    // fail silently
  }
}

function toggleInSet(prev: Set<string>, id: string): Set<string> {
  const next = new Set(prev);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

export function useExerciseTags() {
  const [review, setReview] = useState<Set<string>>(() => loadSet(REVIEW_KEY));
  const [favorites, setFavorites] = useState<Set<string>>(() =>
    loadSet(FAVORITES_KEY),
  );

  useEffect(() => {
    persistSet(REVIEW_KEY, review);
  }, [review]);

  useEffect(() => {
    persistSet(FAVORITES_KEY, favorites);
  }, [favorites]);

  const toggleReview = useCallback((id: string) => {
    setReview((prev) => toggleInSet(prev, id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => toggleInSet(prev, id));
  }, []);

  const isReview = useCallback((id: string) => review.has(id), [review]);
  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites]);

  return {
    review,
    favorites,
    toggleReview,
    toggleFavorite,
    isReview,
    isFavorite,
    reviewCount: review.size,
    favoritesCount: favorites.size,
  };
}
