import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function SavedCoins() {
  const [coins, setCoins] = useState([2]);

  return (
    <div>
      {coins.length === 0 ? (
        <p>
          You don't have any coins saved. Please save a coin to add it to your
          watch list. <Link to="/">Click here to search coins.</Link>
        </p>
      ) : (
        <table className='w-full border-collapse text-center'>
          <thead>
            <tr className='border-b'>
              <th className='px-4'>Rank #</th>
              <th className='text-left'>Coin </th>
              <th className="text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              <tr key={coin.id} className="h-[50px] overflow-hidden ">
                <td>{coin?.rank}</td>
                <td>
                  <Link to={`/coin/${coin.id}`}>
                    <div className="flex items-center">
                      <img className="w-8 mr-4" src={coin?.img} alt="/" />
                      <div>
                        <p className="hidden sm:table-cell">{coin?.name}</p>
                        <p className="text-gray-400 text-left text-sm">{coin?.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="pl-8 ">
                  <AiOutlineClose className="cursor-pointer" />
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
