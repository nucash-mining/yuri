import { ethers } from "ethers";

const contractAddress = "0xef1608b8b01797df5d46755f51fb126f21d0e7fa";
const abi = []; // ABI goes here

export function getContractInstance() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
  return new ethers.Contract(contractAddress, abi, provider);
}
