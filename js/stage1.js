// var g = new Phaser.Game(800, 555, Phaser.AUTO, 'game', {
//   preload: preload,
//   create: create,
//   update: update,
//   init: init
//
// });
var stage1 = function(g) {
  var pltfrm, plr, crsr, wasd, str, e1, scoreTxt, liveTxt, music;
  var right = true;
};


stage1.prototype = {
    preload: function() {
      this.game.load.audio('hello', 'assets/sound/hello.mp3');

      this.game.load.audio('soundTr', 'assets/sound/8bit.mp3');

      this.game.load.image('sk', 'assets/sky.png');
      this.game.load.image('pltfrm', 'assets/platform.png');
      this.game.load.image('str', 'assets/star.png');
      this.game.load.spritesheet('dd', 'assets/dude.png', 50,75);

      this.game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);


      //this.game.load.audio('soundTr', ['assets/8bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);


    },

    create: function() {
      this.game.world.setBounds(0, 0, 1920, 600);

      this.game.add.sprite(0, 0, 'sk');
      this.hi = this.game.add.audio('hello');
      this.st1music = this.game.add.audio('soundTr');
      this.hi.play();

      this.st1music.play();

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.add.sprite(0, 0, 'sk');
      pltfrm = this.game.add.group();
      pltfrm.enableBody = true;

      var grnd = pltfrm.create(0, this.game.world.height - 64, 'pltfrm');
      grnd.scale.setTo(13, 2);
      grnd.body.immovable = true;

      var ledge = pltfrm.create(400, 400, 'pltfrm');
      ledge.body.immovable = true;
      ledge = pltfrm.create(-150, 250, 'pltfrm');
      ledge.body.immovable = true;

      plr = this.game.add.sprite(32, this.game.world.height - 150, 'dd');
      this.game.physics.arcade.enable(plr);
      this.game.camera.follow(plr);

      plr.body.bounce.y = 0.2;
      plr.body.gravity.y = 400;
      //plr.body.collideWorldBounds = true;

      plr.animations.add('left', [0, 1, 2, 3], 10, true);
      plr.animations.add('right', [5, 6, 7, 8], 10, true);

      str = this.game.add.group();
      str.enableBody = true;
      for (var i = 0; i < 12; i++) {
        var ostr = str.create(i * 70, 0, 'str');
        ostr.body.gravity.y = 166;
        ostr.body.bounce.y = 0.3 + Math.random() * 0.2;
      }

      crsr = this.game.input.keyboard.createCursorKeys();
      wasd = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        spaseBar: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      };

      scoreTxt = this.game.add.text(16, 16, 'Score: 0', {
        fintSize: '30px',
        fill: '#000'
      });
      liveTxt = this.game.add.text(156, 16, 'Lives: ', {
        fintSize: '30px',
        fill: '#000'
      });


      e1 = this.game.add.sprite(32, 32, 'baddie');
      e1.position.x = 0;
      //e1.velocity.x = +2;
      this.game.physics.arcade.enable(e1);
      e1.enableBody = true;
      e1.body.gravity.y = 400;
      e1.body.bounce.y = 0.3;

      e1.animations.add('left', [0, 1, ], 10, true);
      e1.animations.add('right', [2, 3], 10, true);
    },

    update: function() {
      this.game.world.wrap(plr, 0, true);


      this.game.physics.arcade.collide(plr, pltfrm);
      this.game.physics.arcade.collide(str, pltfrm);
      this.game.physics.arcade.collide(e1, pltfrm);

      this.game.physics.arcade.overlap(plr, str, collStr, null, this);
      this.game.physics.arcade.overlap(plr, e1, restart, null, this);

      if (lives === 0) {
        this.game.state.start('stage2');
      } else {
        scoreTxt.text = 'Score: ' + score;
        liveTxt.text = 'Lives: ' + lives;
      }

      function collStr(plr, str) {
        str.kill();
        score += 10;
        //this.game.state.start('stage2');
      }


      function restart(plr, e1) {
        lives -= 1;

        if (score === 0) {
          // this.st1music.destroy();
          // this.game.cache.removeSound('wizball');
          this.st1music.stop();
          this.game.state.start('stage2');

          // var novyiHui = new stage1();
          // novyiHui.create();
        } else {
          setTimeout(function() {
            score = 0;

          }, 400);
        }
      }


      plr.body.velocity.x = 0;

      if (crsr.left.isDown || wasd.left.isDown) {
        plr.body.velocity.x = -150;
        plr.animations.play('left');
      } else if (crsr.right.isDown || wasd.right.isDown) {
        plr.body.velocity.x = 150;
        plr.animations.play('right');
      } else {
        {
          plr.animations.stop();
          plr.frame = 4;
        }
      }
      if ((crsr.up.isDown || wasd.up.isDown || wasd.spaseBar.isDown) && plr.body.touching.down) {
        plr.body.velocity.y = -350;
      }

      if (e1.position.x <= 0) {
        e1.body.velocity.x = 100;
        e1.animations.play('right');
      } else if (e1.position.x > 210) {
        e1.body.velocity.x = -100;
        e1.animations.play('left');
      }



    },
    render: function() {
      this.game.debug.spriteInfo(plr, 32, 32);
    }
  }
  // function init() {
  //
  //   //this.game.Debug =this.game.plugins.add(Phaser.Plugin.Debug);
  //
  // }

// function render() {
//
// }

// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
//   create: create,
//   update: update
// });

// function create() {
//   this.stage.backgroundColor = '#FFFFFF';
//   x = 0;
//   y = 0;
//   angle = 0;
//   this.direction = 1;
//   this.speedDelta = 0.002;
//   this.radius = 114;
//   this.physics.startSystem(Phaser.Physics.ARCADE); //adding player    this.player = this.add.sprite(x, y, 'player');    this.player.anchor.setTo(0.5, 0.5);    this.game.physics.arcade.enable(this.player);    this.input.onDown.add(changeDirection, this);  }   function update() {    if (this.direction == 1) {      this.speedDelta = 3.14;    } else if (this.direction == -1) {      this.speedDelta = -3.14;    }        angle += this.time.physicsElapsed * this.speedDelta;    this.player.x =  Math.cos(angle) * this.radius + 200;    this.player.y =  Math.sin(angle) * this.radius + 200;  }   function changeDirection() {    this.direction *= -1;  }
