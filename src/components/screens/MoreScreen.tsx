import React, { useState } from 'react';
import { Star, Calendar, Moon, Sun, Bell, Globe, Shield, HelpCircle, ChevronRight, Sliders, ExternalLink, Zap } from 'lucide-react';
import { MarketItem, EconomicEvent } from '../../types/market';
import { TickerIcon } from '../TickerIcon';

interface MoreScreenProps {
  favoriteItems: MarketItem[];
  economicEvents: EconomicEvent[];
  onSelectItem: (item: MarketItem) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
  onOpenGetStarted: () => void;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({
  favoriteItems,
  economicEvents,
  onSelectItem,
  isDark,
  onToggleTheme,
  isSimulating,
  onToggleSimulation,
  onOpenGetStarted,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [soundAlerts, setSoundAlerts] = useState(true);

  return (
    <main className="max-w-4xl mx-auto px-4 pt-3 pb-24 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131722] dark:text-[#f0f3fa]">
          Tools & Settings
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Watchlists, economic calendar, market tools and account preferences
        </p>
      </div>

      {/* User Pro Card Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1e53e5] via-[#2962ff] to-[#9b30ff] text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">
            TradingView Pro
          </div>
          <h2 className="text-lg font-extrabold">Upgrade for Real-Time Exchange Data</h2>
          <p className="text-xs text-blue-100 max-w-md">
            Direct high-speed feeds from NASDAQ, NYSE, CME, and LSE with zero seconds delay.
          </p>
        </div>
        <button
          onClick={onOpenGetStarted}
          className="px-5 py-2.5 rounded-full bg-white text-[#2962ff] text-xs font-bold shadow-md hover:bg-gray-100 active:scale-95 transition cursor-pointer self-start sm:self-auto whitespace-nowrap"
        >
          Explore Plans
        </button>
      </div>

      {/* Watchlist Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-lg font-bold text-[#131722] dark:text-[#f0f3fa]">My Watchlist</h2>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            {favoriteItems.length} {favoriteItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {favoriteItems.length === 0 ? (
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#1e222d] border border-dashed border-gray-300 dark:border-gray-700 text-center space-y-2">
            <Star className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto" />
            <p className="text-xs text-gray-500">Your watchlist is empty.</p>
            <p className="text-[11px] text-gray-400">
              Tap the star icon on any stock or index to pin it here.
            </p>
          </div>
        ) : (
          <div className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl bg-white dark:bg-[#1e222d] divide-y divide-gray-100 dark:divide-[#2a2e39] overflow-hidden shadow-xs">
            {favoriteItems.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="p-3.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <TickerIcon
                      type={item.iconType}
                      badgeNumber={item.badgeNumber}
                      badgeColor={item.badgeColor}
                      symbol={item.symbol}
                      className="w-8 h-8 text-[11px]"
                    />
                    <div>
                      <div className="font-bold text-sm text-[#131722] dark:text-[#f0f3fa]">
                        {item.symbol}
                      </div>
                      <div className="text-xs text-gray-400 truncate max-w-[150px]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-sm tabular-nums">
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
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Economic Calendar Section */}
      <section className="space-y-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-[#2962ff]" />
          <h2 className="text-lg font-bold text-[#131722] dark:text-[#f0f3fa]">
            Economic Calendar
          </h2>
        </div>

        <div className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl bg-white dark:bg-[#1e222d] divide-y divide-gray-100 dark:divide-[#2a2e39] overflow-hidden shadow-xs">
          {economicEvents.map((evt) => (
            <div key={evt.id} className="p-3.5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{evt.flag}</span>
                  <span className="text-xs font-bold text-gray-500">{evt.time}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-extrabold uppercase ${
                      evt.impact === 'high'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                    }`}
                  >
                    {evt.impact}
                  </span>
                </div>
                <div className="font-bold text-sm text-[#131722] dark:text-[#f0f3fa]">
                  {evt.event}
                </div>
              </div>

              <div className="text-right text-xs">
                <div className="text-gray-400">
                  Forecast: <span className="font-bold text-gray-700 dark:text-gray-300">{evt.forecast}</span>
                </div>
                <div className="text-gray-400">
                  Prior: <span className="font-bold text-gray-700 dark:text-gray-300">{evt.previous}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Heatmap Mini Visualizer */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#131722] dark:text-[#f0f3fa]">
            S&P 500 Market Heatmap
          </h2>
          <span className="text-xs text-[#2962ff] font-bold">1-Day Performance</span>
        </div>

        <div className="grid grid-cols-4 gap-2 h-36">
          <div
            onClick={() => onSelectItem(favoriteItems[0] || ({} as any))}
            className="col-span-2 bg-[#089981] text-white p-3 rounded-xl flex flex-col justify-between hover:opacity-90 transition cursor-pointer"
          >
            <div className="font-extrabold text-sm">NVDA</div>
            <div className="font-bold text-base tabular-nums">+3.12%</div>
            <div className="text-[10px] opacity-80">Semiconductors</div>
          </div>

          <div className="col-span-1 bg-[#089981]/80 text-white p-2.5 rounded-xl flex flex-col justify-between">
            <div className="font-bold text-xs">AAPL</div>
            <div className="font-bold text-sm tabular-nums">+0.85%</div>
            <div className="text-[9px] opacity-80">Hardware</div>
          </div>

          <div className="col-span-1 bg-[#f23645]/85 text-white p-2.5 rounded-xl flex flex-col justify-between">
            <div className="font-bold text-xs">MSFT</div>
            <div className="font-bold text-sm tabular-nums">-0.42%</div>
            <div className="text-[9px] opacity-80">Software</div>
          </div>

          <div className="col-span-2 bg-[#089981] text-white p-2.5 rounded-xl flex flex-col justify-between">
            <div className="font-bold text-xs">TSLA</div>
            <div className="font-bold text-sm tabular-nums">+5.60%</div>
            <div className="text-[9px] opacity-80">EV Auto</div>
          </div>

          <div className="col-span-2 bg-[#089981]/70 text-white p-2.5 rounded-xl flex flex-col justify-between">
            <div className="font-bold text-xs">AMZN</div>
            <div className="font-bold text-sm tabular-nums">+1.18%</div>
            <div className="text-[9px] opacity-80">Retail / Cloud</div>
          </div>
        </div>
      </section>

      {/* Preferences & Settings */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#131722] dark:text-[#f0f3fa]">Preferences</h2>

        <div className="border border-[#e0e3eb] dark:border-[#2a2e39] rounded-2xl bg-white dark:bg-[#1e222d] divide-y divide-gray-100 dark:divide-[#2a2e39] overflow-hidden shadow-xs text-sm">
          {/* Theme */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDark ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <span className="font-semibold">Dark Theme</span>
            </div>
            <button
              onClick={onToggleTheme}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                isDark ? 'bg-[#2962ff]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  isDark ? 'transform translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {/* Real-time ticks simulation */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-[#089981]" />
              <div>
                <div className="font-semibold">Real-Time Market Tick Simulation</div>
                <div className="text-xs text-gray-400">Simulate incoming price pulses and flash colors</div>
              </div>
            </div>
            <button
              onClick={onToggleSimulation}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                isSimulating ? 'bg-[#089981]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  isSimulating ? 'transform translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {/* Currency */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-500" />
              <span className="font-semibold">Display Currency</span>
            </div>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg px-2.5 py-1 text-xs font-bold outline-hidden"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>
      </section>
    </main>
  );
};
