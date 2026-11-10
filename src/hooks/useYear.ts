import { useCallback, useEffect, useRef, useState } from 'react';
import { clampYear } from '@/utils/time';

/**
 * Year state that feels instant while dragging.
 *
 * - The slider updates local state on every frame.
 * - The URL (which re-renders the whole route) is written only after the
 *   student pauses for a moment.
 * - Big jumps (period markers, ±10, clicking the timeline) animate smoothly.
 * - External URL changes (links, back button) are picked up.
 */
export function useYear(urlYear: number, writeUrl: (y: number) => void) {
  const [year, setLocal] = useState(urlYear);
  const pending = useRef(false);
  const raf = useRef<number | null>(null);
  const yearRef = useRef(year);
  yearRef.current = year;
  const writeRef = useRef(writeUrl);
  writeRef.current = writeUrl;

  // Follow the URL when it changes from outside.
  useEffect(() => {
    if (!pending.current && urlYear !== yearRef.current) setLocal(urlYear);
  }, [urlYear]);

  // Debounced URL write.
  useEffect(() => {
    if (!pending.current) return;
    const t = window.setTimeout(() => {
      pending.current = false;
      writeRef.current(year);
    }, 280);
    return () => window.clearTimeout(t);
  }, [year]);

  const stop = () => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
  };
  useEffect(() => stop, []);

  const setYear = useCallback((y: number) => {
    stop();
    pending.current = true;
    setLocal(clampYear(y));
  }, []);

  /** Smoothly animate to a year (used for jumps). */
  const animateTo = useCallback((target: number) => {
    stop();
    const to = clampYear(target);
    const from = yearRef.current;
    if (from === to) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    pending.current = true;
    if (reduce) {
      setLocal(to);
      return;
    }
    const dur = Math.min(700, 220 + Math.abs(to - from) * 3);
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const k = 1 - Math.pow(1 - t, 3);
      setLocal(Math.round(from + (to - from) * k));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else raf.current = null;
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  return { year, setYear, animateTo };
}
