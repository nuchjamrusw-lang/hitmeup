import { BookOpen, Coins, Crown, FlaskConical, HeartPulse, Palette, type LucideIcon } from 'lucide-react';
import type { EventCategory } from '@/types';

export const categoryMeta: Record<EventCategory, { icon: LucideIcon; color: string }> = {
  'Politics & Empire': { icon: Crown, color: '#1B2A41' },
  Religion: { icon: BookOpen, color: '#6B4E7A' },
  'Science & Technology': { icon: FlaskConical, color: '#2F6273' },
  'Art & Ideas': { icon: Palette, color: '#8C6A3F' },
  'Trade & Exploration': { icon: Coins, color: '#3F6E4E' },
  'Society & Health': { icon: HeartPulse, color: '#9A5B2E' },
};

export const categories = Object.keys(categoryMeta) as EventCategory[];

export function CategoryTag({ category }: { category: EventCategory }) {
  const { icon: Icon, color } = categoryMeta[category];
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium" style={{ color }}>
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {category}
    </span>
  );
}
