import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertCircle, ArrowLeft, CheckCircle2, MessageSquareText, RotateCcw, XCircle } from 'lucide-react';
import { worksheetById } from '@/data/worksheets';
import { lessonById } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';
import { QuestionBody, questionTypeLabel } from '@/components/worksheets/Questions';
import { Button, ButtonLink } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { gradeQuestion, isAnswered, isAutoGraded } from '@/utils/grading';
import NotFound from './NotFound';
import { cn } from '@/utils/cn';

export default function WorksheetDetail() {
  const { worksheetId = '' } = useParams();
  const ws = worksheetById[worksheetId];
  const { progress, dispatch } = useProgress();
  const [confirming, setConfirming] = useState(false);
  const [reviewOnly, setReviewOnly] = useState(false);

  const att = progress.worksheets[worksheetId];
  const answers = att?.answers ?? {};
  const submitted = !!att?.submitted;

  const answeredCount = useMemo(() => (ws ? ws.questions.filter((q) => isAnswered(q, answers[q.id])).length : 0), [ws, answers]);
  if (!ws) return <NotFound />;
  const lesson = ws.lessonId ? lessonById[ws.lessonId] : undefined;
  const total = ws.questions.length;
  const incorrect = ws.questions.filter((q) => att?.results?.[q.id] === false);
  const visible = submitted && reviewOnly ? incorrect : ws.questions;

  const submit = () => {
    if (answeredCount < total && !confirming) {
      setConfirming(true);
      return;
    }
    setConfirming(false);
    dispatch({ type: 'submitWorksheet', worksheetId: ws.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('main')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-[880px]">
      <Link to="/worksheets" className="mb-6 inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden /> All worksheets
      </Link>

      <header>
        <p className="eyebrow">Test your understanding{lesson ? ` · Lesson ${lesson.number}: ${lesson.title}` : ''}</p>
        <h1 className="h-display mt-2">{ws.title}</h1>
        <p className="mt-2 text-[15px] leading-7 text-ink-muted">{ws.description}</p>
      </header>

      {!submitted && (
        <div className="mt-6 rounded-xl border border-line bg-surface p-4 text-[14px] leading-6 text-ink-soft">
          <p className="font-medium text-ink">Instructions</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            <li>Answer every question. Your work saves automatically on this device.</li>
            <li>Answers are not shown until you submit.</li>
            <li>Written responses are not marked automatically — they are kept for your teacher to read.</li>
          </ul>
        </div>
      )}

      {submitted && att && (
        <section className="mt-6 rounded-xl border border-line bg-surface p-5 sm:p-6" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Submitted {att.submittedAt ? new Date(att.submittedAt).toLocaleString() : ''}</p>
              <p className="mt-1 font-serif text-[30px] leading-none text-ink">
                {att.score} <span className="text-[18px] text-ink-muted">/ {att.maxScore}</span>
              </p>
              <p className="mt-1 text-[13px] text-ink-muted">auto-marked points · {ws.questions.filter((q) => !isAutoGraded(q)).length} written response(s) for teacher review</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {incorrect.length > 0 && (
                <Button variant={reviewOnly ? 'primary' : 'secondary'} size="sm" onClick={() => setReviewOnly((v) => !v)} icon={<AlertCircle className="h-4 w-4" />}>
                  {reviewOnly ? 'Show all questions' : `Review ${incorrect.length} incorrect`}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                icon={<RotateCcw className="h-4 w-4" />}
                onClick={() => {
                  if (window.confirm('Start this worksheet again? Your current answers will be cleared.')) {
                    setReviewOnly(false);
                    dispatch({ type: 'resetWorksheet', worksheetId: ws.id });
                  }
                }}
              >
                Try again
              </Button>
            </div>
          </div>
          <ProgressBar value={att.maxScore ? ((att.score ?? 0) / att.maxScore) * 100 : 0} className="mt-4" tone="ok" label="Score" />
        </section>
      )}

      {!submitted && (
        <div className="sticky top-14 z-20 -mx-4 mt-6 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur lg:top-0">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-medium text-ink tabular-nums">{answeredCount} of {total} answered</span>
            <ProgressBar value={(answeredCount / total) * 100} tone="bronze" className="flex-1" label="Questions answered" />
          </div>
        </div>
      )}

      <ol className="mt-6 space-y-6">
        {visible.map((q) => {
          const n = ws.questions.indexOf(q) + 1;
          const r = submitted ? gradeQuestion(q, answers[q.id]) : null;
          return (
            <li key={q.id} id={`q-${q.id}`} className="scroll-mt-28">
              <fieldset className="rounded-xl border border-line bg-surface p-5 sm:p-6">
                <legend className="sr-only">Question {n}</legend>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[12px] font-semibold text-white">{n}</span>
                  <span className="text-[12px] font-medium text-ink-muted">{questionTypeLabel[q.type]}</span>
                  {isAutoGraded(q) ? (
                    <span className="text-[12px] text-ink-faint">· {q.points} {q.points === 1 ? 'point' : 'points'}</span>
                  ) : (
                    <span className="text-[12px] text-ink-faint">· teacher review</span>
                  )}
                  {r && r.correct === true && <Badge tone="ok" className="ml-auto"><CheckCircle2 className="h-3 w-3" aria-hidden /> Correct</Badge>}
                  {r && r.correct === false && (
                    <Badge tone="warn" className="ml-auto"><XCircle className="h-3 w-3" aria-hidden /> {r.earned > 0 ? `Partly correct · ${Math.round(r.earned * 10) / 10}/${r.possible}` : 'Incorrect'}</Badge>
                  )}
                  {r && r.correct === null && <Badge className="ml-auto"><MessageSquareText className="h-3 w-3" aria-hidden /> Submitted for review</Badge>}
                </div>
                <p className="text-[16px] font-medium leading-7 text-ink">{q.prompt}</p>
                {q.instructions && <p className="mt-1 text-[13px] text-ink-muted">{q.instructions}</p>}
                <div className="mt-4">
                  <QuestionBody q={q} value={answers[q.id]} submitted={submitted} onChange={(v) => dispatch({ type: 'saveAnswer', worksheetId: ws.id, questionId: q.id, value: v })} />
                </div>
                {submitted && (
                  <div className={cn('mt-4 rounded-lg px-4 py-3 text-[14px] leading-6', r?.correct === null ? 'bg-paper text-ink-soft' : 'bg-bronze-wash/60 text-ink-soft')}>
                    <p className="eyebrow mb-1 text-bronze-dark">{r?.correct === null ? 'Points a strong answer might include' : 'Explanation'}</p>
                    {q.explanation}
                  </div>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>

      {submitted && reviewOnly && incorrect.length === 0 && <p className="mt-6 text-sm text-ink-muted">No incorrect answers to review.</p>}

      {!submitted && (
        <div className="mt-8 rounded-xl border border-line bg-surface p-5">
          {confirming ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[14px] text-ink">
                You have answered {answeredCount} of {total} questions. Unanswered questions will score zero. Submit anyway?
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setConfirming(false)}>Keep working</Button>
                <Button onClick={submit}>Submit</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[14px] text-ink-muted">When you are ready, submit to see your score and explanations.</p>
              <Button onClick={submit}>Submit worksheet</Button>
            </div>
          )}
        </div>
      )}

      {submitted && (
        <div className="mt-8 flex flex-wrap gap-2">
          <ButtonLink to="/worksheets" variant="secondary">All worksheets</ButtonLink>
          <ButtonLink to="/progress">View my progress</ButtonLink>
        </div>
      )}
    </div>
  );
}
