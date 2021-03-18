import './App.css';
import Rows from './components/Rows'; 
import { useState, useEffect } from 'react';

function App() {

  const initData = {
    "RUB/CUPCAKE": {first: 0, second: 0, third: 0, min: null},
    'USD/CUPCAKE': {first: 0, second: 0, third: 0, min: null},
    'EUR/CUPCAKE': {first: 0, second: 0, third: 0, min: null},
    'RUB/USD': {first: 0, second: 0, third: 0, min: null},
    'RUB/EUR': {first: 0, second: 0, third: 0, min: null},
    'EUR/USD': {first: 0, second: 0, third: 0, min: null}
  };

  const initMin = {
    "RUB/CUPCAKE":  null,
    'USD/CUPCAKE':  null,
    'EUR/CUPCAKE':  null,
    'RUB/USD':  null,
    'RUB/EUR':  null,
    'EUR/USD':  null
  }

  const [data, setData] = useState(initData);
  const [valuesMin, setValuesMin] = useState(initMin);

  useEffect(() => {
    async function subscribe(url, market) {
      const response = await fetch(url);
      
     if (response.status !== 200) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await subscribe(url, market);
      } else {
        const result = await response.json();
        const rates = {
          "RUB/CUPCAKE": result.rates.RUB,
          'USD/CUPCAKE': result.rates.USD,
          'EUR/CUPCAKE': result.rates.EUR,
          'RUB/USD': result.rates.RUB / result.rates.USD,
          'RUB/EUR': result.rates.RUB / result.rates.EUR,
          'EUR/USD': result.rates.EUR / result.rates.USD
        }
  
        setData(data => {
          let newData = {};
          for (let key in data) {
            newData[key] = {
              ...data[key],
              [market]: rates[key]
            }
          }
          return newData;
        })
       
        await subscribe(url, market);
      }
    }

    subscribe('/api/v1/first/poll', 'first');
    subscribe('/api/v1/second/poll', 'second');
    subscribe('/api/v1/third/poll', 'third');

  }, []);

  useEffect(() => {
    
  }, [data])

  return (
    <>
    <div className="App">
      <div className='row'>
        <div className='title'>Pair name / market</div>
        <div className='title'>First</div>
        <div className='title'>Second</div>
        <div className='title'>Third</div>
      </div>
        {Object.entries(data).map(item => <div className='row'>
          <div className='title'>{item[0]}</div>
          <div className='value'>{+item[1].first.toFixed(3)}</div>
          <div className='value'>{+item[1].second.toFixed(3)}</div>
          <div className='value'>{+item[1].third.toFixed(3)}</div>
        </div>)}
    </div>
    </>
  );
}

export default App;
