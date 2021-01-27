import React, { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';

function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    }).catch(error => alert('You have encountered an error'))
  })

    const searchChange = e =>{
      setSearch(e.target.value);
    }
    const filteredCoin = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Crypto Tracker</h1>
          <form>
            <input className="coin-input" type="text" placeholder="Search" onChange={searchChange}/>
          </form>
      </div> 
      <div className="legend">
      <p className="leg leg-name">Name</p><p className="leg leg-sym">Symbol</p><p className="leg leg-price">Price</p><p className="leg leg-vol">Volume</p><p className="leg leg-pc">Price Change</p><p className="leg leg-mc">Market Cap</p>
      </div>
    {filteredCoin.map(coin => {
      return (
        <Coin 
        key={coin.id} 
        name={coin.name} 
        image={coin.image}
        symbol = {coin.symbol}
        price = {coin.current_price}
        volume = {coin.total_volume}
        priceChange = {coin.price_change_percentage_24h}
        marketcap = {coin.market_cap}
        />
      )
    })}
    </div>
  );
}

export default App;
