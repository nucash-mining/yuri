import { ethers } from 'ethers';
import TechnologyUpgradeABI from '../contracts/TechnologyUpgrade.json';

const technologyUpgradeAddress = '0xYourTechnologyUpgradeContractAddress';

export async function upgradeTechnology(signer, techId, resourceIds) {
    const technologyUpgradeContract = new ethers.Contract(technologyUpgradeAddress, TechnologyUpgradeABI.abi, signer);
    const tx = await technologyUpgradeContract.upgradeTechnology(techId, resourceIds);
    await tx.wait();
}
