import React, { useState } from 'react';
import { Newspaper, Clock, TrendingUp, TrendingDown, ArrowRight, X, ExternalLink, Bookmark } from 'lucide-react';
import { NewsArticle, MarketItem } from '../../types/market';

interface NewsScreenProps {
  articles: NewsArticle[];
  onSelectSymbolByName: (symbol: string) => void;
}

export const NewsScreen: React.FC<NewsScreenProps> = ({ articles, onSelectSymbolByName }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const categories = ['All', 'Stocks', 'Crypto', 'Indices', 'Bonds', 'World'];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 pt-3 pb-24 space-y-5">
      {/* Screen Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131722] dark:text-[#f0f3fa]">
            Market News & Insights
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Real-time financial headlines curated from global newsrooms
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#2962ff] text-white shadow-xs'
                : 'bg-gray-100 dark:bg-[#1e222d] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#2a2e39] hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Breaking Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
        <div className="space-y-1 pr-3">
          <div className="flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-100">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
            <span>Live Stream</span>
          </div>
          <div className="text-sm font-bold">
            Federal Reserve interest rate projection updates streaming live on TradingView Audio
          </div>
        </div>
        <button
          onClick={() => alert("Connecting to live TradingView audio desk stream...")}
          className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-xs text-xs font-bold whitespace-nowrap transition cursor-pointer"
        >
          Listen Live
        </button>
      </div>

      {/* Articles Feed */}
      <div className="space-y-3.5">
        {filteredArticles.map((article) => {
          const isBookmarked = bookmarkedIds.has(article.id);
          return (
            <article
              key={article.id}
              onClick={() => setReadingArticle(article)}
              className="p-4 rounded-2xl bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] shadow-xs hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2 font-medium">
                  <span className="font-bold text-[#131722] dark:text-gray-200">{article.source}</span>
                  <span>•</span>
                  <span>{article.timeAgo}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      article.sentiment === 'bullish'
                        ? 'bg-[#e6f7f3] text-[#089981]'
                        : article.sentiment === 'bearish'
                        ? 'bg-[#fdecee] text-[#f23645]'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {article.sentiment}
                  </span>

                  <button
                    onClick={(e) => toggleBookmark(article.id, e)}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
                  </button>
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-[#131722] dark:text-[#f0f3fa] leading-snug">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                {article.summary}
              </p>

              {/* Related Tickers Tag Bar */}
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-[11px] font-medium text-gray-400">Mentioned:</span>
                {article.relatedSymbols.map((sym) => (
                  <button
                    key={sym}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSymbolByName(sym);
                    }}
                    className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-[#131722] hover:bg-[#2962ff]/10 hover:text-[#2962ff] text-[11px] font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#2a2e39] transition cursor-pointer"
                  >
                    ${sym}
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {/* Full Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-[#1e222d] text-[#131722] dark:text-[#f0f3fa] rounded-3xl shadow-2xl border border-gray-200 dark:border-[#2a2e39] p-6 max-h-[85vh] overflow-y-auto space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-gray-100 dark:border-[#2a2e39] pb-3">
              <div>
                <span className="text-xs font-bold text-[#2962ff] uppercase tracking-wider">
                  {readingArticle.source}
                </span>
                <span className="text-xs text-gray-400 ml-2">· {readingArticle.timeAgo}</span>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
              {readingArticle.title}
            </h2>

            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
              <p className="font-semibold text-gray-900 dark:text-white">
                {readingArticle.summary}
              </p>
              <p>{readingArticle.content}</p>
              <p>
                Financial analysts emphasize that risk management remains essential amidst changing market volatility. Macroeconomic headwinds and earnings surprises will remain primary catalysts for the upcoming sessions.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-[#2a2e39] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Symbols in this article:</span>
                {readingArticle.relatedSymbols.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => {
                      setReadingArticle(null);
                      onSelectSymbolByName(sym);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#2962ff]/10 text-[#2962ff] text-xs font-bold hover:bg-[#2962ff] hover:text-white transition cursor-pointer"
                  >
                    View ${sym}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
