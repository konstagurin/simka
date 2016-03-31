
  // var g = new Phaser.Game(800, 555, Phaser.AUTO, 'game', {
  //   preload: preload,
  //   create: create,
  //   update: update,
  //   init: init
  //
  // });
  var stage2 = function (g) {
    var pltfrm, plr, crsr, str, e1, scoreTxt, liveTxt;
  }


stage2.prototype={
   preload: function () {
     this.game.load.audio('soundTr2', 'assets/sound/quest.mp3');
  //
  // this.game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
  //  this.game.load.image('sk', 'assets/sky.png');
  //  this.game.load.image('pltfrm', 'assets/platform.png');
  //  this.game.load.image('str', 'assets/star.png');
  //  this.game.load.spritesheet('dd', 'assets/dude.png', 32, 48);
  //
   },

  create: function () {
    this.st2music = this.game.add.audio('soundTr2');
    this.st2music.play();

   this.game.physics.startSystem(Phaser.Physics.ARCADE);
   this.game.add.sprite(0, 0, 'sk');
    pltfrm =this.game.add.group();
    pltfrm.enableBody = true;

    var grnd = pltfrm.create(0,this.game.world.height - 64, 'pltfrm');
    grnd.scale.setTo(2, 2);
    grnd.body.immovable = true;

    var ledge = pltfrm.create(400, 400, 'pltfrm');
    ledge.body.immovable = true;
    ledge = pltfrm.create(-150, 250, 'pltfrm');
    ledge.body.immovable = true;

    plr =this.game.add.sprite(32,this.game.world.height - 150, 'dd');
   this.game.physics.arcade.enable(plr);

    plr.body.bounce.y = 0.2;
    plr.body.gravity.y = 400;
    plr.body.collideWorldBounds = true;

    plr.animations.add('left', [0, 1, 2, 3], 10, true);
    plr.animations.add('right', [5, 6, 7, 8], 10, true);

    //	g.add.sprite(0, 0, 'str');
    str =this.game.add.group();
    str.enableBody = true;
    for (var i = 0; i < 12; i++) {
      var ostr = str.create(i * 70, 0, 'str');
      ostr.body.gravity.y = 166;
      ostr.body.bounce.y = 0.3 + Math.random() * 0.2;
    }

    crsr =this.game.input.keyboard.createCursorKeys();
    scoreTxt =this.game.add.text(16, 16, 'Score: 0', {
      fintSize: '30px',
      fill: '#000'
    });
    liveTxt =this.game.add.text(156, 16, 'Lives: 3', {
      fintSize: '30px',
      fill: '#000'
    });


    e1 =this.game.add.sprite(32, 32, 'baddie');
   this.game.physics.arcade.enable(e1);
    e1.enableBody = true;
    e1.body.gravity.y = 400;
    e1.body.bounce.y = 0.2;

    e1.animations.add('left', [0, 1, ], 10, true);
    e1.animations.add('right', [2, 3], 10, true);
  },

  update: function () {
    var lives=3;
    var score=0;
    
   this.game.physics.arcade.collide(plr, pltfrm);
   this.game.physics.arcade.collide(str, pltfrm);
   this.game.physics.arcade.collide(e1, pltfrm);

   this.game.physics.arcade.overlap(plr, str, collStr, null, this);
   this.game.physics.arcade.overlap(plr, e1, restart, null, this);

    if (lives == 0) {

      scoreTxt.text = '';
      liveTxt.text = ' game over ';

    } else {
      scoreTxt.text = 'Score: ' +score;
      liveTxt.text = 'Lives: ' +lives;
    }

    function collStr(plr, str) {
      str.kill();
      score += 10;

      //this.game.state.start('win');
    }


    function restart(plr, e1) {
      lives-=1;

      if (score == 0) {
        this.st2music.stop();
        this.game.state.start('win');


      } else {
        setTimeout(function() {
          score = 0;
        }, 500);
      }
    }


    plr.body.velocity.x = 0;

    if (crsr.left.isDown) {
      plr.body.velocity.x = -150;
      plr.animations.play('left');
    } else if (crsr.right.isDown) {
      plr.body.velocity.x = 150;
      plr.animations.play('right');
    } else {
      {
        plr.animations.stop();
        plr.frame = 4;
      }
    }
    if (crsr.up.isDown && plr.body.touching.down) {
      plr.body.velocity.y = -350
    }


    if (e1.position.x <this.game.world.width / 2) {
      e1.x += 0.1;
      if (e1.position.x <this.game.world.width / 12) {
        e1.animations.play('right');
      }

    } else if (e1.position.x >this.game.world.width / 2) {
      e1.x += -0.1;
      if (e1.position.x >this.game.world.width - 30) {
        e1.animations.play('left');
      }
    }

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
