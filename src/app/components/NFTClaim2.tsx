"use client";
import { useState, useEffect } from "react";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { claimTo, balanceOf } from "thirdweb/extensions/erc1155";
import { approve } from "thirdweb/extensions/erc20";
import { getContract } from "thirdweb";
import { client } from "@/app/client";
import { defineChain } from "thirdweb/chains";

export const NFTClaim2 = () => {
  const account = useActiveAccount();
  const chainById = defineChain(2442);

  // Farm Tools contract
  const contractTools = getContract({
    client: client,
    address: "0x9C335aF4c72E4fe28cf2990dC0bb15D8D2426F4B",
    chain: chainById,
  });

  // $Carrot contract
  const contractCarrot = getContract({
    client: client,
    address: "0xe2C5371AF4691007E46B0926A35B4834BCE66089",
    chain: chainById,
  });

  // check how many NFT this account owned
  const [nftOwned0, setNftOwned0] = useState<string>("0");
  const [nftOwned1, setNftOwned1] = useState<string>("0");
  const [nftOwned2, setNftOwned2] = useState<string>("0");

  const getOwnedNFT0 = async () => {
    if (account) {
      const balance = await balanceOf({
        contract: contractTools,
        owner: account.address as string,
        tokenId: BigInt(0),
      });
      setNftOwned0(balance.toString());
    }
  };

  const getOwnedNFT1 = async () => {
    if (account) {
      const balance = await balanceOf({
        contract: contractTools,
        owner: account.address as string,
        tokenId: BigInt(1),
      });
      setNftOwned1(balance.toString());
    }
  };
  const getOwnedNFT2 = async () => {
    if (account) {
      const balance = await balanceOf({
        contract: contractTools,
        owner: account.address as string,
        tokenId: BigInt(2),
      });
      setNftOwned2(balance.toString());
    }
  };

  // when wallet connected, check getOwnedNFT()
  useEffect(() => {
    getOwnedNFT0();
    getOwnedNFT1();
    getOwnedNFT2();
  }, [account,nftOwned0,nftOwned1,nftOwned2] );

  return (
    <>
      <div>
        {account ? (
          <div>
            NFT Inventory:<br/>
            <p>Shovel (FREE): {nftOwned0}</p>
            <p>Wheelbarrow (5 $CARROT): {nftOwned1}</p>
            <p>Tractor (10 $CARROT): {nftOwned2}</p>
          </div>
        ) : (
         <div></div>
        )}
      </div>

      <div>
        <p>
  
        {/* Approve the FarmTool contract to spend (spender) the ERC-20 Carrot token on the owner behalf */}
          <TransactionButton
            transaction={() =>
              approve({
                contract: contractCarrot,
                spender: "0x9C335aF4c72E4fe28cf2990dC0bb15D8D2426F4B",
                amount: BigInt(10).toString(),
              })
            }
            onTransactionSent={() => {
              console.log("Transaction sent");
            }}
            onError={(error) => alert(error.message)}
            onTransactionConfirmed={(receipt) => {
              alert("CARROT Approved");
              // rerun to update nft owned
              getOwnedNFT0();
            }}
          >
            Approve 10 $CARROT
          </TransactionButton>
        </p><br/>

        <TransactionButton
          transaction={() =>
            claimTo({
              contract: contractTools,
              to: account?.address as string,
              quantity: BigInt(1),
              tokenId: BigInt(0),
            })
          }
          onTransactionSent={() => {
            console.log("Transaction sent");
          }}
          onError={(error) => alert(error.message)}
          onTransactionConfirmed={(receipt) => {
            alert("Shovel Claimed");
            // rerun to update nft owned
            getOwnedNFT0();
          }}
        >
          Buy Shovel (free)
        </TransactionButton>

        <TransactionButton
          transaction={() =>
            claimTo({
              contract: contractTools,
              to: account?.address as string,
              quantity: BigInt(1),
              tokenId: BigInt(1),
            })
          }
          onTransactionSent={() => {
            console.log("Transaction sent");
          }}
          onError={(error) => alert(error.message)}
          onTransactionConfirmed={(receipt) => {
            alert("Wheelbarrow Claimed");
            // rerun to update nft owned
            getOwnedNFT1();
          }}
        >
          Buy Wheelbarrow
        </TransactionButton>

        <TransactionButton
          transaction={() =>
            claimTo({
              contract: contractTools,
              to: account?.address as string,
              quantity: BigInt(1),
              tokenId: BigInt(2),
            })
          }
          onTransactionSent={() => {
            console.log("Transaction sent");
          }}
          onError={(error) => alert(error.message)}
          onTransactionConfirmed={(receipt) => {
            alert("Tractor Claimed");
            // rerun to update nft owned
            getOwnedNFT2();
          }}
        >
          Buy Tractor
        </TransactionButton>
      </div>
    </>
  );
};
