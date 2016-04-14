var stage2 = function(g) {

    var si, baddie, badLik, cursors, anim,
        like, diz,
        healthValue, siPl, siPlB, wasd,
        xx;
}
var dizL = 0,
    turn = 0, scr = 0;

stage2.prototype = {
    preload: function() {
        this.game.load.audio('st2music', 'assets/sound/8bit.mp3');
        this.game.load.audio('st2music2', 'assets/sound/quest.mp3');
        this.game.load.image('baddie', 'assets/st2/baddie2.png');
        this.game.load.image('baddie2', 'assets/st2/baddieL.png');
        this.game.load.image('iconL', 'assets/st2/iconL.png');
        this.game.load.image('iconD', 'assets/st2/iconD.png');
        this.game.load.image('sk2', 'assets/st2/stage2.png');
        this.game.load.image('sk2sml', 'assets/st2/stage2sml.png');
        this.game.load.image('strP', 'assets/st2/startPl.png');
        this.game.load.image('vik', 'assets/m/vedma.png');
        this.game.load.spritesheet('si', 'assets/st2/si.png', 91, 64);
    },

    create: function() {
        this.st2music = this.game.add.audio('st2music');
        this.st2music2 = this.game.add.audio('st2music2');
        if (turn % 2 == 0) {
            this.st2music.play();
        } else {
            this.st2music2.play();
        }
        this.game.add.sprite(0, 0, 'sk2');
        this.game.add.sprite(530, 50, 'iconL');
        this.game.add.sprite(646, 54, 'iconD');

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        baddie = this.game.add.group();
        baddie.enableBody = true;

        for (var i = 0; i < 30; i++) {
            var s = baddie.create(this.game.world.randomX, this.getRandom(88, 580), 'baddie');
            s.name = 'baddie' + s;
            s.body.collideWorldBounds = true;
            s.body.bounce.setTo(1, 1);
            s.body.velocity.setTo(20 + Math.random() * 60, 20 + Math.random() * 60);
            //    baddie.add(s);
        }
        badLik = this.game.add.group();
        badLik.enableBody = true;
        siPl = this.game.add.sprite(68, 66, 'sk2sml');
        siPlB = this.game.add.sprite(0, 0, 'strP');
        vik = this.game.add.sprite(750, 50, 'vik');
        vik.angle += 180;
        vik.anchor.set(0.5);
        vik.visible = !1;
        this.game.add.tween(vik.scale).to({
            x: 0,
            y: 0
        }, 390, "Sine.easeInOut", true, 0, -1, true);

        var that = this;
        setTimeout(function() {
            vik.visible = !0;
            for (var i = 0; i < 7; i++) {
                var a = badLik.create(that.getRandom(765, 795), that.getRandom(10, 28), 'baddie2');
                a.name = 'baddie' + a;
                a.body.collideWorldBounds = true;
                a.body.bounce.setTo(0.8, 0.9);
                a.body.velocity.setTo(50 + Math.random() * 220, 50 + Math.random() * 200);
            }
        }, 600);
        setTimeout(function() {
            //vik.visible=!1;
            vik.kill()
        }, 1400);

        si = this.game.add.sprite(68, 66, 'si');

        si.anchor.set(0.5);
        this.game.physics.arcade.enable(si); //instead of game.physics.enable(player,Phaser.Physics.Arcade);
        this.game.physics.arcade.enable(siPl);

        si.body.collideWorldBounds = true;
        si.body.bounce.set(0.8);
        si.body.allowRotation = true;
        si.body.immovable = true;
        si.animations.add('si', [0, 2, 1, 2], 10, true);
        cursors = this.game.input.keyboard.createCursorKeys();
        wasd = {
            dwn: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        };

        like = this.game.add.text(560, 50, '666', {
            fintSize: '30px',
            fill: 'grey'
        });
        diz = this.game.add.text(706, 68, '0', {
            fintSize: '30px',
            fill: 'grey'
        });
        diz.anchor.set(0.5, 0.5);

        this.myHealthBar = new HealthBar(this.game, {
            x: 600,
            y: 35,
            width: 280,
            height: 14,
            bg: {
                color: '#7f7f7f'
            },
            bar: {
                color: '#1b7fcc'
            }
        });

        healthValue = 100;
        si.angle += 90;
    },

    getRandom: function(min, max) {
        xx = Math.floor(Math.random() * (max - min + 1)) + min;
        return xx;
    },

    minu: function() {
        healthValue = healthValue - 3;
        this.myHealthBar.setPercent(healthValue);
    },

    update: function() {
        var that = this;
        var startPo = !1;

        this.game.physics.arcade.overlap(si, siPl, siPla, null, this);
        this.game.physics.arcade.overlap(si, baddie, collStr, null, this);
        this.game.physics.arcade.overlap(si, badLik, collLik, null, this);

        si.body.velocity.x = 0;
        si.body.velocity.y = 0;
        si.body.angularVelocity = 0;

        function siPla(si, siPl) {
            startPo = true;
        }

        if (startPo == true) {
            siPl.visible = true;

        } else {

            siPl.visible = false;
        }

        function collStr(si, baddie) {
            if (startPo == false) {
                baddie.kill();
                dizL += 300;
                scr += 1;

                diz.text = dizL;
                this.minu();
                if (scr == 30) {
                    diz.text = 9001;
                    this.game.add.tween(diz.scale).to({
                        x: 1.3,
                        y: 1.3
                    }, 50, "Sine.easeInOut", true, 0, -1, true);
                    setTimeout(function() {
                      that.st2music2.stop();
                      that.st2music.stop();
                      that.game.world.removeAll();
                      that.game.state.start('stage1');

                    }, 1000);
                }
            }
        }
        if (scr == 1) {
            diz.tint = Math.random() * 0xFFFFFF;
        }

        function collLik(si, badLik) {
            if (startPo == false) {
                si.kill()
                badLik.kill();

                this.myHealthBar.setPercent(100);
                dizL = 0;
                scr = 0;
                turn += 1;

                setTimeout(function() {
                    that.st2music2.stop();
                    that.st2music.stop();
                    that.game.world.removeAll();
                    that.create();
                    // baddie.destroy();
                    // badLik.destroy();
                }, 800);
            }
        }

        if (cursors.left.isDown || wasd.left.isDown) {
            si.body.angularVelocity = -200;
        } else if (cursors.right.isDown || wasd.right.isDown) {
            si.body.angularVelocity = 200;
        }
        if (cursors.down.isDown || cursors.up.isDown || wasd.dwn.isDown || wasd.up.isDown) {
            si.animations.play('si');
            si.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(si.angle, 200));
        } else {
            si.frame = 0;
            si.animations.stop();
        }
    }
};
