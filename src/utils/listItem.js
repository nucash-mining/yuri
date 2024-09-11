import { ethers } from 'ethers';
import MarketplaceABI from '../contracts/NFTMarketplace.json';

const marketplaceAddress = '0xYourMarketplaceContractAddress';

export async function listItemForSale(signer, tokenId, price) {
    const marketplaceContract = new ethers.Contract(marketplaceAddress, MarketplaceABI.abi, signer);
    const tx = await marketplaceContract.listItem(tokenId, ethers.utils.parseUnits(price, 18));
    await tx.wait();
}
