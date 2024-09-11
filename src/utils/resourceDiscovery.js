import { ethers } from 'ethers';
import ResourceDiscoveryABI from '../contracts/ResourceDiscovery.json';

const resourceDiscoveryAddress = '0xYourResourceDiscoveryContractAddress';

export async function discoverResource(signer, resourceType) {
    const resourceDiscoveryContract = new ethers.Contract(resourceDiscoveryAddress, ResourceDiscoveryABI.abi, signer);
    const tx = await resourceDiscoveryContract.discoverResource(signer.getAddress(), resourceType);
    await tx.wait();
}
