export default class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {

        const width = this.scale.width;
        const height = this.scale.height;

        this.cameras.main.setBackgroundColor("#1b1b1b");

        this.add.text(
            width / 2,
            120,
            "ASCENSION",
            {
                fontSize: "64px",
                fontFamily: "Arial",
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        this.add.text(
            width / 2,
            190,
            "Prototype v0.1",
            {
                fontSize: "24px",
                color: "#aaaaaa"
            }
        ).setOrigin(0.5);

        const button = this.add.rectangle(
            width / 2,
            340,
            280,
            70,
            0x2f8f2f
        )
        .setInteractive({ useHandCursor: true });

        const text = this.add.text(
            width / 2,
            340,
            "Nouvelle Partie",
            {
                fontSize: "28px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        button.on("pointerover", () => {

            button.setFillStyle(0x49b949);

        });

        button.on("pointerout", () => {

            button.setFillStyle(0x2f8f2f);

        });

        button.on("pointerdown", () => {

            this.scene.start("VillageScene");

        });

    }

}
