import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenText, CheckCircle2, ClipboardList, Compass, Globe2, MapPin } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { lessons, lessonById } from '@/data/lessons';
import { unitInfo } from '@/data/objectives';
import { historicalEvents } from '@/data/historicalEvents';
import { regions } from '@/data/regions';
import { eventInWindow } from '@/utils/time';
import { useWebGL } from '@/hooks/useWebGL';
import { ButtonLink } from '@/components/ui/Button';
import { ProgressBar, ProgressRing } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { SectionTitle } from '@/components/ui/PageHeader';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import FlatMap from '@/components/globe/FlatMap';

const GlobePreview = lazy(() => import('@/components/globe/GlobePreview'));

export default function Overview() {
  const { progress, stats } = useProgress();
  const webgl = useWebGL();
  const continueLesson = (progress.lastLessonId && !progress.lessons[progress.lastLessonId]?.completed && lessonById[progress.lastLessonId]) || stats.nextLesson || lessons[0];
  const anyStarted = Object.values(progress.lessons).some((l) => l.started);
  const events1500 = historicalEvents.filter((e) => eventInWindow(e, 1500, 25));
  const flatFallback = <FlatMap events={events1500} selectedRegion={null} onSelectRegion={() => {}} showRegionLabels={false} ariaLabel="Preview map of the world in 1500" />;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Breadcrumb" className="text-[13px] text-ink-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>{unitInfo.subject}</li>
            <li aria-hidden>/</li>
            <li className="font-medium text-ink">{unitInfo.unit}</li>
            <li aria-hidden>·</li>
            <li>{unitInfo.period}</li>
          </ol>
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ProgressRing value={stats.overall} size={42} label={`Unit progress ${stats.overall}%`} />
            <div className="leading-tight">
              <p className="text-[13px] font-medium text-ink">Unit progress</p>
              <p className="text-[12px] text-ink-muted">{stats.stage}</p>
            </div>
          </div>
          <Link to="/progress" className="flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-3 hover:bg-mist">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bronze-wash text-[11px] font-semibold text-bronze-dark" aria-hidden>
              {progress.studentName.slice(0, 1).toUpperCase()}
            </span>
            <span className="text-[13px] text-ink">{progress.studentName}</span>
          </Link>
        </div>
      </div>

      {/* Welcome */}
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <p className="eyebrow mb-3">Welcome to ATLAS</p>
          <h1 className="font-serif text-[40px] leading-[1.08] tracking-[-0.015em] text-ink md:text-[52px]">Explore the World Through Time</h1>
          <p className="mt-4 max-w-xl text-[17px] leading-8 text-ink-muted">
            Discover how ideas, discoveries, and civilizations shaped the world during the Renaissance.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to={`/lessons/${continueLesson.id}`} iconRight={<ArrowRight className="h-4 w-4" />}>
              {anyStarted ? 'Continue Learning' : 'Start Learning'}
            </ButtonLink>
            <ButtonLink to="/explore" variant="secondary" icon={<Globe2 className="h-4 w-4" />}>
              Explore the Globe
            </ButtonLink>
          </div>
        </div>
        <div className="panel p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="eyebrow">Current learning unit</p>
              <p className="mt-1.5 font-serif text-[26px] leading-tight text-ink">{unitInfo.unit}</p>
              <p className="text-[13px] text-ink-muted">{unitInfo.period} · {lessons.length} lessons · 4 worksheets</p>
            </div>
            <Badge tone="bronze">{unitInfo.level.split(' · ')[0]}</Badge>
          </div>
          <div className="mt-5 rounded-lg bg-paper p-4">
            <p className="text-[12px] text-ink-muted">{anyStarted ? 'Up next' : 'Begin with'}</p>
            <p className="mt-0.5 text-[15px] font-medium text-ink">
              Lesson {continueLesson.number}: {continueLesson.title}
            </p>
            <p className="text-[13px] text-ink-muted">{continueLesson.subtitle}</p>
            <ProgressBar
              className="mt-3"
              tone="bronze"
              value={((progress.lessons[continueLesson.id]?.sectionsRead.length ?? 0) / continueLesson.sections.length) * 100}
              label="Lesson sections read"
            />
          </div>
          <ol className="mt-4 flex gap-1.5" aria-label="Lesson completion">
            {lessons.map((l) => (
              <li key={l.id} className="flex-1">
                <Link to={`/lessons/${l.id}`} className="block" title={`Lesson ${l.number}: ${l.title}`}>
                  <span className={`block h-1.5 rounded-full ${progress.lessons[l.id]?.completed ? 'bg-ink' : progress.lessons[l.id]?.started ? 'bg-bronze-light' : 'bg-line'}`} />
                  <span className="mt-1 block text-[10px] text-ink-faint">L{l.number}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Objectives */}
      <section aria-labelledby="learn">
        <SectionTitle kicker="Learning objectives" title="What You Will Learn" />
        <ol className="grid gap-4 md:grid-cols-2">
          {stats.objectives.map((o, i) => (
            <li key={o.id} className="panel flex gap-4 p-5">
              <span className="font-serif text-[28px] leading-none text-bronze-light">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="max-w-md text-[15px] font-semibold leading-snug text-ink">{o.title}</h3>
                  <Badge tone={o.status === 'achieved' ? 'ok' : o.status === 'in-progress' ? 'bronze' : 'neutral'}>
                    {o.status === 'achieved' ? 'Achieved' : o.status === 'in-progress' ? 'In progress' : 'Not started'}
                  </Badge>
                </div>
                <p className="mt-1.5 text-[13px] leading-5 text-ink-muted">{o.description}</p>
                <div className="mt-3 flex items-center gap-3">
                  <ProgressBar value={o.ratio * 100} tone={o.status === 'achieved' ? 'ok' : 'ink'} label={`Objective ${i + 1} progress`} />
                  <span className="shrink-0 text-[11px] text-ink-faint">Lessons {o.lessonNumbers.join(', ')}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Learning overview */}
      <section aria-labelledby="overview">
        <SectionTitle kicker="At a glance" title="Learning Overview" action={<Link to="/progress" className="text-[13px] font-medium text-bronze-dark hover:text-ink">My Progress →</Link>} />
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpenText, label: 'Lessons completed', value: `${stats.lessonsCompleted}`, of: `of ${stats.lessonsTotal}`, pct: (stats.lessonsCompleted / stats.lessonsTotal) * 100 },
            { icon: ClipboardList, label: 'Worksheets completed', value: `${stats.worksheetsCompleted}`, of: `of ${stats.worksheetsTotal}`, pct: (stats.worksheetsCompleted / stats.worksheetsTotal) * 100 },
            { icon: CheckCircle2, label: 'Learning progress', value: `${stats.overall}%`, of: 'of the unit', pct: stats.overall },
            { icon: Compass, label: 'Current stage', value: stats.stage.split(' · ')[0], of: stats.stage.split(' · ')[1] ?? '', pct: null },
          ].map((s) => (
            <div key={s.label} className="bg-surface p-5">
              <p className="flex items-center gap-1.5 text-[12px] text-ink-muted">
                <s.icon className="h-4 w-4 text-ink-faint" aria-hidden /> {s.label}
              </p>
              <p className="mt-2 font-serif text-[28px] leading-none text-ink">{s.value}</p>
              <p className="mt-1 truncate text-[12px] text-ink-muted">{s.of}</p>
              {s.pct !== null && <ProgressBar value={s.pct} className="mt-3" label={s.label} />}
            </div>
          ))}
        </div>
      </section>

      {/* Featured exploration */}
      <section aria-labelledby="featured" className="panel overflow-hidden">
        <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="eyebrow mb-2">Featured exploration</p>
            <h2 id="featured" className="font-serif text-[30px] leading-tight text-ink">Explore the World in 1500</h2>
            <p className="mt-3 text-[15px] leading-7 text-ink-muted">Travel through time and discover what was happening across different parts of the world.</p>
            <ul className="mt-5 space-y-1.5 text-[13px] text-ink-soft">
              {events1500.slice(0, 4).map((e) => (
                <li key={e.id} className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bronze" aria-hidden />
                  <span><span className="tabular-nums text-ink-muted">{e.dateLabel}</span> · {e.title}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[12px] text-ink-faint">+ {events1500.length - 4} more events across {regions.length} regions</p>
            <div className="mt-6">
              <ButtonLink to="/explore?year=1500" iconRight={<ArrowRight className="h-4 w-4" />}>Explore the Globe</ButtonLink>
            </div>
          </div>
          <Link to="/explore?year=1500" className="relative block min-h-[300px] border-t border-line bg-[#FAF8F4] md:border-l md:border-t-0" aria-label="Open the interactive globe">
            {webgl ? (
              <ErrorBoundary fallback={flatFallback}>
                <Suspense fallback={<div className="absolute inset-0" />}>
                  <div className="absolute inset-0">
                    <GlobePreview />
                  </div>
                </Suspense>
              </ErrorBoundary>
            ) : (
              <div className="flex h-full items-center p-4">{flatFallback}</div>
            )}
          </Link>
        </div>
      </section>
    </div>
  );
}
