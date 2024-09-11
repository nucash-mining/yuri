import { ethers } from 'ethers';
import ModeratorNFTABI from '../contracts/ModeratorNFT.json';

const moderatorNFTAddress = '0xYourModeratorNFTContractAddress';

// Vote to revoke a moderator's privileges
export async function voteToRevokeModerator(signer, targetModerator) {
    const moderatorNFTContract = new ethers.Contract(moderatorNFTAddress, ModeratorNFTABI.abi, signer);
    const tx = await moderatorNFTContract.voteToRevokeModerator(targetModerator);
    await tx.wait();
}
