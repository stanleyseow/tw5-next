"use client";
import { NFTClaim } from "@/app/components/NFTClaim"
import { NFTClaim2 } from "@/app/components/NFTClaim2"
import { NFTStake1 } from "@/app/components/NFTStake1"


const NFTPage = () => {
  
  return (
    <>
    <p>This page display all the NFT for this game</p>
    <br/>
    You need at least 1 Farmer NFT to play this game.<br/>
    <NFTClaim/>
    <br/>
    <hr/>

    <h2>Farms Tools are used to generate $CARROT tokens</h2>
    <NFTClaim2/>

    <br/>
    <hr/>
    <h2>Tools Equipped (stakes) for earning CARROT tokens</h2>
    <NFTStake1/>

    </>
  );
};
export default NFTPage;
