import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { BottomNav, ScreenTab } from './components/BottomNav';
import { NavigationDrawer } from './components/NavigationDrawer';
import { SearchModal } from './components/SearchModal';
import { TickerDetailModal } from './components/TickerDetailModal';
import { GetStartedModal } from './components/GetStartedModal';
import { MarketsScreen } from './components/screens/MarketsScreen';
import { NewsScreen } from './components/screens/NewsScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { MoreScreen } from './components/screens/MoreScreen';
import {
  PRIMARY_INDICES,
  WORLD_INDICES,
  US_STOCKS,
  CRYPTO_ASSETS,
  FOREX_PAIRS,
  COMMODITIES_ASSETS,
  NEWS_FEED,
  COMMUNITY_IDEAS,
  ECONOMIC_EVENTS,
} from './data/mockMarkets';
import { MarketItem } from './types/market';

export default function App() {
  const [activeTab, setActiveTab] = useState<ScreenTab>('markets');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState<boolean>(false);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MarketItem | null>(null);

  // Favorites / Watchlist
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    new Set(['sp500', 'nvda', 'aapl', 'btc'])
  );

  // Market Datasets
  const [primaryIndices, setPrimaryIndices] = useState<MarketItem[]>(PRIMARY_INDICES);
  const [worldIndices, setWorldIndices] = useState<MarketItem[]>(WORLD_INDICES);
  const [stocks, setStocks] = useState<MarketItem[]>(US_STOCKS);
  const [cryptoAssets, setCryptoAssets] = useState<MarketItem[]>(CRYPTO_ASSETS);
  const [forexPairs, setForexPairs] = useState<MarketItem[]>(FOREX_PAIRS);
  const [commoditiesAssets, setCommoditiesAssets] = useState<MarketItem[]>(COMMODITIES_ASSETS);

  // Flash animation state for live simulation
  const [flashingItems, setFlashingItems] = useState<Record<string, 'up' | 'down'>>({});
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // All items combined for search & lookup
  const allItems = useMemo(() => {
    return [
      ...primaryIndices,
      ...worldIndices,
      ...stocks,
      ...cryptoAssets,
      ...forexPairs,
      ...commoditiesAssets,
    ];
  }, [primaryIndices, worldIndices, stocks, cryptoAssets, forexPairs, commoditiesAssets]);

  // Live price tick simulation loop
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // Pick random asset list and random item
      const lists = [
        { getter: primaryIndices, setter: setPrimaryIndices },
        { getter: stocks, setter: setStocks },
        { getter: cryptoAssets, setter: setCryptoAssets },
        { getter: worldIndices, setter: setWorldIndices },
      ];

      const selectedTarget = lists[Math.floor(Math.random() * lists.length)];
      if (!selectedTarget.getter.length) return;

      const randIndex = Math.floor(Math.random() * selectedTarget.getter.length);
      const targetItem = selectedTarget.getter[randIndex];

      // Small realistic tick (-0.15% to +0.15%)
      const deltaPercent = (Math.random() - 0.48) * 0.25;
      const priceDelta = targetItem.price * (deltaPercent / 100);
      const newPrice = Math.max(0.01, targetItem.price + priceDelta);
      const newChange = targetItem.change + priceDelta;
      const newPercent = targetItem.changePercent + deltaPercent;

      const direction: 'up' | 'down' = priceDelta >= 0 ? 'up' : 'down';

      // Update the dataset
      selectedTarget.setter((prev) =>
        prev.map((item, idx) => {
          if (idx === randIndex) {
            const updatedSparkline = [...item.sparkline.slice(1), item.sparkline[item.sparkline.length - 1] + (priceDelta > 0 ? 1 : -1)];
            return {
              ...item,
              price: Math.round(newPrice * 100) / 100,
              change: Math.round(newChange * 100) / 100,
              changePercent: Math.round(newPercent * 100) / 100,
              sparkline: updatedSparkline,
            };
          }
          return item;
        })
      );

      // Trigger flash highlight
      setFlashingItems((prev) => ({ ...prev, [targetItem.id]: direction }));
      setTimeout(() => {
        setFlashingItems((prev) => {
          const next = { ...prev };
          delete next[targetItem.id];
          return next;
        });
      }, 1000);
    }, 2800);

    return () => clearInterval(interval);
  }, [isSimulating, primaryIndices, stocks, cryptoAssets, worldIndices]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectSymbolByName = (symbol: string) => {
    const cleanSym = symbol.replace('$', '').toUpperCase();
    const found = allItems.find(
      (item) =>
        item.symbol.toUpperCase() === cleanSym ||
        item.name.toUpperCase().includes(cleanSym)
    );
    if (found) {
      setSelectedItemForDetail(found);
    }
  };

  const favoriteItems = useMemo(() => {
    return allItems.filter((i) => favoriteIds.has(i.id));
  }, [allItems, favoriteIds]);

  return (
    <div className={`min-h-screen bg-white dark:bg-[#131722] text-[#131722] dark:text-[#f0f3fa] flex flex-col font-sans transition-colors duration-150`}>
      {/* Top Header */}
      <Header
        onOpenMenu={() => setIsDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        isSimulating={isSimulating}
        onToggleSimulation={() => setIsSimulating(!isSimulating)}
        isDark={isDark}
      />

      {/* Screen Views */}
      <div className="flex-1">
        {activeTab === 'markets' && (
          <MarketsScreen
            primaryIndices={primaryIndices}
            worldIndices={worldIndices}
            stocks={stocks}
            cryptoAssets={cryptoAssets}
            forexPairs={forexPairs}
            commoditiesAssets={commoditiesAssets}
            onSelectItem={(item) => setSelectedItemForDetail(item)}
            flashingItems={flashingItems}
          />
        )}

        {activeTab === 'news' && (
          <NewsScreen
            articles={NEWS_FEED}
            onSelectSymbolByName={handleSelectSymbolByName}
          />
        )}

        {activeTab === 'community' && (
          <CommunityScreen
            ideas={COMMUNITY_IDEAS}
            onSelectSymbolByName={handleSelectSymbolByName}
          />
        )}

        {activeTab === 'more' && (
          <MoreScreen
            favoriteItems={favoriteItems}
            economicEvents={ECONOMIC_EVENTS}
            onSelectItem={(item) => setSelectedItemForDetail(item)}
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
            isSimulating={isSimulating}
            onToggleSimulation={() => setIsSimulating(!isSimulating)}
            onOpenGetStarted={() => setIsGetStartedOpen(true)}
          />
        )}
      </div>

      {/* Bottom Dock Navigation */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Navigation Sidebar Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onChangeTab={setActiveTab}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
      />

      {/* Symbol Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={allItems}
        onSelectItem={(item) => setSelectedItemForDetail(item)}
      />

      {/* Comprehensive Ticker Detail / Interactive Chart Modal */}
      {selectedItemForDetail && (
        <TickerDetailModal
          item={selectedItemForDetail}
          onClose={() => setSelectedItemForDetail(null)}
          isFavorite={favoriteIds.has(selectedItemForDetail.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* Get Started / Join Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </div>
  );
}
