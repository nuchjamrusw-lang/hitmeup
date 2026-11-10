import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Library } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems } from './nav';
import { Logo } from './Logo';
import { useProgress } from '@/hooks/useProgress';
import { unitInfo } from '@/data/objectives';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/utils/cn';

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Main">
      <ul className="space-y-0.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] transition-colors',
                  isActive ? 'bg-ink text-white' : 'text-ink-soft hover:bg-mist hover:text-ink',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn('h-[18px] w-[18px]', isActive ? 'text-bronze-light' : 'text-ink-faint group-hover:text-ink-soft')} aria-hidden />
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function UnitCard() {
  const { stats } = useProgress();
  return (
    <div className="rounded-xl border border-line bg-paper p-3.5">
      <p className="eyebrow">Current unit</p>
      <p className="mt-1.5 font-serif text-[17px] leading-tight text-ink">{unitInfo.unit}</p>
      <p className="text-xs text-ink-muted">
        {unitInfo.subject} · {unitInfo.period}
      </p>
      <div className="mt-3 flex items-center justify-between text-[11px] text-ink-muted">
        <span>Unit progress</span>
        <span className="font-medium text-ink">{stats.overall}%</span>
      </div>
      <ProgressBar value={stats.overall} className="mt-1.5" label="Unit progress" />
    </div>
  );
}

function StudentChip() {
  const { progress } = useProgress();
  const initials = progress.studentName
    .split(/\s+/)
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <NavLink to="/progress" className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-mist">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bronze-wash text-xs font-semibold text-bronze-dark" aria-hidden>
        {initials || 'S'}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[13px] font-medium text-ink">{progress.studentName}</span>
        <span className="block text-[11px] text-ink-muted">{unitInfo.level}</span>
      </span>
    </NavLink>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="min-h-screen bg-paper">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-line bg-surface lg:flex">
        <div className="px-5 pb-6 pt-6">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto px-3 scrollbar-thin">
          <NavList />
          <div className="mt-6 px-0.5">
            <UnitCard />
          </div>
        </div>
        <div className="space-y-1 border-t border-line px-3 py-3">
          <NavLink to="/references" className={({ isActive }) => cn('flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px]', isActive ? 'text-ink' : 'text-ink-muted hover:text-ink')}>
            <Library className="h-4 w-4" aria-hidden /> References
          </NavLink>
          <StudentChip />
        </div>
      </aside>

      {/* Mobile / tablet top bar */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-surface/95 px-4 backdrop-blur lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-mist"
          aria-label="Open navigation"
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-40 bg-ink/30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 left-0 z-50 flex w-[290px] max-w-[85vw] flex-col bg-surface shadow-lift lg:hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'tween', duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <Logo />
                <button type="button" onClick={() => setOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-mist" aria-label="Close navigation">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-3">
                <NavList onNavigate={() => setOpen(false)} />
                <div className="mt-6">
                  <UnitCard />
                </div>
              </div>
              <div className="space-y-1 border-t border-line px-3 py-3">
                <NavLink to="/references" className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] text-ink-muted hover:text-ink">
                  <Library className="h-4 w-4" aria-hidden /> References
                </NavLink>
                <StudentChip />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main id="main" className="lg:pl-64" tabIndex={-1}>
        <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 md:py-10 lg:px-10">{children}</div>
      </main>
    </div>
  );
}
