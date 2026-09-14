import { useCallback, useMemo, useState } from 'react';
import type { LogEntry, Transaction, ViewKey } from '@/types';
import { initialLogs, initialTransactions, flaggedReasons, flaggedTransactionIds } from '@/data/mockData';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { ToastContainer } from '@/components/ToastContainer';
import { DashboardView } from '@/views/DashboardView';
import { ReviewQueueView } from '@/views/ReviewQueueView';
import { SystemLogsView } from '@/views/SystemLogsView';

const viewMeta: Record<ViewKey, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Operational reconciliation overview' },
  review: { title: 'Review Queue', subtitle: 'Flagged transactions awaiting action' },
  logs: { title: 'System Logs', subtitle: 'Reconciliation engine event trail' },
};

function App() {
  const { theme, toggleTheme } = useTheme();
  const { toasts, showToast, dismissToast } = useToast();

  const [activeView, setActiveView] = useState<ViewKey>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const flaggedCount = useMemo(
    () => transactions.filter((t) => t.status === 'Flagged').length,
    [transactions],
  );

  const addLog = useCallback((level: LogEntry['level'], message: string) => {
    setLogs((prev) => [
      ...prev,
      { id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, timestamp: new Date().toISOString(), level, message },
    ]);
  }, []);

  const handleRunScan = useCallback(() => {
    setIsScanning(true);
    addLog('info', 'AI anomaly scan initiated — analyzing 10 transactions...');

    window.setTimeout(() => {
      setTransactions((prev) =>
        prev.map((tx) =>
          flaggedTransactionIds.includes(tx.id)
            ? { ...tx, status: 'Flagged' as const, anomalyReason: flaggedReasons[tx.id] }
            : tx,
        ),
      );
      setIsScanning(false);
      setHasScanned(true);
      addLog('error', 'Scan complete — 3 anomalies detected: TXN-1003, TXN-1005, TXN-1008');
      showToast('AI scan complete — 3 anomalies flagged for review', 'info');
    }, 2000);
  }, [addLog, showToast]);

  const handleApprove = useCallback(
    (id: string) => {
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
      addLog('info', `Transaction ${id} approved and removed from queue.`);
      showToast(`Transaction ${id} approved successfully`, 'success');
    },
    [addLog, showToast],
  );

  const handleReject = useCallback(
    (id: string) => {
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
      addLog('warning', `Transaction ${id} rejected and removed from queue.`);
      showToast(`Transaction ${id} rejected`, 'error');
    },
    [addLog, showToast],
  );

  const handleNavigate = (view: ViewKey) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  const meta = viewMeta[activeView];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        flaggedCount={flaggedCount}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          title={meta.title}
          subtitle={meta.subtitle}
          theme={theme}
          onToggleTheme={toggleTheme}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6">
          {activeView === 'dashboard' && (
            <DashboardView
              transactions={transactions}
              isScanning={isScanning}
              hasScanned={hasScanned}
              onRunScan={handleRunScan}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}
          {activeView === 'review' && (
            <ReviewQueueView transactions={transactions} onApprove={handleApprove} onReject={handleReject} />
          )}
          {activeView === 'logs' && <SystemLogsView logs={logs} />}
        </main>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
