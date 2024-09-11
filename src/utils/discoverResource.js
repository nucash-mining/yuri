async function discoverResource(resourceType) {
    const tx = await resourceDiscoveryContract.discoverResource(userAddress, resourceType);
    await tx.wait();
}
