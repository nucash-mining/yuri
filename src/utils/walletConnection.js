import { ethers } from 'ethers';

export async function connectToWallet() {
    if (window.ethereum) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            return signer;
        } catch (error) {
            console.error("Error connecting to wallet:", error);
            throw new Error("Failed to connect to wallet");
        }
    } else {
        console.error("MetaMask not detected");
        throw new Error("MetaMask not detected");
    }
}
