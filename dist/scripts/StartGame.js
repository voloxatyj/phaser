class StartGame extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  preload() {
    this.load.image("play", "./src/images/btn-play.png");
    this.load.image("logo", "./src/images/donuts_logo.png");
    this.load.image("sound", "./src/images/btn-sfx.png");
    this.load.image("donuts", "./src/images/donut.png");
    this.load.spritesheet("bullet", "./src/images/particles/particle1.png", {
      frameHeight: 65,
      frameWidth: 65
    });
    this.load.spritesheet(
      "backgroundStart",
      "./src/images/backgrounds/backgroundStart.png",
      {
        frameWidth: 1280,
        frameHeight: 960
      }
    );
    this.load.spritesheet("evil", "./src/images/evil.jpg", {
      frameWidth: 373,
      frameHeight: 466
    });
    this.load.spritesheet("gem01", "./src/images/game/gem01.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("gem02", "./src/images/game/gem02.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("gem03", "./src/images/game/gem03.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("gem04", "./src/images/game/gem04.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("gem05", "./src/images/game/gem05.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("gem06", "./src/images/game/gem06.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("gem07", "./src/images/game/gem07.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("gem11", "./src/images/game/gem11.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.spritesheet("gem12", "./src/images/game/gem12.png", {
      frameWidth: 80,
      frameHeight: 80
    });
    this.load.spritesheet("bandidos", "./src/images/bandidos.png", {
      frameWidth: 373,
      frameHeight: 422
    });

    this.load.spritesheet("lives", "./src/images/lives.png", {
      frameWidth: 40,
      frameHeight: 40
    });
    this.load.spritesheet(
      "destroy",
      "./src/images/particles/particle_ex1.png",
      {
        frameWidth: 64,
        frameHeight: 64
      }
    );
  }
  create() {
    //this.scene.start("startGame");
    this.background = this.add
      .tileSprite(0, 0, config.width, config.height, "backgroundStart")
      .setOrigin(0, 0)
      .setScrollFactor(0);
    this.background.alpha = 0.2;
    //this.time.events.add(Phaser.Timer.SECOND * 5, this.dialog, this);
    this.evil = this.add.sprite(config.width / 2 - 300, 350, "evil");
    this.evilText = this.add.text(
      config.width / 2 - 600,
      config.height / 2 - 350,
      "Why you came dirty mexicanos?!?! Go away!!!",
      {
        fontFamily: "Orbitron",
        backgroundColor: "black",
        color: "white",
        fontSize: "2rem"
      }
    );
    this.bandidosText = this.add.text(
      config.width / 2 - 200,
      config.height / 2 + 50,
      "Shut up!!! Smelly Donuts!! Eat my plumbum!",
      {
        fontFamily: "Orbitron",
        backgroundColor: "black",
        color: "white",
        fontSize: "2rem"
      }
    );
    this.bandidosText = this.add.text(
      config.width / 2,
      config.height / 2 + 300,
      "To play press SPACE",
      {
        fontFamily: "Orbitron",
        backgroundColor: "black",
        color: "yellow",
        fontSize: "1rem"
      }
    );

    this.bandidos = this.add.sprite(config.width / 2 + 350, 300, "bandidos");
    this.anims.create({
      key: "evil_anim",
      frames: this.anims.generateFrameNumbers("evil"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "bandidos_anim",
      frames: this.anims.generateFrameNumbers("bandidos"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gem01_anim",
      frames: this.anims.generateFrameNumbers("gem01"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gem02_anim",
      frames: this.anims.generateFrameNumbers("gem02"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gem03_anim",
      frames: this.anims.generateFrameNumbers("gem03"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gem04_anim",
      frames: this.anims.generateFrameNumbers("gem04"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gem05_anim",
      frames: this.anims.generateFrameNumbers("gem05"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gem06_anim",
      frames: this.anims.generateFrameNumbers("gem06"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gem07_anim",
      frames: this.anims.generateFrameNumbers("gem07"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gem11_anim",
      frames: this.anims.generateFrameNumbers("gem11"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gem12_anim",
      frames: this.anims.generateFrameNumbers("gem12"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "destroy",
      frames: this.anims.generateFrameNumbers("destroy"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "bullet_anim",
      frames: this.anims.generateFrameNumbers("bullet"),
      frameRate: 20,
      repeat: -1,
      hideOnComplete: true
    });
    /* this.input.on(
      "gameobjectdown",
      function() {
        this.scene.start("menuGame");
      },
      this
    ); */
    this.input.keyboard.on(
      "keydown-SPACE",
      function() {
        this.scene.start("menuGame");
      },
      this
    );
  }
}
