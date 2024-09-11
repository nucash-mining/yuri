async function mintNFT(tokenId: number, playerAddress: string) {
  const contract = getContract();
  const tx = await contract.mint(playerAddress, tokenId);
  return tx.wait();
}
