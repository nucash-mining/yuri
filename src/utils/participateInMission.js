async function participateInMission(signer, missionContract, missionId, amount) {
    const tx = await missionContract.connect(signer).participateInMission(missionId, {
      value: ethers.utils.parseUnits(amount, 18)
    });
    await tx.wait();
  }
  