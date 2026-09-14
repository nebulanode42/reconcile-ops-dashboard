import { Check, X } from 'lucide-react';
import type { Transaction } from '@/types';
import { StatusBadge } from './StatusBadge';

interface TransactionTableProps {
  transactions: Transaction[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

function formatAmount(amount: number) {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function formatTimestamp(ts: string) {
  const d = new Date(ts);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function TransactionTable({ transactions, onApprove, onReject }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No transactions to display</p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">All flagged items have been resolved.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <th className="px-4 py-3 font-semibold">Transaction ID</th>
            <th className="px-4 py-3 font-semibold">Timestamp</th>
            <th className="px-4 py-3 text-right font-semibold">Amount</th>
            <th className="px-4 py-3 font-semibold">Source</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => {
            const isFlagged = tx.status === 'Flagged';
            return (
              <tr
                key={tx.id}
                className={`border-b border-gray-100 transition-colors dark:border-gray-800/50 ${
                  isFlagged
                    ? 'bg-red-50 animate-flag-pulse dark:bg-red-950/30'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
                }`}
              >
                <td className="px-4 py-3 font-mono text-xs font-medium text-gray-700 dark:text-gray-300">
                  {tx.id}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  {formatTimestamp(tx.timestamp)}
                </td>
                <td className="px-4 py-3 text-right font-mono font-medium text-gray-900 dark:text-white">
                  {formatAmount(tx.amount)}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{tx.source}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <StatusBadge status={tx.status} />
                    {isFlagged && tx.anomalyReason && (
                      <span className="text-[11px] text-red-600 dark:text-red-400" title={tx.anomalyReason}>
                        {tx.anomalyReason}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {isFlagged ? (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onApprove(tx.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-green-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green-700 btn-focus"
                        aria-label={`Approve ${tx.id}`}
                      >
                        <Check className="h-3.5 w-3.5" />
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(tx.id)}
                        className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 btn-focus"
                        aria-label={`Reject ${tx.id}`}
                      >
                        <X className="h-3.5 w-3.5" />
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="block text-right text-xs text-gray-300 dark:text-gray-600">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
