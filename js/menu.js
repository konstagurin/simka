
var menuState = function (g) {
var title, music,crsr,wasd,keys;
};


var lives=7;
var score=0;
menuState.prototype={

  preload: function() {
    this.game.load.audio('hello', 'assets/sound/hello.mp3');
    this.game.load.image('phaser', 'assets/menu.png');
    },

  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'phaser');
	this.sprite.anchor.set(0.5);

	//	Then we tween it in from off the top of the game.
	//	It will end up at the middle of the game, as it's tweening FROM the value given below to its current position.
	this.game.add.tween(this.sprite).from( { y: -100 }, 1000, Phaser.Easing.Bounce.Out, true);

    this.wasd = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      spaseBar: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
    this.crsr = this.game.input.keyboard.createCursorKeys();

    this.music = this.game.add.audio('hello');

    this.music.play();


     title = this.game.add.text(210, 60, '', {
      font: '50px Arial',
      fill: '#ffffff'
    });

    //this.keys = this.game.Object.keys(this.wasd);
    //
    // var sKey=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // sKey.onDown.addOnce(this.start, this);

  },
  // start: function () {
  //   this.music.fadeIn(4);
  //
  // },
  update: function () {

    if (this.crsr.left.isDown||this.crsr.right.isDown||this.crsr.up.isDown||this.wasd.up.isDown||this.wasd.left.isDown||this.wasd.right.isDown||this.wasd.spaseBar.isDown) {
      this.music.stop();
      this.game.state.start('stage1');
    }

  }
};
//приключения симки
// //||wkey.onDown
//
