import { ethers } from 'ethers';
import ResourceDiscoveryABI from '../contracts/ResourceDiscovery.json';
import TechnologyCreationABI from '../contracts/TechnologyCreation.json';

const resourceDiscoveryAddress = '0xYourResourceDiscoveryContractAddress';
const technologyCreationAddress = '0xYourTechnologyCreationContractAddress';

// Get player's resource inventory
export async function getResourceInventory(signer) {
    const resourceDiscoveryContract = new ethers.Contract(resourceDiscoveryAddress, ResourceDiscoveryABI.abi, signer);
    const tokenId = await resourceDiscoveryContract.getResourceDetails();
    return tokenId;
}

// Get player's technology inventory
export async function getTechnologyInventory(signer) {
    const technologyCreationContract = new ethers.Contract(technologyCreationAddress, TechnologyCreationABI.abi, signer);
    const tokenId = await technologyCreationContract.getTechDetails();
    return tokenId;
}
