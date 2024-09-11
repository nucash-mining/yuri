import { ethers } from 'ethers';
import PvPBattlesABI from '../contracts/PvPBattles.json';

const pvpBattlesAddress = '0xYourPvPBattlesContractAddress';

// Create a new battle
export async function initiateBattle(signer, player2, wagerYuri, resourceIds) {
    const pvpBattlesContract = new ethers.Contract(pvpBattlesAddress, PvPBattlesABI.abi, signer);
    const tx = await pvpBattlesContract.initiateBattle(player2, ethers.utils.parseUnits(wagerYuri, 18), resourceIds);
    await tx.wait();
}

// Get details of a battle
export async function getBattleDetails(signer, battleId) {
    const pvpBattlesContract = new ethers.Contract(pvpBattlesAddress, PvPBattlesABI.abi, signer);
    return await pvpBattlesContract.getBattleDetails(battleId);
}

// Resolve a battle (only called by the owner or an oracle)
export async function resolveBattle(signer, battleId, winner) {
    const pvpBattlesContract = new ethers.Contract(pvpBattlesAddress, PvPBattlesABI.abi, signer);
    const tx = await pvpBattlesContract.resolveBattle(battleId, winner);
    await tx.wait();
}
