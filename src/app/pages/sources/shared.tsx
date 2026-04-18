import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { TableHead } from '../../components/ui/table';

export type SortDir = 'asc' | 'desc';

export const MotionTr = motion.tr;

export function AnimatedTabContent({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown className="w-3 h-3 ml-1 opacity-40 inline-block" />;
  return dir === 'asc'
    ? <ChevronUp className="w-3 h-3 ml-1 inline-block text-blue-600" />
    : <ChevronDown className="w-3 h-3 ml-1 inline-block text-blue-600" />;
}

export function SortableHead({
  label,
  sortKey,
  currentKey,
  dir,
  onSort,
  className,
}: {
  label: string;
  sortKey: string;
  currentKey: string;
  dir: SortDir;
  onSort: (key: string) => void;
  className?: string;
}) {
  return (
    <TableHead
      className={`cursor-pointer select-none whitespace-nowrap hover:bg-slate-100 transition-colors ${className ?? ''}`}
      onClick={() => onSort(sortKey)}
    >
      {label}
      <SortIcon active={currentKey === sortKey} dir={dir} />
    </TableHead>
  );
}

export type MobileCol = {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (row: any) => React.ReactNode;
  span2?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MobileCardList({ rows, columns }: { rows: any[]; columns: MobileCol[] }) {
  return (
    <div className="md:hidden divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-white">
      {rows.map((row) => (
        <div key={row.id} className="px-4 py-3">
          <p className="text-sm font-semibold text-slate-900 mb-2">{row.name}</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {columns.map((col) => (
              <div key={col.label} className={col.span2 ? 'col-span-2' : ''}>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight mb-0.5">{col.label}</p>
                <div className="text-xs font-medium text-slate-700">{col.render(row)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SourceNote({ children, vintage }: { children: React.ReactNode; vintage?: string }) {
  return (
    <div className="mt-4 px-1">
      {vintage && (
        <span className="inline-block text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full mb-1.5">
          Data vintage: {vintage}
        </span>
      )}
      <p className="text-xs text-slate-400">
        <span className="font-medium text-slate-500">Sources:</span> {children}
      </p>
    </div>
  );
}

export function RiskBadge({ level, label }: { level: string; label: string }) {
  if (level === 'None') return null;
  const color =
    level === 'High' ? 'bg-red-100 text-red-700' :
    level === 'Moderate' ? 'bg-orange-100 text-orange-700' :
    'bg-yellow-100 text-yellow-700';
  return (
    <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded mr-1 mb-1 ${color}`}>
      {label}
    </span>
  );
}

export function PensionBadge({ value }: { value: string }) {
  const color =
    value === 'No' ? 'bg-green-100 text-green-700' :
    value === 'Partial' ? 'bg-yellow-100 text-yellow-700' :
    'bg-red-100 text-red-700';
  const label = value === 'No' ? 'Tax-Free' : value === 'Partial' ? 'Partial' : 'Taxed';
  return <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>{label}</span>;
}

export function DefenseBadge({ value }: { value: string }) {
  const color =
    value === 'High' ? 'bg-blue-100 text-blue-700' :
    value === 'Medium' ? 'bg-slate-100 text-slate-600' :
    'bg-slate-50 text-slate-400';
  return <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>{value}</span>;
}

export function ScorePill({ score }: { score: number }) {
  const color =
    score >= 95 ? 'bg-emerald-100 text-emerald-700' :
    score >= 85 ? 'bg-blue-100 text-blue-700' :
    score >= 65 ? 'bg-yellow-100 text-yellow-700' :
    'bg-slate-100 text-slate-500';
  return <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full tabular-nums ${color}`}>{score}</span>;
}

export function useSortState(initialKey = 'name') {
  const [sortKey, setSortKey] = useState(initialKey);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  function handleSort(key: string) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }
  return { sortKey, sortDir, handleSort };
}

export function sortRows<T extends Record<string, unknown>>(data: T[], sortKey: string, sortDir: SortDir): T[] {
  return [...data].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
    if (typeof av === 'string' && typeof bv === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    return 0;
  });
}
