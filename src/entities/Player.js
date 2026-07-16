export default class Player {

    constructor(scene, x, y) {

        this.scene = scene;

        // Position
        this.x = x;
        this.y = y;

        // Identité
        this.name = "Aventurier";
        this.gender = "unknown";

        // Progression
        this.level = 1;
        this.experience = 0;

        // Statistiques
        this.maxHealth = 100;
        this.health = 100;

        this.maxMana = 50;
        this.mana = 50;

        this.maxStamina = 100;
        this.stamina = 100;

        // Argent
        this.gold = 0;

        // Équipement
        this.equipment = {
            weapon: null,
            helmet: null,
            armor: null,
            gloves: null,
            boots: null,
            ring1: null,
            ring2: null,
            amulet: null
        };

        // Inventaire
        this.inventory = [];

        // Création du sprite temporaire
        this.sprite = scene.add.rectangle(
            x,
            y,
            32,
            32,
            0x0066ff
        );

    }

    //--------------------------------------
    // Déplacement
    //--------------------------------------

    move(dx, dy) {

        this.sprite.x += dx;
        this.sprite.y += dy;

    }

    //--------------------------------------
    // Vie
    //--------------------------------------

    takeDamage(amount) {

        this.health -= amount;

        if (this.health < 0) {
            this.health = 0;
        }

    }

    heal(amount) {

        this.health += amount;

        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }

    }

    //--------------------------------------
    // Or
    //--------------------------------------

    addGold(amount) {

        this.gold += amount;

    }

    //--------------------------------------
    // Inventaire
    //--------------------------------------

    addItem(item) {

        this.inventory.push(item);

    }

    removeItem(index) {

        this.inventory.splice(index, 1);

    }

    //--------------------------------------
    // Expérience
    //--------------------------------------

    addExperience(amount) {

        this.experience += amount;

        while (this.experience >= this.level * 100) {

            this.experience -= this.level * 100;
            this.level++;

            this.maxHealth += 10;
            this.health = this.maxHealth;

            this.maxMana += 5;
            this.mana = this.maxMana;

            this.maxStamina += 5;
            this.stamina = this.maxStamina;

            console.log("Niveau " + this.level);

        }

    }

}
