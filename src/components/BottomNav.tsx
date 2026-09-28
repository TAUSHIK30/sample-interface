import React from 'react';

export type ScreenTab = 'markets' | 'news' | 'community' | 'more';

interface BottomNavProps {
  activeTab: ScreenTab;
  onChangeTab: (tab: ScreenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md border-t border-[#e0e3eb] dark:border-[#2a2e39] px-2 pt-2 safe-bottom transition-colors"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center">
        {/* Markets Item */}
        <button
          onClick={() => onChangeTab('markets')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'markets'
              ? 'text-[#2962ff]'
              : 'text-[#787b86] dark:text-[#868993] hover:text-[#131722] dark:hover:text-white'
          }`}
          type="button"
        >
          <svg className="w-6 h-6 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className={`text-[11px] mt-1 ${activeTab === 'markets' ? 'font-bold' : 'font-medium'}`}>
            Markets
          </span>
        </button>

        {/* News Item */}
        <button
          onClick={() => onChangeTab('news')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'news'
              ? 'text-[#2962ff]'
              : 'text-[#787b86] dark:text-[#868993] hover:text-[#131722] dark:hover:text-white'
          }`}
          type="button"
        >
          <svg className="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`text-[11px] mt-1 ${activeTab === 'news' ? 'font-bold' : 'font-medium'}`}>
            News
          </span>
        </button>

        {/* Community / Ideas Item */}
        <button
          onClick={() => onChangeTab('community')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'community'
              ? 'text-[#2962ff]'
              : 'text-[#787b86] dark:text-[#868993] hover:text-[#131722] dark:hover:text-white'
          }`}
          type="button"
        >
          <svg className="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`text-[11px] mt-1 ${activeTab === 'community' ? 'font-bold' : 'font-medium'}`}>
            Community
          </span>
        </button>

        {/* More Item */}
        <button
          onClick={() => onChangeTab('more')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activeTab === 'more'
              ? 'text-[#2962ff]'
              : 'text-[#787b86] dark:text-[#868993] hover:text-[#131722] dark:hover:text-white'
          }`}
          type="button"
        >
          <svg className="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`text-[11px] mt-1 ${activeTab === 'more' ? 'font-bold' : 'font-medium'}`}>
            More
          </span>
        </button>
      </div>
    </nav>
  );
};
