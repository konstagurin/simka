var m2 = function(g) {
    var ved, font2, music, crsr, wasd, button, onOver = !1,
        start2;
};

m2.prototype = {

    preload: function() {


        this.game.load.image('sim', 'assets/m/menu.png');
        this.game.load.image('ved', 'assets/m/vedma.png');

        this.game.load.image('sk', 'assets/m/menuB2.png');
        this.game.load.image('st', 'assets/m/Screenshot_1.png');
        //  this.game.load.image('van', 'assets/download.png');
        //this.game.load.image('knightHawks', 'assets/f.png');
        this.game.load.spritesheet('button', 'assets/m/s2.png', 297, 297);
    },

    create: function() {
        this.game.time.events.loop(Phaser.Timer = 1500, updateCounter, this);

        ved = this.game.add.group();
        var t = this;

        function updateCounter() {

            var a = ved.create(t.game.world.randomX, t.game.world.randomX, 'ved');
            a.angle += 180;

            setTimeout(function() {
                a.kill()
            }, 1);

        }



        this.st = this.game.add.button(400, 300, 'st');
        this.st.visible = false;
        this.st.anchor.set(0.5);

        this.st.onInputUp.add(up2, this);

        function up2() {
            //this.music.stop();
            this.game.world.removeAll();
            this.game.state.start('stage2');
        }


        setTimeout(function() {
            t.st.visible = true;
        }, 1000);

        this.wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            spaseBar: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        this.crsr = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        if (this.onOver) {


        }
        // this.sprite.rotation = this.game.physics.arcade.angleToPointer(this.sprite);
        // this.pud.rotation = this.game.physics.arcade.angleToPointer(this.pud);
        // this.ved.rotation = this.game.physics.arcade.angleToPointer(this.ved);
        // this.ved2.rotation = this.game.physics.arcade.angleToPointer(this.ved2);
    }
}
