"use client";
import { useState, useEffect } from "react";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { toEther } from "thirdweb/utils";
import { getContract } from "thirdweb";
import { client } from "@/app/client";
import { defineChain } from "thirdweb/chains";
import {
  readContract,
  resolveMethod,
  prepareContractCall,
  sendTransaction,
} from "thirdweb";
import { idCounter } from "thirdweb/extensions/farcaster/idRegistry";
import { tokenOfOwnerByIndex } from "thirdweb/extensions/erc721";

// check Tools stake
// button for stake
// button for unstake

// reward balance is unclaim CARROT
// Button to claim ( transfer to player wallet )

export const NFTStake1 = () => {
  const account = useActiveAccount();
  const chainById = defineChain(2442);

  // Farm Tools contract
  const contractTools = getContract({
    client: client,
    address: "0x9C335aF4c72E4fe28cf2990dC0bb15D8D2426F4B",
    chain: chainById,
  });

  // Farm Stake contract
  const contractStake = getContract({
    client: client,
    address: "0x077f6b8CE31d6F4c5b5b7654Af7Ebf0e2da42d6B",
    chain: chainById,
  });

  // console.log("Tools Contract: ", contractTools)
  // console.log("Stake Contract: ", contractStake)

  // check how many NFT this account owned
  // nftStaked array format in BigNumber
  // [0] - tokenId, 0,1,2,3
  // [1] - staked qty, 1,0,0,0
  const [nftStaked, setNftStaked] = useState<any[]>([]);

  const [tokenRecv0, setTokenRecv0] = useState<string>("0");
  const [tokenRecv1, setTokenRecv1] = useState<string>("0");
  const [tokenRecv2, setTokenRecv2] = useState<string>("0");

  // read getStakeInfo, returns an arrayu of nft
  let getStakedNFT = async () => {
    if (account) {
      const nftArray: any[] = await readContract({
        contract: contractStake,
        method: resolveMethod("getStakeInfo"),
        params: [account.address as string],
      });
      setNftStaked(nftArray);
      console.log("nftArray: ", nftArray);
    }
  };

  // read getStakeInfoForToken
  const getStakedToken = async (tokenId: number) => {
    if (account) {
      const tokenStakeRecv = await readContract({
        contract: contractStake,
        method: resolveMethod("getStakeInfoForToken"),
        params: [tokenId, account.address as string],
      });

      if (tokenId == 0) setTokenRecv0(toEther(tokenStakeRecv[1], 18));
      if (tokenId == 1) setTokenRecv1(toEther(tokenStakeRecv[1], 18));
      if (tokenId == 2) setTokenRecv2(toEther(tokenStakeRecv[1], 18));
      //console.log("token recv:", tokenStakeRecv0);
      //console.log("token recv:", toEther(tokenStakeRecv0[1], 18));
    }
  };

  const stakeNFT = async (tokenId: number) => {
    if (account) {
      const transaction = await prepareContractCall({
        contract: contractStake,
        method: resolveMethod("stake"),
        params: [BigInt(tokenId), BigInt(1)],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
    }
  };

  const unstakeNFT = async (tokenId: number) => {
    if (account) {
      const transaction = await prepareContractCall({
        contract: contractStake,
        method: resolveMethod("withdraw"),
        params: [BigInt(tokenId), BigInt(1)],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
    }
  };

  const claimRewardTokens = async (tokenId: number) => {
    if (account) {
      const transaction = await prepareContractCall({
        contract: contractStake,
        method: resolveMethod("claimRewards"),
        params: [BigInt(tokenId)],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
    }
  };

  const approveNFT = async () => {
    if (account) {
      const transaction = await prepareContractCall({
        contract: contractTools,
        method: resolveMethod("setApprovalForAll"),
        params: [contractStake.address as string, true],
      });
      console.log("transaction: ", transaction);
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
    }
  };

  useEffect(() => {
    getStakedNFT();
    getStakedToken(0);
    getStakedToken(1);
    getStakedToken(2);
  }, [account]);

  return (
    <>
    <div>

      <TransactionButton
        transaction={() => approveNFT()}
        onTransactionSent={() => {
          console.log("Transaction sent");
        }}
        onError={(error) => alert("Error: " + error.message)}
        onTransactionConfirmed={(receipt) => {
          alert("All NFT Approved");
        }}
      >
        Approve ALL NFT
      </TransactionButton> <br/>

        Staked NFT:<br />
        {nftStaked[0]}
    
        <br/>
        Shovel{" "}
        <TransactionButton
          transaction={() => claimRewardTokens(0)}

          onError={(error) => alert("Error: " + error.message)}
          onTransactionConfirmed={(receipt) => {
            alert("Carrot Claimed");
          }}
        >
          Claim
        </TransactionButton>
        : {tokenRecv0} CARROT
        <br />
        Wheelbarrow{" "}
        <TransactionButton
          transaction={() => claimRewardTokens(1)}

          onError={(error) => alert("Error: " + error.message)}
          onTransactionConfirmed={(receipt) => {
            alert("Carrot Claimed");
          }}
        >
          Claim
        </TransactionButton>
        : {tokenRecv1} CARROT
        <br />
        Tractor{" "}
        <TransactionButton
          transaction={() => claimRewardTokens(2)}

          onError={(error) => alert("Error: " + error.message)}
          onTransactionConfirmed={(receipt) => {
            alert("Carrot Claimed");
          }}
        >
          Claim
        </TransactionButton>
        : {tokenRecv2} CARROT
        <br />
     
      <br />
      <TransactionButton
        transaction={() => stakeNFT(0)}

        onError={(error) => alert("Error: " + error.message)}
        onTransactionConfirmed={(receipt) => {
          alert("shovel Staked");
          // rrerun to update nft staked
          getStakedNFT();  
        }}
      >
        Stake shovel
      </TransactionButton>

      <TransactionButton
        transaction={() => stakeNFT(1)}

        onError={(error) => alert("Error: " + error.message)}
        onTransactionConfirmed={(receipt) => {
          alert("Wheelbarrow Staked");
          // rerun to update nft staked
          getStakedNFT();  
        }}
      >
        Stake wheelbarrow
      </TransactionButton>

      <TransactionButton
        transaction={() => stakeNFT(2)}

        onError={(error) => alert("Error: " + error.message)}
        onTransactionConfirmed={(receipt) => {
          alert("tractor Staked");
          // rerun to update nft staked
          getStakedNFT();  
        }}
      >
        Stake tractor
      </TransactionButton><p/>

      <TransactionButton
        transaction={() => unstakeNFT(0)}

        onError={(error) => alert("Error: " + error.message)}
        onTransactionConfirmed={(receipt) => {
          alert("shovel Unstaked");
          // rerun to update nft staked
          getStakedNFT();  
        }}
      >
        Unstake shovel
      </TransactionButton>

      <TransactionButton
        transaction={() => unstakeNFT(1)}

        onError={(error) => alert("Error: " + error.message)}
        onTransactionConfirmed={(receipt) => {
          alert("wheelbarrow Unstaked");
          // rerun to update nft staked
          getStakedNFT();  
        }}
      >
        Unstake Wheelbarrow
      </TransactionButton>

      <TransactionButton
        transaction={() => unstakeNFT(2)}

        onError={(error) => alert("Error: " + error.message)}
        onTransactionConfirmed={(receipt) => {
          alert("tractor Unstaked");
          // rerun to update nft staked
          getStakedNFT();  
        }}
      >
        Unstake tractor
      </TransactionButton>
    </div>
    </>
  );
};
