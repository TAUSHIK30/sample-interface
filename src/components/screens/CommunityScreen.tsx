import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, PlusCircle, CheckCircle, ArrowUpRight, ArrowDownRight, Sparkles, Filter, X } from 'lucide-react';
import { CommunityIdea } from '../../types/market';

interface CommunityScreenProps {
  ideas: CommunityIdea[];
  onSelectSymbolByName: (symbol: string) => void;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({ ideas, onSelectSymbolByName }) => {
  const [ideasList, setIdeasList] = useState<CommunityIdea[]>(ideas);
  const [filterBias, setFilterBias] = useState<'ALL' | 'LONG' | 'SHORT'>('ALL');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // New idea form state
  const [newTitle, setNewTitle] = useState('');
  const [newSymbol, setNewSymbol] = useState('NVDA');
  const [newBias, setNewBias] = useState<'LONG' | 'SHORT'>('LONG');
  const [newEntry, setNewEntry] = useState('140.00');
  const [newTarget, setNewTarget] = useState('155.00');
  const [newStop, setNewStop] = useState('134.00');
  const [newDesc, setNewDesc] = useState('');

  const toggleLike = (id: string) => {
    setIdeasList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = !item.isLiked;
          return {
            ...item,
            isLiked,
            likesCount: isLiked ? item.likesCount + 1 : item.likesCount - 1,
          };
        }
        return item;
      })
    );
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newIdeaItem: CommunityIdea = {
      id: `custom-idea-${Date.now()}`,
      authorName: 'You (Trader)',
      authorHandle: '@pro_trader',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      authorReputation: 120,
      title: newTitle,
      symbol: newSymbol.toUpperCase(),
      timeframe: '4H',
      bias: newBias,
      entryPrice: parseFloat(newEntry) || 0,
      targetPrice: parseFloat(newTarget) || 0,
      stopLoss: parseFloat(newStop) || 0,
      likesCount: 1,
      commentsCount: 0,
      publishedTime: 'Just now',
      description: newDesc || 'Analysis based on technical indicators and volume profile.',
      tags: ['TradingIdea', newSymbol.toUpperCase()],
      isLiked: true,
    };

    setIdeasList([newIdeaItem, ...ideasList]);
    setIsPublishModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const filteredIdeas = filterBias === 'ALL'
    ? ideasList
    : ideasList.filter((i) => i.bias === filterBias);

  return (
    <main className="max-w-4xl mx-auto px-4 pt-3 pb-24 space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131722] dark:text-[#f0f3fa]">
            Trading Ideas
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Real setups, chart analysis & predictions from top community traders
          </p>
        </div>

        <button
          onClick={() => setIsPublishModalOpen(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#2962ff] text-white text-xs font-bold hover:bg-[#1e53e5] shadow-sm transition active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish Idea</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2">
        {(['ALL', 'LONG', 'SHORT'] as const).map((bias) => (
          <button
            key={bias}
            onClick={() => setFilterBias(bias)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              filterBias === bias
                ? bias === 'LONG'
                  ? 'bg-[#089981] text-white'
                  : bias === 'SHORT'
                  ? 'bg-[#f23645] text-white'
                  : 'bg-[#131722] dark:bg-white text-white dark:text-[#131722]'
                : 'bg-gray-100 dark:bg-[#1e222d] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#2a2e39]'
            }`}
          >
            {bias === 'ALL' ? 'All Setups' : bias === 'LONG' ? 'Bullish (Long)' : 'Bearish (Short)'}
          </button>
        ))}
      </div>

      {/* Ideas Feed */}
      <div className="space-y-4">
        {filteredIdeas.map((idea) => {
          return (
            <article
              key={idea.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] shadow-xs space-y-3.5"
            >
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={idea.authorAvatar}
                    alt={idea.authorName}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-sm text-[#131722] dark:text-[#f0f3fa]">
                        {idea.authorName}
                      </span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded">
                        ★ {idea.authorReputation}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {idea.authorHandle} · {idea.publishedTime}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectSymbolByName(idea.symbol)}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#2962ff]/10 text-xs font-bold text-[#2962ff] transition cursor-pointer"
                >
                  {idea.symbol} · {idea.timeframe}
                </button>
              </div>

              {/* Title & Setup Badge */}
              <div>
                <div className="flex items-center space-x-2 mb-1.5">
                  <span
                    className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase ${
                      idea.bias === 'LONG'
                        ? 'bg-[#e6f7f3] text-[#089981]'
                        : 'bg-[#fdecee] text-[#f23645]'
                    }`}
                  >
                    {idea.bias === 'LONG' ? (
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                    <span>{idea.bias}</span>
                  </span>

                  <span className="text-xs text-gray-400 font-medium">
                    Target: ${idea.targetPrice.toLocaleString()} | Stop: ${idea.stopLoss.toLocaleString()}
                  </span>
                </div>

                <h2 className="text-base font-bold text-[#131722] dark:text-[#f0f3fa] leading-snug">
                  {idea.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {idea.description}
              </p>

              {/* Trade setup visual mini metrics */}
              <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-[#131722] p-2.5 rounded-xl border border-gray-100 dark:border-[#2a2e39] text-xs">
                <div>
                  <div className="text-[10px] text-gray-400">Entry</div>
                  <div className="font-bold text-[#131722] dark:text-gray-200">${idea.entryPrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Target</div>
                  <div className="font-bold text-[#089981]">${idea.targetPrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Stop Loss</div>
                  <div className="font-bold text-[#f23645]">${idea.stopLoss.toLocaleString()}</div>
                </div>
              </div>

              {/* Actions footer */}
              <div className="pt-2 border-t border-gray-100 dark:border-[#2a2e39] flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleLike(idea.id)}
                    className={`flex items-center space-x-1.5 transition cursor-pointer ${
                      idea.isLiked ? 'text-[#2962ff] font-bold' : 'hover:text-[#131722] dark:hover:text-white'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${idea.isLiked ? 'fill-[#2962ff]' : ''}`} />
                    <span>{idea.likesCount}</span>
                  </button>

                  <button
                    onClick={() => alert(`Comments for ${idea.title} (48 trader replies)`)}
                    className="flex items-center space-x-1.5 hover:text-[#131722] dark:hover:text-white transition cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{idea.commentsCount}</span>
                  </button>
                </div>

                <div className="flex space-x-1.5">
                  {idea.tags.map((t) => (
                    <span key={t} className="text-[10px] text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Publish Idea Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#1e222d] text-[#131722] dark:text-[#f0f3fa] rounded-3xl shadow-2xl border border-gray-200 dark:border-[#2a2e39] p-6 max-h-[90vh] overflow-y-auto space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#2a2e39] pb-3">
              <h2 className="text-lg font-bold">Publish Trading Idea</h2>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. S&P 500 Daily Rebound at 5,950 Support"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#2a2e39] bg-gray-50 dark:bg-[#131722] text-sm focus:outline-hidden focus:border-[#2962ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Symbol</label>
                  <input
                    type="text"
                    required
                    value={newSymbol}
                    onChange={(e) => setNewSymbol(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#2a2e39] bg-gray-50 dark:bg-[#131722] text-sm uppercase"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Bias</label>
                  <select
                    value={newBias}
                    onChange={(e) => setNewBias(e.target.value as 'LONG' | 'SHORT')}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#2a2e39] bg-gray-50 dark:bg-[#131722] text-sm"
                  >
                    <option value="LONG">LONG (Bullish)</option>
                    <option value="SHORT">SHORT (Bearish)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Entry ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#2a2e39] bg-gray-50 dark:bg-[#131722]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Target ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#2a2e39] bg-gray-50 dark:bg-[#131722]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Stop Loss ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newStop}
                    onChange={(e) => setNewStop(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#2a2e39] bg-gray-50 dark:bg-[#131722]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Analysis / Notes</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Explain the pattern, indicators, moving averages, or key levels..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#2a2e39] bg-gray-50 dark:bg-[#131722] text-sm focus:outline-hidden focus:border-[#2962ff]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2962ff] text-white font-bold text-sm hover:bg-[#1e53e5] shadow-md transition cursor-pointer"
              >
                Publish to TradingView Community
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
