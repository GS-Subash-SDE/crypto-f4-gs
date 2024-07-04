import { Provider, useDispatch, useSelector } from "react-redux";
import "./App.css";
import store from "./store";
import { useEffect, useState } from "react";
import getCoinDetails from "./thunk";
import { Button, Result } from "antd";

function App() {
  const coinDetails = useSelector((state) => state.crypto.coins);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  // console.log(coinDetails);


  let filteredCoins = coinDetails?.filter(
    (coin) =>
      coin?.name.toLowerCase().includes(value?.toLowerCase()) ||
      coin?.symbol.toLowerCase().includes(value?.toLowerCase())
  );

  const sortPriceChange = () => {
    console.log('sort entered');
    const sortedPrice = filteredCoins.sort((a, b) => {
      return a.price_change_percentage_24h - b.price_change_percentage_24h
    });
    // console.log(sortedPrice);
    dispatch({ type: 'fetch-data', payload: sortedPrice });
  }

  const sortMktCap = () => {
    console.log('sort entered');
    const sortedPrice = filteredCoins.sort((a, b) => {
      return a.market_cap - b.market_cap
    });
    // console.log(sortedPrice);
    dispatch({ type: 'fetch-data', payload: sortedPrice });
  }
  
  
  useEffect(() => {
    dispatch(getCoinDetails);
  }, []);


  if (!coinDetails.length) {
    return;
  }

  return (
    <div className="App">
      <div className="inputInfield">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="inputs search-field"
          type="text"
          placeholder="Search By Name or Symbol "
        />
        <button onClick={sortMktCap} className="inputs btn" type="button">
          Sort By Mkt Cap
        </button>
        <button onClick={sortPriceChange} className="inputs btn" type="button">
          Sort by percentage
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Total Volume</th>
            <th>Price Change %</th>
            <th>Market Capital</th>
          </tr>
        </thead>  

        <tbody>
          {filteredCoins.length ? (
            filteredCoins.map((crypto) => {
              const {
                id,
                name,
                symbol,
                image,
                current_price,
                total_volume,
                price_change_percentage_24h,
                market_cap,
              } = crypto;

              return (
                <tr key={id}>
                  <td className="name-field">
                    <img className="coin-img" src={image} alt={name} />
                    <span>{name}</span>
                  </td>
                  <td>{symbol.toUpperCase()}</td>
                  <td>${current_price}</td>
                  <td>${total_volume}</td>
                  <td
                    className={
                      price_change_percentage_24h < 0 ? "lowVal" : "highVal"
                    }
                  >
                    {price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>Mkt Cap: {market_cap}</td>
                </tr>
              );
            })
          ) : (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button onClick={()=>setValue('')} type="primary">Back Home</Button>}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
