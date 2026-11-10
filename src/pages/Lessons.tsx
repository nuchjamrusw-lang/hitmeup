import { ArrowRight, CheckCircle2, Circle, Clock, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lessons } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { unitInfo } from '@/data/objectives';

export default function Lessons() {
  const { progress, stats } = useProgress();
  return (
    <div>
      <PageHeader
        eyebrow={`${unitInfo.subject} · ${unitInfo.period}`}
        title="Lessons"
        subtitle="Five lessons take you from the origins of the Renaissance in Italy to the global connections and religious changes that followed."
      />
      <div className="mb-8 flex flex-wrap items-center gap-4 text-[13px] text-ink-muted">
        <span>
          <strong className="text-ink">{stats.lessonsCompleted}</strong> of {stats.lessonsTotal} lessons completed
        </span>
        <ProgressBar value={(stats.lessonsCompleted / stats.lessonsTotal) * 100} className="max-w-xs" label="Lessons completed" />
      </div>
      <ol className="space-y-3">
        {lessons.map((l) => {
          const lp = progress.lessons[l.id];
          const read = lp ? lp.sectionsRead.length / l.sections.length : 0;
          const status = lp?.completed ? 'Completed' : lp?.started ? 'In progress' : 'Not started';
          return (
            <li key={l.id}>
              <Link to={`/lessons/${l.id}`} className="panel group flex flex-col gap-4 p-5 transition-colors hover:border-[#D3CCBF] sm:flex-row sm:items-center sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-paper font-serif text-xl text-ink">{l.number}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-serif text-[21px] leading-tight text-ink">{l.title}</h2>
                    <Badge tone={lp?.completed ? 'ok' : lp?.started ? 'bronze' : 'neutral'}>{status}</Badge>
                  </div>
                  <p className="mt-1 text-[14px] text-ink-muted">{l.subtitle}</p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-ink-faint">
                    {l.sections.map((s) => (
                      <li key={s.id} className="inline-flex items-center gap-1">
                        {lp?.sectionsRead.includes(s.id) ? <CheckCircle2 className="h-3 w-3 text-ok" aria-label="read" /> : <Circle className="h-3 w-3" aria-hidden />}
                        {s.heading}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                  <span className="inline-flex items-center gap-1 text-[12px] text-ink-muted">
                    <Clock className="h-3.5 w-3.5" aria-hidden /> {l.minutes} min
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink group-hover:text-bronze-dark">
                    {lp?.completed ? 'Review' : lp?.started ? 'Continue' : 'Start'}
                    {lp?.started && !lp.completed ? <PlayCircle className="h-4 w-4" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}
                  </span>
                  {lp?.started && !lp.completed && <ProgressBar value={read * 100} tone="bronze" className="w-24" label="Sections read" />}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
