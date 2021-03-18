import './App.css';
import Values from './components/Values'; 
import RowName from './components/RowName';
import { useState } from 'react';

function App() {

  const [maxes, setMaxes] = useState([]);

  return (
    <>
    <div className="App">
        <RowName title={'Pair name/market'}/>
        <Values url={"/api/v1/first/poll"} title={'First'}/>
        <Values url={"/api/v1/second/poll"} title={'Second'}/>
        <Values url={"/api/v1/third/poll"} title={'Third'}/>
    </div>
    </>
  );
}

export default App;
