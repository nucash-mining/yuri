async function fundResearchProject(amount: string, projectId: number) {
  const contract = getContract();
  const tx = await contract.fundProject(projectId, {
    value: ethers.utils.parseEther(amount),
  });
  return tx.wait();
}

async function claimReward(projectId: number, playerAddress: string) {
  const contract = getContract();
  const tx = await contract.claimReward(projectId, playerAddress);
  return tx.wait();
}
