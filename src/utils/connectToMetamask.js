import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

async function connectToMetaMask() {
  const provider = await detectEthereumProvider();

  if (provider) {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    await provider.request({ method: 'eth_requestAccounts' }); // Request access to MetaMask
    return ethersProvider.getSigner();
  } else {
    console.error('Please install MetaMask!');
  }
}
