import { CheckCircle2, AlertTriangle, Clock, DollarSign, ScanLine, Loader2 } from 'lucide-react';
import type { Transaction } from '@/types';
import { StatCard } from '@/components/StatCard';
import { TransactionTable } from '@/components/TransactionTable';

interface DashboardViewProps {
  transactions: Transaction[];
  isScanning: boolean;
  hasScanned: boolean;
  onRunScan: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function DashboardView({
  transactions,
  isScanning,
  hasScanned,
  onRunScan,
  onApprove,
  onReject,
}: DashboardViewProps) {
  const verified = transactions.filter((t) => t.status === 'Verified').length;
  const flagged = transactions.filter((t) => t.status === 'Flagged').length;
  const pending = transactions.filter((t) => t.status === 'Pending').length;
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total Transactions"
          value={transactions.length}
          icon={DollarSign}
          accent="bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400"
          sublabel="Last 24 hours"
        />
        <StatCard
          label="Verified"
          value={verified}
          icon={CheckCircle2}
          accent="bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
          sublabel="Auto-reconciled"
        />
        <StatCard
          label="Pending Review"
          value={pending}
          icon={Clock}
          accent="bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
          sublabel="Awaiting scan"
        />
        <StatCard
          label="Flagged"
          value={flagged}
          icon={AlertTriangle}
          accent="bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
          sublabel="Needs attention"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Transaction Ledger</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {hasScanned
                ? flagged > 0
                  ? `${flagged} anomaly${flagged > 1 ? 'ies' : ''} detected — review flagged rows below`
                  : 'All anomalies resolved — ledger is clean'
                : 'Run an AI anomaly scan to detect formatting issues and duplicates'}
            </p>
          </div>
          <button
            onClick={onRunScan}
            disabled={isScanning || hasScanned}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 btn-focus"
          >
            {isScanning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <ScanLine className="h-4 w-4" />
                {hasScanned ? 'Scan Complete' : 'Run AI Anomaly Scan'}
              </>
            )}
          </button>
        </div>
        <TransactionTable transactions={transactions} onApprove={onApprove} onReject={onReject} />
      </div>
    </div>
  );
}
