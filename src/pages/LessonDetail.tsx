import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, ClipboardList, Clock, Globe2, Target } from 'lucide-react';
import { lessonById, lessons } from '@/data/lessons';
import { eventById } from '@/data/historicalEvents';
import { worksheetById } from '@/data/worksheets';
import { useProgress } from '@/hooks/useProgress';
import { Illustration } from '@/components/lessons/Illustrations';
import { KnowledgeCheck } from '@/components/lessons/KnowledgeCheck';
import { PerspectiveExplorer } from '@/components/lessons/PerspectiveExplorer';
import { PrintingPressModule } from '@/components/three/PrintingPressModule';
import { Badge } from '@/components/ui/Badge';
import { Button, ButtonLink } from '@/components/ui/Button';
import { SourceList } from '@/components/ui/SourceList';
import { ProgressBar } from '@/components/ui/ProgressBar';
import NotFound from './NotFound';
import { cn } from '@/utils/cn';

export default function LessonDetail() {
  const { lessonId = '' } = useParams();
  const lesson = lessonById[lessonId];
  const { progress, dispatch } = useProgress();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (lesson) dispatch({ type: 'startLesson', lessonId: lesson.id });
  }, [lesson, dispatch]);

  // Mark sections as read once a student has scrolled through them.
  useEffect(() => {
    if (!lesson || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            const id = (en.target as HTMLElement).dataset.section;
            if (id) dispatch({ type: 'readSection', lessonId: lesson.id, sectionId: id });
          }
        }
      },
      { rootMargin: '0px 0px -55% 0px', threshold: 0 },
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [lesson, dispatch]);

  if (!lesson) return <NotFound />;
  const lp = progress.lessons[lesson.id];
  const idx = lessons.indexOf(lesson);
  const prev = lessons[idx - 1];
  const next = lessons[idx + 1];
  const worksheet = lesson.worksheetId ? worksheetById[lesson.worksheetId] : undefined;
  const checkDone = lp?.checkScore !== undefined;
  const readRatio = (lp?.sectionsRead.length ?? 0) / lesson.sections.length;

  const toc = [
    ...lesson.sections.map((s) => ({ id: s.id, label: s.heading, done: lp?.sectionsRead.includes(s.id) })),
    ...(lesson.interactive ? [{ id: 'interactive', label: lesson.interactive === 'printing-press' ? '3D printing press' : 'Perspective explorer', done: undefined }] : []),
    { id: 'vocabulary', label: 'Vocabulary', done: undefined },
    { id: 'figures', label: 'Key figures', done: undefined },
    { id: 'check', label: 'Knowledge check', done: checkDone },
  ];

  return (
    <div>
      <Link to="/lessons" className="mb-6 inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden /> All lessons
      </Link>

      <div className="grid gap-10 xl:grid-cols-[220px_minmax(0,1fr)]">
        {/* Table of contents */}
        <aside className="hidden xl:block">
          <nav className="sticky top-8" aria-label="Lesson contents">
            <p className="eyebrow mb-3">In this lesson</p>
            <ol className="space-y-1 border-l border-line">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="-ml-px flex items-start gap-2 border-l border-transparent py-1 pl-3 text-[13px] leading-5 text-ink-muted hover:border-ink hover:text-ink">
                    {t.done === undefined ? null : t.done ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok" aria-label="done" /> : <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint" aria-hidden />}
                    <span>{t.label}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <div className="mb-1 flex justify-between text-[11px] text-ink-muted">
                <span>Sections read</span>
                <span>{Math.round(readRatio * 100)}%</span>
              </div>
              <ProgressBar value={readRatio * 100} tone="bronze" label="Sections read" />
            </div>
          </nav>
        </aside>

        <article className="min-w-0 max-w-[820px]">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">Lesson {lesson.number} of {lessons.length}</span>
              <span className="inline-flex items-center gap-1 text-[12px] text-ink-muted"><Clock className="h-3.5 w-3.5" aria-hidden /> {lesson.minutes} min</span>
              {lp?.completed && <Badge tone="ok"><CheckCircle2 className="h-3 w-3" aria-hidden /> Completed</Badge>}
            </div>
            <h1 className="h-display mt-2">{lesson.title}</h1>
            <p className="mt-2 text-[16px] text-ink-muted">{lesson.subtitle}</p>
          </header>

          <section className="mt-8 rounded-xl border border-line bg-surface p-5" aria-labelledby="objectives">
            <h2 id="objectives" className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-ink-soft">
              <Target className="h-4 w-4 text-bronze" aria-hidden /> Learning objectives
            </h2>
            <p className="mt-1 text-[13px] text-ink-muted">By the end of this lesson, you should be able to:</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {lesson.objectives.map((o) => (
                <li key={o} className="flex gap-2 text-[14px] leading-6 text-ink-soft">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-bronze" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-8 font-serif text-[20px] leading-[1.6] text-ink">{lesson.introduction}</p>

          {lesson.sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              data-section={s.id}
              ref={(el) => (sectionRefs.current[s.id] = el)}
              className="scroll-mt-24 border-t border-line pt-8 mt-10"
            >
              <p className="eyebrow mb-1">Part {i + 1}</p>
              <h2 className="h-section">{s.heading}</h2>
              <div className={cn('mt-4 grid gap-6', s.keyPoints && 'md:grid-cols-[minmax(0,1fr)_220px]')}>
                <div className="space-y-4">
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className="body-copy text-[16px] leading-[1.75]">{p}</p>
                  ))}
                </div>
                {s.keyPoints && (
                  <aside className="h-fit rounded-lg bg-paper p-4">
                    <p className="eyebrow mb-2">Key points</p>
                    <ul className="space-y-2">
                      {s.keyPoints.map((k) => (
                        <li key={k} className="text-[13px] leading-5 text-ink-soft">{k}</li>
                      ))}
                    </ul>
                  </aside>
                )}
              </div>
              {s.quote && (
                <figure className="mt-6 border-l-2 border-bronze pl-5">
                  <blockquote className="font-serif text-[18px] italic leading-8 text-ink">“{s.quote.text}”</blockquote>
                  <figcaption className="mt-2 text-[12px] text-ink-muted">— {s.quote.attribution}</figcaption>
                </figure>
              )}
              {s.illustration && (
                <figure className="mt-6 overflow-hidden rounded-xl border border-line bg-surface">
                  <div className="p-3 sm:p-4">
                    <Illustration id={s.illustration} />
                  </div>
                  {s.caption && <figcaption className="border-t border-line bg-paper px-4 py-2.5 text-[12px] leading-5 text-ink-muted">{s.caption}</figcaption>}
                </figure>
              )}
            </section>
          ))}

          {lesson.interactive && (
            <section id="interactive" className="mt-12 scroll-mt-24">
              {lesson.interactive === 'printing-press' ? <PrintingPressModule /> : <PerspectiveExplorer />}
            </section>
          )}

          <section id="vocabulary" className="mt-12 scroll-mt-24 border-t border-line pt-8">
            <h2 className="h-section">Important vocabulary</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {lesson.vocabulary.map((v) => (
                <div key={v.term} className="rounded-lg border border-line bg-surface p-4">
                  <dt className="font-serif text-[17px] text-ink">{v.term}</dt>
                  <dd className="mt-1 text-[13px] leading-5 text-ink-soft">{v.definition}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="figures" className="mt-12 scroll-mt-24 border-t border-line pt-8">
            <h2 className="h-section">Key historical figures</h2>
            <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-surface">
              {lesson.figures.map((f) => (
                <li key={f.name} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-6">
                  <div className="sm:w-48 sm:shrink-0">
                    <p className="font-medium text-ink">{f.name}</p>
                    <p className="text-[12px] tabular-nums text-ink-muted">{f.dates}</p>
                  </div>
                  <p className="text-[14px] leading-6 text-ink-soft">{f.description}</p>
                </li>
              ))}
            </ul>
          </section>

          {lesson.relatedEventIds.length > 0 && (
            <section className="mt-12 border-t border-line pt-8">
              <h2 className="h-section">See it on the map and timeline</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {lesson.relatedEventIds.map((id) => eventById[id]).filter(Boolean).map((e) => (
                  <li key={e.id}>
                    <Link to={`/explore?event=${e.id}&region=${e.region}&year=${e.year}`} className="flex items-start gap-3 rounded-lg border border-line bg-surface p-3 hover:border-ink-faint">
                      <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden />
                      <span>
                        <span className="block text-[11px] tabular-nums text-ink-muted">{e.dateLabel}</span>
                        <span className="block text-[14px] font-medium leading-snug text-ink">{e.title}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="check" className="mt-12 scroll-mt-24 border-t border-line pt-8">
            <h2 className="h-section">Knowledge check</h2>
            <p className="mt-1 mb-5 text-[14px] text-ink-muted">A quick check of the main ideas. Answers are shown only after you check.</p>
            <KnowledgeCheck
              key={lesson.id}
              questions={lesson.knowledgeCheck}
              saved={lp?.checkAnswers}
              onSubmit={(answers, score) => dispatch({ type: 'submitCheck', lessonId: lesson.id, answers, score })}
            />
          </section>

          <section className="mt-12 rounded-xl border border-line bg-surface p-5 sm:p-6" aria-labelledby="complete">
            <h2 id="complete" className="font-serif text-xl text-ink">
              {lp?.completed ? 'Lesson completed' : 'Finish this lesson'}
            </h2>
            <p className="mt-1 text-[14px] text-ink-muted">
              {lp?.completed
                ? 'Well done. You can return to this lesson at any time.'
                : checkDone
                  ? 'You have completed the knowledge check. Mark the lesson as complete to record your progress.'
                  : 'Complete the knowledge check above, then mark the lesson as complete.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {!lp?.completed && (
                <Button onClick={() => dispatch({ type: 'completeLesson', lessonId: lesson.id })} disabled={!checkDone} icon={<CheckCircle2 className="h-4 w-4" />}>
                  Mark lesson complete
                </Button>
              )}
              {worksheet && (
                <ButtonLink to={`/worksheets/${worksheet.id}`} variant="secondary" icon={<ClipboardList className="h-4 w-4" />}>
                  Worksheet: {worksheet.title}
                </ButtonLink>
              )}
            </div>
          </section>

          <section className="mt-10 border-t border-line pt-6">
            <p className="eyebrow mb-2">References for this lesson</p>
            <SourceList ids={lesson.sources} />
            <Link to="/references" className="mt-3 inline-block text-[12px] font-medium text-bronze-dark hover:text-ink">Full reference list →</Link>
          </section>

          <nav className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between" aria-label="Lesson navigation">
            {prev ? (
              <Link to={`/lessons/${prev.id}`} className="group flex items-center gap-2 text-[14px] text-ink-muted hover:text-ink">
                <ArrowLeft className="h-4 w-4" aria-hidden />
                <span>
                  <span className="block text-[11px] uppercase tracking-wider">Previous</span>
                  {prev.title}
                </span>
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/lessons/${next.id}`} className="group flex items-center gap-2 text-right text-[14px] text-ink-muted hover:text-ink sm:ml-auto">
                <span>
                  <span className="block text-[11px] uppercase tracking-wider">Next</span>
                  {next.title}
                </span>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            )}
          </nav>
        </article>
      </div>
    </div>
  );
}
