import { Component, type ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
  onError?: (e: Error) => void;
}

/** Catches rendering errors (e.g. WebGL context failures) and shows a fallback. */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(e: Error) {
    this.props.onError?.(e);
    console.warn('[ATLAS] A visual component failed and fell back:', e.message);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
