import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';

const CoinItem = ({ coin }) => {
  const [savedCoin, setSavedCoin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = UserAuth();

  const saveCoin = async () => {
    console.log('=== Save Coin Debug Info ===');
    console.log('User object:', user);
    console.log('User UID:', user?.uid);
    console.log('User email:', user?.email);
    console.log('User authenticated:', !!user);
    
    if (user?.uid) {
      try {
        const coinPath = doc(db, 'users', user.uid);
        console.log('Document path:', coinPath.path);
        
        // Check if user document exists
        const userDoc = await getDoc(coinPath);
        console.log('Document exists:', userDoc.exists());
        
        if (!userDoc.exists()) {
          console.log('Creating new user document...');
          // Create user document if it doesn't exist
          const newUserData = {
            email: user.email,
            watchList: [{
              id: coin.id,
              name: coin.name,
              image: coin.image,
              rank: coin.market_cap_rank,
              symbol: coin.symbol,
            }],
            createdAt: new Date().toISOString(),
          };
          console.log('New user data:', newUserData);
          
          await setDoc(coinPath, newUserData);
          console.log('User document created successfully');
        } else {
          console.log('Updating existing user document...');
          const coinData = {
            id: coin.id,
            name: coin.name,
            image: coin.image,
            rank: coin.market_cap_rank,
            symbol: coin.symbol,
          };
          console.log('Coin data to add:', coinData);
          
          // Update existing document
          await updateDoc(coinPath, {
            watchList: arrayUnion(coinData),
          });
          console.log('User document updated successfully');
        }
        
        setSavedCoin(true);
      } catch (error) {
        console.error('=== Error Details ===');
        console.error('Error saving coin:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        let userFriendlyMessage = 'Failed to save coin. Please try again.';
        
        if (error.code === 'permission-denied') {
          userFriendlyMessage = 'Permission denied. Please make sure you are signed in and try again.';
        } else if (error.code === 'unavailable') {
          userFriendlyMessage = 'Service temporarily unavailable. Please try again later.';
        } else if (error.code === 'unauthenticated') {
          userFriendlyMessage = 'Please sign in to save coins to your watchlist.';
        } else if (error.code === 'not-found') {
          userFriendlyMessage = 'User document not found. Please try signing out and back in.';
        }
        
        setSavedCoin(false);
        setErrorMessage(userFriendlyMessage);
        setShowErrorPopup(true);
      }
    } else {
      console.log('No user UID found, showing sign-in popup');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
    setErrorMessage('');
  };

  return (
    <>
      <tr className='h-[80px] border-b overflow-hidden cursor-pointer'>
        <td onClick={saveCoin}>
          {savedCoin ? <AiFillStar /> : <AiOutlineStar />}
        </td>
        <td>{coin.market_cap_rank}</td>
        <td>
          <Link to={`/coin/${coin.id}`}>
            <div className='flex items-center'>
              <img
                className='w-6 mr-2 rounded-full'
                src={coin.image}
                alt={coin.id}
              />
              <p className='hidden sm:table-cell'>{coin.name}</p>
            </div>
          </Link>
        </td>
        <td>{coin.symbol.toUpperCase()}</td>
        <td>${coin.current_price.toLocaleString()}</td>
        <td>
          {coin.price_change_percentage_24h > 0 ? (
            <p className='text-green-600'>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          ) : (
            <p className='text-red-600'>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          )}
        </td>
        <td className='w-[180px] hidden md:table-cell'>
          ${coin.total_volume.toLocaleString()}
        </td>
        <td className='w-[180px] hidden sm:table-cell'>
          ${coin.market_cap.toLocaleString()}
        </td>
        <td>
          <Sparklines data={coin.sparkline_in_7d.price}>
            <SparklinesLine color='teal' />
          </Sparklines>
        </td>
      </tr>

      {/* Sign In Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closePopup}
          ></div>
          
          {/* Popup Content */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">⭐</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Save to Watchlist
                </h3>
              </div>
              <button
                onClick={closePopup}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              >
                <AiOutlineClose className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {coin.name}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    {coin.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                To save <strong>{coin.name}</strong> to your watchlist, please sign in to your account.
              </p>

              <div className="space-y-3">
                <Link
                  to="/signin"
                  onClick={closePopup}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Sign In</span>
                </Link>
                
                <Link
                  to="/signup"
                  onClick={closePopup}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center"
                >
                  Create Account
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-2xl">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Sign in to track your favorite cryptocurrencies and manage your portfolio
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeErrorPopup}
          ></div>
          
          {/* Error Popup Content */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">⚠️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Error
                </h3>
              </div>
              <button
                onClick={closeErrorPopup}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              >
                <AiOutlineClose className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {errorMessage}
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    closeErrorPopup();
                    saveCoin();
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  Try Again
                </button>
                
                <button
                  onClick={closeErrorPopup}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinItem;
