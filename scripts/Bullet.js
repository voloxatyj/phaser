class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    var x = scene.bandidos.x - 180;
    var y = scene.bandidos.y - 30;

    super(scene, x, y, "bullet");
    scene.add.existing(this);
    this.play("bullet_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.x = -250;
    scene.bullets.add(this);
    this.fireRate = 6;
    this.nextFire = 0;
  }
  update() {
    if (this.x < 32) {
      //console.log(this.x);
      this.destroy();
    }
  }
}
