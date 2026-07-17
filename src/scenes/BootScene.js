export default class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {

        // Ici nous chargerons plus tard les sprites,
        // les sons, les maps, etc.

    }

    create() {

        this.scene.start("MenuScene");

    }

}
