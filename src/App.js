import './App.css';
import { useState, useEffect } from 'react';
import { initData, initMin } from './initialValues';
import Row from './components/Row';
import HeaderTable from './components/HeaderTable';


function App() {

  const [data, setData] = useState(initData);
  const [valuesMin, setValuesMin] = useState(initMin);

  useEffect(() => {

    function createRates(rates){
      return ({
        "RUB/CUPCAKE": rates.RUB,
        'USD/CUPCAKE': rates.USD,
        'EUR/CUPCAKE': rates.EUR,
        'RUB/USD': rates.RUB / rates.USD,
        'RUB/EUR': rates.RUB / rates.EUR,
        'EUR/USD': rates.EUR / rates.USD
      })
    }

    const abortController = new AbortController();
    
    async function subscribe(url, market) {
      fetch(url, { signal: abortController.signal })
        .then(async response => {
          if (response.status !== 200) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await subscribe(url, market);
          } else {
            const result = await response.json();
            const rates = createRates(result.rates)
      
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
        })
        .catch(err => {});
    }

    subscribe('/api/v1/first/poll', 'first');
    subscribe('/api/v1/second/poll', 'second');
    subscribe('/api/v1/third/poll', 'third');

    return () => abortController.abort();

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
    <div className="App">
      <HeaderTable />
      {Object.entries(data).map(item => 
        <Row item={item} valuesMin={valuesMin}/>
      )}
    </div>
  );
}

export default App;
