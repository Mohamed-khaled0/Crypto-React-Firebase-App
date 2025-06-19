import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

const SavedCoin = () => {
  const [coins, setCoins] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        if (doc.exists()) {
          setCoins(doc.data()?.watchList || []);
        } else {
          setCoins([]);
        }
      });
      
      return () => unsubscribe();
    }
  }, [user?.uid]);

  const coinPath = doc(db, 'users', user?.uid);
  const deleteCoin = async (passedid) => {
    try {
      const result = coins.filter((item) => item.id !== passedid);
      await updateDoc(coinPath, {
        watchList: result,
      });
    } catch (e) {
      console.error('Error deleting coin:', e);
      alert('Failed to remove coin. Please try again.');
    }
  };

  if (!user?.uid) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          Please sign in to view your saved coins.
        </p>
      </div>
    );
  }

  return (
    <div>
      {coins?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You don't have any coins saved. Please save a coin to add it to your watch list.
          </p>
          <Link to="/" className="text-accent hover:text-accent/80 font-semibold">
            Click here to search coins
          </Link>
        </div>
      ) : (
        <table className='w-full border-collapse text-center'>
          <thead>
            <tr className='border-b'>
              <th className='px-4'>Rank #</th>
              <th className='text-left'>Coin</th>
              <th className='text-left'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin) => (
              <tr key={coin.id} className='h-[60px] overflow-hidden'>
                <td>{coin?.rank}</td>
                <td>
                  <Link to={`/coin/${coin.id}`}>
                    <div className='flex items-center'>
                      <img src={coin?.image} className='w-8 mr-4' alt='/' />
                      <div>
                        <p className='hidden sm:table-cell'>{coin?.name}</p>
                        <p className='text-gray-500 text-left text-sm'>
                          {coin?.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className='pl-8'>
                  <AiOutlineClose
                    onClick={() => deleteCoin(coin.id)}
                    className='cursor-pointer hover:text-red-500 transition-colors'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoin;
