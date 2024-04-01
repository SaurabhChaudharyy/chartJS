import './App.css'
import StockPriceChart from "./components/StockPriceChart.jsx";

function App() {
  return (
    <div>
      <h1>Live Stock Chart</h1>
        <div style={{width: '600px', height: '600px'}}>
            <StockPriceChart/>
        </div>
    </div>
  )
}

export default App
