import {useEffect, useState} from 'react';

function Values({ url, title }) {

  const [data, setData] = useState({});

  useEffect(() => {
    async function subscribe(url) {
      const response = await fetch(url);
      
     if (response.status != 200) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await subscribe(url);
      } else {
        const data = await response.json();
        const additions = {
          'RUB/USD': data.rates.RUB / data.rates.USD,
          'RUB/EUR': data.rates.RUB / data.rates.EUR,
          'EUR/USD': data.rates.EUR / data.rates.USD,
        }
        setData({
          ...data.rates,
          ...additions,
        });
        await subscribe(url);
      }
    }
    subscribe(url);
  }, []);

  return (
    <div className="column">
      <div className="title">{title}</div>
      { Object.values(data).map( (item, i) => <div key={i} className="value">{+item.toFixed(3)}</div> )}
    </div>
  );

}

export default Values;
