import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';
import { MarketItem, CategoryType, RegionType } from '../../types/market';
import { Sparkline } from '../Sparkline';
import { TickerIcon, UsFlagIcon } from '../TickerIcon';

interface MarketsScreenProps {
  primaryIndices: MarketItem[];
  worldIndices: MarketItem[];
  stocks: MarketItem[];
  cryptoAssets: MarketItem[];
  forexPairs: MarketItem[];
  commoditiesAssets: MarketItem[];
  onSelectItem: (item: MarketItem) => void;
  flashingItems?: Record<string, 'up' | 'down'>;
}

export const MarketsScreen: React.FC<MarketsScreenProps> = ({
  primaryIndices,
  worldIndices,
  stocks,
  cryptoAssets,
  forexPairs,
  commoditiesAssets,
  onSelectItem,
  flashingItems = {},
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('indices');
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('everywhere');
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'crypto', label: 'Crypto' },
    { id: 'indices', label: 'Indices' },
    { id: 'futures', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'bonds', label: 'Government bonds' },
    { id: 'commodities', label: 'Commodities' },
    { id: 'stocks', label: 'Stocks' },
  ];

  const regionLabels: Record<RegionType, string> = {
    everywhere: 'Markets, everywhere',
    us: 'Markets, United States',
    europe: 'Markets, Europe',
    asia: 'Markets, Asia-Pacific',
  };

  // Determine which items to highlight in the top carousel based on category
  const carouselItems = (() => {
    switch (activeCategory) {
      case 'crypto':
        return cryptoAssets;
      case 'forex':
        return forexPairs;
      case 'commodities':
      case 'futures':
        return commoditiesAssets;
      case 'stocks':
        return stocks.slice(0, 4);
      case 'indices':
      default:
        return primaryIndices;
    }
  })();

  return (
    <main className="space-y-6 pt-2 pb-24 max-w-4xl mx-auto">
      {/* Title And Category Bar */}
      <section className="px-4 space-y-4">
        {/* Title with Dropdown Arrow */}
        <div className="relative pt-2">
          <button
            onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
            className="flex items-center space-x-2 text-left group cursor-pointer"
            type="button"
          >
            <h1 className="text-[28px] sm:text-[32px] leading-tight font-extrabold tracking-tight text-[#131722] dark:text-[#f0f3fa]">
              {regionLabels[selectedRegion]}
            </h1>
            <div className="p-1 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 rounded-full transition">
              <ChevronDown className="w-6 h-6 text-[#131722] dark:text-[#f0f3fa] stroke-[2.5]" />
            </div>
          </button>

          {/* Region Dropdown Menu */}
          {isRegionMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setIsRegionMenuOpen(false)}
              />
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#1e222d] rounded-2xl shadow-xl border border-gray-200 dark:border-[#2a2e39] py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Select Region
                </div>
                {(['everywhere', 'us', 'europe', 'asia'] as RegionType[]).map((region) => (
                  <button
                    key={region}
                    onClick={() => {
                      setSelectedRegion(region);
                      setIsRegionMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer ${
                      selectedRegion === region
                        ? 'font-bold text-[#2962ff]'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <span>{regionLabels[region].replace('Markets, ', '')}</span>
                    {selectedRegion === region && <Check className="w-4 h-4 text-[#2962ff]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Scrollable Category Pill Selector */}
        <nav aria-label="Market Categories" className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[14px] whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'font-semibold bg-gray-100 dark:bg-[#2a2e39] text-[#131722] dark:text-white border border-gray-200/80 dark:border-gray-700 shadow-xs'
                    : 'font-medium text-[#787b86] dark:text-[#868993] hover:text-[#131722] dark:hover:text-white'
                }`}
                type="button"
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </section>

      {/* Primary Indices Cards (Horizontal Carousel) */}
      <section aria-label="Featured Market Cards" className="px-4">
        <div className="flex space-x-3.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 scroll-smooth snap-x snap-mandatory">
          {carouselItems.map((item) => {
            const isPositive = item.change >= 0;
            const flash = flashingItems[item.id];
            return (
              <article
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`snap-start shrink-0 w-[240px] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-4 bg-white dark:bg-[#1e222d] flex flex-col justify-between shadow-xs hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer ${
                  flash === 'up'
                    ? 'animate-flash-up'
                    : flash === 'down'
                    ? 'animate-flash-down'
                    : ''
                }`}
              >
                <div>
                  {/* Top Symbol Badge & Name */}
                  <div className="flex items-center space-x-2.5">
                    <TickerIcon
                      type={item.iconType}
                      badgeNumber={item.badgeNumber}
                      badgeColor={item.badgeColor}
                      symbol={item.symbol}
                    />
                    <span className="font-bold text-[15px] text-[#131722] dark:text-[#f0f3fa] truncate">
                      {item.symbol}
                    </span>
                  </div>

                  {/* Pricing & Change */}
                  <div className="mt-4">
                    <div className="text-[20px] font-bold text-[#131722] dark:text-[#f0f3fa] tabular-nums tracking-tight">
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div
                      className={`flex items-center space-x-1.5 text-[13px] font-semibold tabular-nums mt-0.5 ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      <span>{item.change >= 0 ? `+${item.change.toFixed(2)}` : item.change.toFixed(2)}</span>
                      <span>
                        ({item.changePercent >= 0 ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sparkline Chart */}
                <div className="mt-4 pt-2">
                  <Sparkline
                    data={item.sparkline}
                    isPositive={isPositive}
                    showGradient={true}
                    width={100}
                    height={35}
                    className="w-full h-11"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* World Indices Section */}
      <section aria-labelledby="world-indices-title" className="pt-3">
        <div className="px-4 flex items-center justify-between mb-3">
          <button
            onClick={() => setActiveCategory('indices')}
            className="inline-flex items-center text-[22px] font-extrabold text-[#131722] dark:text-[#f0f3fa] hover:opacity-80 active:opacity-60 transition cursor-pointer"
            id="world-indices-title"
          >
            <span>World indices</span>
            <ChevronRight className="w-5 h-5 ml-1 text-[#131722] dark:text-white stroke-[2.5]" />
          </button>
        </div>

        <div className="flex space-x-3.5 overflow-x-auto no-scrollbar px-4 pb-1">
          {worldIndices.map((item) => {
            const isPositive = item.change >= 0;
            const flash = flashingItems[item.id];
            return (
              <article
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`shrink-0 w-[240px] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl p-4 bg-white dark:bg-[#1e222d] flex flex-col justify-between shadow-xs hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer ${
                  flash === 'up'
                    ? 'animate-flash-up'
                    : flash === 'down'
                    ? 'animate-flash-down'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2.5">
                    <TickerIcon
                      badgeNumber={item.badgeNumber}
                      badgeColor={item.badgeColor}
                      symbol={item.symbol}
                      className="w-8 h-8"
                    />
                    <div>
                      <h3 className="font-bold text-[15px] leading-tight text-[#131722] dark:text-[#f0f3fa]">
                        {item.symbol}
                      </h3>
                      <p className="text-[12px] text-[#787b86] dark:text-[#868993] font-medium truncate max-w-[130px]">
                        {item.subName || item.name}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-[20px] font-bold text-[#131722] dark:text-[#f0f3fa] tabular-nums">
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div
                      className={`flex items-center space-x-1.5 text-[13px] font-semibold tabular-nums mt-0.5 ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      <span>{item.change >= 0 ? `+${item.change.toFixed(2)}` : item.change.toFixed(2)}</span>
                      <span>
                        ({item.changePercent >= 0 ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-1">
                  <Sparkline
                    data={item.sparkline}
                    isPositive={isPositive}
                    showGradient={false}
                    width={100}
                    height={30}
                    className="w-full h-10"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* US Stocks Section */}
      <section aria-labelledby="us-stocks-title" className="pt-3 px-4">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setActiveCategory('stocks')}
            className="inline-flex items-center text-[22px] font-extrabold text-[#131722] dark:text-[#f0f3fa] hover:opacity-80 active:opacity-60 transition cursor-pointer"
            id="us-stocks-title"
          >
            <UsFlagIcon className="w-6 h-6 mr-2" />
            <span>US stocks</span>
            <ChevronRight className="w-5 h-5 ml-1 text-[#131722] dark:text-white stroke-[2.5]" />
          </button>
        </div>

        {/* Watchlist Stock Items List */}
        <div className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl bg-white dark:bg-[#1e222d] divide-y divide-gray-100 dark:divide-[#2a2e39] overflow-hidden shadow-xs">
          {stocks.map((stock) => {
            const isPositive = stock.change >= 0;
            const flash = flashingItems[stock.id];
            return (
              <article
                key={stock.id}
                onClick={() => onSelectItem(stock)}
                className={`p-3.5 flex items-center justify-between hover:bg-gray-50/80 dark:hover:bg-gray-800/50 active:bg-gray-100 dark:active:bg-gray-800 transition cursor-pointer ${
                  flash === 'up'
                    ? 'animate-flash-up'
                    : flash === 'down'
                    ? 'animate-flash-down'
                    : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <TickerIcon
                    type={stock.iconType}
                    badgeNumber={stock.badgeNumber}
                    badgeColor={stock.badgeColor}
                    symbol={stock.symbol}
                  />
                  <div>
                    <div className="font-bold text-[15px] text-[#131722] dark:text-[#f0f3fa] leading-tight flex items-center space-x-1.5">
                      <span>{stock.symbol}</span>
                      <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                        D
                      </span>
                    </div>
                    <div className="text-[12px] text-[#787b86] dark:text-[#868993] font-medium truncate max-w-[130px] sm:max-w-xs">
                      {stock.name}
                    </div>
                  </div>
                </div>

                {/* Sparkline Mini Chart */}
                <div className="hidden xs:block sm:block w-20 h-7">
                  <Sparkline
                    data={stock.sparkline}
                    isPositive={isPositive}
                    width={60}
                    height={20}
                    strokeWidth={1.8}
                    className="w-full h-full"
                  />
                </div>

                {/* Price & Performance Pill */}
                <div className="text-right flex flex-col items-end">
                  <div className="font-bold text-[15px] text-[#131722] dark:text-[#f0f3fa] tabular-nums leading-tight">
                    {stock.price.toFixed(2)}{' '}
                    <span className="text-xs font-normal text-[#787b86] dark:text-[#868993]">{stock.currency}</span>
                  </div>
                  <div
                    className={`mt-1 px-2 py-0.5 rounded-md text-[12px] font-bold tabular-nums ${
                      isPositive
                        ? 'bg-[#e6f7f3] dark:bg-[#089981]/20 text-[#089981]'
                        : 'bg-[#fdecee] dark:bg-[#f23645]/20 text-[#f23645]'
                    }`}
                  >
                    {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};
