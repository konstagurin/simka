var stage1 = function(g) {
    var pltfrm, plr, crsr, wasd, str, e1, e2, scoreTxt, liveTxt, music, zyx;
};
stage1.prototype = {
    preload: function() {
        this.game.load.audio('hello', 'assets/sound/hello.mp3');
        this.game.load.audio('soundTr', 'assets/sound/8bit.mp3');
        this.game.load.image('sk', 'assets/s1/sky.png');
        this.game.load.image('pltfrm', 'assets/s1/platform.png');
        this.game.load.image('pltfrmG', 'assets/s1/platformG.png');
        this.game.load.image('str', 'assets/s1/star.png');
        this.game.load.spritesheet('dd', 'assets/s1/dude.png', 50, 75);
        this.game.load.spritesheet('baddie', 'assets/s1/baddie.png', 32, 32);
      //  this.game.load.audio('soundTr', 'assets/audio/?.mp3');
    },

    create: function() {
        this.game.world.setBounds(0, 0, 1920, 600);

        zyx = this.game.add.sprite(0, 0, 'sk');
        this.hi = this.game.add.audio('hello');
        this.st1music = this.game.add.audio('soundTr');
        this.hi.play();

        this.st1music.play();

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        pltfrm = this.game.add.group();
        pltfrm.enableBody = true;

        var grnd = pltfrm.create(0, this.game.world.height - 32, 'pltfrmG');
        grnd.body.immovable = true;

        var ledge = pltfrm.create(400, 400, 'pltfrm');
        ledge.body.immovable = true;
        ledge = pltfrm.create(-150, 250, 'pltfrm');
        ledge.body.immovable = true;

        plr = this.game.add.sprite(32, this.game.world.height - 150, 'dd');
        this.game.physics.arcade.enable(plr);
        this.game.physics.arcade.enable(zyx);

        this.game.camera.follow(plr);

        plr.body.bounce.y = 0.2;
        plr.body.gravity.y = 400;
        //plr.body.collideWorldBounds = true;

        plr.animations.add('left', [0, 1], 10, true);
        plr.animations.add('right', [3, 4], 10, true);

        str = this.game.add.group();
        str.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var ostr = str.create(i * 70, 0, 'str');
            ostr.scale.setTo(0.5, 0.5);
            ostr.body.gravity.y = 166;
            ostr.body.bounce.y = 0.3 + Math.random() * 0.2;
        };

        crsr = this.game.input.keyboard.createCursorKeys();
        wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            spaseBar: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        };

        scoreTxt = this.game.add.text(16, 16, 'Score: 0', {
            fintSize: '30px',
            fill: 'grey'
        });
        // liveTxt = this.game.add.text(156, 16, 'Lives: ', {
        //   fintSize: '30px',
        //   fill: '#000'
        // });
        scoreTxt.fixedToCamera = true;


        e1 = this.game.add.sprite(32, 32, 'baddie');
        e2 = this.game.add.sprite(32, 32, 'baddie');

        e1.position.x = 0;
        e2.position.x = 400;

        //e1.velocity.x = +2;
        this.game.physics.arcade.enable(e1);
        this.game.physics.arcade.enable(e2);

        e1.enableBody = true;
        e2.enableBody = true;

        e1.body.gravity.y = 400;
        e2.body.gravity.y = 400;

        e1.body.bounce.y = 0.5;
        e1.body.bounce.y = 0.4;

        e1.animations.add('left', [0, 1], 10, true);
        e1.animations.add('right', [2, 3], 10, true);

        e2.animations.add('right', [2, 3], 10, true);
        e2.animations.add('left', [0, 1], 10, true);

    },

    update: function() {
        this.game.world.wrap(plr, 0, true);
        this.game.physics.arcade.collide(plr, pltfrm);
        this.game.physics.arcade.collide(str, pltfrm);
        this.game.physics.arcade.collide(e1, pltfrm);
        this.game.physics.arcade.collide(e2, pltfrm);


        this.game.physics.arcade.overlap(plr, str, collStr, null, this);
        this.game.physics.arcade.overlap(plr, e1, restart, null, this);
        this.game.physics.arcade.overlap(plr, e2, restart, null, this);


        function collStr(plr, str) {
            str.kill();
            score += 10;
            //this.game.state.start('stage2');
        }


        function restart(plr, e1) {
            lives -= 1;

            if (score == 0) {
                this.st1music.stop();
                this.game.world.removeAll();
                this.create()
            } else {
                setTimeout(function() {
                    score = 0;

                }, 400);
            }
        }
        plr.body.velocity.x = 0;
        zyx.body.velocity.x = 0;

        if (crsr.left.isDown || wasd.left.isDown) {

            if (plr.position.x < 4) {
                plr.body.velocity.x = 0;
            } else {
                plr.body.velocity.x = -150;
                plr.animations.play('left');
                zyx.body.velocity.x = 5;
            }

        } else if (crsr.right.isDown || wasd.right.isDown) {
            plr.body.velocity.x = 150;
            plr.animations.play('right');
            zyx.body.velocity.x = -5;

        } else {
            {
                plr.animations.stop();
                plr.frame = 2;
            }
        }
        if ((crsr.up.isDown || wasd.up.isDown || wasd.spaseBar.isDown) && plr.body.touching.down) {
            plr.body.velocity.y = -370;
        }

        if (e1.position.x <= 0) {
            e1.body.velocity.x = 160;
            e1.animations.play('right');
        } else if (e1.position.x > 210) {
            e1.body.velocity.x = -160;
            e1.animations.play('left');
        };
        if (e2.position.x <= 400) {
            e2.body.velocity.x = 170;
            e2.animations.play('right');
        } else if (e2.position.x > 790) {
            e2.body.velocity.x = -170;
            e2.animations.play('left');
        }

    },
    render: function() {
        //this.game.debug.spriteInfo(plr, 32, 32);
    }
}
