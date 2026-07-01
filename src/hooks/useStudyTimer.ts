import { useState, useEffect, useRef } from "react";

function formatElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (h > 0) return `${h}:${pad(m)}:${pad(s)}`;
  return `${pad(m)}:${pad(s)}`;
}

export function useStudyTimer() {
  const startRef = useRef(Date.now());
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const tick = () => setElapsedMs(Date.now() - startRef.current);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return formatElapsed(elapsedMs);
}
