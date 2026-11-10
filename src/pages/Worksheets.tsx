import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { worksheets } from '@/data/worksheets';
import { lessonById } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { questionTypeLabel } from '@/components/worksheets/Questions';
import { isAnswered } from '@/utils/grading';

export default function Worksheets() {
  const { progress } = useProgress();
  return (
    <div>
      <PageHeader
        eyebrow="E-Worksheets"
        title="Test Your Understanding"
        subtitle="Each worksheet combines automatically marked questions with written responses for your teacher. Your answers save automatically on this device."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {worksheets.map((w, i) => {
          const att = progress.worksheets[w.id];
          const answered = w.questions.filter((q) => isAnswered(q, att?.answers[q.id])).length;
          const types = [...new Set(w.questions.map((q) => questionTypeLabel[q.type]))];
          const lesson = w.lessonId ? lessonById[w.lessonId] : undefined;
          return (
            <Link key={w.id} to={`/worksheets/${w.id}`} className="panel group flex flex-col p-5 transition-colors hover:border-[#D3CCBF] sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <p className="eyebrow">Worksheet {i + 1}{lesson ? ` · Lesson ${lesson.number}` : ''}</p>
                {att?.submitted ? (
                  <Badge tone="ok"><CheckCircle2 className="h-3 w-3" aria-hidden /> Submitted</Badge>
                ) : answered > 0 ? (
                  <Badge tone="bronze">In progress</Badge>
                ) : (
                  <Badge>Not started</Badge>
                )}
              </div>
              <h2 className="mt-2 font-serif text-[22px] leading-tight text-ink">{w.title}</h2>
              <p className="mt-1.5 text-[14px] leading-6 text-ink-muted">{w.description}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {types.map((t) => <li key={t} className="chip">{t}</li>)}
              </ul>
              <div className="mt-auto pt-5">
                {att?.submitted ? (
                  <p className="text-[13px] text-ink-soft">
                    Score: <strong className="text-ink">{att.score}</strong> / {att.maxScore} auto-marked points
                  </p>
                ) : (
                  <div className="flex items-center gap-3">
                    <ProgressBar value={(answered / w.questions.length) * 100} tone="bronze" className="max-w-[160px]" label="Questions answered" />
                    <span className="text-[12px] text-ink-muted">{answered}/{w.questions.length} answered</span>
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between text-[13px]">
                  <span className="inline-flex items-center gap-1 text-ink-muted"><Clock className="h-3.5 w-3.5" aria-hidden /> about {w.minutes} min · {w.questions.length} questions</span>
                  <span className="inline-flex items-center gap-1 font-medium text-ink group-hover:text-bronze-dark">
                    {att?.submitted ? 'Review' : answered ? 'Continue' : 'Start'} <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
