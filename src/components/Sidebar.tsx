import { LayoutDashboard, ListChecks, ScrollText, X } from 'lucide-react';
import type { ViewKey } from '@/types';

interface SidebarProps {
  activeView: ViewKey;
  onNavigate: (view: ViewKey) => void;
  flaggedCount: number;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { key: ViewKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'review', label: 'Review Queue', icon: ListChecks },
  { key: 'logs', label: 'System Logs', icon: ScrollText },
];

export function Sidebar({ activeView, onNavigate, flaggedCount, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed z-40 flex h-full w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 dark:border-gray-800 dark:bg-gray-900 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight text-gray-900 dark:text-white">ReconcileOps</h1>
              <p className="text-[11px] leading-tight text-gray-500 dark:text-gray-400">Data Reconciliation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden btn-focus dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = activeView === item.key;
            const showBadge = item.key === 'review' && flaggedCount > 0;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors btn-focus ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                }`}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {showBadge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
                    {flaggedCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <div className="rounded-lg bg-gray-50 p-3 text-xs dark:bg-gray-800/50">
            <p className="font-semibold text-gray-700 dark:text-gray-300">System Status</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-gray-500 dark:text-gray-400">All systems operational</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
