import { useRef, useState, useEffect } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";

import { NFTClaim } from "@/app/components/NFTClaim"
import { NFTClaim2 } from "@/app/components/NFTClaim2"
import { NFTStake1 } from "@/app/components/NFTStake1"

function App() {
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

  let width = window.innerWidth;
  let height = window.innerHeight;

  // Detect window resize
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect will only run once after initial render

  // const changeScene = () => {

  //     if(phaserRef.current)
  //     {
  //         const scene = phaserRef.current.scene as MainMenu;

  //         if (scene)
  //         {
  //             scene.changeScene();
  //         }
  //     }
  // }

  // const moveSprite = () => {

  //     if(phaserRef.current)
  //     {

  //         const scene = phaserRef.current.scene as MainMenu;

  //         if (scene && scene.scene.key === 'MainMenu')
  //         {
  //             // Get the update logo position
  //             scene.moveLogo(({ x, y }) => {

  //                 setSpritePosition({ x, y });

  //             });
  //         }
  //     }

  // }

  // const addSprite = () => {

  //     if (phaserRef.current)
  //     {
  //         const scene = phaserRef.current.scene;

  //         if (scene)
  //         {
  //             // Add more stars
  //             const x = Phaser.Math.Between(64, scene.scale.width - 64);
  //             const y = Phaser.Math.Between(64, scene.scale.height - 64);

  //             //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
  //             const star = scene.add.sprite(x, y, 'star');

  //             //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
  //             //  You could, of course, do this from within the Phaser Scene code, but this is just an example
  //             //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
  //             scene.add.tween({
  //                 targets: star,
  //                 duration: 500 + Math.random() * 1000,
  //                 alpha: 0,
  //                 yoyo: true,
  //                 repeat: -1
  //             });
  //         }
  //     }
  // }

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
  };

  return (
    // set the div for the App window
    <div id="app" className="bg-violet-800 mx-1 my-1">

    {/*
      <PhaserGame
        ref={phaserRef}
        currentActiveScene={currentScene}
        width={windowSize.width}
        height={windowSize.height-100}
      />
    */}  

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
    </div>
  );
}

export default App;
