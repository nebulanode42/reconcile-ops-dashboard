import { Menu, Moon, Sun, Search } from 'lucide-react';

interface TopBarProps {
  title: string;
  subtitle: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
}

export function TopBar({ title, subtitle, theme, onToggleTheme, onToggleSidebar }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md md:px-6 dark:border-gray-800 dark:bg-gray-900/80">
      <button
        onClick={onToggleSidebar}
        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden btn-focus dark:text-gray-400 dark:hover:bg-gray-800"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1">
        <h2 className="text-base font-bold text-gray-900 md:text-lg dark:text-white">{title}</h2>
        <p className="hidden text-xs text-gray-500 md:block dark:text-gray-400">{subtitle}</p>
      </div>

      <div className="hidden md:block">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="h-9 w-56 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:bg-gray-800"
          />
        </div>
      </div>

      <button
        onClick={onToggleTheme}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 btn-focus dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
        aria-label="Toggle dark mode"
      >
        {theme === 'light' ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
      </button>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
        OP
      </div>
    </header>
  );
}
