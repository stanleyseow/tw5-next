import { Game, AUTO } from "phaser";
import preloadScene from "./scenes/preloadScene";
import menuScene from "./scenes/menuScene";
import world from "./scenes/worldScene";
import blockA from "./scenes/blockA";
import blockB from "./scenes/blockB";
import artGallery from "./scenes/artGallery";
import room30x30 from "./scenes/room30x30";
import room60x60 from "./scenes/room60x60";

import ButtonPlugin from "phaser3-rex-plugins/plugins/button-plugin.js";
import VirtualJoystickPlugin from "phaser3-rex-plugins/plugins/virtualjoystick-plugin.js";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

const StartGame = (parent: string, width: number, height: number) => {
  //console.log("***StartGame width/height:", width, height);

  const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: width,
    height: height,
    parent: 'game-container',
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    plugins: {
      global: [
        {
          key: "rexVirtualJoystick",
          plugin: VirtualJoystickPlugin,
          start: true,
        },
        {
          key: "rexButton",
          plugin: ButtonPlugin,
          start: true,
        },
      ],
      scene: [
        {
          key: "rexUI",
          plugin: RexUIPlugin,
          mapping: "rexUI",
        },
      ],
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      zoom: 1.0,
    },
    backgroundColor: "#5b21b6",
    scene: [
      preloadScene,
      menuScene,
      world,
      blockA,
      blockB,
      artGallery,
      room30x30,
      room60x60,
    ],
  };

  return new Game({ ...config, parent });
};

export default StartGame;
