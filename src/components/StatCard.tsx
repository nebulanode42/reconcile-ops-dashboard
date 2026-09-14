import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent: string;
  sublabel?: string;
}

export function StatCard({ label, value, icon: Icon, accent, sublabel }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accent}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      {sublabel && <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{sublabel}</p>}
    </div>
  );
}
