class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {

        // --- Images temporaires ---
        this.load.image(
            "grass",
            "https://labs.phaser.io/assets/skies/grass.png"
        );

    }

    create() {

        this.scene.start("MenuScene");

    }
}

class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {

        const w = this.scale.width;
        const h = this.scale.height;

        this.cameras.main.setBackgroundColor("#203A20");

        this.add.text(
            w / 2,
            120,
            "ASCENSION",
            {
                fontSize: "64px",
                fontFamily: "Arial",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        this.add.text(
            w / 2,
            210,
            "Prototype v0.1",
            {
                fontSize: "26px",
                color: "#cccccc"
            }
        ).setOrigin(0.5);

        const start = this.add.text(
            w / 2,
            350,
            "Nouvelle Partie",
            {
                fontSize: "34px",
                backgroundColor: "#2f8f2f",
                padding: {
                    left:20,
                    right:20,
                    top:10,
                    bottom:10
                }
            }
        )
        .setOrigin(0.5)
        .setInteractive();

        start.on("pointerover",()=>{

            start.setStyle({
                backgroundColor:"#48b848"
            });

        });

        start.on("pointerout",()=>{

            start.setStyle({
                backgroundColor:"#2f8f2f"
            });

        });

        start.on("pointerdown",()=>{

            this.scene.start("VillageScene");

        });

    }

}

class VillageScene extends Phaser.Scene {

    constructor() {
        super("VillageScene");
    }

    create() {

        this.cameras.main.setBackgroundColor("#4FAF58");

        this.add.text(
            30,
            30,
            "Village d'Ascension",
            {
                fontSize:"32px",
                color:"#ffffff"
            }
        );

        this.player = this.add.rectangle(
            640,
            360,
            32,
            32,
            0x0066ff
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.keys = this.input.keyboard.addKeys({
            z:Phaser.Input.Keyboard.KeyCodes.Z,
            q:Phaser.Input.Keyboard.KeyCodes.Q,
            s:Phaser.Input.Keyboard.KeyCodes.S,
            d:Phaser.Input.Keyboard.KeyCodes.D,
            w:Phaser.Input.Keyboard.KeyCodes.W,
            a:Phaser.Input.Keyboard.KeyCodes.A
        });

    }

    update() {

        const speed = 4;

        if(this.cursors.left.isDown || this.keys.q.isDown || this.keys.a.isDown){

            this.player.x-=speed;

        }

        if(this.cursors.right.isDown || this.keys.d.isDown){

            this.player.x+=speed;

        }

        if(this.cursors.up.isDown || this.keys.z.isDown || this.keys.w.isDown){

            this.player.y-=speed;

        }

        if(this.cursors.down.isDown || this.keys.s.isDown){

            this.player.y+=speed;

        }

    }

}

const config = {

    type: Phaser.AUTO,

    parent:"game",

    width:1280,

    height:720,

    backgroundColor:"#000000",

    scene:[
        BootScene,
        MenuScene,
        VillageScene
    ]

};

new Phaser.Game(config);
