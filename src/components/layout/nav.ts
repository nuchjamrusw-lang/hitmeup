import { BookOpenText, ClipboardList, Compass, GanttChartSquare, Globe2, LayoutGrid, type LucideIcon } from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/explore', label: 'Explore the World', icon: Globe2 },
  { to: '/timeline', label: 'Timeline', icon: GanttChartSquare },
  { to: '/lessons', label: 'Lessons', icon: BookOpenText },
  { to: '/worksheets', label: 'Worksheets', icon: ClipboardList },
  { to: '/progress', label: 'My Progress', icon: Compass },
];
