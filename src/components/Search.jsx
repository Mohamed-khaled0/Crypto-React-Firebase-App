import { useState } from "react";
import CoinItem from "./CoinItem";
import { AiOutlineSortAscending, AiOutlineSortDescending, AiOutlineFilter } from "react-icons/ai";

export default function Search({ coins }) {
  const [searchText, setSearchText] = useState('');
  const [displayCount, setDisplayCount] = useState(10);
  const [sortBy, setSortBy] = useState('market_cap_rank');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  // Filter coins based on search text
  const filteredCoins = coins ? coins.filter((value) => {
    if (searchText === '') {
      return value;
    } else if (
      value.name.toLowerCase().includes(searchText.toLowerCase()) ||
      value.symbol.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return value;
    }
    return false;
  }) : [];

  // Sort coins
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'price':
        aValue = a.current_price;
        bValue = b.current_price;
        break;
      case 'market_cap':
        aValue = a.market_cap;
        bValue = b.market_cap;
        break;
      case 'volume':
        aValue = a.total_volume;
        bValue = b.total_volume;
        break;
      case 'change_24h':
        aValue = a.price_change_percentage_24h;
        bValue = b.price_change_percentage_24h;
        break;
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      default:
        aValue = a.market_cap_rank;
        bValue = b.market_cap_rank;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Get coins to display
  const displayedCoins = sortedCoins.slice(0, displayCount);

  const handleShowMore = () => {
    setDisplayCount(prev => prev + 10);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const resetFilters = () => {
    setSearchText('');
    setDisplayCount(10);
    setSortBy('market_cap_rank');
    setSortOrder('asc');
  };

  return (
    <div className="rounded-div my-4">
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
        <h1 className='text-2xl font-bold my-2'>Search Crypto</h1>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <form className="w-full md:w-auto">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              className='w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl outline-none focus:ring-2 focus:ring-accent'
              type='text'
              placeholder='Search a coin'
            />
          </form>
          
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <AiOutlineFilter />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 p-4 bg-secondary rounded-lg animate-slide-down">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort by:</span>
              {[
                { key: 'market_cap_rank', label: 'Rank' },
                { key: 'name', label: 'Name' },
                { key: 'price', label: 'Price' },
                { key: 'market_cap', label: 'Market Cap' },
                { key: 'volume', label: 'Volume' },
                { key: 'change_24h', label: '24h Change' }
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleSort(option.key)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    sortBy === option.key
                      ? 'bg-accent text-white'
                      : 'bg-primary hover:bg-primary/80 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {option.label}
                  {sortBy === option.key && (
                    sortOrder === 'asc' ? <AiOutlineSortAscending className="inline ml-1" /> : <AiOutlineSortDescending className="inline ml-1" />
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {displayedCoins.length} of {filteredCoins.length} coins
          {searchText && ` for "${searchText}"`}
        </p>
        {filteredCoins.length > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Market Cap: ${(filteredCoins.reduce((sum, coin) => sum + coin.market_cap, 0) / 1e9).toFixed(2)}B
          </p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th></th>
              <th className="px-4">#</th>
              <th className="text-left">Coin</th>
              <th></th>
              <th>Price</th>
              <th>24h</th>
              <th className="hidden md:table-cell">24h Volume</th>
              <th className="hidden sm:table-cell">Market</th>
              <th>Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {displayedCoins.length > 0 ? (
              displayedCoins.map((coin) => <CoinItem key={coin.id} coin={coin} />)
            ) : (
              <tr>
                <td colSpan="9" className="py-8 text-gray-500 dark:text-gray-400">
                  {searchText ? `No coins found for "${searchText}"` : 'Loading...'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Show More Button */}
      {displayedCoins.length < filteredCoins.length && (
        <div className="mt-6 text-center">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Show More ({filteredCoins.length - displayedCoins.length} remaining)
          </button>
        </div>
      )}

      {/* No Results Message */}
      {filteredCoins.length === 0 && coins && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No coins found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search terms or filters
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
