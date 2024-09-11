import { ethers } from 'ethers';
import MarketplaceABI from '../contracts/NFTMarketplace.json';

const marketplaceAddress = '0xYourMarketplaceContractAddress';

export async function purchaseItem(signer, tokenId) {
    const marketplaceContract = new ethers.Contract(marketplaceAddress, MarketplaceABI.abi, signer);
    const tx = await marketplaceContract.purchaseItem(tokenId);
    await tx.wait();
}
