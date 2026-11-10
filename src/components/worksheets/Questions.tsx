import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Check, GripVertical, X } from 'lucide-react';
import type {
  AnswerValue,
  DragDropQ,
  MapQ,
  MatchingQ,
  MultiSelectQ,
  MultipleChoiceQ,
  OrderingQ,
  RegionId,
  ShortAnswerQ,
  SourceAnalysisQ,
  TrueFalseQ,
  WorksheetQuestion,
} from '@/types';
import { regionById } from '@/data/regions';
import FlatMap from '@/components/globe/FlatMap';
import { CopernicusDiagram, PrintingShop } from '@/components/lessons/Illustrations';
import { shuffle } from '@/utils/storage';
import { wordCount } from '@/utils/grading';
import { cn } from '@/utils/cn';

interface QProps<Q extends WorksheetQuestion> {
  q: Q;
  value: AnswerValue | undefined;
  onChange: (v: AnswerValue) => void;
  submitted: boolean;
}

const optionClass = (state: 'idle' | 'chosen' | 'correct' | 'wrong' | 'missed') =>
  cn(
    'flex items-start gap-3 rounded-lg border px-3 py-2.5 text-[14px] transition-colors',
    state === 'correct' && 'border-ok bg-[#EAF1EC]',
    state === 'wrong' && 'border-warn bg-[#F7ECE3]',
    state === 'missed' && 'border-dashed border-ok',
    state === 'chosen' && 'border-ink bg-mist',
    state === 'idle' && 'border-line hover:bg-paper',
  );

const seedOf = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);

/* ---------------- Multiple choice ---------------- */
function MultipleChoice({ q, value, onChange, submitted }: QProps<MultipleChoiceQ>) {
  return (
    <div className="grid gap-2" role="radiogroup">
      {q.options.map((o, i) => {
        const chosen = value === i;
        const state = submitted ? (i === q.correctIndex ? 'correct' : chosen ? 'wrong' : 'idle') : chosen ? 'chosen' : 'idle';
        return (
          <label key={o} className={cn(optionClass(state), !submitted && 'cursor-pointer')}>
            <input type="radio" name={q.id} className="mt-1 accent-[#1B2A41]" checked={chosen} disabled={submitted} onChange={() => onChange(i)} />
            <span className="flex-1 text-ink-soft">{o}</span>
            {submitted && i === q.correctIndex && <Check className="h-4 w-4 text-ok" aria-label="correct answer" />}
            {submitted && chosen && i !== q.correctIndex && <X className="h-4 w-4 text-warn" aria-label="your answer" />}
          </label>
        );
      })}
    </div>
  );
}

/* ---------------- Multi-select (with optional written follow-up) ---------------- */
function MultiSelect({ q, value, onChange, submitted }: QProps<MultiSelectQ>) {
  const v = (value as { selected: number[]; text: string } | undefined) ?? { selected: [], text: '' };
  const toggle = (i: number) => {
    const set = new Set(v.selected);
    set.has(i) ? set.delete(i) : set.add(i);
    onChange({ ...v, selected: [...set].sort() });
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        {q.options.map((o, i) => {
          const chosen = v.selected.includes(i);
          const correct = q.correctIndices.includes(i);
          const state = submitted ? (chosen && correct ? 'correct' : chosen ? 'wrong' : correct ? 'missed' : 'idle') : chosen ? 'chosen' : 'idle';
          return (
            <label key={o} className={cn(optionClass(state), !submitted && 'cursor-pointer')}>
              <input type="checkbox" className="mt-1 accent-[#1B2A41]" checked={chosen} disabled={submitted} onChange={() => toggle(i)} />
              <span className="flex-1 text-ink-soft">{o}</span>
              {submitted && state === 'missed' && <span className="text-[11px] font-medium text-ok">Also correct</span>}
            </label>
          );
        })}
      </div>
      {q.followUp && (
        <div>
          <label htmlFor={`${q.id}-text`} className="mb-1.5 block text-[13px] font-medium text-ink">{q.followUp}</label>
          <textarea
            id={`${q.id}-text`}
            rows={3}
            value={v.text}
            disabled={submitted}
            onChange={(e) => onChange({ ...v, text: e.target.value })}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-[14px] leading-6 text-ink placeholder:text-ink-faint disabled:bg-paper"
            placeholder="Write 2–3 sentences…"
          />
          {submitted && <p className="mt-1 text-[12px] text-ink-muted">Your written explanation is saved for your teacher to review.</p>}
        </div>
      )}
    </div>
  );
}

/* ---------------- True / False ---------------- */
function TrueFalse({ q, value, onChange, submitted }: QProps<TrueFalseQ>) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {[true, false].map((b) => {
        const chosen = value === b;
        const state = submitted ? (b === q.answer ? 'correct' : chosen ? 'wrong' : 'idle') : chosen ? 'chosen' : 'idle';
        return (
          <button
            key={String(b)}
            type="button"
            role="radio"
            aria-checked={chosen}
            disabled={submitted}
            onClick={() => onChange(b)}
            className={cn(optionClass(state), 'min-w-[120px] justify-center font-medium text-ink')}
          >
            {b ? 'True' : 'False'}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- Matching ---------------- */
function Matching({ q, value, onChange, submitted }: QProps<MatchingQ>) {
  const v = (value as Record<string, string> | undefined) ?? {};
  const rights = useMemo(() => shuffle(q.pairs.map((p) => p.right), seedOf(q.id)), [q]);
  return (
    <div className="divide-y divide-line rounded-lg border border-line">
      {q.pairs.map((p) => {
        const ok = v[p.left] === p.right;
        return (
          <div key={p.left} className="grid gap-2 p-3 sm:grid-cols-[200px_1fr] sm:items-center">
            <label htmlFor={`${q.id}-${p.left}`} className="text-[14px] font-medium text-ink">{p.left}</label>
            <div>
              <select
                id={`${q.id}-${p.left}`}
                value={v[p.left] ?? ''}
                disabled={submitted}
                onChange={(e) => onChange({ ...v, [p.left]: e.target.value })}
                className={cn(
                  'h-10 w-full rounded-lg border bg-surface px-2.5 text-[14px] text-ink disabled:opacity-100',
                  submitted ? (ok ? 'border-ok bg-[#EAF1EC]' : 'border-warn bg-[#F7ECE3]') : 'border-line',
                )}
              >
                <option value="">Choose a match…</option>
                {rights.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {submitted && !ok && <p className="mt-1 text-[12px] text-ok">Correct match: {p.right}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Drag and drop (with tap-to-place fallback) ---------------- */
function DragDrop({ q, value, onChange, submitted }: QProps<DragDropQ>) {
  const v = (value as Record<string, string> | undefined) ?? {};
  const [picked, setPicked] = useState<string | null>(null);
  const order = useMemo(() => shuffle(q.items, seedOf(q.id)), [q]);
  const pool = order.filter((it) => !v[it.label]);
  const place = (label: string, cat: string | null) => {
    if (submitted) return;
    const next = { ...v };
    if (cat) next[label] = cat;
    else delete next[label];
    onChange(next);
    setPicked(null);
  };

  const Card = ({ label }: { label: string }) => {
    const item = q.items.find((i) => i.label === label)!;
    const ok = submitted && v[label] === item.category;
    return (
      <button
        type="button"
        draggable={!submitted}
        onDragStart={(e) => e.dataTransfer.setData('text/plain', label)}
        onClick={() => !submitted && setPicked(picked === label ? null : label)}
        aria-pressed={picked === label}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[13px] text-ink shadow-soft transition-colors',
          submitted ? (ok ? 'border-ok bg-[#EAF1EC]' : v[label] ? 'border-warn bg-[#F7ECE3]' : 'border-line bg-surface') : picked === label ? 'border-ink bg-ink text-white' : 'border-line bg-surface hover:border-ink-faint',
          !submitted && 'cursor-grab active:cursor-grabbing',
        )}
      >
        {!submitted && <GripVertical className="h-3.5 w-3.5 opacity-50" aria-hidden />}
        {label}
        {submitted && !ok && v[label] && <span className="text-[11px] text-ok">→ {item.category}</span>}
      </button>
    );
  };

  const Zone = ({ cat, children, title }: { cat: string | null; children: React.ReactNode; title: string }) => {
    const [over, setOver] = useState(false);
    return (
      <div
        onDragOver={(e) => {
          if (submitted) return;
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          place(e.dataTransfer.getData('text/plain'), cat);
        }}
        className={cn('min-h-[110px] rounded-lg border border-dashed p-3 transition-colors', over ? 'border-ink bg-mist' : 'border-line bg-paper')}
      >
        <button
          type="button"
          disabled={!picked || submitted}
          onClick={() => picked && place(picked, cat)}
          className={cn('mb-2 block w-full text-left text-[12px] font-semibold uppercase tracking-wider', picked ? 'text-ink underline-offset-4 hover:underline' : 'text-ink-muted')}
        >
          {title}
          {picked && <span className="ml-1 font-normal normal-case tracking-normal text-bronze-dark">— place “{picked}” here</span>}
        </button>
        <div className="flex flex-wrap gap-2">{children}</div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <Zone cat={null} title={pool.length ? 'Cards to sort' : 'All cards placed'}>
        {pool.map((it) => <Card key={it.label} label={it.label} />)}
      </Zone>
      <div className={cn('grid gap-3', q.categories.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
        {q.categories.map((c) => (
          <Zone key={c} cat={c} title={c}>
            {order.filter((it) => v[it.label] === c).map((it) => <Card key={it.label} label={it.label} />)}
          </Zone>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Chronological ordering ---------------- */
function Ordering({ q, value, onChange, submitted }: QProps<OrderingQ>) {
  const initial = useMemo(() => {
    let s = shuffle(q.items.map((i) => i.label), seedOf(q.id));
    if (s.every((l, i) => l === q.items[i].label)) s = [...s.slice(1), s[0]];
    return s;
  }, [q]);
  const order = (value as string[] | undefined) ?? initial;
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const move = (from: number, to: number) => {
    if (submitted || to < 0 || to >= order.length) return;
    const next = [...order];
    const [x] = next.splice(from, 1);
    next.splice(to, 0, x);
    onChange(next);
  };
  return (
    <div className="space-y-2">
      <ol className="space-y-2">
        {order.map((label, i) => {
          const item = q.items.find((it) => it.label === label)!;
          const correctPos = q.items.findIndex((it) => it.label === label);
          const ok = submitted && correctPos === i;
          return (
            <li
              key={label}
              draggable={!submitted}
              onDragStart={() => setDragIdx(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIdx !== null) move(dragIdx, i);
                setDragIdx(null);
              }}
              className={cn(
                'flex items-center gap-3 rounded-lg border bg-surface px-3 py-2.5',
                submitted ? (ok ? 'border-ok bg-[#EAF1EC]' : 'border-warn bg-[#F7ECE3]') : 'border-line',
                !submitted && 'cursor-grab',
              )}
            >
              <span className="w-5 text-center text-[13px] font-semibold tabular-nums text-ink-faint">{i + 1}</span>
              {!submitted && <GripVertical className="h-4 w-4 text-ink-faint" aria-hidden />}
              <span className="flex-1 text-[14px] text-ink">
                {label}
                {submitted && <span className="ml-2 text-[12px] text-ink-muted">({item.detail}{!ok ? ` · belongs in position ${correctPos + 1}` : ''})</span>}
              </span>
              {!submitted && (
                <span className="flex gap-1">
                  <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} className="inline-flex h-7 w-7 items-center justify-center rounded border border-line hover:bg-mist disabled:opacity-30" aria-label={`Move ${label} up`}>
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={() => move(i, i + 1)} disabled={i === order.length - 1} className="inline-flex h-7 w-7 items-center justify-center rounded border border-line hover:bg-mist disabled:opacity-30" aria-label={`Move ${label} down`}>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {!submitted && value === undefined && (
        <button type="button" onClick={() => onChange(order)} className="text-[12px] font-medium text-bronze-dark hover:text-ink">
          Keep this order as my answer
        </button>
      )}
    </div>
  );
}

/* ---------------- Short answer ---------------- */
function ShortAnswer({ q, value, onChange, submitted }: QProps<ShortAnswerQ>) {
  const text = (value as string | undefined) ?? '';
  const words = wordCount(text);
  return (
    <div>
      <p className="mb-2 text-[13px] text-ink-muted">{q.guidance}</p>
      <textarea
        rows={6}
        value={text}
        disabled={submitted}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-[15px] leading-7 text-ink disabled:bg-paper"
        aria-label="Your answer"
        placeholder="Write your answer here…"
      />
      <div className="mt-1 flex justify-between text-[12px] text-ink-muted">
        <span>{q.minWords ? `Suggested length: at least ${q.minWords} words` : ''}</span>
        <span className={cn(!!q.minWords && words >= q.minWords && 'text-ok')}>{words} words</span>
      </div>
    </div>
  );
}

/* ---------------- Source analysis ---------------- */
function SourceAnalysis({ q, value, onChange, submitted }: QProps<SourceAnalysisQ>) {
  const v = (value as Record<string, string> | undefined) ?? {};
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <figure className="overflow-hidden rounded-lg border border-line bg-surface">
        <div className="p-3">{q.source.illustration === 'copernicus-diagram' ? <CopernicusDiagram /> : <PrintingShop />}</div>
        <figcaption className="border-t border-line bg-paper px-3 py-2.5">
          <p className="font-serif text-[15px] text-ink">{q.source.title}</p>
          <p className="mt-0.5 text-[12px] leading-5 text-ink-muted">{q.source.caption}</p>
          <p className="mt-1 text-[11px] text-ink-faint">{q.source.credit}</p>
        </figcaption>
      </figure>
      <div className="space-y-4">
        {q.parts.map((p, i) => (
          <div key={p.id}>
            <label htmlFor={`${q.id}-${p.id}`} className="block text-[14px] font-medium text-ink">
              {String.fromCharCode(97 + i)}) {p.label}
            </label>
            <p className="mb-1.5 text-[12px] text-ink-muted">{p.guidance}</p>
            <textarea
              id={`${q.id}-${p.id}`}
              rows={3}
              value={v[p.id] ?? ''}
              disabled={submitted}
              onChange={(e) => onChange({ ...v, [p.id]: e.target.value })}
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-[14px] leading-6 text-ink disabled:bg-paper"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Map-based ---------------- */
function MapQuestion({ q, value, onChange, submitted }: QProps<MapQ>) {
  const sel = (value as RegionId | undefined) ?? null;
  const ok = submitted && sel === q.correctRegion;
  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-line">
        <FlatMap
          selectedRegion={submitted ? q.correctRegion : sel}
          showRegionLabels={submitted}
          onSelectRegion={(r) => !submitted && onChange(r)}
          ariaLabel="Map question: click a region"
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px]" aria-live="polite">
        <span className="text-ink-muted">Your selection:</span>
        <span className={cn('font-medium', submitted ? (ok ? 'text-ok' : 'text-warn') : 'text-ink')}>{sel ? regionById[sel].name : 'none yet'}</span>
        {submitted && !ok && <span className="text-ok">· Correct region: {regionById[q.correctRegion].name}</span>}
      </div>
      {!submitted && (
        <div className="mt-2">
          <label htmlFor={`${q.id}-select`} className="sr-only">Or choose a region from the list</label>
          <select
            id={`${q.id}-select`}
            value={sel ?? ''}
            onChange={(e) => e.target.value && onChange(e.target.value as RegionId)}
            className="h-9 rounded-lg border border-line bg-surface px-2 text-[13px]"
          >
            <option value="">Or choose from a list…</option>
            {Object.values(regionById).map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export function QuestionBody(props: QProps<WorksheetQuestion>) {
  const { q } = props;
  switch (q.type) {
    case 'multiple-choice':
      return <MultipleChoice {...props} q={q} />;
    case 'multi-select':
      return <MultiSelect {...props} q={q} />;
    case 'true-false':
      return <TrueFalse {...props} q={q} />;
    case 'matching':
      return <Matching {...props} q={q} />;
    case 'drag-drop':
      return <DragDrop {...props} q={q} />;
    case 'ordering':
      return <Ordering {...props} q={q} />;
    case 'short-answer':
      return <ShortAnswer {...props} q={q} />;
    case 'source-analysis':
      return <SourceAnalysis {...props} q={q} />;
    case 'map':
      return <MapQuestion {...props} q={q} />;
  }
}

export const questionTypeLabel: Record<WorksheetQuestion['type'], string> = {
  'multiple-choice': 'Multiple choice',
  'multi-select': 'Select all that apply',
  'true-false': 'True or false',
  matching: 'Matching',
  'drag-drop': 'Drag and drop',
  ordering: 'Chronological ordering',
  'short-answer': 'Short answer',
  'source-analysis': 'Source analysis',
  map: 'Map question',
};
