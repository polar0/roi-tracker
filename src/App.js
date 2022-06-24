import React from 'react';
import { useEffect, useState } from 'react';

import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import EthDater from 'ethereum-block-by-date';
import { WagmiConfig } from 'wagmi';

import Tracker from './components/Tracker';
import Connect from './components/Connect';

import { setupClient } from './systems/wagmi-client-setup';
import { displayNotif, fetchData } from './systems/utils';

import './styles/index.css';

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
);

const dater = new EthDater(web3);

const App = () => {
  // Setup ETH Price Hook
  const [ethPriceValue, setEthPriceValue] = useState(0);

  // Display ETH Price
  useEffect(() => {
    const setEthPrice = async () => {
      const ethPrice = await getEthPrice();
      setEthPriceValue(ethPrice);
      // Setup an interval to get eth price each 30 second
      const interval = setInterval(async () => {
        const ethPrice = await getEthPrice();
        setEthPriceValue(ethPrice);
      }, 30000);
      return () => clearInterval(interval);
    };
    setEthPrice();
  });

  const getEthPrice = async () => {
    const ethPrice = await fetchData(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    ).catch((err) => {
      console.log(err);
      displayNotif('error', 'Failed to fetch Ether price.', 2000);
      return 'Unknown';
    });
    return ethPrice.ethereum.usd;
  };

  // Gérer la connextion dans Header
  // Dès qu'elle est faite lancer connectWallet() avec l'address et les tokens dans le state + isLogged
  // Envoyer ça dans Tracker
  // Ajouter ces éléments dans la prise en compte (par exemple if (isLogged) { addAddress(addressFromWallet) } })

  return (
    <div className='App'>
      <WagmiConfig client={setupClient()}>
        <Tracker web3={web3} dater={dater} ethPriceValue={ethPriceValue} />
        <div className='notif'></div>
        <div className='bg-blur'></div>
      </WagmiConfig>
    </div>
  );
};

export default App;
