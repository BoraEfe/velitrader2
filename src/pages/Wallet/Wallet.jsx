import './Wallet.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect} from 'react';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';


const Wallet = () => {
const [address, setAddress] = useState(''); 
const [walletValue, setWalletValue] = useState(null);
const [ethereum, setEthereum] = useState([]);

const currency = ' ETH';
const apiKey = '6C8JC2ZSKH9WAHTVDFZX6S5SDDEDTTQSMD';

const inputChange = e => {
    setAddress(e.target.value);
}
    
const KeyPress = (event) => {
    if (event.key === 'Enter') {
        fetchData();
    }
};

const fetchData = async () => {
    try {
        const response = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`);
        setWalletValue(response.data.result);
    } catch (error) {
        console.error('Fout bij het ophalen van de balans:', error);
    }
};


useEffect(() => {
    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ghRXbghXbf1C9hLEHCuUD78V'}
};
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', options)
    .then(response  => {
      setEthereum(response.data.ethereum.usd);
     }).catch(error => console.log(error));
    }, []);

    return (
       <div className='wallet'>
         <div className='wallet-title'>  
              Wallet
         </div>
         <div className='wallet-container'>
          <div className='wallet-value'>Wallet {currency} saldo: </div>
          <div className='wallet-value2'> <FontAwesomeIcon icon={faEthereum}className='fa-2x'/> {walletValue !== null ? walletValue.slice(0, walletValue.length - 18) + "." + walletValue.slice(walletValue.length - 5, walletValue.length) : 'voer adres in'}{ currency}</div>
             <input
                 type='text'
                 placeholder='Uw Ethereum wallet adres'
                 className='wallet-input' 
                 value={address}
                 onChange={inputChange}
                 onKeyDown={KeyPress}
            /> 
            <div className='eth-container'>
              <div className='ethprice'>ETH PRIJS: ${ethereum} USD</div>
              <div className='ethwalletvalue'>ETH WAARDE: ${ethereum * walletValue } USD</div>
            </div>
        </div>
       </div>
    );
};
export default Wallet;