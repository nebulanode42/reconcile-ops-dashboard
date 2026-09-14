import { Check, X, AlertTriangle } from 'lucide-react';
import type { Transaction } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';

interface ReviewQueueViewProps {
  transactions: Transaction[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

function formatAmount(amount: number) {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function ReviewQueueView({ transactions, onApprove, onReject }: ReviewQueueViewProps) {
  const flagged = transactions.filter((t) => t.status === 'Flagged');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/40">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <p className="text-sm text-amber-800 dark:text-amber-300">
          {flagged.length > 0
            ? `${flagged.length} transaction${flagged.length > 1 ? 's' : ''} flagged for review. Approve or reject each item below.`
            : 'No flagged transactions. Run an AI anomaly scan from the Dashboard to detect issues.'}
        </p>
      </div>

      {flagged.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
            <Check className="h-7 w-7 text-green-600 dark:text-green-400" />
          </div>
          <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">Queue is empty</p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">All flagged items have been resolved.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {flagged.map((tx) => (
            <div
              key={tx.id}
              className="rounded-xl border border-red-200 bg-red-50/50 p-4 shadow-sm dark:border-red-900 dark:bg-red-950/20"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-gray-700 dark:text-gray-300">{tx.id}</span>
                <StatusBadge status={tx.status} />
              </div>
              <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{formatAmount(tx.amount)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{tx.source}</p>
              {tx.anomalyReason && (
                <p className="mt-2 rounded-md bg-red-100/60 px-2.5 py-1.5 text-[11px] text-red-700 dark:bg-red-900/30 dark:text-red-300">
                  {tx.anomalyReason}
                </p>
              )}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => onApprove(tx.id)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-700 btn-focus"
                >
                  <Check className="h-3.5 w-3.5" />
                  Approve
                </button>
                <button
                  onClick={() => onReject(tx.id)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700 btn-focus"
                >
                  <X className="h-3.5 w-3.5" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
