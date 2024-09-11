import { ethers } from 'ethers';
import ModeratorNFTABI from '../contracts/ModeratorNFT.json';

const moderatorNFTAddress = '0xYourModeratorNFTContractAddress';

// Get top-ranked moderators
export async function getTopModerators(signer) {
    const moderatorNFTContract = new ethers.Contract(moderatorNFTAddress, ModeratorNFTABI.abi, signer);
    return await moderatorNFTContract.getTopModerators();
}
