import type { TransactionStatus } from '@/types';

const statusStyles: Record<TransactionStatus, string> = {
  Verified:
    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Pending:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Flagged:
    'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  Rejected:
    'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

export function StatusBadge({ status }: { status: TransactionStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === 'Verified'
            ? 'bg-green-500'
            : status === 'Pending'
              ? 'bg-amber-500'
              : status === 'Flagged'
                ? 'bg-red-500'
                : 'bg-gray-400'
        }`}
      />
      {status}
    </span>
  );
}
