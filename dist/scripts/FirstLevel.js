class FirstLevel extends Phaser.Scene {
  constructor() {
    super("firstLevel");
  }
  init() {
    //console.log("Hi! First Level!");
  }
  create() {
    this.score = 0;
    this.health = 1500;
    this.cameras.main.setBounds(0, 0, 1280, 960);
    this.background = this.add
      .tileSprite(0, 0, config.width, config.height, "background")
      .setOrigin(0, 0)
      .setScrollFactor(0);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.scoreText = this.add.text(20, 50, "SCORE:0", {
      fontFamily: "Orbitron",
      color: "black",
      fontSize: "3rem"
    });
    this.input.on("gameobjectdown", this.destroy, this);
    this.bullets = this.add.group();
    this.evil = this.add.group();
    /* this.cameras.main.startFollow(this.bandidos, true, 0.09, 0.09);
      this.cameras.main.setZoom(1);
      this.background.tilePositionX = this.cameras.scrollX * 0.3;
      this.background.tilePositionY = this.cameras.scrollY * 0.3; */
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

    this.bandidos = this.physics.add.sprite(700, 400, "bandidos");
    this.gem01 = this.add.sprite(0, config.height / 2 - 50, "gem01");
    this.gem02 = this.add.sprite(0, config.height / 2, "gem02");
    this.gem03 = this.add.sprite(0, config.height / 2 - 150, "gem03");
    this.gem04 = this.add.sprite(0, config.height / 2 + 150, "gem04");
    this.gem05 = this.add.sprite(0, config.height / 2 - 250, "gem05");
    this.gem06 = this.add.sprite(0, config.height / 2 + 250, "gem06");
    this.gem07 = this.add.sprite(0, config.height / 2 + 270, "gem07");
    this.gem11 = this.add.sprite(0, config.height / 2 + 300, "gem11");
    this.gem12 = this.add.sprite(0, config.height / 2 - 300, "gem12");

    this.donuts = this.physics.add.group();
    this.donuts.add(this.gem01);
    this.donuts.add(this.gem02);
    this.donuts.add(this.gem03);
    this.donuts.add(this.gem04);
    this.donuts.add(this.gem05);
    this.donuts.add(this.gem06);
    this.donuts.add(this.gem07);
    this.donuts.add(this.gem11);
    this.donuts.add(this.gem12);

    this.gem01.play("gem01_anim");
    this.gem02.play("gem02_anim");
    this.gem03.play("gem03_anim");
    this.gem04.play("gem04_anim");
    this.gem05.play("gem05_anim");
    this.gem06.play("gem06_anim");
    this.gem07.play("gem07_anim");
    this.gem11.play("gem11_anim");
    this.gem12.play("gem12_anim");
    this.bandidos.play("bandidos_anim");

    this.gem01.setInteractive();
    this.gem02.setInteractive();
    this.gem03.setInteractive();
    this.gem04.setInteractive();
    this.gem05.setInteractive();
    this.gem06.setInteractive();
    this.gem07.setInteractive();
    this.gem11.setInteractive();
    this.gem12.setInteractive();
    this.bandidos.setInteractive();
  }

  update() {
    this.physics.add.overlap(
      this.bandidos,
      this.donuts,
      this.hurtBandidos,
      null,
      this
    );

    this.physics.add.overlap(
      this.bullets,
      this.donuts,
      this.hitDonuts,
      null,
      this
    );

    this.physics.add.overlap(
      this.bullets,
      this.evil,
      this.hitEnemy,
      null,
      this
    );

    this.moveDonuts(this.gem01, 1);
    this.moveDonuts(this.gem02, 2);
    this.moveDonuts(this.gem03, 3);
    this.moveDonuts(this.gem04, 4);
    this.moveDonuts(this.gem05, 5);
    this.moveDonuts(this.gem06, 6);
    this.moveDonuts(this.gem07, 7);
    this.moveDonuts(this.gem11, 8);
    this.moveDonuts(this.gem12, 9);
    this.updateDirect(this.bandidos);
    this.background.tilePositionX -= 0.5;
    this.enemyDirect(this.evil);

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      //console.log("FIRE!!");
      this.shoot();
    }

    for (var i = 0; i < this.bullets.getChildren().length; i++) {
      var bullet = this.bullets.getChildren()[i];
      bullet.update();
    }
  }

  destroy(donuts, gameObject) {
    gameObject.setTexture("destroy");
    gameObject.play("destroy");
  }

  moveDonuts(donuts, speed) {
    donuts.x += speed / 2;
    if (donuts.x > config.width) {
      this.resetPos(donuts);
    }
  }

  resetPos(donuts) {
    donuts.x = 0;
    var randomY = Phaser.Math.Between(100, config.height - 200);
    donuts.y = randomY;
  }

  shoot() {
    var bullet = new Bullet(this);
  }

  hitDonuts(bullets, donuts) {
    bullets.destroy();
    this.score += 15;
    this.scoreText.text = "SCORE: " + this.score;
    this.resetPos(donuts);
    //console.log(this.donuts.name);
    if (this.score == 15) {
      this.background = this.add
        .tileSprite(0, 0, config.width, config.height, "backgroundStart")
        .setOrigin(0, 0)
        .setScrollFactor(0);
      this.bandidos = this.physics.add.sprite(400, 400, "bandidos");
      this.evil = this.physics.add.sprite(373, 466, "evil");
      this.scoreHealth = this.add.text(20, 90, "Health :" + this.health, {
        fontFamily: "Orbitron",
        color: "black",
        fontSize: "3rem"
      });
    }
  }

  hitEnemy(bullets, evil) {
    bullets.destroy();
    this.health -= 50;
    this.scoreHealth = this.add.text(20, 90, "Health :" + this.health, {
      fontFamily: "Orbitron",
      color: "black",
      fontSize: "3rem"
    });
    if (this.health <= 0) {
      evil.destroy();
      this.youWin = this.add.text(
        config.width / 2 - 400,
        config.height / 2 - 200,
        "YOU WIN",
        {
          fontFamily: "Orbitron",
          backgroundColor: "black",
          color: "white",
          fontSize: "10rem"
        }
      );
    }
  }

  hurtBandidos(bandidos, donuts) {
    //this.lives -= 1;
    //this.scoreLives.text = "Lives x" + this.lives;
    /*  if (this.lives <= 0) {
      this.gameOver = this.add.text(
        config.width / 2 - 570,
        config.height / 2 - 200,
        "GAME OVER",
        {
          fontFamily: "Orbitron",
          backgroundColor: "black",
          color: "white",
          fontSize: "10rem"
        }
      );
    } */
    //bandidos.disableBody(true, true);
    bandidos.x = config.width / 2 + 250;
    bandidos.y = config.height / 2 - 15;
    this.resetPos(donuts);
  }
  enemyDirect() {
    let variable = Math.random();
    if (variable <= 0.25) {
      this.evil.x -= 5 && this.evil.x >= 0;
    } else if (variable <= 0.5) {
      this.evil.x += 5 && this.evil.x <= config.height;
    }
    if (variable <= 0.75) {
      this.evil.y -= 5 && this.evil.y >= 0;
    } else if (variable <= 1) {
      this.evil.y += 5 && this.evil.y <= config.height;
    }
    //console.log(Math.random());
  }
  updateDirect() {
    if (this.cursors.left.isDown) {
      this.bandidos.x -= 2.5 && this.bandidos.x >= 0;
    } else if (this.cursors.right.isDown) {
      this.bandidos.x += 2.5 && this.bandidos.x <= config.width;
    }

    if (this.cursors.up.isDown) {
      this.bandidos.y -= 2.5 && this.bandidos.y >= 0;
    } else if (this.cursors.down.isDown) {
      this.bandidos.y += 2.5 && this.bandidos.y <= config.height;
    }
  }
}
