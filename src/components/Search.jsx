import { AiOutlineStar } from "react-icons/ai";

export default function Search({ coins }) {
    return (
      <div>
        <div>
          <h1>Search Crypto</h1>
          <form>
            <input type="text" placeholder="Search a coin" />
          </form>
        </div>
  
        <table>
          <thead>
            <tr>
              <th></th>
              <th>#</th>
              <th>Coin</th>
              <th></th>
              <th>Price</th>
              <th>24h</th>
              <th>24h Volume</th>
              <th>Market</th>
              <th>Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {/* Check if coins is not undefined */}
            {coins?.map((coin, index) => (
              <tr key={coin.id}>
                <td><AiOutlineStar/></td>
                <td>{coin.market_cap_rank}</td>
                <td>
                    <div>
                        <img src={coin.image} alt="" />
                        <p>{coin.name}</p>
                    </div>
                </td>
                <td>{coin.symbol}</td>
                <td>{coin.current_price}</td>
                <td>{coin.price_change_percentage_24h}</td>
                <td>{coin.market_cap}</td>
                <td>{coin.total_volume}</td>
                <td>{coin.sparkline_in_7d.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  