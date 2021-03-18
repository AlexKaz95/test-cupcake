import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const initData = {
    "RUB/CUPCAKE": {first: 0, second: 0, third: 0},
    'USD/CUPCAKE': {first: 0, second: 0, third: 0},
    'EUR/CUPCAKE': {first: 0, second: 0, third: 0},
    'RUB/USD': {first: 0, second: 0, third: 0},
    'RUB/EUR': {first: 0, second: 0, third: 0},
    'EUR/USD': {first: 0, second: 0, third: 0}
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

    function getMin(arrRow) {
      const entries = Object.entries(arrRow);
      let minMarket = entries[0][0];
      for (let [key, value] of entries) {
        if (value < arrRow[minMarket]) {
          minMarket = key;
        }
      } 
      return minMarket;
    }

    for (let key in valuesMin) {
      setValuesMin(valuesMin => {
        return ({
          ...valuesMin,
          [key]: getMin(data[key])
        });
      });
    }
    
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
          <div className={valuesMin[item[0]] === 'first'?'value-min':'value'}>{+item[1].first.toFixed(3)}</div>
          <div className={valuesMin[item[0]] === 'second'?'value-min':'value'}>{+item[1].second.toFixed(3)}</div>
          <div className={valuesMin[item[0]] === 'third'?'value-min':'value'}>{+item[1].third.toFixed(3)}</div>
        </div>)}
    </div>
    </>
  );
}

export default App;
