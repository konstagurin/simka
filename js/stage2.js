var stage2 = function(g) {
    var si, baddie, badLik, cursors, anim,
        like, diz,
        healthValue, a, siPl;
};
var dizL = 0;
var oige = false;
stage2.prototype = {
    preload: function() {
        this.game.load.audio('st2music', 'assets/sound/quest.mp3');
        this.game.load.image('baddie', 'assets/st2/baddie2.png');
        this.game.load.image('baddie2', 'assets/st2/baddieL.png');
        this.game.load.image('iconL', 'assets/st2/iconL.png');
        this.game.load.image('iconD', 'assets/st2/iconD.png');
        this.game.load.image('sk2', 'assets/st2/stage2.png');
        this.game.load.image('sk2sml', 'assets/st2/stage2sml.png');
        this.game.load.spritesheet('si', 'assets/si.png', 91, 64);
    },

    create: function() {
        this.st2music = this.game.add.audio('st2music');
        //this.st2music.play();
        this.game.add.sprite(0, 0, 'sk2');
        this.game.add.sprite(530, 50, 'iconL');
        this.game.add.sprite(646, 54, 'iconD');

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        baddie = this.game.add.group();
        baddie.enableBody = true;

        for (var i = 0; i < 30; i++) {
            var s = baddie.create(this.game.world.randomX, this.game.world.randomY, 'baddie');
            s.name = 'baddie' + s;
            s.body.collideWorldBounds = true;
            s.body.bounce.setTo(0.8, 0.8);
            s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
        }

        badLik = this.game.add.group();
        badLik.enableBody = true;

        for (var i = 0; i < 7; i++) {
            a = badLik.create(this.game.world.randomX, this.game.world.randomY, 'baddie2');
            a.name = 'baddie' + a;
            a.body.collideWorldBounds = true;
            a.body.bounce.setTo(0.8, 0.8);
            a.body.velocity.setTo(10 + Math.random() * 150, 10 + Math.random() * 150);
        }
        siPl = this.game.add.sprite(0, 0, 'sk2sml');

        si = this.game.add.sprite(64, 64, 'si');

        //si.name = 'si';
        si.anchor.set(0.5);

        this.game.physics.arcade.enable(si); //instead of game.physics.enable(player,Phaser.Physics.Arcade);
        this.game.physics.arcade.enable(siPl);

        si.body.collideWorldBounds = true;
        si.body.bounce.set(0.8);
        si.body.allowRotation = true;
        si.body.immovable = true;

        si.animations.add('si', [0, 2, 1, 2], 10, true);
        //
        cursors = this.game.input.keyboard.createCursorKeys();

        like = this.game.add.text(685, 50, '666', {
            fintSize: '30px',
            fill: 'grey'
        });
        diz = this.game.add.text(560, 50, '0', {
            fintSize: '30px',
            fill: 'grey'
        });
        // var barConfig = {
        //     x: 200,
        //     y: 100
        // };
        this.myHealthBar = new HealthBar(this.game, {
            x: 600,
            y: 35,
            width: 280,
            height: 12,
            bg: {
                color: '#7f7f7f'
            },
            bar: {
                color: '#1b7fcc'
            }
        });
        //this.myHealthBar.setWidth(50);

        healthValue = 100;
        // this.min();
        si.angle += 90;
    },

    min: function() {
        healthValue = healthValue - 3;

        this.myHealthBar.setPercent(healthValue);
    },

    update: function() {

        this.game.physics.arcade.overlap(si, baddie, collStr, null, this);
        this.game.physics.arcade.overlap(si, badLik, collLik, null, this);
        this.game.physics.arcade.overlap(si, siPl, siPla, null, this);



        si.body.velocity.x = 0;
        si.body.velocity.y = 0;
        si.body.angularVelocity = 0;

        var startPo = false;

        function siPla(si, siPl) {
            startPo = true;

        }

        function collStr(si, baddie) {
            if (startPo == false) {
                baddie.kill();
                dizL += 100;
                diz.text = ' ' + dizL;
                //
                // like += 10;
                // like.text = ' ' + this.dizL;
                this.min();
                //this.game.world.removeAll();
            }
        }

        function collLik(si, badLik) {
            if (startPo === false) {
                badLik.kill();
                if (dizL > 0) {
                    dizL -= 10;
                    diz.text = ' ' + dizL;
                }
                this.myHealthBar.setPercent(100);
                setTimeout(function() {
                    dizL = 0
                    diz.text = ' ' + dizL;
                }, 500);
                var that = this;
                a.body.velocity.setTo(0, 0);
                setTimeout(function() {
                    that.create();
                    //  Phaser.StateManager.clearWorld=true;
                    //  that.Phaser.StateManager.clearCurrentState()

                    if (oige === false) {
                        that.game.world.removeAll();
                        oige = true;
                        that.create();
                    }
                }, 1000);
            }
        }
        if (cursors.left.isDown) {
            si.body.angularVelocity = -200;
        } else if (cursors.right.isDown) {
            si.body.angularVelocity = 200;
        }
        if (cursors.down.isDown) {
            si.animations.play('si');
            si.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(si.angle, 200));
        } else {
            si.frame = 0;
            si.animations.stop();
        }

    }
};
