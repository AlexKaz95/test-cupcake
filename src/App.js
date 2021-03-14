import './App.css';
import Values from './components/Values'; 
import PairName from './components/PairName';


function App() {

  return (
    <div className="App">
        <PairName />
        <Values url={"/api/v1/first"}/>
        <Values url={"/api/v1/second"}/>
        <Values url={"/api/v1/third"}/>
    </div>
  );
}

export default App;
