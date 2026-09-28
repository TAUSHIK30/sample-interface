import React, { useState, useMemo } from 'react';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { MarketItem } from '../types/market';
import { TickerIcon } from './TickerIcon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  items,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredItems = useMemo(() => {
    let result = items;
    if (selectedFilter !== 'all') {
      result = result.filter((item) => item.category === selectedFilter);
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.symbol.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          (item.subName && item.subName.toLowerCase().includes(q))
      );
    }
    return result;
  }, [items, query, selectedFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-12 sm:pt-20">
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#1e222d] text-[#131722] dark:text-[#f0f3fa] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#2a2e39] overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-100 dark:border-[#2a2e39] flex items-center space-x-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, or index..."
            autoFocus
            className="w-full bg-transparent text-base font-medium outline-hidden text-[#131722] dark:text-white placeholder:text-gray-400"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer"
            >
              ESC
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 px-4 py-2 border-b border-gray-100 dark:border-[#2a2e39] overflow-x-auto no-scrollbar bg-gray-50/50 dark:bg-[#131722]/50">
          {['all', 'indices', 'stocks', 'crypto', 'forex', 'commodities'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-[#2962ff] text-white shadow-xs'
                  : 'bg-white dark:bg-[#1e222d] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-gray-100 dark:divide-[#2a2e39] p-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">
              No matching symbols found for "{query}"
            </div>
          ) : (
            filteredItems.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="w-full p-3 flex items-center justify-between rounded-xl hover:bg-gray-50 dark:hover:bg-[#131722] text-left transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <TickerIcon
                      type={item.iconType}
                      badgeNumber={item.badgeNumber}
                      badgeColor={item.badgeColor}
                      symbol={item.symbol}
                      className="w-8 h-8 text-[10px]"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#131722] dark:text-[#f0f3fa] flex items-center space-x-1.5">
                        <span>{item.symbol}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-1 py-0.2 rounded">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold tabular-nums">
                      ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-xs font-bold tabular-nums ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
