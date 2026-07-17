import BootScene from "./src/scenes/BootScene.js";
import MenuScene from "./src/scenes/MenuScene.js";
import VillageScene from "./src/scenes/VillageScene.js";

const config = {

    type: Phaser.AUTO,

    parent: "game",

    width: 1280,

    height: 720,

    physics: {

        default: "arcade",

        arcade: {

            gravity: {
                y: 0
            },

            debug: false

        }

    },

    scene: [

        BootScene,
        MenuScene,
        VillageScene

    ]

};

new Phaser.Game(config);
