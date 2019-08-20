class MenuGame extends Phaser.Scene {
  constructor() {
    super("menuGame");
  }
  init() {
    //console.log("Menu");
  }
  preload() {
    this.load.audio("music", "./src/audio/background.mp3");
    this.load.image("background", "./src/images/backgrounds/background.jpg");
  }
  create() {
    this.music = this.sound.add("music");
    var musicConfig = {
      mute: false,
      volume: 3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    };
    this.music.play(musicConfig);
    this.background = this.add.image(0, 0, "background");
    this.play = this.add.image(
      config.width / 2,
      config.height / 2 + 350,
      "play"
    );
    this.play.setInteractive();
    this.donuts = this.add.image(
      config.width / 2,
      config.height / 2 - 100,
      "donuts"
    );
    this.logo = this.add.image(config.width / 2, config.height / 2, "logo");
    this.sound = this.add.image(1100, 150, "sound");
    this.sound.setInteractive();
    this.input.keyboard.on(
      "keydown-SPACE",
      function() {
        this.music.stop();
      },
      this
    );
    this.background.setOrigin(0, 0);
    this.input.on(
      "gameobjectdown",
      function() {
        this.scene.start("firstLevel");
        this.music.stop();
      },
      this
    );
    //this.scene.start("firstLevel");
  }
}
