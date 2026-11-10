import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BookOpenText, CheckCircle2, ClipboardList, Compass, Globe2, Pencil, Printer, RotateCcw } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { lessons } from '@/data/lessons';
import { worksheets } from '@/data/worksheets';
import { regions } from '@/data/regions';
import { PageHeader, SectionTitle } from '@/components/ui/PageHeader';
import { ProgressBar, ProgressRing } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { ActivityKind } from '@/types';

const activityIcon: Record<ActivityKind, typeof BookOpenText> = {
  'lesson-started': BookOpenText,
  'lesson-completed': CheckCircle2,
  'check-completed': Pencil,
  'worksheet-submitted': ClipboardList,
  'region-explored': Globe2,
  'model-explored': Printer,
};

export default function Progress() {
  const { progress, stats, dispatch, resetAll } = useProgress();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(progress.studentName);

  const quizData = [
    ...lessons.map((l) => {
      const lp = progress.lessons[l.id];
      return { name: `L${l.number} check`, pct: lp?.checkScore !== undefined ? Math.round((lp.checkScore / l.knowledgeCheck.length) * 100) : null, kind: 'check' };
    }),
    ...worksheets.map((w, i) => {
      const a = progress.worksheets[w.id];
      return { name: `WS${i + 1}`, pct: a?.submitted && a.maxScore ? Math.round(((a.score ?? 0) / a.maxScore) * 100) : null, kind: 'worksheet' };
    }),
  ];
  const hasQuiz = quizData.some((d) => d.pct !== null);

  // Areas to review: weak knowledge checks / worksheets, unfinished lessons.
  const review: { label: string; to: string; reason: string }[] = [];
  lessons.forEach((l) => {
    const lp = progress.lessons[l.id];
    if (lp?.checkScore !== undefined && lp.checkScore < l.knowledgeCheck.length * 0.67)
      review.push({ label: `Lesson ${l.number}: ${l.title}`, to: `/lessons/${l.id}#check`, reason: `Knowledge check ${lp.checkScore}/${l.knowledgeCheck.length}` });
  });
  worksheets.forEach((w) => {
    const a = progress.worksheets[w.id];
    if (a?.submitted && a.maxScore && (a.score ?? 0) / a.maxScore < 0.7) {
      const wrong = w.questions.filter((q) => a.results?.[q.id] === false).length;
      review.push({ label: w.title, to: `/worksheets/${w.id}`, reason: `${a.score}/${a.maxScore} points · ${wrong} question(s) to review` });
    }
  });

  const journey = progress.activity;

  return (
    <div>
      <PageHeader
        eyebrow="Student progress"
        title="My Progress"
        subtitle="A record of your learning in this unit, to help you reflect on what you know and what to revisit."
        actions={
          <>
            <Button variant="secondary" size="sm" icon={<Printer className="h-4 w-4" />} onClick={() => window.print()}>
              Print summary
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<RotateCcw className="h-4 w-4" />}
              onClick={() => window.confirm('Reset all progress saved on this device? This cannot be undone.') && resetAll()}
            >
              Reset progress
            </Button>
          </>
        }
      />

      {/* Profile + overall */}
      <section className="panel grid gap-6 p-5 sm:p-6 md:grid-cols-[auto_1fr_auto] md:items-center">
        <ProgressRing value={stats.overall} size={88} stroke={6} label={`Overall unit completion ${stats.overall}%`} />
        <div>
          {editing ? (
            <form
              className="flex flex-wrap items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch({ type: 'rename', name: name.trim() });
                setEditing(false);
              }}
            >
              <label htmlFor="student-name" className="sr-only">Your name</label>
              <input id="student-name" value={name} onChange={(e) => setName(e.target.value)} className="h-9 rounded-lg border border-line px-3 text-[15px]" maxLength={40} autoFocus />
              <Button size="sm" type="submit">Save</Button>
            </form>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-[24px] text-ink">{progress.studentName}</h2>
              <button type="button" onClick={() => setEditing(true)} className="inline-flex h-7 w-7 items-center justify-center rounded-md text-ink-muted hover:bg-mist hover:text-ink" aria-label="Edit name">
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <p className="mt-1 text-[14px] text-ink-muted">
            Overall unit completion: <strong className="text-ink">{stats.overall}%</strong> · Current stage: {stats.stage}
          </p>
          <p className="mt-1 text-[12px] text-ink-faint">Progress is saved in this browser only. A teacher account system can be added later.</p>
        </div>
        <dl className="grid grid-cols-3 gap-6 text-center">
          <div><dt className="text-[11px] text-ink-muted">Lessons</dt><dd className="font-serif text-2xl text-ink">{stats.lessonsCompleted}/{stats.lessonsTotal}</dd></div>
          <div><dt className="text-[11px] text-ink-muted">Worksheets</dt><dd className="font-serif text-2xl text-ink">{stats.worksheetsCompleted}/{stats.worksheetsTotal}</dd></div>
          <div><dt className="text-[11px] text-ink-muted">Regions</dt><dd className="font-serif text-2xl text-ink">{progress.regionsExplored.length}/{regions.length}</dd></div>
        </dl>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Lessons */}
        <section>
          <SectionTitle title="Completed lessons" />
          <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
            {lessons.map((l) => {
              const lp = progress.lessons[l.id];
              return (
                <li key={l.id}>
                  <Link to={`/lessons/${l.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-paper">
                    <span className="w-6 font-serif text-lg text-ink-faint">{l.number}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium text-ink">{l.title}</span>
                      <span className="block text-[12px] text-ink-muted">
                        {lp?.sectionsRead.length ?? 0}/{l.sections.length} sections read
                        {lp?.checkScore !== undefined && ` · check ${lp.checkScore}/${l.knowledgeCheck.length}`}
                      </span>
                    </span>
                    <Badge tone={lp?.completed ? 'ok' : lp?.started ? 'bronze' : 'neutral'}>{lp?.completed ? 'Completed' : lp?.started ? 'In progress' : 'Not started'}</Badge>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Worksheets */}
        <section>
          <SectionTitle title="Completed worksheets" />
          <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
            {worksheets.map((w, i) => {
              const a = progress.worksheets[w.id];
              return (
                <li key={w.id}>
                  <Link to={`/worksheets/${w.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-paper">
                    <span className="w-6 text-[12px] font-semibold text-ink-faint">WS{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium text-ink">{w.title}</span>
                      <span className="block text-[12px] text-ink-muted">
                        {a?.submitted ? `${a.score}/${a.maxScore} auto-marked · submitted ${new Date(a.submittedAt!).toLocaleDateString()}` : 'Not yet submitted'}
                      </span>
                    </span>
                    {a?.submitted ? <Badge tone="ok">Submitted</Badge> : <Badge>Open</Badge>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Quiz results chart */}
      <section className="mt-10">
        <SectionTitle title="Quiz results" kicker="Knowledge checks and worksheets (auto-marked parts)" />
        <div className="panel p-4 sm:p-5">
          {hasQuiz ? (
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quizData.map((d) => ({ ...d, value: d.pct ?? 0 }))} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#EFEAE2" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#5F6B7A' }} axisLine={{ stroke: '#E7E2D9' }} tickLine={false} />
                  <YAxis domain={[0, 100]} ticks={[0, 50, 100]} tick={{ fontSize: 11, fill: '#8A93A0' }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip
                    cursor={{ fill: '#F2EFE9' }}
                    contentStyle={{ borderRadius: 8, border: '1px solid #E7E2D9', fontSize: 12 }}
                    formatter={(_v, _n, item) => (item.payload.pct === null ? ['Not attempted', ''] : [`${item.payload.pct}%`, 'Score'])}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={36}>
                    {quizData.map((d) => (
                      <Cell key={d.name} fill={d.pct === null ? '#EFEAE2' : d.kind === 'check' ? '#1B2A41' : '#8C6A3F'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="py-10 text-center text-[14px] text-ink-muted">Complete a knowledge check or worksheet to see your results here.</p>
          )}
          <div className="mt-2 flex gap-4 text-[11px] text-ink-muted">
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-ink" /> Lesson knowledge checks</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-bronze" /> Worksheets</span>
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Objectives */}
        <section>
          <SectionTitle title="Learning objectives" />
          <ul className="space-y-3">
            {stats.objectives.map((o, i) => (
              <li key={o.id} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[14px] font-medium leading-snug text-ink">{i + 1}. {o.title}</p>
                  <Badge tone={o.status === 'achieved' ? 'ok' : o.status === 'in-progress' ? 'bronze' : 'neutral'}>
                    {o.status === 'achieved' ? 'Achieved' : o.status === 'in-progress' ? 'In progress' : 'Not started'}
                  </Badge>
                </div>
                <ProgressBar value={o.ratio * 100} className="mt-3" tone={o.status === 'achieved' ? 'ok' : 'ink'} label={`Objective ${i + 1}`} />
              </li>
            ))}
          </ul>
        </section>

        {/* Review */}
        <section>
          <SectionTitle title="Areas for further review" />
          {review.length === 0 ? (
            <div className="rounded-xl border border-line bg-surface p-5 text-[14px] leading-6 text-ink-muted">
              {hasQuiz ? 'No areas flagged right now. Keep reviewing the explanations in your submitted work.' : 'Areas to review will appear here after you complete knowledge checks and worksheets.'}
            </div>
          ) : (
            <ul className="space-y-2">
              {review.map((r) => (
                <li key={r.label}>
                  <Link to={r.to} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface p-4 hover:border-ink-faint">
                    <span>
                      <span className="block text-[14px] font-medium text-ink">{r.label}</span>
                      <span className="block text-[12px] text-warn">{r.reason}</span>
                    </span>
                    <span className="text-[13px] font-medium text-bronze-dark">Review →</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6">
            <p className="eyebrow mb-2">Regions explored on the globe</p>
            <ul className="flex flex-wrap gap-1.5">
              {regions.map((r) => (
                <li key={r.id}>
                  <Link to={`/explore?region=${r.id}`} className={`chip ${progress.regionsExplored.includes(r.id) ? 'border-ink bg-ink text-white' : ''}`}>
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Journey */}
      <section className="mt-10">
        <SectionTitle title="Your Learning Journey" kicker="Activities in the order you completed them" />
        {journey.length === 0 ? (
          <div className="rounded-xl border border-line bg-surface p-6 text-[14px] text-ink-muted">
            Your journey will appear here as you start lessons, explore the globe and submit worksheets.{' '}
            <Link to="/lessons" className="font-medium text-bronze-dark hover:text-ink">Begin with Lesson 1 →</Link>
          </div>
        ) : (
          <ol className="relative ml-3 border-l border-line">
            {journey.map((a) => {
              const Icon = activityIcon[a.kind] ?? Compass;
              return (
                <li key={a.id} className="relative pb-5 pl-7 last:pb-0">
                  <span className="absolute -left-[13px] top-0 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-line bg-surface">
                    <Icon className="h-3.5 w-3.5 text-ink-soft" aria-hidden />
                  </span>
                  <p className="text-[14px] text-ink">{a.label}</p>
                  <p className="text-[12px] text-ink-muted">
                    <time dateTime={a.at}>{new Date(a.at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</time>
                    {a.detail && ` · ${a.detail}`}
                  </p>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
}
