import './App.css';
import Rows from './components/Rows'; 
import { useState, useEffect } from 'react';

function App() {

  const initData = {
    "RUB": {first: 0, second: 0, third: 0},
    'USD': {first: 0, second: 0, third: 0},
    'EUR': {first: 0, second: 0, third: 0},
    'RUB/USD': {first: 0, second: 0, third: 0},
    'RUB/EUR': {first: 0, second: 0, third: 0},
    'EUR/USD': {first: 0, second: 0, third: 0}
  };

  const [data, setData] = useState(initData);
  const [valueMin, setValueMin] = useState(data['RUB'].first);
  
  async function subscribe(url, market) {
    console.log(market)
    const response = await fetch(url);
    
   if (response.status !== 200) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe(url, market);
    } else {
      const res = await response.json();
      res.rates = {
        ...res.rates,
        'RUB/USD': res.rates.RUB / res.rates.USD,
        'RUB/EUR': res.rates.RUB / res.rates.EUR,
        'EUR/USD': res.rates.EUR / res.rates.USD
      }

      setData(data => {
        let newData = {};
        for (let key in data) {
          newData[key] = {...data[key], [market]: res.rates[key]}
        }
        return newData
      })
     
      await subscribe(url, market);
    }
  }

  useEffect(() => {
    subscribe('/api/v1/first/poll', 'first');
    subscribe('/api/v1/second/poll', 'second');
    subscribe('/api/v1/third/poll', 'third');
  }, [subscribe]);

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
    <div className="App">
        {Object.values(data).map(item => <div className='row'>
          <div className='value'>{+item['first'].toFixed(3)}</div>
          <div className='value'>{+item['second'].toFixed(3)}</div>
          <div className='value'>{+item['third'].toFixed(3)}</div>
        </div>)}
    </div>
    </>
  );
}

export default App;
