import React, { useState, useEffect } from 'react';
import { AiOutlineRise, AiOutlineFall, AiOutlineDollar, AiOutlineGlobal } from 'react-icons/ai';

const MarketStats = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://api.coingecko.com/api/v3/global');
        const data = await response.json();
        
        if (data && data.data) {
          setMarketData(data.data);
        } else {
          setError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching market data:', error);
        setError('Failed to fetch market data');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !marketData) {
    return (
      <div className="card p-6">
        <div className="text-center">
          <p className="text-red-500 mb-2">Unable to load market data</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {error || 'Please try again later'}
          </p>
        </div>
      </div>
    );
  }

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return '0';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  const formatPercentage = (num) => {
    if (!num || isNaN(num)) return '0.00%';
    const percentage = num.toFixed(2);
    return percentage > 0 ? `+${percentage}%` : `${percentage}%`;
  };

  // Safe access to nested properties
  const totalMarketCap = marketData.total_market_cap?.usd || 0;
  const marketCapChange = marketData.market_cap_change_percentage_24h_usd || 0;
  const totalVolume = marketData.total_volume?.usd || 0;
  const volumeChange = marketData.total_volume?.usd_24h_change || 0;
  const btcDominance = marketData.market_cap_percentage?.btc || 0;
  const activeCoins = marketData.active_cryptocurrencies || 0;
  const markets = marketData.markets || 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Market Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Market Cap */}
        <div className="card p-4 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Market Cap</p>
              <p className="text-xl font-bold">${formatNumber(totalMarketCap)}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <AiOutlineDollar className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <AiOutlineRise className="text-green-500 mr-1" />
            <span className="text-sm text-green-500">
              {formatPercentage(marketCapChange)}
            </span>
          </div>
        </div>

        {/* 24h Volume */}
        <div className="card p-4 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">24h Volume</p>
              <p className="text-xl font-bold">${formatNumber(totalVolume)}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <AiOutlineRise className="text-green-600 dark:text-green-400 text-xl" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <AiOutlineRise className="text-green-500 mr-1" />
            <span className="text-sm text-green-500">
              {formatPercentage(volumeChange)}
            </span>
          </div>
        </div>

        {/* Market Cap Dominance */}
        <div className="card p-4 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">BTC Dominance</p>
              <p className="text-xl font-bold">{btcDominance.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <span className="text-orange-600 dark:text-orange-400 text-xl font-bold">₿</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full" 
                style={{ width: `${Math.min(btcDominance, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Active Cryptocurrencies */}
        <div className="card p-4 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Coins</p>
              <p className="text-xl font-bold">{activeCoins.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <AiOutlineGlobal className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {markets} markets
            </p>
          </div>
        </div>
      </div>

      {/* Market Sentiment */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">Market Sentiment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {btcDominance > 50 ? 'Bullish' : 'Neutral'}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">BTC Dominance</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {volumeChange > 0 ? 'High' : 'Low'}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Trading Volume</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {activeCoins > 10000 ? 'Very Active' : 'Active'}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Market Activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketStats; 