import React from 'react'
import Search from '../components/Search'
import Trending from '../components/Trending'
import MarketStats from '../components/MarketStats'

export default function Home({coines}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Track Your
            <span className="bg-gradient bg-clip-text text-transparent"> Crypto</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with real-time cryptocurrency prices, market trends, and portfolio tracking
          </p>
        </div>

        {/* Market Statistics */}
        <div className="mb-12 animate-slide-up">
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

        {/* Features Section */}
        <div className="mt-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Crypto Tracker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center hover-lift">
              <div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get live cryptocurrency prices and market data from reliable sources
              </p>
            </div>
            
            <div className="card p-6 text-center hover-lift">
              <div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Save your favorite coins and track your portfolio performance
              </p>
            </div>
            
            <div className="card p-6 text-center hover-lift">
              <div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌙</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dark Mode</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comfortable viewing experience with light and dark theme support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
