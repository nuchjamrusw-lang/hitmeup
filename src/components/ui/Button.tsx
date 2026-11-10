import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'quiet';
type Size = 'sm' | 'md';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-45 disabled:cursor-not-allowed select-none whitespace-nowrap';
const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-[#24364F] active:bg-[#16233A]',
  secondary: 'bg-surface text-ink border border-line hover:border-[#D3CCBF] hover:bg-mist',
  ghost: 'text-ink-soft hover:bg-mist hover:text-ink',
  quiet: 'text-bronze-dark hover:text-ink underline-offset-4 hover:underline px-0',
};
const sizes: Record<Size, string> = { sm: 'h-8 px-3 text-[13px]', md: 'h-10 px-4 text-sm' };

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = 'primary', size = 'md', icon, iconRight, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cn(base, variants[variant], variant !== 'quiet' && sizes[size], className)} {...rest}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
});

interface LinkBtnProps extends LinkProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export function ButtonLink({ variant = 'primary', size = 'md', icon, iconRight, className, children, ...rest }: LinkBtnProps) {
  return (
    <Link className={cn(base, variants[variant], variant !== 'quiet' && sizes[size], className)} {...rest}>
      {icon}
      {children}
      {iconRight}
    </Link>
  );
}
