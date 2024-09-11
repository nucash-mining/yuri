async function getBalance(playerAddress: string) {
  const contract = getContract();
  const balance = await contract.balanceOf(playerAddress);
  return ethers.utils.formatEther(balance);
}

async function transferTokens(amount: string, recipientAddress: string) {
  const contract = getContract();
  const tx = await contract.transfer(recipientAddress, ethers.utils.parseEther(amount));
  return tx.wait();
}
