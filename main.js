/**
 * ASCENSION - RPG Game Prototype v0.1
 * Phaser 3 with Arcade Physics
 * Un seul fichier, pas de ressources externes
 */

// ============================================================================
// SCÈNE DE DÉMARRAGE - BOOT
// ============================================================================

class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Chargement des ressources (aucune ressource externe)
  }

  create() {
    // Transition directe vers le menu
    this.scene.start('MenuScene');
  }
}

// ============================================================================
// SCÈNE MENU - TITRE ASCENSION
// ============================================================================

class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    // Pas de ressources externes
  }

  create() {
    // Fond gris foncé
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Titre "ASCENSION"
    this.add
      .text(this.scale.width / 2, this.scale.height / 2 - 100, 'ASCENSION', {
        fontSize: '80px',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        color: '#00ff88',
        align: 'center',
        stroke: '#00cc66',
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    // Sous-titre
    this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2 - 10,
        'Un monde fantastique vous attend...',
        {
          fontSize: '18px',
          fontFamily: 'Arial',
          color: '#aaaaaa',
          align: 'center',
        }
      )
      .setOrigin(0.5);

    // Version
    this.add
      .text(this.scale.width / 2, this.scale.height / 2 + 40, 'Prototype v0.1', {
        fontSize: '14px',
        fontFamily: 'Arial',
        color: '#888888',
        align: 'center',
      })
      .setOrigin(0.5);

    // Bouton "Nouvelle Partie"
    const buttonWidth = 200;
    const buttonHeight = 60;
    const buttonX = this.scale.width / 2;
    const buttonY = this.scale.height / 2 + 120;

    // Fond du bouton
    const buttonBg = this.add
      .rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0x00ff88)
      .setInteractive({ useHandCursor: true });

    // Texte du bouton
    const buttonText = this.add
      .text(buttonX, buttonY, 'Nouvelle Partie', {
        fontSize: '20px',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        color: '#000000',
        align: 'center',
      })
      .setOrigin(0.5);

    // Événements du bouton
    buttonBg.on('pointerover', () => {
      buttonBg.setFillStyle(0x00ff99);
      buttonText.setScale(1.1);
    });

    buttonBg.on('pointerout', () => {
      buttonBg.setFillStyle(0x00ff88);
      buttonText.setScale(1);
    });

    buttonBg.on('pointerdown', () => {
      this.scene.start('VillageScene');
    });
  }

  update() {
    // Pas de logique de mise à jour
  }
}

// ============================================================================
// SCÈNE VILLAGE - MONDE JEU
// ============================================================================

class VillageScene extends Phaser.Scene {
  constructor() {
    super('VillageScene');
  }

  preload() {
    // Pas de ressources externes
  }

  create() {
    // ========================================================================
    // CONFIGURATION DU MONDE
    // ========================================================================

    const WORLD_WIDTH = 3000;
    const WORLD_HEIGHT = 3000;

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBackgroundColor('#3d6b1f');

    // ========================================================================
    // CRÉATION DU CHEMIN
    // ========================================================================

    const tileSize = 32;
    const pathGroup = this.physics.add.staticGroup();

    // Chemin horizontal (de gauche à droite, au milieu)
    for (let x = 0; x < WORLD_WIDTH; x += tileSize) {
      const pathY = WORLD_HEIGHT / 2;
      const pathTile = this.add.rectangle(
        x + tileSize / 2,
        pathY + tileSize / 2,
        tileSize - 2,
        tileSize - 2,
        0xccaa66
      );
      pathGroup.add(pathTile);
    }

    // Chemin vertical (de haut en bas, au tiers du monde)
    for (let y = 0; y < WORLD_HEIGHT; y += tileSize) {
      const pathX = WORLD_WIDTH / 3;
      const pathTile = this.add.rectangle(
        pathX + tileSize / 2,
        y + tileSize / 2,
        tileSize - 2,
        tileSize - 2,
        0xccaa66
      );
      pathGroup.add(pathTile);
    }

    // ========================================================================
    // CRÉATION DU JOUEUR - SPRITE ARCADE PHYSICS
    // ========================================================================

    // Créer une texture dynamique pour le joueur (carré bleu)
    const playerGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    playerGraphics.fillStyle(0x0088ff, 1);
    playerGraphics.fillRect(0, 0, 32, 32);
    playerGraphics.generateTexture('playerTexture', 32, 32);
    playerGraphics.destroy();

    // Créer le sprite du joueur avec Arcade Physics devant la maison
    this.player = this.physics.add.sprite(WORLD_WIDTH / 2, WORLD_HEIGHT / 2 + 80, 'playerTexture');
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.body.setDrag(1, 1);

    // Stats du joueur
    this.playerStats = {
      hp: 100,
      maxHp: 100,
      gold: 250,
      level: 1,
      speed: 250,
    };

    // ========================================================================
    // CRÉATION D'UNE MAISON AU CENTRE
    // ========================================================================

    const houseX = WORLD_WIDTH / 2;
    const houseY = WORLD_HEIGHT / 2;
    const houseGroup = this.physics.add.staticGroup();

    // Murs de la maison (rectangles bruns)
    const wallLeft = this.add.rectangle(houseX - 60, houseY, 20, 80, 0x8b4513);
    const wallRight = this.add.rectangle(houseX + 60, houseY, 20, 80, 0x8b4513);
    const wallBottom = this.add.rectangle(houseX, houseY + 40, 140, 20, 0x8b4513);
    const wallTop = this.add.rectangle(houseX, houseY - 40, 140, 20, 0x8b4513);

    houseGroup.add(wallLeft);
    houseGroup.add(wallRight);
    houseGroup.add(wallBottom);
    houseGroup.add(wallTop);

    // Porte (rectangle noir)
    const door = this.add.rectangle(houseX, houseY + 35, 20, 40, 0x1a1a1a);

    // Toit (triangle simulé avec un polygone ou un rectangle penché - on utilise un triangle)
    const roofGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    roofGraphics.fillStyle(0xd2691e, 1);
    roofGraphics.beginPath();
    roofGraphics.moveTo(houseX - 80, houseY - 45);
    roofGraphics.lineTo(houseX + 80, houseY - 45);
    roofGraphics.lineTo(houseX, houseY - 90);
    roofGraphics.closePath();
    roofGraphics.fillPath();
    roofGraphics.generateTexture('roofTexture', 160, 50);
    roofGraphics.destroy();

    const roof = this.add.sprite(houseX, houseY - 50, 'roofTexture');

    // ========================================================================
    // CRÉATION D'UN PNJ DEVANT LA MAISON
    // ========================================================================

    // PNJ : carré orange
    const pnjGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    pnjGraphics.fillStyle(0xff8800, 1);
    pnjGraphics.fillRect(0, 0, 32, 32);
    pnjGraphics.generateTexture('pnjTexture', 32, 32);
    pnjGraphics.destroy();

    this.pnj = this.physics.add.sprite(houseX, houseY + 70, 'pnjTexture');
    this.pnj.setImmovable(true);
    this.physics.add.collider(this.player, this.pnj);

    // ========================================================================
    // CRÉATION DES ARBRES - OBSTACLES AVEC VRAIES COLLISIONS
    // ========================================================================

    this.trees = this.physics.add.staticGroup();

    // Positions des arbres isolés
    const treePositions = [
      { x: 300, y: 200 },
      { x: 800, y: 150 },
      { x: 1200, y: 400 },
      { x: 1500, y: 800 },
      { x: 600, y: 1000 },
      { x: 1800, y: 600 },
      { x: 900, y: 1200 },
      { x: 2000, y: 1500 },
      { x: 400, y: 1600 },
      { x: 1100, y: 1800 },
    ];

    // Créer les arbres isolés (cercles verts)
    treePositions.forEach((pos) => {
      const tree = this.add.circle(pos.x, pos.y, 25, 0x228b22);
      this.physics.add.existing(tree, true); // Static body
      this.trees.add(tree);
    });

    // ========================================================================
    // CRÉATION D'UNE PETITE FORÊT - POSITIONS FIXES
    // ========================================================================

    const forestX = 2200;
    const forestY = 1200;
    const forestSize = 10;
    const forestSpacing = 80;

    for (let i = 0; i < forestSize; i++) {
      for (let j = 0; j < forestSize; j++) {
        const treeX = forestX + i * forestSpacing;
        const treeY = forestY + j * forestSpacing;

        // Vérifier les limites du monde
        if (treeX > 0 && treeX < WORLD_WIDTH && treeY > 0 && treeY < WORLD_HEIGHT) {
          const forestTree = this.add.circle(treeX, treeY, 25, 0x1a6b1a);
          this.physics.add.existing(forestTree, true);
          this.trees.add(forestTree);
        }
      }
    }

    // ========================================================================
    // COLLISIONS
    // ========================================================================

    // Collision joueur - arbres
    this.physics.add.collider(this.player, this.trees);
    // Collision joueur - murs de la maison
    this.physics.add.collider(this.player, houseGroup);

    // ========================================================================
    // CAMÉRA QUI SUIT LE JOUEUR
    // ========================================================================

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setLerp(0.1, 0.1); // Effet de lissage

    // ========================================================================
    // INPUTS (ZQSD + FLÈCHES)
    // ========================================================================

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = {
      z: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      q: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    // ========================================================================
    // HUD (INTERFACE)
    // ========================================================================

    this.hudContainer = this.add.container(0, 0);

    // Fond semi-transparent pour le HUD
    const hudBg = this.add.rectangle(150, 110, 320, 180, 0x000000, 0.8);
    hudBg.setStrokeStyle(2, 0x00ff88);

    // Textes HUD
    this.hpText = this.add.text(20, 20, '', {
      fontSize: '16px',
      fontFamily: 'Courier New',
      color: '#ff4444',
      fontStyle: 'bold',
    });

    this.goldText = this.add.text(20, 50, '', {
      fontSize: '16px',
      fontFamily: 'Courier New',
      color: '#ffdd00',
      fontStyle: 'bold',
    });

    this.levelText = this.add.text(20, 80, '', {
      fontSize: '16px',
      fontFamily: 'Courier New',
      color: '#88ff44',
      fontStyle: 'bold',
    });

    this.coordText = this.add.text(20, 110, '', {
      fontSize: '14px',
      fontFamily: 'Courier New',
      color: '#88ccff',
    });

    this.fpsText = this.add.text(20, 135, '', {
      fontSize: '14px',
      fontFamily: 'Courier New',
      color: '#ff99ff',
    });

    this.versionText = this.add.text(20, 160, 'Prototype v0.1', {
      fontSize: '12px',
      fontFamily: 'Courier New',
      color: '#888888',
    });

    this.hudContainer.add([
      hudBg,
      this.hpText,
      this.goldText,
      this.levelText,
      this.coordText,
      this.fpsText,
      this.versionText,
    ]);

    this.hudContainer.setScrollFactor(0);
    this.hudContainer.setDepth(100);
  }

  update() {
    // ========================================================================
    // GESTION DU DÉPLACEMENT DU JOUEUR
    // ========================================================================

    const velocity = new Phaser.Math.Vector2(0, 0);
    const speed = this.playerStats.speed;

    // Flèches haut / Z
    if (this.cursors.up.isDown || this.keys.z.isDown) {
      velocity.y -= speed;
    }

    // Flèches bas / S
    if (this.cursors.down.isDown || this.keys.s.isDown) {
      velocity.y += speed;
    }

    // Flèches gauche / Q
    if (this.cursors.left.isDown || this.keys.q.isDown) {
      velocity.x -= speed;
    }

    // Flèches droite / D
    if (this.cursors.right.isDown || this.keys.d.isDown) {
      velocity.x += speed;
    }

    // Application de la vélocité
    this.player.setVelocity(velocity.x, velocity.y);

    // ========================================================================
    // MISE À JOUR DU HUD
    // ========================================================================

    const playerX = Math.floor(this.player.x);
    const playerY = Math.floor(this.player.y);
    const fps = Math.floor(this.game.loop.actualFps);

    this.hpText.setText(`PV: ${this.playerStats.hp}/${this.playerStats.maxHp}`);
    this.goldText.setText(`Or: ${this.playerStats.gold}`);
    this.levelText.setText(`Niveau: ${this.playerStats.level}`);
    this.coordText.setText(`X: ${playerX} | Y: ${playerY}`);
    this.fpsText.setText(`FPS: ${fps}`);
  }
}

// ============================================================================
// CONFIGURATION PHASER ET INITIALISATION
// ============================================================================

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [BootScene, MenuScene, VillageScene],
};

const game = new Phaser.Game(config);