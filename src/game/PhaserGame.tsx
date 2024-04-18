import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";
import PubSub from "pubsub-js";

import { setTokenData } from "@/game/phaserFunctions.tsx"

// Function to handle window resize
const handleResize = () => {
  console.log("*** resize detected: ", window.innerWidth, window.innerHeight);
  //game.scale.resize(window.innerWidth, window.innerHeight);
  //game.canvas.style.width = "";
  //game.canvas.style.height = "";
  //game.canvas.style.display = "block"; // Ensure canvas display is block
};

// // Add event listeners for window resize
window.addEventListener("resize", handleResize);

// Destroy function to remove event listener
// const destroy = () => {
//   window.removeEventListener("resize", handleResize);
//   game.destroy(true); // Destroy the game instance
// };

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
  width: number;
  height: number;
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
  function PhaserGame({ currentActiveScene, width, height }, ref) {
    const game = useRef<Phaser.Game | null>(null!);
    //const destroyRef = useRef<(() => void) | null>(null); // Define destroyRef

    useLayoutEffect(() => {
      console.log("useLayoutEffect called", game.current);
      if (game.current === null) {
        const { game: newGame, destroy } = StartGame(
          "game-container",
          width,
          height
        );
        game.current = newGame;

        // Store the destroy function in a ref to be called when unmounting
        //destroyRef.current = destroy;

        // Listen for token balance change event from React
        EventBus.on("tokenBalanceChanged", handleTokenBalanceChange);
      }
    }, [width, height, ref]);

    // Cleanup function to call destroy when unmounting
    // useEffect(() => {
    //   return () => {
    //     if (destroyRef.current) {
    //       destroyRef.current();
    //     }
    //   };
    // }, []);

    // this handle the pubsub for TOKEN
    useEffect(() => {
      const handlePubsub = (msg, data) => {
        console.log("handlePubsub: ", msg, data);

        // Shared function between React & Phaser
        setTokenData(data.address, data.balance )
      
      };
      const tokenSubscription = PubSub.subscribe("TOKEN", handlePubsub);
      return () => {
        // Unsubscribe from the TOKEN event when component unmounts
        PubSub.unsubscribe(tokenSubscription);
      };
    }, []);

    // this handle the pubsub for ROOM
    useEffect(() => {
        const handlePubsub = (msg, data) => {
          console.log("handlePubsub: ", msg, data);
          // Handle the event here
        };
        const tokenSubscription = PubSub.subscribe("ROOM", handlePubsub);
        return () => {
          // Unsubscribe from the TOKEN event when component unmounts
          PubSub.unsubscribe(tokenSubscription);
        };
      }, []);

    const handleTokenBalanceChange = (balance) => {
      console.log("handleTokenBalanceChange: ", balance);
    }

    // Listen for token balance change event from React
    EventBus.off("tokenBalanceChanged", handleTokenBalanceChange);

    return (
      // set the div for the game-container window
      <div id="game-container" className=""></div>
    );
  }
);
