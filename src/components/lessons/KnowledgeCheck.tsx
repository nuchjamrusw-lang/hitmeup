import { useState } from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import type { McQuestion } from '@/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export function KnowledgeCheck({
  questions,
  saved,
  onSubmit,
}: {
  questions: McQuestion[];
  saved?: Record<string, number>;
  onSubmit: (answers: Record<string, number>, score: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>(saved ?? {});
  const [submitted, setSubmitted] = useState(!!saved);
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const score = questions.filter((q) => answers[q.id] === q.correctIndex).length;

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => (
        <fieldset key={q.id} className="rounded-xl border border-line bg-surface p-4 sm:p-5">
          <legend className="sr-only">Question {qi + 1}</legend>
          <p className="text-[15px] font-medium text-ink">
            <span className="mr-2 text-ink-faint tabular-nums">{qi + 1}.</span>
            {q.prompt}
          </p>
          <div className="mt-3 grid gap-2">
            {q.options.map((opt, i) => {
              const chosen = answers[q.id] === i;
              const correct = submitted && i === q.correctIndex;
              const wrong = submitted && chosen && i !== q.correctIndex;
              return (
                <label
                  key={opt}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-[14px] transition-colors',
                    correct ? 'border-ok bg-[#EAF1EC]' : wrong ? 'border-warn bg-[#F7ECE3]' : chosen ? 'border-ink bg-mist' : 'border-line hover:bg-paper',
                    submitted && 'cursor-default',
                  )}
                >
                  <input
                    type="radio"
                    name={q.id}
                    className="mt-1 accent-[#1B2A41]"
                    checked={chosen}
                    disabled={submitted}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  />
                  <span className="flex-1 text-ink-soft">{opt}</span>
                  {correct && <Check className="h-4 w-4 text-ok" aria-label="Correct answer" />}
                  {wrong && <X className="h-4 w-4 text-warn" aria-label="Your answer, incorrect" />}
                </label>
              );
            })}
          </div>
          {submitted && <p className="mt-3 rounded-md bg-paper px-3 py-2 text-[13px] leading-5 text-ink-soft">{q.explanation}</p>}
        </fieldset>
      ))}
      <div className="flex flex-wrap items-center gap-3">
        {!submitted ? (
          <>
            <Button
              onClick={() => {
                setSubmitted(true);
                onSubmit(answers, score);
              }}
              disabled={!allAnswered}
            >
              Check my answers
            </Button>
            {!allAnswered && <span className="text-[12px] text-ink-muted">Answer all {questions.length} questions to check.</span>}
          </>
        ) : (
          <>
            <p className="text-[14px] text-ink" aria-live="polite">
              You answered <strong>{score}</strong> of {questions.length} correctly.
            </p>
            <Button
              variant="secondary"
              size="sm"
              icon={<RotateCcw className="h-3.5 w-3.5" />}
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
            >
              Try again
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
