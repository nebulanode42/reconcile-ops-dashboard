export type TransactionStatus = 'Verified' | 'Pending' | 'Flagged' | 'Rejected';

export type TransactionSource = 'Stripe' | 'Internal API' | 'Bank Feed' | 'Manual Entry' | 'PayPal';

export interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  source: TransactionSource;
  status: TransactionStatus;
  anomalyReason?: string;
}

export type ViewKey = 'dashboard' | 'review' | 'logs';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
