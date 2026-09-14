import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import type { Toast } from '@/types';

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle2,
    bg: 'bg-green-50 dark:bg-green-900/90',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-200',
    iconColor: 'text-green-500',
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-50 dark:bg-red-900/90',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
    iconColor: 'text-red-500',
  },
  info: {
    icon: Info,
    bg: 'bg-brand-50 dark:bg-brand-900/90',
    border: 'border-brand-200 dark:border-brand-800',
    text: 'text-brand-800 dark:text-brand-200',
    iconColor: 'text-brand-500',
  },
} as const;

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const config = toastConfig[toast.type];
        const Icon = config.icon;
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 rounded-lg border ${config.border} ${config.bg} px-4 py-3 shadow-lg animate-slide-in min-w-[280px] max-w-[380px]`}
            role="alert"
          >
            <Icon className={`h-5 w-5 shrink-0 ${config.iconColor}`} />
            <p className={`flex-1 text-sm font-medium ${config.text}`}>{toast.message}</p>
            <button
              onClick={() => onDismiss(toast.id)}
              className={`shrink-0 rounded p-0.5 ${config.text} opacity-60 hover:opacity-100 btn-focus`}
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
