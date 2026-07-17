export default class HUD {

    constructor(scene) {

        this.scene = scene;

        this.text = scene.add.text(
            20,
            20,
            "ASCENSION v0.1",
            {
                fontSize: "20px",
                color: "#ffffff",
                backgroundColor: "#000000",
                padding: {
                    left: 8,
                    right: 8,
                    top: 4,
                    bottom: 4
                }
            }
        );

        // Le HUD reste fixe à l'écran
        this.text.setScrollFactor(0);

    }

}
