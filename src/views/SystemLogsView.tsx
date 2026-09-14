import { Info, AlertTriangle, AlertOctagon } from 'lucide-react';
import type { LogEntry } from '@/types';

interface SystemLogsViewProps {
  logs: LogEntry[];
}

const levelConfig = {
  info: {
    icon: Info,
    color: 'text-brand-500',
    bg: 'bg-brand-50 dark:bg-brand-900/30',
    label: 'INFO',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/30',
    label: 'WARN',
  },
  error: {
    icon: AlertOctagon,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/30',
    label: 'ERROR',
  },
} as const;

function formatTimestamp(ts: string) {
  const d = new Date(ts);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function SystemLogsView({ logs }: SystemLogsViewProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">System Activity Log</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Real-time events from the reconciliation engine</p>
      </div>
      <div className="max-h-[calc(100vh-220px)] overflow-y-auto scrollbar-thin p-2">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">No log entries yet.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map((log) => {
              const config = levelConfig[log.level];
              const Icon = config.icon;
              return (
                <div
                  key={log.id}
                  className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40"
                >
                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${config.bg}`}>
                    <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold tracking-wider ${config.color}`}>{config.label}</span>
                      <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-300">{log.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
