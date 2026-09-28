import React from 'react';
import { Search, Menu, Zap, ZapOff } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
  isDark?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenSearch,
  onOpenGetStarted,
  isSimulating,
  onToggleSimulation,
  isDark = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md border-b border-[#e0e3eb] dark:border-[#2a2e39] px-4 py-3 flex items-center justify-between transition-colors">
      {/* Left Navigation: Hamburger Menu & Official TradingView Brand Logo */}
      <div className="flex items-center space-x-3.5">
        <button
          aria-label="Open navigation menu"
          onClick={onOpenMenu}
          className="p-1 -ml-1 text-[#131722] dark:text-[#f0f3fa] hover:opacity-70 active:scale-95 transition-transform cursor-pointer"
          type="button"
        >
          <Menu className="w-6 h-6 stroke-[2]" />
        </button>

        {/* TradingView Geometric Wordmark/Logo */}
        <a aria-label="TradingView Home" className="flex items-center space-x-1 cursor-pointer" href="#markets">
          <svg className="w-9 h-7 text-[#131722] dark:text-white fill-current" viewBox="0 0 36 28">
            <path d="M0 4C0 1.79 1.79 0 4 0h6c2.21 0 4 1.79 4 4v16c0 2.21-1.79 4-4 4H4c-2.21 0-4-1.79-4-4V4z" />
            <path d="M16 11c0-2.21 1.79-4 4-4h6c2.21 0 4 1.79 4 4v9c0 2.21-1.79 4-4 4h-6c-2.21 0-4-1.79-4-4v-9z" />
            <path d="M28 3.5C28 1.57 29.57 0 31.5 0h.5C33.99 0 36 2.01 36 4.5v19c0 2.49-2.01 4.5-4 4.5h-.5C29.57 28 28 26.43 28 24.5V3.5z" />
          </svg>
        </a>

        {/* Market Status pill */}
        <div className="hidden sm:flex items-center space-x-1.5 pl-2 text-[11px] font-medium text-gray-500 dark:text-gray-400">
          <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse"></span>
          <span>US Markets Open</span>
        </div>
      </div>

      {/* Right Controls: Live Tick Simulator, Search button & CTA button */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Real-time simulation toggle */}
        <button
          onClick={onToggleSimulation}
          title={isSimulating ? "Live market ticks: Active (click to pause)" : "Live market ticks: Paused (click to resume)"}
          className={`flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded-full border transition-all cursor-pointer ${
            isSimulating
              ? 'bg-[#e6f7f3] dark:bg-[#089981]/20 text-[#089981] border-[#089981]/30 font-semibold'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700'
          }`}
          type="button"
        >
          {isSimulating ? <Zap className="w-3.5 h-3.5 fill-current animate-bounce" /> : <ZapOff className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">{isSimulating ? 'Live Ticks' : 'Static'}</span>
        </button>

        {/* Search button */}
        <button
          aria-label="Search markets"
          onClick={onOpenSearch}
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#131722] dark:text-[#f0f3fa] hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-90 transition cursor-pointer"
          type="button"
        >
          <Search className="w-5 h-5 stroke-[2.2]" />
        </button>

        {/* CTA Get started button */}
        <button
          onClick={onOpenGetStarted}
          className="bg-gradient-to-r from-[#1e53e5] via-[#2962ff] to-[#9b30ff] text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm hover:opacity-95 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          type="button"
        >
          Get started
        </button>
      </div>
    </header>
  );
};
