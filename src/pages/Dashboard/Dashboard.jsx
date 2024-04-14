import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoin, faEthereum } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import Coin from '../../components/Coin/Coin';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,  
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';

const Dashboard = () => {   

const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ghRXbghXbf1C9hLEHCuUD78V'}
};

const [coins, setCoins] = useState([]);
const [search, setSearch] = useState('');
const [coin, setCoin] = useState();

useEffect(() => {
axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1', options)
.then(response  => {
  setCoins(response.data);
 }).catch(error => console.log(error));
}, []);

const handleChange = e => {
  setSearch(e.target.value);
}
const filteredCoins = coins.filter(coin =>
  coin.name.toLowerCase().includes(search.toLowerCase())
)
ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);

  const optionsBTC = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bitcoin Price Chart',
      },
    },
  };
  const optionsETH = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ethereum Price Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dataETH = {
    labels,
    datasets: [
      {
        label: 'Price',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  const dataBTC = {
    labels, 
    datasets: [ 
      {
        label: 'Price',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(10, 99, 132, 0.5)',
      },  
    ],
  };
  
  let BTCToggled = false;
  let ETHToggled = false;

  //to toggle BTC chart
  const ToggleBTCChart = (name) => {
    if (BTCToggled === false && ETHToggled === false){ 
      ETHToggled = false;
      BTCToggled = true; 
      CoinFetch(name);
      document.querySelector('.bitcoin-chart').style.display = 'flex';
      document.querySelector('.ethereum-chart').style.display = 'none';
      console.log('BTC toggled');
    }else if (BTCToggled === false && ETHToggled === true){
      ETHToggled = false;
      BTCToggled = true; 
      CoinFetch(name);
      document.querySelector('.bitcoin-chart').style.display = 'flex';
      document.querySelector('.ethereum-chart').style.display = 'none';
      console.log('BTC toggled');
    }
  };
  
      //to toggle ETH chart
  const ToggleETHChart = (name) => {
    if (ETHToggled === false && BTCToggled === false){  
      ETHToggled = true;
      BTCToggled = false;
      CoinFetch(name);
      document.querySelector('.ethereum-chart').style.display = 'flex';
      document.querySelector('.bitcoin-chart').style.display = 'none';
      console.log('ETH toggled');
    }
    else if (ETHToggled === false && BTCToggled === true){
      ETHToggled = true;
      BTCToggled = false;
      CoinFetch(name);
      document.querySelector('.ethereum-chart').style.display = 'flex';
      document.querySelector('.bitcoin-chart').style.display = 'none';
      console.log('ETH toggled');
    }
  };

  const CoinFetch = (name) => {
    setCoin(false);  
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd`)
    .then(res => res.json()) 
    .then(data => {
      const coinName = Object.keys(data)[0];
      setCoin({ name: coinName, price: data[coinName].usd });
    });
  };
  
  return (        
    <div className="Dashboard">
      <div className='dashboard-title'>Dashboard</div>
      <div className='Widget-container'>
          <div className='Widget' onClick={() => ToggleBTCChart('bitcoin')}> <FontAwesomeIcon icon={faBitcoin}className='fa-3x'/></div>
          <div className='Widget' onClick={() => ToggleETHChart('ethereum')}> <FontAwesomeIcon icon={faEthereum}className='fa-3x'/></div>
      </div>
      <div className='graph-container'>
      {coin && <div className='asset-statistics'>{coin.name}: ${coin.price}</div>}
        <div className='bitcoin-chart'>
          <Line options={optionsBTC} data={dataBTC} style={{width: '570px', height:'240px'}} /> 
        </div>
        <div className='ethereum-chart'>
          <Line options={optionsETH} data={dataETH} style={{width: '570px', height:'240px'}} /> 
        </div>
      </div>
      <div className='graph-statistics'>Crypto Statistics</div>
        <form>
          <input type='text' placeholder='zoek naar een coin'
          className='coin-input' onChange={handleChange} />
          </form>
      <div className='graph-container2'>
        <div className='graph-container2-inhoud'>
        <div className='graph-container2-info-rank'>#</div>
            <div className='graph-container2-info-naam'>naam</div>
            <div className='graph-container2-info-prijs'>prijs</div>
            <div className='graph-container2-info-24uur'>24h%</div>
            <div className='graph-container2-info-marketcap'>Market Cap</div>
            <div className='graph-container2-info-volume'>Volume</div>
        </div>  
        <div className='line'></div>
          <div className='graph-container2-info'>
             {filteredCoins.map(coin => {
              return(
                <Coin 
                marketcaprank={coin.market_cap_rank}
                image={coin.image}
                name={coin.name}
                key={coin.id}
                price={coin.current_price}
                volume={coin.total_volume}
                marketcap={coin.market_cap}
                twentyfourhourchange={coin.price_change_percentage_24h}
               /> 
              )
             })}
         </div>
     </div>
    </div>
  );
};

export default Dashboard;