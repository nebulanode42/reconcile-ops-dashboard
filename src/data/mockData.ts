import type { Transaction, LogEntry } from '@/types';

export const initialTransactions: Transaction[] = [
  { id: 'TXN-1001', timestamp: '2026-09-14T08:15:00Z', amount: 4250.0, source: 'Stripe', status: 'Verified' },
  { id: 'TXN-1002', timestamp: '2026-09-14T08:22:00Z', amount: 180.5, source: 'Internal API', status: 'Verified' },
  { id: 'TXN-1003', timestamp: '2026-09-14T08:30:00Z', amount: 9800.0, source: 'Bank Feed', status: 'Pending' },
  { id: 'TXN-1004', timestamp: '2026-09-14T08:45:00Z', amount: 320.75, source: 'PayPal', status: 'Verified' },
  { id: 'TXN-1005', timestamp: '2026-09-14T09:00:00Z', amount: 1500.0, source: 'Stripe', status: 'Pending' },
  { id: 'TXN-1006', timestamp: '2026-09-14T09:10:00Z', amount: 75.2, source: 'Manual Entry', status: 'Verified' },
  { id: 'TXN-1007', timestamp: '2026-09-14T09:25:00Z', amount: 6400.0, source: 'Bank Feed', status: 'Verified' },
  { id: 'TXN-1008', timestamp: '2026-09-14T09:40:00Z', amount: 220.0, source: 'Internal API', status: 'Pending' },
  { id: 'TXN-1009', timestamp: '2026-09-14T09:55:00Z', amount: 3100.5, source: 'Stripe', status: 'Verified' },
  { id: 'TXN-1010', timestamp: '2026-09-14T10:05:00Z', amount: 890.0, source: 'PayPal', status: 'Verified' },
];

export const flaggedTransactionIds = ['TXN-1003', 'TXN-1005', 'TXN-1008'];

export const flaggedReasons: Record<string, string> = {
  'TXN-1003': 'Duplicate transaction ID detected across Bank Feed and Stripe',
  'TXN-1005': 'Amount formatting anomaly — decimal precision mismatch',
  'TXN-1008': 'Timestamp gap exceeds 15-minute SLA threshold',
};

export const initialLogs: LogEntry[] = [
  { id: 'log-1', timestamp: '2026-09-14T08:00:00Z', level: 'info', message: 'Reconciliation engine initialized — monitoring 10 active sources.' },
  { id: 'log-2', timestamp: '2026-09-14T08:15:00Z', level: 'info', message: 'TXN-1001 verified against Stripe payout batch #482.' },
  { id: 'log-3', timestamp: '2026-09-14T08:30:00Z', level: 'warning', message: 'TXN-1003 pending — awaiting Bank Feed confirmation.' },
  { id: 'log-4', timestamp: '2026-09-14T09:00:00Z', level: 'warning', message: 'TXN-1005 pending — amount precision flag raised.' },
  { id: 'log-5', timestamp: '2026-09-14T09:40:00Z', level: 'warning', message: 'TXN-1008 pending — timestamp gap exceeds SLA.' },
];
