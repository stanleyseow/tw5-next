"use client";

import {
  useState,
  useEffect,
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
} from "@/app/thirdweb";

import PubSub from 'pubsub-js';
//import * as TOPIC from "@game/scenes/pubsub_topic.js";
import { EventBus } from "@/game/EventBus";

import { readContract } from "thirdweb";
import { toEther } from "thirdweb/utils";
import thirdwebIcon from "@public/thirdweb.svg";
// import Image from "next/image";
import { client } from "@/app/client";
import { erc20Contract,erc1155Farmer, erc1155FarmTools, chainById } from "@/app/contracts";

import { setTokenData } from "@/game/phaserFunctions.tsx"

const ConnectWallet = () => {
  const account = useActiveAccount();
  //console.log("account: ", account);

  const wallet = useActiveWallet();
  //console.log("wallet: ", wallet);

  const [tokenBalance, setTokenBalance] = useState("0");

  useEffect(() => {
    const fetchTokenBalance = async () => {
      const balance = await readContract({
        contract: erc20Contract,
        method: "function balanceOf(address) view returns (uint256)",
        params: [account?.address as string],
      });
      setTokenBalance(toEther(balance));

      EventBus.emit("tokenBalanceChanged", tokenBalance);
      PubSub.publish("TOKEN", { "address":account?.address, "balance": tokenBalance });

      // Shared function between React & Phaser
      setTokenData(account?.address, tokenBalance )
    };

    // If account is loaded/change, call function below
    if (wallet) {
      fetchTokenBalance();
    }
  }, [wallet]);

  useEffect(() => {
    // Emit custom event when token balance changes
    console.log("tokenBalanceChanged: ", tokenBalance);
    EventBus.emit("tokenBalanceChanged", tokenBalance);
    // pubsub-js PUB
    PubSub.publish("TOKEN", { "address":account?.address, "balance": tokenBalance });
  }, [tokenBalance]);

  return (
    <div className="">
      <ConnectButton client={client} chain={chainById} />
      <div className="">
        {account && (
          <>
            {/* 
              <p>Address: {wallet?.getAccount()?.address} </p>
              <p>Wallet type: {wallet?.id}</p>
              <p>Chain: {wallet?.getChain()?.id} </p>
              <p>Contract addr: {erc20Contract.address}</p> */}

            <p>Token Balance: {tokenBalance}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
