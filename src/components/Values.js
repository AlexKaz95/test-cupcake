import {useEffect, useState} from 'react';

function Obj (data, base){
  for (let key in data) {
    this[key + '/' + base] = data[key]
  }
}

function Values({ url }) {

  const [data, setData] = useState({});
  const [base, setBase] = useState('');

  useEffect(() => {
    async function fetchData(){
      const result = await fetch(url);
      const data = await result.json();
      const additions = {
        'RUB/USD': data.rates.RUB / data.rates.USD,
        'RUB/EUR': data.rates.RUB / data.rates.EUR,
        'EUR/USD': data.rates.EUR / data.rates.USD,
      }
      setData({...data.rates, ...additions});
      setBase(data.base);
    }
    fetchData();
  }, []);

  const obj = new Obj(data, base);
  console.log(obj)

  return (
    <div className="values">
      { Object.values(data).map( (item, i) => <div key={i} className="value">{+item.toFixed(3)}</div> )}
    </div>
  );

}

export default Values;
