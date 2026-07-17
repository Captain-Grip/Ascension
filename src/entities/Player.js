export default class Player {

    constructor(scene, x, y) {

        this.scene = scene;

        // Création d'une texture si elle n'existe pas
        if (!scene.textures.exists("player")) {

            const graphics = scene.make.graphics({
                x: 0,
                y: 0,
                add: false
            });

            graphics.fillStyle(0x2f7fff, 1);
            graphics.fillRect(0, 0, 32, 32);

            graphics.generateTexture("player", 32, 32);

            graphics.destroy();
        }

        this.sprite = scene.physics.add.sprite(x, y, "player");

        this.sprite.setCollideWorldBounds(true);

        this.speed = 220;
    }

    update(cursors) {

        let vx = 0;
        let vy = 0;

        if (cursors.left.isDown) {
            vx = -this.speed;
        } else if (cursors.right.isDown) {
            vx = this.speed;
        }

        if (cursors.up.isDown) {
            vy = -this.speed;
        } else if (cursors.down.isDown) {
            vy = this.speed;
        }

        this.sprite.setVelocity(vx, vy);

    }

}
