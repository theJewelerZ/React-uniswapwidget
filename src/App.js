import './App.css';
import { useState } from 'react';
import { providers, ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { SwapWidget } from '@uniswap/widgets';

const infuraId = process.env.REACT_APP_INFURA_ID;
const jsonRpcEndpoint = `https://mainnet.infura.io/v3/1b6faa5b3f99495aa216790a79b7c395`;
const jsonRpcProvider = new providers.JsonRpcProvider(jsonRpcEndpoint);
const provider = new ethers.providers.Web3Provider(jsonRpcProvider);

function App() {

  const [account, setAccount] = useState({
    address: '',
    provider: provider,
  })

  async function connectWallet() {
    const ethereumProvider = await detectEthereumProvider();

    if (ethereumProvider) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      const address = accounts[0];
      setAccount({
        address: address,
        provider: ethereumProvider
      })
    }
  }

  return (
    <div className="App">
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
      <div className="Uniswap">
        <SwapWidget
          provider={account.provider}
          JsonRpcEndpoint={jsonRpcEndpoint} />
      </div>
    </div>
  );
}

export default App;