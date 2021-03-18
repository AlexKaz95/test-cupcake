import './App.css';
import { useEffect, useReducer } from 'react';
import { initData, initMin } from './initialValues';
import { calcRates } from './calcRates';
import { reducerData, reducerValueMin } from './reducers';
import Row from './components/Row';
import HeaderTable from './components/HeaderTable';


function App() {
  const [data, dispatchData] = useReducer(reducerData, initData);
  const [valuesMin, setValuesMin] = useReducer(reducerValueMin, initMin);

  useEffect(() => {
    const abortController = new AbortController();

    async function subscribe(url, market) {
      fetch(url, { signal: abortController.signal })
        .then(async response => {
          if (response.status !== 200) {
            await subscribe(url, market);
          } else {
            const result = await response.json();
            dispatchData({rates: calcRates(result.rates), market})
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
    for (let key in valuesMin) {
      setValuesMin({key, row: data[key]});
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
