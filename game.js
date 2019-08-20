var gameSettings = {
  playerSpeed: 200
};

var config = {
  width: 1280,
  height: 960,
  scene: [StartGame, MenuGame, FirstLevel],
  pixelArt: true,
  physics: {
    default: "arcade"
  }
};
var game = new Phaser.Game(config);
