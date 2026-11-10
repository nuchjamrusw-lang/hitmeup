import { lazy, Suspense, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { pressParts, pressSteps, type PressPartId } from '@/data/printingPress';
import { useWebGL } from '@/hooks/useWebGL';
import { useProgress } from '@/hooks/useProgress';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { SceneLoading } from '@/components/ui/Loading';
import { PrintingShop } from '@/components/lessons/Illustrations';
import { cn } from '@/utils/cn';

const PrintingPressScene = lazy(() => import('./PrintingPressScene'));

export function PrintingPressModule() {
  const webgl = useWebGL();
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<PressPartId | null>(null);
  const [step, setStep] = useState(0);
  const { progress, dispatch } = useProgress();
  const current = pressSteps[step];
  const part = selected ? pressParts.find((p) => p.id === selected)! : null;
  const use3d = webgl && !failed;

  const goStep = (i: number) => {
    const n = Math.max(0, Math.min(pressSteps.length - 1, i));
    setStep(n);
    setSelected(null);
    dispatch({ type: 'viewPressStep', step: n });
  };

  return (
    <section className="panel overflow-hidden" aria-labelledby="press-title">
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-line px-4 py-3 sm:px-5">
        <div>
          <p className="eyebrow">3D learning object</p>
          <h3 id="press-title" className="font-serif text-xl text-ink">How a Gutenberg-style printing press worked</h3>
        </div>
        <p className="text-[11px] text-ink-muted">Simplified reconstruction · Gutenberg’s own press does not survive</p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,1fr)]">
        <div className="relative aspect-[4/3] border-b border-line bg-[#F6F2EA] lg:aspect-auto lg:min-h-[480px] lg:border-b-0 lg:border-r">
          {use3d ? (
            <ErrorBoundary fallback={null} onError={() => setFailed(true)}>
              <Suspense fallback={<SceneLoading label="Building the press…" />}>
                <PrintingPressScene pose={current.pose} highlighted={selected ? [] : current.focus} selected={selected} onSelect={setSelected} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <div className="flex h-full items-center justify-center p-4">
              <PrintingShop />
            </div>
          )}
          {use3d && <p className="pointer-events-none absolute bottom-2 left-3 text-[11px] text-ink-faint">Drag to rotate · select a numbered hotspot</p>}
          {!use3d && (
            <p className="absolute bottom-2 left-3 right-3 text-[11px] text-ink-muted">3D is unavailable on this device — use the parts list and steps instead.</p>
          )}
        </div>

        <div className="flex flex-col">
          {/* Part details */}
          <div className="min-h-[180px] border-b border-line p-4 sm:p-5">
            {part ? (
              <div>
                <p className="eyebrow">Component {pressParts.indexOf(part) + 1}</p>
                <h4 className="mt-1 font-serif text-lg text-ink">{part.name}</h4>
                <p className="mt-2 text-[14px] leading-6 text-ink-soft">{part.detail}</p>
                <button type="button" onClick={() => setSelected(null)} className="mt-3 text-[12px] font-medium text-bronze-dark hover:text-ink">
                  Back to step {step + 1}
                </button>
              </div>
            ) : (
              <div>
                <p className="eyebrow">
                  Step {step + 1} of {pressSteps.length}
                </p>
                <h4 className="mt-1 font-serif text-lg text-ink">{current.title}</h4>
                <p className="mt-2 text-[14px] leading-6 text-ink-soft">{current.text}</p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2.5 sm:px-5">
            <button type="button" onClick={() => goStep(step - 1)} disabled={step === 0} className="inline-flex h-8 items-center gap-1 rounded-md border border-line px-2.5 text-[12px] font-medium disabled:opacity-40 hover:bg-mist">
              <ChevronLeft className="h-4 w-4" aria-hidden /> Previous
            </button>
            <div className="flex gap-1" role="tablist" aria-label="Printing steps">
              {pressSteps.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  aria-selected={i === step}
                  aria-label={`Step ${i + 1}: ${s.title}`}
                  onClick={() => goStep(i)}
                  className={cn('h-2 w-2 rounded-full', i === step ? 'bg-ink' : progress.pressStepsViewed.includes(i) ? 'bg-bronze-light' : 'bg-line')}
                />
              ))}
            </div>
            {step < pressSteps.length - 1 ? (
              <button type="button" onClick={() => goStep(step + 1)} className="inline-flex h-8 items-center gap-1 rounded-md bg-ink px-2.5 text-[12px] font-medium text-white hover:bg-[#24364F]">
                Next <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button type="button" onClick={() => goStep(0)} className="inline-flex h-8 items-center gap-1 rounded-md border border-line px-2.5 text-[12px] font-medium hover:bg-mist">
                <RotateCw className="h-3.5 w-3.5" aria-hidden /> Restart
              </button>
            )}
          </div>
          {/* Parts list (also the keyboard / no-3D route) */}
          <ol className="grid flex-1 grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {pressParts.map((p, i) => (
              <li key={p.id} className="bg-surface">
                <button
                  type="button"
                  onClick={() => setSelected(p.id)}
                  className={cn('flex w-full items-start gap-2.5 px-4 py-2 text-left hover:bg-mist', selected === p.id && 'bg-mist')}
                  aria-pressed={selected === p.id}
                >
                  <span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold', selected === p.id ? 'bg-ink text-white' : 'bg-mist text-ink-soft')}>{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium leading-tight text-ink">{p.name}</span>
                    <span className="block text-[11px] text-ink-muted">{p.short}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
