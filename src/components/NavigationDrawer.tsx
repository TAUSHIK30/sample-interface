import React from 'react';
import { X, Moon, Sun, BarChart2, Compass, Newspaper, Users, Bookmark, Calendar, Sliders, ShieldCheck } from 'lucide-react';
import { ScreenTab } from './BottomNav';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onChangeTab: (tab: ScreenTab) => void;
  onOpenGetStarted: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  onChangeTab,
  onOpenGetStarted,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer Panel */}
      <div className="relative w-80 max-w-[85vw] bg-white dark:bg-[#1e222d] text-[#131722] dark:text-[#f0f3fa] h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-[#2a2e39] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-6 text-[#131722] dark:text-white fill-current" viewBox="0 0 36 28">
                <path d="M0 4C0 1.79 1.79 0 4 0h6c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H4c-2.21 0-4-1.79-4-4V4z" />
                <path d="M16 11c0-2.21 1.79-4 4-4h6c2.21 0 4 1.79 4 4v9c0 2.21-1.79 4-4 4h-6c-2.21 0-4-1.79-4-4v-9z" />
                <path d="M28 3.5C28 1.57 29.57 0 31.5 0h.5C33.99 0 36 2.01 36 4.5v19c0 2.49-2.01 4.5-4 4.5h-.5C29.57 28 28 26.43 28 24.5V3.5z" />
              </svg>
              <span className="font-extrabold text-lg tracking-tight">TradingView</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Quick User Banner */}
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-[#131722] dark:to-[#1a2030] border-b border-gray-100 dark:border-[#2a2e39]">
            <div className="text-xs font-semibold text-[#2962ff] uppercase tracking-wider mb-1">
              TradingView Essential
            </div>
            <div className="text-sm font-extrabold text-gray-900 dark:text-white">
              Try 30 days for free
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Real-time market data, unlimited indicators, and custom alerts.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenGetStarted();
              }}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-[#2962ff] text-white text-xs font-bold hover:bg-[#1e53e5] transition shadow-xs cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1">
            <button
              onClick={() => {
                onChangeTab('markets');
                onClose();
              }}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 text-sm font-semibold transition cursor-pointer text-left"
            >
              <BarChart2 className="w-5 h-5 text-[#2962ff]" />
              <span>Markets Overview</span>
            </button>

            <button
              onClick={() => {
                onChangeTab('news');
                onClose();
              }}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 text-sm font-semibold transition cursor-pointer text-left"
            >
              <Newspaper className="w-5 h-5 text-gray-500" />
              <span>News & Market Pulse</span>
            </button>

            <button
              onClick={() => {
                onChangeTab('community');
                onClose();
              }}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 text-sm font-semibold transition cursor-pointer text-left"
            >
              <Users className="w-5 h-5 text-gray-500" />
              <span>Community & Ideas</span>
            </button>

            <button
              onClick={() => {
                onChangeTab('more');
                onClose();
              }}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 text-sm font-semibold transition cursor-pointer text-left"
            >
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>Economic Calendar</span>
            </button>

            <button
              onClick={() => {
                onChangeTab('more');
                onClose();
              }}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 text-sm font-semibold transition cursor-pointer text-left"
            >
              <Bookmark className="w-5 h-5 text-gray-500" />
              <span>My Watchlists</span>
            </button>
          </div>
        </div>

        {/* Footer / Preferences */}
        <div className="p-4 border-t border-gray-100 dark:border-[#2a2e39] space-y-3">
          {/* Dark Mode Switch */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-[#131722]">
            <div className="flex items-center space-x-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              {isDark ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>Dark Mode</span>
            </div>
            <button
              onClick={onToggleTheme}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                isDark ? 'bg-[#2962ff]' : 'bg-gray-300'
              }`}
              type="button"
            >
              <span
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  isDark ? 'transform translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <div className="text-[11px] text-gray-400 text-center font-medium">
            TradingView Markets v4.12 · 2026
          </div>
        </div>
      </div>
    </div>
  );
};
