import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { ActivityEntry, AnswerValue, LessonProgress, RegionId, StudentProgress } from '@/types';
import { loadJSON, removeKey, saveJSON } from '@/utils/storage';
import { gradeWorksheet } from '@/utils/grading';
import { worksheetById } from '@/data/worksheets';
import { lessonById, lessons } from '@/data/lessons';
import { unitObjectives } from '@/data/objectives';
import { regionById } from '@/data/regions';

/**
 * Student progress store.
 *
 * Persistence is local (localStorage) for the prototype. All mutations go
 * through the reducer below, so swapping in a backend later only requires
 * syncing the same state shape to an API.
 */
const STORAGE_KEY = 'atlas.progress.v1';

const emptyProgress = (): StudentProgress => ({
  version: 1,
  studentName: 'Student',
  lessons: {},
  worksheets: {},
  regionsExplored: [],
  pressStepsViewed: [],
  activity: [],
});

const emptyLesson = (): LessonProgress => ({ started: false, completed: false, sectionsRead: [] });

type Action =
  | { type: 'rename'; name: string }
  | { type: 'startLesson'; lessonId: string }
  | { type: 'readSection'; lessonId: string; sectionId: string }
  | { type: 'submitCheck'; lessonId: string; answers: Record<string, number>; score: number }
  | { type: 'completeLesson'; lessonId: string }
  | { type: 'saveAnswer'; worksheetId: string; questionId: string; value: AnswerValue }
  | { type: 'submitWorksheet'; worksheetId: string }
  | { type: 'resetWorksheet'; worksheetId: string }
  | { type: 'exploreRegion'; regionId: RegionId }
  | { type: 'viewPressStep'; step: number }
  | { type: 'reset' };

const now = () => new Date().toISOString();
const log = (s: StudentProgress, entry: Omit<ActivityEntry, 'id' | 'at'>): ActivityEntry[] => [
  ...s.activity,
  { ...entry, id: `${Date.now()}-${s.activity.length}`, at: now() },
];

function reducer(s: StudentProgress, a: Action): StudentProgress {
  switch (a.type) {
    case 'rename':
      return { ...s, studentName: a.name.slice(0, 40) || 'Student' };
    case 'startLesson': {
      const lp = s.lessons[a.lessonId] ?? emptyLesson();
      if (lp.started) return s.lastLessonId === a.lessonId ? s : { ...s, lastLessonId: a.lessonId };
      return {
        ...s,
        lastLessonId: a.lessonId,
        lessons: { ...s.lessons, [a.lessonId]: { ...lp, started: true } },
        activity: log(s, { kind: 'lesson-started', label: `Started Lesson ${lessonById[a.lessonId]?.number}: ${lessonById[a.lessonId]?.title}` }),
      };
    }
    case 'readSection': {
      const lp = s.lessons[a.lessonId] ?? emptyLesson();
      if (lp.sectionsRead.includes(a.sectionId)) return s;
      return { ...s, lessons: { ...s.lessons, [a.lessonId]: { ...lp, started: true, sectionsRead: [...lp.sectionsRead, a.sectionId] } } };
    }
    case 'submitCheck': {
      const lp = s.lessons[a.lessonId] ?? emptyLesson();
      const total = lessonById[a.lessonId]?.knowledgeCheck.length ?? 0;
      return {
        ...s,
        lessons: { ...s.lessons, [a.lessonId]: { ...lp, started: true, checkAnswers: a.answers, checkScore: a.score } },
        activity: log(s, {
          kind: 'check-completed',
          label: `Knowledge check — Lesson ${lessonById[a.lessonId]?.number}`,
          detail: `${a.score} / ${total} correct`,
        }),
      };
    }
    case 'completeLesson': {
      const lp = s.lessons[a.lessonId] ?? emptyLesson();
      if (lp.completed) return s;
      return {
        ...s,
        lessons: {
          ...s.lessons,
          [a.lessonId]: { ...lp, started: true, completed: true, completedAt: now(), sectionsRead: lessonById[a.lessonId]?.sections.map((x) => x.id) ?? lp.sectionsRead },
        },
        activity: log(s, { kind: 'lesson-completed', label: `Completed Lesson ${lessonById[a.lessonId]?.number}: ${lessonById[a.lessonId]?.title}` }),
      };
    }
    case 'saveAnswer': {
      const att = s.worksheets[a.worksheetId] ?? { worksheetId: a.worksheetId, answers: {}, submitted: false };
      if (att.submitted) return s;
      return { ...s, worksheets: { ...s.worksheets, [a.worksheetId]: { ...att, answers: { ...att.answers, [a.questionId]: a.value } } } };
    }
    case 'submitWorksheet': {
      const ws = worksheetById[a.worksheetId];
      const att = s.worksheets[a.worksheetId] ?? { worksheetId: a.worksheetId, answers: {}, submitted: false };
      if (!ws) return s;
      const g = gradeWorksheet(ws, att.answers);
      return {
        ...s,
        worksheets: {
          ...s.worksheets,
          [a.worksheetId]: { ...att, submitted: true, submittedAt: now(), score: g.score, maxScore: g.maxScore, results: g.results },
        },
        activity: log(s, { kind: 'worksheet-submitted', label: `Submitted worksheet: ${ws.title}`, detail: `${g.score} / ${g.maxScore} auto-graded points` }),
      };
    }
    case 'resetWorksheet': {
      const rest = { ...s.worksheets };
      delete rest[a.worksheetId];
      return { ...s, worksheets: rest };
    }
    case 'exploreRegion': {
      if (s.regionsExplored.includes(a.regionId)) return s;
      return {
        ...s,
        regionsExplored: [...s.regionsExplored, a.regionId],
        activity: log(s, { kind: 'region-explored', label: `Explored ${regionById[a.regionId].name} on the globe` }),
      };
    }
    case 'viewPressStep': {
      if (s.pressStepsViewed.includes(a.step)) return s;
      const viewed = [...s.pressStepsViewed, a.step];
      const firstTime = s.pressStepsViewed.length === 0;
      return {
        ...s,
        pressStepsViewed: viewed,
        activity: firstTime ? log(s, { kind: 'model-explored', label: 'Explored the 3D printing press model' }) : s.activity,
      };
    }
    case 'reset':
      return { ...emptyProgress(), studentName: s.studentName };
    default:
      return s;
  }
}

function init(): StudentProgress {
  const saved = loadJSON<StudentProgress>(STORAGE_KEY);
  if (saved && saved.version === 1) return { ...emptyProgress(), ...saved };
  return emptyProgress();
}

interface Ctx {
  progress: StudentProgress;
  dispatch: React.Dispatch<Action>;
  stats: ReturnType<typeof computeStats>;
  resetAll: () => void;
}

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    saveJSON(STORAGE_KEY, progress);
  }, [progress]);

  const resetAll = useCallback(() => {
    removeKey(STORAGE_KEY);
    dispatch({ type: 'reset' });
  }, []);

  const stats = useMemo(() => computeStats(progress), [progress]);
  const value = useMemo(() => ({ progress, dispatch, stats, resetAll }), [progress, stats, resetAll]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}

/* ---------------- Derived statistics ---------------- */

export function computeStats(p: StudentProgress) {
  const lessonsCompleted = lessons.filter((l) => p.lessons[l.id]?.completed).length;
  const worksheetIds = Object.keys(worksheetById);
  const worksheetsCompleted = worksheetIds.filter((id) => p.worksheets[id]?.submitted).length;

  // Unit completion: lessons and worksheets weighted equally, plus a small share for exploration.
  const exploreShare = Math.min(1, p.regionsExplored.length / 5) * 0.5 + Math.min(1, p.pressStepsViewed.length / 6) * 0.5;
  const overall =
    (lessonsCompleted / lessons.length) * 0.45 + (worksheetsCompleted / worksheetIds.length) * 0.45 + exploreShare * 0.1;

  const objectives = unitObjectives.map((o) => {
    const related = lessons.filter((l) => l.objectiveIds.includes(o.id));
    const relatedWs = [...new Set(related.map((l) => l.worksheetId).filter(Boolean))] as string[];
    const units = related.length + relatedWs.length;
    const done =
      related.filter((l) => p.lessons[l.id]?.completed).length + relatedWs.filter((w) => p.worksheets[w]?.submitted).length;
    const ratio = units ? done / units : 0;
    return {
      ...o,
      ratio,
      status: ratio >= 1 ? ('achieved' as const) : ratio > 0 ? ('in-progress' as const) : ('not-started' as const),
      lessonNumbers: related.map((l) => l.number),
    };
  });

  const nextLesson = lessons.find((l) => !p.lessons[l.id]?.completed);
  const stage = nextLesson
    ? `Lesson ${nextLesson.number} · ${nextLesson.title}`
    : worksheetsCompleted < worksheetIds.length
      ? 'Final worksheets'
      : 'Unit complete';

  return {
    lessonsCompleted,
    lessonsTotal: lessons.length,
    worksheetsCompleted,
    worksheetsTotal: worksheetIds.length,
    overall: Math.round(overall * 100),
    objectives,
    nextLesson,
    stage,
  };
}
