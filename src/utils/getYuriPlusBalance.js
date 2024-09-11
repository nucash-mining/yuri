async function getYuriPlusBalance(signer, yuriPlusContract) {
    const address = await signer.getAddress();
    const balance = await yuriPlusContract.balanceOf(address);
    return ethers.utils.formatUnits(balance, 18);
  }
  