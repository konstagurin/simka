var menuState = function(g) {
    var font2, music, crsr, wasd, button, onOver = !1, start2;
};

var lives = 7,
    score = 0;

menuState.prototype = {

    preload: function() {
        this.game.load.audio('hello', 'assets/sound/menu.mp3');
        this.game.load.audio('intro', 'assets/sound/intro.mp3');

        this.game.load.image('sim', 'assets/m/menu.png');
        this.game.load.image('pud', 'assets/m/pud.png');
        this.game.load.image('ved', 'assets/m/vedma0.png');
        this.game.load.image('ved2', 'assets/m/vedma.png');

        this.game.load.image('sk', 'assets/m/menuB2.png');
        this.game.load.image('start', 'assets/m/download3.png');
        this.game.load.image('start2', 'assets/m/begin.png');
        //  this.game.load.image('van', 'assets/download.png');
        this.game.load.bitmapFont('desyrel', 'assets/font/shortStack.png', 'assets/font/shortStack.xml');
        this.game.load.spritesheet('button', 'assets/m/s2.png', 297, 297);
    },

    create: function() {
        this.intro = this.game.add.audio('intro');
        this.music = this.game.add.audio('hello');
        this.intro.play();

        var backGr = this.game.add.sprite(0, 0, 'sk');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.sprite = this.game.add.sprite(60, 60, 'sim');
        this.pud = this.game.add.sprite(400, 550, 'pud');
        this.ved = this.game.add.sprite(740, 60, 'ved');

        this.sprite.anchor.set(0.5);
        this.pud.anchor.set(0.5);
        this.ved.anchor.set(0.5);

        this.ved2 = this.game.add.sprite(740, 60, 'ved2');
        this.ved2.anchor.set(0.5);
        this.ved2.visible = false;

        this.button = this.game.add.button(400, 300, 'button', this.actionOnClick, this, 1, 0, 2);
        this.button.anchor.set(0.5);

        this.strt2 = this.game.add.button(400, 300, 'start2');
        this.strt2.visible = false;
        this.strt2.anchor.set(0.5);

        this.button.onInputUp.add(up, this); //out, over
        this.strt2.onInputUp.add(up2, this);

        function up2() {
            this.music.stop();
            this.game.world.removeAll();
            this.game.state.start('m2');
        }

        function up() {
            this.intro.stop();
            this.button.visible = false;
            this.ved.visible = false;
            this.ved2.visible = true;

            this.music.play();
            this.onOver = true;
            this.strt = this.game.add.sprite(400, 300, 'start');
            this.strt.anchor.set(0.5);
            backGr.visible = !1;

            var that = this;
            setTimeout(function() {
                that.strt2.visible = true;
                that.strt.visible = false;
            }, 2000);

            // this.music.stop();
            // this.game.state.start('stage1');
        };

        this.wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            spaseBar: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        this.crsr = this.game.input.keyboard.createCursorKeys();
        this.font2 = this.game.add.bitmapText(400, 100, 'desyrel', '  SIMONELLA \nADVENTURES', 64);
        this.font2.anchor.set(0.5);
    },

    update: function() {
        if (this.onOver) {
            this.font2.tint = Math.random() * 0xFFFFFF;
        }
        this.sprite.rotation = this.game.physics.arcade.angleToPointer(this.sprite);
        this.pud.rotation = this.game.physics.arcade.angleToPointer(this.pud);
        this.ved.rotation = this.game.physics.arcade.angleToPointer(this.ved);
        this.ved2.rotation = this.game.physics.arcade.angleToPointer(this.ved2);
    }
}
