import React, { useState, useEffect } from 'react'
import Search from '../components/Search'
import Trending from '../components/Trending'
import MarketStats from '../components/MarketStats'
import { AiFillFire, AiFillStar, AiOutlineRise, AiOutlineRead } from 'react-icons/ai'

export default function Home({coines}) {
  const [quickStats, setQuickStats] = useState({
    topGainer: null,
    topLoser: null,
    highestVolume: null,
    mostSearched: null
  });

  useEffect(() => {
    if (coines && coines.length > 0) {
      const stats = {
        topGainer: coines.reduce((max, coin) => 
          coin.price_change_percentage_24h > max.price_change_percentage_24h ? coin : max
        ),
        topLoser: coines.reduce((min, coin) => 
          coin.price_change_percentage_24h < min.price_change_percentage_24h ? coin : min
        ),
        highestVolume: coines.reduce((max, coin) => 
          coin.total_volume > max.total_volume ? coin : max
        ),
        mostSearched: coines[0] // Assuming first coin is most popular
      };
      setQuickStats(stats);
    }
  }, [coines]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with real-time cryptocurrency prices, market trends, and portfolio tracking
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="mb-12 animate-slide-up">
          <h2 className="text-2xl font-bold text-center mb-6">Quick Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Top Gainer */}
            <div className="card p-4 hover-lift group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Top Gainer (24h)</p>
                  {quickStats.topGainer && (
                    <div className="flex items-center space-x-2">
                      <img src={quickStats.topGainer.image} alt="" className="w-6 h-6 rounded-full" />
                      <p className="font-semibold">{quickStats.topGainer.symbol.toUpperCase()}</p>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <AiOutlineRise className="text-green-600 dark:text-green-400 text-xl" />
                </div>
              </div>
              {quickStats.topGainer && (
                <p className="text-lg font-bold text-green-500 mt-2">
                  +{quickStats.topGainer.price_change_percentage_24h.toFixed(2)}%
                </p>
              )}
            </div>

            {/* Top Loser */}
            <div className="card p-4 hover-lift group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Top Loser (24h)</p>
                  {quickStats.topLoser && (
                    <div className="flex items-center space-x-2">
                      <img src={quickStats.topLoser.image} alt="" className="w-6 h-6 rounded-full" />
                      <p className="font-semibold">{quickStats.topLoser.symbol.toUpperCase()}</p>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <AiOutlineRise className="text-red-600 dark:text-red-400 text-xl transform rotate-180" />
                </div>
              </div>
              {quickStats.topLoser && (
                <p className="text-lg font-bold text-red-500 mt-2">
                  {quickStats.topLoser.price_change_percentage_24h.toFixed(2)}%
                </p>
              )}
            </div>

            {/* Highest Volume */}
            <div className="card p-4 hover-lift group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Highest Volume</p>
                  {quickStats.highestVolume && (
                    <div className="flex items-center space-x-2">
                      <img src={quickStats.highestVolume.image} alt="" className="w-6 h-6 rounded-full" />
                      <p className="font-semibold">{quickStats.highestVolume.symbol.toUpperCase()}</p>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <AiFillFire className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
              </div>
              {quickStats.highestVolume && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  ${(quickStats.highestVolume.total_volume / 1e9).toFixed(2)}B
                </p>
              )}
            </div>

            {/* Most Popular */}
            <div className="card p-4 hover-lift group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Most Popular</p>
                  {quickStats.mostSearched && (
                    <div className="flex items-center space-x-2">
                      <img src={quickStats.mostSearched.image} alt="" className="w-6 h-6 rounded-full" />
                      <p className="font-semibold">{quickStats.mostSearched.symbol.toUpperCase()}</p>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg group-hover:scale-110 transition-transform duration-200">
                  <AiFillStar className="text-purple-600 dark:text-purple-400 text-xl" />
                </div>
              </div>
              {quickStats.mostSearched && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Rank #{quickStats.mostSearched.market_cap_rank}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Market Statistics */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <MarketStats />
        </div>

        {/* Search and Trending Sections */}
        <div className="space-y-8">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Search coins={coines} />
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Trending />
          </div>
        </div>

        {/* Crypto News Section */}
        <div className="mt-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <AiOutlineRead className="text-2xl text-accent" />
              <h2 className="text-2xl font-bold">Latest Crypto News</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* News Card 1 */}
              <div className="bg-secondary rounded-lg p-4 hover-lift cursor-pointer">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">2 hours ago</div>
                <h3 className="font-semibold mb-2">Bitcoin Reaches New Heights</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Bitcoin continues its upward trajectory, reaching new milestone levels as institutional adoption grows.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-1 rounded">
                    Bullish
                  </span>
                  <span className="text-xs text-gray-500">CryptoNews</span>
                </div>
              </div>

              {/* News Card 2 */}
              <div className="bg-secondary rounded-lg p-4 hover-lift cursor-pointer">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">4 hours ago</div>
                <h3 className="font-semibold mb-2">Ethereum 2.0 Update</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Major developments in Ethereum's transition to proof-of-stake consensus mechanism.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                    Development
                  </span>
                  <span className="text-xs text-gray-500">TechCrypto</span>
                </div>
              </div>

              {/* News Card 3 */}
              <div className="bg-secondary rounded-lg p-4 hover-lift cursor-pointer">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">6 hours ago</div>
                <h3 className="font-semibold mb-2">DeFi Protocol Launch</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  New decentralized finance protocol launches with innovative yield farming features.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-2 py-1 rounded">
                    DeFi
                  </span>
                  <span className="text-xs text-gray-500">DeFiDaily</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <button className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors duration-200">
                View All News
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Crypto Tracker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center hover-lift group">
              <div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get live cryptocurrency prices and market data from reliable sources with automatic updates every 5 minutes.
              </p>
            </div>
            
            <div className="card p-6 text-center hover-lift group">
              <div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Save your favorite coins and track your portfolio performance with detailed analytics and insights.
              </p>
            </div>
            
            <div className="card p-6 text-center hover-lift group">
              <div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-2xl">🌙</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dark Mode</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comfortable viewing experience with light and dark theme support, perfect for any time of day.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center animate-slide-up" style={{ animationDelay: '1s' }}>
          <div className="card p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Tracking?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of users who trust Crypto Tracker for their cryptocurrency monitoring needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Get Started Free
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
