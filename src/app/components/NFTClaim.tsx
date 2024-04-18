"use client";
import { useState, useEffect } from "react";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { claimTo, balanceOf } from "thirdweb/extensions/erc1155";
import { getContract } from "thirdweb";
import { client } from "@/app/client";
import { defineChain } from "thirdweb/chains";

import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";

export const NFTClaim = () => {
  const account = useActiveAccount();
  const chainById = defineChain(2442);

  const contract = getContract({
    client: client,
    address: "0x50b45CBAfc25a7670a725e703308859c3334bB61",
    chain: chainById,
  });

  // check how many NFT this account owned
  const [nftOwned, setNftOwned] = useState<string>("0");

  const getOwnedNFT = async () => {
    if (account) {
      const balance = await balanceOf({
        contract: contract,
        owner: account.address as string,
        tokenId: BigInt(0),
      });
      setNftOwned(balance.toString());
    }
  };

  // when wallet connected, check getOwnedNFT()
  useEffect(() => {
    getOwnedNFT();
  }, [account]);

  // const { data, isLoading } = useReadContract({ 
  //   contract: contract, 
  //   method: resolveMethod("contractURI"), 
  //   params: [0] 
  // });

  // if ( data ) {
  //   console.log(data)
  // }


  return (
    <>
      <div>
        {account ? (
          <p>Farmer NFT Owned: {nftOwned}</p>
        ) : (
          <p> Connect your wallet to claim Farmer NFT </p>
        )}
      </div>

      <div>
        <TransactionButton
          transaction={() =>
            claimTo({
              contract: contract,
              to: account?.address as string,
              tokenId: BigInt(0),
              quantity: BigInt(1),
            })
          }
          onTransactionSent={() => {
            console.log("Transaction sent");
          }}
          onError={(error) => alert(error.message)}
          onTransactionConfirmed={(receipt) => {
            alert("NFT Claimed");
            // rerun to update nft owned
            getOwnedNFT();
          }}
        >
          Claim Farmer NFT
        </TransactionButton>
      </div>
    </>
  );
};
