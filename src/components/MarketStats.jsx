import React, { useState, useEffect } from 'react';
import { AiOutlineRise, AiOutlineFall, AiOutlineDollar, AiOutlineGlobal, AiOutlineReload, AiOutlineInfoCircle } from 'react-icons/ai';

const MarketStats = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.coingecko.com/api/v3/global');
      const data = await response.json();
      
      if (data && data.data) {
        setMarketData(data.data);
        setLastUpdated(new Date());
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

  useEffect(() => {
    fetchMarketData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 dark:text-gray-400">Loading market data...</span>
        </div>
      </div>
    );
  }

  if (error || !marketData) {
    return (
      <div className="card p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">📉</div>
          <p className="text-red-500 mb-2">Unable to load market data</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {error || 'Please try again later'}
          </p>
          <button
            onClick={fetchMarketData}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors duration-200 flex items-center space-x-2 mx-auto"
          >
            <AiOutlineReload />
            <span>Retry</span>
          </button>
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

  const formatCurrency = (num) => {
    if (!num || isNaN(num)) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Safe access to nested properties
  const totalMarketCap = marketData.total_market_cap?.usd || 0;
  const marketCapChange = marketData.market_cap_change_percentage_24h_usd || 0;
  const totalVolume = marketData.total_volume?.usd || 0;
  const volumeChange = marketData.total_volume?.usd_24h_change || 0;
  const btcDominance = marketData.market_cap_percentage?.btc || 0;
  const ethDominance = marketData.market_cap_percentage?.eth || 0;
  const activeCoins = marketData.active_cryptocurrencies || 0;
  const markets = marketData.markets || 0;

  const getMarketSentiment = () => {
    if (marketCapChange > 5) return { sentiment: 'Very Bullish', color: 'text-green-500', emoji: '🚀' };
    if (marketCapChange > 2) return { sentiment: 'Bullish', color: 'text-green-400', emoji: '📈' };
    if (marketCapChange > -2) return { sentiment: 'Neutral', color: 'text-yellow-500', emoji: '➡️' };
    if (marketCapChange > -5) return { sentiment: 'Bearish', color: 'text-red-400', emoji: '📉' };
    return { sentiment: 'Very Bearish', color: 'text-red-500', emoji: '💥' };
  };

  const sentiment = getMarketSentiment();

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Market Overview</h2>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
          <button
            onClick={fetchMarketData}
            className="p-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors duration-200"
            title="Refresh data"
          >
            <AiOutlineReload className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Market Sentiment Banner */}
      <div className={`card p-4 bg-gradient-to-r from-${sentiment.color.split('-')[1]}-100 to-${sentiment.color.split('-')[1]}-50 dark:from-${sentiment.color.split('-')[1]}-900/20 dark:to-${sentiment.color.split('-')[1]}-800/20`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{sentiment.emoji}</span>
            <div>
              <h3 className="font-semibold">Market Sentiment: {sentiment.sentiment}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                24h Market Cap Change: {formatPercentage(marketCapChange)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
          >
            <AiOutlineInfoCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Market Cap */}
        <div className="card p-4 hover-lift group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Market Cap</p>
              <p className="text-xl font-bold group-hover:text-accent transition-colors duration-200">
                {formatCurrency(totalMarketCap)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <AiOutlineDollar className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            {marketCapChange >= 0 ? (
              <AiOutlineRise className="text-green-500 mr-1" />
            ) : (
              <AiOutlineFall className="text-red-500 mr-1" />
            )}
            <span className={`text-sm ${marketCapChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(marketCapChange)}
            </span>
          </div>
        </div>

        {/* 24h Volume */}
        <div className="card p-4 hover-lift group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">24h Volume</p>
              <p className="text-xl font-bold group-hover:text-accent transition-colors duration-200">
                {formatCurrency(totalVolume)}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <AiOutlineRise className="text-green-600 dark:text-green-400 text-xl" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            {volumeChange >= 0 ? (
              <AiOutlineRise className="text-green-500 mr-1" />
            ) : (
              <AiOutlineFall className="text-red-500 mr-1" />
            )}
            <span className={`text-sm ${volumeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(volumeChange)}
            </span>
          </div>
        </div>

        {/* BTC Dominance */}
        <div className="card p-4 hover-lift group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">BTC Dominance</p>
              <p className="text-xl font-bold group-hover:text-accent transition-colors duration-200">
                {btcDominance.toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <span className="text-orange-600 dark:text-orange-400 text-xl font-bold">₿</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min(btcDominance, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Active Cryptocurrencies */}
        <div className="card p-4 hover-lift group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Coins</p>
              <p className="text-xl font-bold group-hover:text-accent transition-colors duration-200">
                {activeCoins.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
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

      {/* Detailed Market Analysis */}
      {showDetails && (
        <div className="card p-6 animate-slide-down">
          <h3 className="text-lg font-semibold mb-4">Detailed Market Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Market Cap Distribution */}
            <div>
              <h4 className="font-medium mb-3">Market Cap Distribution</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bitcoin (BTC)</span>
                  <span className="text-sm font-medium">{btcDominance.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ethereum (ETH)</span>
                  <span className="text-sm font-medium">{ethDominance.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Others</span>
                  <span className="text-sm font-medium">{(100 - btcDominance - ethDominance).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Market Activity */}
            <div>
              <h4 className="font-medium mb-3">Market Activity</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Cryptocurrencies</span>
                  <span className="text-sm font-medium">{activeCoins.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Markets</span>
                  <span className="text-sm font-medium">{markets.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Market Cap Change</span>
                  <span className={`text-sm font-medium ${marketCapChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatPercentage(marketCapChange)}
                  </span>
                </div>
              </div>
            </div>

            {/* Trading Insights */}
            <div>
              <h4 className="font-medium mb-3">Trading Insights</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Volume Change</span>
                  <span className={`text-sm font-medium ${volumeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatPercentage(volumeChange)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Market Sentiment</span>
                  <span className={`text-sm font-medium ${sentiment.color}`}>
                    {sentiment.sentiment}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">BTC vs ETH</span>
                  <span className="text-sm font-medium">
                    {(btcDominance / ethDominance).toFixed(1)}:1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketStats; 