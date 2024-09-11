import { ethers } from 'ethers';
import LeaderboardABI from '../contracts/Leaderboard.json';

const leaderboardAddress = '0xYourLeaderboardContractAddress';

// Get player stats
export async function getPlayerStats(signer, playerAddress) {
    const leaderboardContract = new ethers.Contract(leaderboardAddress, LeaderboardABI.abi, signer);
    return await leaderboardContract.getPlayerStats(playerAddress);
}

// Get top players for the leaderboard
export async function getTopPlayers(signer) {
    const leaderboardContract = new ethers.Contract(leaderboardAddress, LeaderboardABI.abi, signer);
    return await leaderboardContract.getTopPlayers();
}
