var stage2 = function(g) {
    var si;
    var baddie;
    var cursors;
    var anim;

}


stage2.prototype = {
        preload: function() {

            this.game.load.audio('st2music', 'assets/sound/quest.mp3');

            this.game.load.image('baddie', 'assets/baddie2.png');
            this.game.load.spritesheet('si', 'assets/si.png', 64, 91);

        },

        create: function() {

            this.st2music = this.game.add.audio('st2music');
            this.st2music.play();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            baddie = this.game.add.group();
            baddie.enableBody = true;

            for (var i = 0; i < 50; i++) {
                var s = baddie.create(this.game.world.randomX, this.game.world.randomY, 'baddie');
                s.name = 'baddie' + s;
                s.body.collideWorldBounds = true;
                s.body.bounce.setTo(0.8, 0.8);
                s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
            }

            si = this.game.add.sprite(64, 91, 'si');
            //plr = this.game.add.sprite(32, this.game.world.height - 150, 'dd');

            si.name = 'si';
            si.anchor.set(0.5);

            this.game.physics.enable(si, Phaser.Physics.ARCADE);

            si.body.collideWorldBounds = true;
            si.body.bounce.set(0.8);
            si.body.allowRotation = true;
            si.body.immovable = true;

            si.animations.add('1', [0, 1], 10, true);


            cursors = this.game.input.keyboard.createCursorKeys();
        },

        update: function() {
            si.animations.play('1');


            this.game.physics.arcade.overlap(si, baddie, collStr, null, this);

            si.body.velocity.x = 0;
            si.body.velocity.y = 0;
            si.body.angularVelocity = 0;

            function collStr(si, baddie) {
                baddie.kill();
            }
            // si.frame = 0;
            //   si.animations.stop();

            if (cursors.left.isDown) {
                si.body.angularVelocity = -200;
            } else if (cursors.right.isDown) {
                si.body.angularVelocity = 200;
            }

            if (cursors.up.isDown) {

                si.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(si.angle, 300));
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
