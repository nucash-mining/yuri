async function createTechnology(techDetails, resourceIds) {
    const tx = await technologyCreationContract.createTechnology(userAddress, techDetails, resourceIds);
    await tx.wait();
}
