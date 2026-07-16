class MainScene extends Phaser.Scene {

    constructor() {
        super("main");
    }

    preload() {
    }

    create() {

        this.add.text(
            250,
            100,
            "ASCENSION",
            {
                fontSize: "48px",
                color: "#ffffff"
            }
        );

        this.add.text(
            210,
            180,
            "Prototype v0.1",
            {
                fontSize: "26px",
                color: "#bbbbbb"
            }
        );

    }

}

new Phaser.Game({

    type: Phaser.AUTO,

    parent: "game",

    width: 1280,

    height: 720,

    backgroundColor: "#2b7c2b",

    scene: MainScene

});
