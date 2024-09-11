import { ethers } from 'ethers';
import ModeratorNFTABI from '../contracts/ModeratorNFT.json';

const moderatorNFTAddress = '0xYourModeratorNFTContractAddress';

// Mint Moderator NFT with username attachment
export async function mintModeratorNFT(signer, username) {
    const moderatorNFTContract = new ethers.Contract(moderatorNFTAddress, ModeratorNFTABI.abi, signer);
    const tx = await moderatorNFTContract.mintModeratorNFT(signer.getAddress(), username);
    await tx.wait();
}
