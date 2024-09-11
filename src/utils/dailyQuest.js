import { ethers } from 'ethers';
import DailyQuestABI from '../contracts/DailyQuest.json';

const dailyQuestAddress = '0xYourDailyQuestContractAddress';

// Complete a daily quest
export async function completeQuest(signer, resourceId) {
    const dailyQuestContract = new ethers.Contract(dailyQuestAddress, DailyQuestABI.abi, signer);
    const tx = await dailyQuestContract.completeQuest(signer.getAddress(), resourceId);
    await tx.wait();
}

// Check if player is eligible for a quest
export async function isEligibleForQuest(signer) {
    const dailyQuestContract = new ethers.Contract(dailyQuestAddress, DailyQuestABI.abi, signer);
    return await dailyQuestContract.isEligibleForQuest(signer.getAddress());
}
