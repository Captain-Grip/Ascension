import Player from "../entities/Player.js";

export default class VillageScene extends Phaser.Scene {

    constructor() {
        super("VillageScene");
    }

    create() {

        const WORLD_WIDTH = 2000;
        const WORLD_HEIGHT = 2000;

        // Fond vert
        this.cameras.main.setBackgroundColor("#4FAF58");

        // Limites du monde
        this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
        this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        // Sol (simple quadrillage)
        const graphics = this.add.graphics();
        graphics.fillStyle(0x4FAF58);

        graphics.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        graphics.lineStyle(1, 0x5cbc65);

        for (let x = 0; x <= WORLD_WIDTH; x += 64) {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, WORLD_HEIGHT);
        }

        for (let y = 0; y <= WORLD_HEIGHT; y += 64) {
            graphics.moveTo(0, y);
            graphics.lineTo(WORLD_WIDTH, y);
        }

        graphics.strokePath();

        // Joueur
        this.player = new Player(this, 300, 300);

        // Caméra
        this.cameras.main.startFollow(this.player.sprite);

        this.cameras.main.setZoom(1);

        // Clavier
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {

        this.player.update(this.cursors);

    }

}
