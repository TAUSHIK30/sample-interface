import React, { useState } from 'react';
import { X, Star, Share2, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';
import { MarketItem } from '../types/market';
import { TickerIcon } from './TickerIcon';

interface TickerDetailModalProps {
  item: MarketItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

type Timeframe = '1D' | '5D' | '1M' | '1Y';

export const TickerDetailModal: React.FC<TickerDetailModalProps> = ({
  item,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tradeActionFeedback, setTradeActionFeedback] = useState<string | null>(null);

  if (!item) return null;

  const isPositive = item.change >= 0;
  const historyData = (item.history && item.history[timeframe]) || [
    { time: '09:30', price: item.open || item.price * 0.99 },
    { time: '11:00', price: item.price * 0.995 },
    { time: '13:00', price: item.price * 1.002 },
    { time: '15:00', price: item.price * 0.998 },
    { time: '16:00', price: item.price },
  ];

  // Hovered or latest
  const activePoint = hoverIndex !== null && historyData[hoverIndex]
    ? historyData[hoverIndex]
    : historyData[historyData.length - 1];

  const currentDisplayPrice = activePoint ? activePoint.price : item.price;
  const priceDiff = currentDisplayPrice - (item.open || item.prevClose || item.price);
  const percentDiff = item.open ? (priceDiff / item.open) * 100 : item.changePercent;

  // SVG Chart Dimensions
  const chartWidth = 500;
  const chartHeight = 220;
  const prices = historyData.map((d) => d.price);
  const minP = Math.min(...prices) * 0.998;
  const maxP = Math.max(...prices) * 1.002;
  const rangeP = maxP - minP || 1;

  const chartPoints = historyData.map((d, idx) => {
    const x = (idx / (historyData.length - 1 || 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - 30 - ((d.price - minP) / rangeP) * (chartHeight - 60);
    return { x, y, ...d };
  });

  const pathD = chartPoints.reduce((acc, pt, idx) => {
    return idx === 0 ? `M${pt.x},${pt.y}` : `${acc} L${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L${chartPoints[chartPoints.length - 1].x},${chartHeight - 10} L${chartPoints[0].x},${chartHeight - 10} Z`;
  const chartColor = isPositive ? '#089981' : '#f23645';

  const handleExecuteTrade = (type: 'BUY' | 'SELL') => {
    setTradeActionFeedback(`Simulated order: ${type} 10 shares of ${item.symbol} filled at $${item.price.toLocaleString()}`);
    setTimeout(() => {
      setTradeActionFeedback(null);
    }, 3500);
  };

  // Day Range position (0 to 100%)
  const dayRangeSpread = item.dayHigh - item.dayLow || 1;
  const dayPosition = Math.min(100, Math.max(0, ((item.price - item.dayLow) / dayRangeSpread) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#1e222d] text-[#131722] dark:text-[#f0f3fa] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-200 dark:border-[#2a2e39] max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-200"
      >
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-[#2a2e39] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TickerIcon
              type={item.iconType}
              badgeNumber={item.badgeNumber}
              badgeColor={item.badgeColor}
              symbol={item.symbol}
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-extrabold tracking-tight">{item.symbol}</h2>
                <span className="text-xs px-2 py-0.5 rounded font-bold uppercase bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate max-w-[200px] sm:max-w-xs">
                {item.name} {item.subName && `· ${item.subName}`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`p-2 rounded-full border transition cursor-pointer ${
                isFavorite
                  ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 text-amber-500'
                  : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
              title={isFavorite ? "Remove from watchlist" : "Add to watchlist"}
              type="button"
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              aria-label="Close modal"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body (Scrollable) */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Trade Notification Toast */}
          {tradeActionFeedback && (
            <div className="bg-[#e6f7f3] dark:bg-[#089981]/20 border border-[#089981]/40 text-[#089981] px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>{tradeActionFeedback}</span>
            </div>
          )}

          {/* Pricing Overview */}
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div>
              <div className="text-3xl font-extrabold tabular-nums tracking-tight">
                {currentDisplayPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{item.currency}</span>
              </div>
              <div
                className={`flex items-center space-x-1.5 text-sm font-bold tabular-nums mt-0.5 ${
                  percentDiff >= 0 ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {percentDiff >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />
                )}
                <span>
                  {priceDiff >= 0 ? `+${priceDiff.toFixed(2)}` : priceDiff.toFixed(2)}
                </span>
                <span>
                  ({percentDiff >= 0 ? `+${percentDiff.toFixed(2)}%` : `${percentDiff.toFixed(2)}%`})
                </span>
                {hoverIndex !== null && (
                  <span className="text-xs text-gray-400 font-normal ml-2">
                    at {activePoint.time}
                  </span>
                )}
              </div>
            </div>

            {/* Timeframe Selector */}
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              {(['1D', '5D', '1M', '1Y'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => {
                    setTimeframe(tf);
                    setHoverIndex(null);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    timeframe === tf
                      ? 'bg-white dark:bg-[#131722] text-[#2962ff] shadow-xs'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                  type="button"
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive TradingView Chart */}
          <div className="relative border border-gray-100 dark:border-[#2a2e39] rounded-2xl p-2 bg-gradient-to-b from-gray-50/50 to-white dark:from-[#131722]/50 dark:to-[#1e222d]">
            <svg
              className="w-full h-56 cursor-crosshair touch-none select-none overflow-visible"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, (mouseX - 20) / (rect.width - 40)));
                const idx = Math.round(ratio * (chartPoints.length - 1));
                setHoverIndex(idx);
              }}
              onMouseLeave={() => setHoverIndex(null)}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                const rect = e.currentTarget.getBoundingClientRect();
                const touchX = touch.clientX - rect.left;
                const ratio = Math.max(0, Math.min(1, (touchX - 20) / (rect.width - 40)));
                const idx = Math.round(ratio * (chartPoints.length - 1));
                setHoverIndex(idx);
              }}
              onTouchEnd={() => setHoverIndex(null)}
            >
              <defs>
                <linearGradient id="detailGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0.0} />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="40" x2={chartWidth - 20} y2="40" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3,3" />
              <line x1="20" y1="90" x2={chartWidth - 20} y2="90" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3,3" />
              <line x1="20" y1="140" x2={chartWidth - 20} y2="140" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3,3" />
              <line x1="20" y1="190" x2={chartWidth - 20} y2="190" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3,3" />

              {/* Area */}
              <path d={areaD} fill="url(#detailGradient)" />

              {/* Line */}
              <path
                d={pathD}
                stroke={chartColor}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Interactive Crosshair Cursor */}
              {hoverIndex !== null && chartPoints[hoverIndex] && (
                <g>
                  <line
                    x1={chartPoints[hoverIndex].x}
                    y1="10"
                    x2={chartPoints[hoverIndex].x}
                    y2={chartHeight - 10}
                    stroke={chartColor}
                    strokeWidth="1.2"
                    strokeDasharray="4,4"
                  />
                  <circle
                    cx={chartPoints[hoverIndex].x}
                    cy={chartPoints[hoverIndex].y}
                    r="5"
                    fill={chartColor}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>

            {/* Time labels below chart */}
            <div className="flex justify-between text-[11px] text-gray-400 px-4 pt-1 font-medium">
              <span>{historyData[0]?.time}</span>
              <span>{historyData[Math.floor(historyData.length / 2)]?.time}</span>
              <span>{historyData[historyData.length - 1]?.time}</span>
            </div>
          </div>

          {/* Quick Buy / Sell Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleExecuteTrade('BUY')}
              className="py-3 px-4 rounded-xl bg-[#089981] hover:bg-[#07836e] active:scale-98 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              type="button"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Simulate Buy</span>
            </button>
            <button
              onClick={() => handleExecuteTrade('SELL')}
              className="py-3 px-4 rounded-xl bg-[#f23645] hover:bg-[#d92a38] active:scale-98 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              type="button"
            >
              <TrendingDown className="w-4 h-4" />
              <span>Simulate Sell</span>
            </button>
          </div>

          {/* TradingView Technical Analysis Summary Gauge */}
          <div className="bg-gray-50 dark:bg-[#131722] rounded-2xl p-4 border border-gray-100 dark:border-[#2a2e39]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Technical Summary</span>
              <span className={`text-xs font-extrabold ${isPositive ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                {isPositive ? 'Strong Buy (16 Indicators)' : 'Sell (12 Indicators)'}
              </span>
            </div>
            {/* Speedometer Bar */}
            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 flex overflow-hidden">
              <div className="w-1/5 bg-red-500"></div>
              <div className="w-1/5 bg-amber-400"></div>
              <div className="w-1/5 bg-gray-300 dark:bg-gray-600"></div>
              <div className="w-1/5 bg-emerald-400"></div>
              <div className="w-1/5 bg-[#089981]"></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 font-medium">
              <span>Strong Sell</span>
              <span>Neutral</span>
              <span>Strong Buy</span>
            </div>
          </div>

          {/* Key Statistics Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Key Statistics</h3>
            
            {/* Day Range Bar */}
            <div className="bg-gray-50 dark:bg-[#131722] rounded-xl p-3 border border-gray-100 dark:border-[#2a2e39]">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-400">Day Low: ${item.dayLow.toLocaleString()}</span>
                <span className="text-gray-900 dark:text-gray-200">Current: ${item.price.toLocaleString()}</span>
                <span className="text-gray-400">Day High: ${item.dayHigh.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full relative">
                <div 
                  className="absolute top-0 bottom-0 bg-[#2962ff] rounded-full"
                  style={{ left: `${Math.max(0, dayPosition - 5)}%`, width: '10%' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-gray-50 dark:bg-[#131722] p-3 rounded-xl border border-gray-100 dark:border-[#2a2e39]">
                <div className="text-gray-400 font-medium">Open</div>
                <div className="font-bold text-sm mt-0.5">${item.open.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 dark:bg-[#131722] p-3 rounded-xl border border-gray-100 dark:border-[#2a2e39]">
                <div className="text-gray-400 font-medium">Prev Close</div>
                <div className="font-bold text-sm mt-0.5">${item.prevClose.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 dark:bg-[#131722] p-3 rounded-xl border border-gray-100 dark:border-[#2a2e39]">
                <div className="text-gray-400 font-medium">Volume</div>
                <div className="font-bold text-sm mt-0.5">{item.volume}</div>
              </div>
              <div className="bg-gray-50 dark:bg-[#131722] p-3 rounded-xl border border-gray-100 dark:border-[#2a2e39]">
                <div className="text-gray-400 font-medium">52W High</div>
                <div className="font-bold text-sm mt-0.5">${item.week52High.toLocaleString()}</div>
              </div>

              {item.marketCap && (
                <div className="bg-gray-50 dark:bg-[#131722] p-3 rounded-xl border border-gray-100 dark:border-[#2a2e39]">
                  <div className="text-gray-400 font-medium">Market Cap</div>
                  <div className="font-bold text-sm mt-0.5">{item.marketCap}</div>
                </div>
              )}
              {item.peRatio && (
                <div className="bg-gray-50 dark:bg-[#131722] p-3 rounded-xl border border-gray-100 dark:border-[#2a2e39]">
                  <div className="text-gray-400 font-medium">P/E Ratio</div>
                  <div className="font-bold text-sm mt-0.5">{item.peRatio}</div>
                </div>
              )}
              {item.divYield && (
                <div className="bg-gray-50 dark:bg-[#131722] p-3 rounded-xl border border-gray-100 dark:border-[#2a2e39]">
                  <div className="text-gray-400 font-medium">Div Yield</div>
                  <div className="font-bold text-sm mt-0.5">{item.divYield}</div>
                </div>
              )}
              <div className="bg-gray-50 dark:bg-[#131722] p-3 rounded-xl border border-gray-100 dark:border-[#2a2e39]">
                <div className="text-gray-400 font-medium">52W Low</div>
                <div className="font-bold text-sm mt-0.5">${item.week52Low.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div className="space-y-1.5 pt-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">About {item.name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
