import type { AnswerValue, Worksheet, WorksheetQuestion } from '@/types';

export interface QuestionResult {
  /** null = not auto-graded (teacher review). */
  correct: boolean | null;
  earned: number;
  possible: number;
}

export const isAutoGraded = (q: WorksheetQuestion) => q.type !== 'short-answer' && q.type !== 'source-analysis';

export function gradeQuestion(q: WorksheetQuestion, a: AnswerValue | undefined): QuestionResult {
  const possible = q.points;
  if (!isAutoGraded(q)) return { correct: null, earned: 0, possible: 0 };
  if (a === undefined) return { correct: false, earned: 0, possible };

  switch (q.type) {
    case 'multiple-choice': {
      const ok = a === q.correctIndex;
      return { correct: ok, earned: ok ? possible : 0, possible };
    }
    case 'true-false': {
      const ok = a === q.answer;
      return { correct: ok, earned: ok ? possible : 0, possible };
    }
    case 'map': {
      const ok = a === q.correctRegion;
      return { correct: ok, earned: ok ? possible : 0, possible };
    }
    case 'multi-select': {
      const sel: number[] = Array.isArray(a) ? (a as number[]) : typeof a === 'object' && a !== null && 'selected' in a ? (a.selected as number[]) : [];
      const set = new Set(sel);
      const ok = set.size === q.correctIndices.length && q.correctIndices.every((i) => set.has(i));
      // Partial credit: correct picks minus wrong picks, floored at 0.
      const right = q.correctIndices.filter((i) => set.has(i)).length;
      const wrong = sel.filter((i) => !q.correctIndices.includes(i)).length;
      const frac = Math.max(0, (right - wrong) / q.correctIndices.length);
      return { correct: ok, earned: ok ? possible : Math.round(frac * possible * 2) / 2, possible };
    }
    case 'matching': {
      const map = a as Record<string, string>;
      const right = q.pairs.filter((p) => map[p.left] === p.right).length;
      return { correct: right === q.pairs.length, earned: (right / q.pairs.length) * possible, possible };
    }
    case 'drag-drop': {
      const map = a as Record<string, string>;
      const right = q.items.filter((it) => map[it.label] === it.category).length;
      return { correct: right === q.items.length, earned: (right / q.items.length) * possible, possible };
    }
    case 'ordering': {
      const order = a as string[];
      const right = q.items.filter((it, i) => order[i] === it.label).length;
      return { correct: right === q.items.length, earned: (right / q.items.length) * possible, possible };
    }
    default:
      return { correct: null, earned: 0, possible: 0 };
  }
}

export function gradeWorksheet(ws: Worksheet, answers: Record<string, AnswerValue>) {
  let score = 0;
  let max = 0;
  const results: Record<string, boolean | null> = {};
  for (const q of ws.questions) {
    const r = gradeQuestion(q, answers[q.id]);
    results[q.id] = r.correct;
    score += r.earned;
    max += r.possible;
  }
  return { score: Math.round(score * 10) / 10, maxScore: max, results };
}

/** Whether a question has been given any answer at all (used for the progress indicator). */
export function isAnswered(q: WorksheetQuestion, a: AnswerValue | undefined): boolean {
  if (a === undefined || a === null) return false;
  switch (q.type) {
    case 'short-answer':
      return typeof a === 'string' && a.trim().length > 0;
    case 'source-analysis':
      return typeof a === 'object' && Object.values(a as Record<string, string>).some((v) => v.trim().length > 0);
    case 'matching':
      return Object.keys(a as Record<string, string>).length === q.pairs.length;
    case 'drag-drop':
      return Object.keys(a as Record<string, string>).length === q.items.length;
    case 'multi-select': {
      const sel = typeof a === 'object' && 'selected' in (a as object) ? (a as { selected: number[] }).selected : (a as number[]);
      return Array.isArray(sel) && sel.length > 0;
    }
    case 'ordering':
      return Array.isArray(a) && a.length > 0;
    default:
      return true;
  }
}

export const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);
