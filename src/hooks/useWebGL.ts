import { useMemo } from 'react';

/** Detects whether WebGL is available so 3D scenes can fall back to 2D. */
export function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

export function useWebGL() {
  return useMemo(detectWebGL, []);
}

export function usePrefersReducedMotion() {
  return useMemo(() => {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  }, []);
}
