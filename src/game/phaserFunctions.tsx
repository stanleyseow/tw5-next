import { erc20Contract, erc1155FarmTools } from "@/app/contracts";
import { readContract, getContract } from "thirdweb";
import { claimTo } from "thirdweb/extensions/erc1155";
import { toEther } from "thirdweb/utils";
 
let tokenAddress = null;
let tokenBalance = 0;

export function setTokenData(address, balance) {
  tokenAddress = address;
  tokenBalance = balance;
  console.log("*** Token addr and balance : ", tokenAddress,tokenBalance )
}

export function getTokenAddress() {
  return tokenAddress;
}

export function getTokenBalance() {
  return tokenBalance;
}

// Called from scene with fixed interval to get latest balance
export async function getERC20Balanceof(address) {
  const balance = await readContract({
    contract: erc20Contract,
    method: "function balanceOf(address) view returns (uint256)",
    params: [address as string],
  });

 return toEther(balance)
}

export async function claimERC1155FarmTools(nftId) {

  const tx = claimTo({
    contract: erc1155FarmTools,
    to: account?.address as string,
    tokenId: BigInt(nftId),
    quantity: BigInt(1),
  })
}