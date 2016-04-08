var menuState = function(g) {
    var font2, music, crsr, wasd, button, onOver = false,
        start2;
};

var lives = 7;
var score = 0;

menuState.prototype = {

    preload: function() {
        this.game.load.audio('hello', 'assets/sound/menu.mp3');
        this.game.load.audio('intro', 'assets/sound/intro.mp3');


        this.game.load.image('sim', 'assets/menu.png');
        this.game.load.image('pud', 'assets/pud.png');
        this.game.load.image('ved', 'assets/vedma0.png');
        this.game.load.image('ved2', 'assets/vedma.png');

        this.game.load.image('sk', 'assets/menuB2.png');
        this.game.load.image('start', 'assets/download3.png');
        this.game.load.image('start2', 'assets/begin.png');

        //  this.game.load.image('van', 'assets/download.png');
        //this.game.load.image('knightHawks', 'assets/f.png');
        this.game.load.bitmapFont('desyrel', 'assets/font/shortStack.png', 'assets/font/shortStack.xml');

        this.game.load.spritesheet('button', 'assets/s2.png', 297, 297);


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
        //this.vano = this.game.add.sprite(150, 450, 'van');

        this.sprite.anchor.set(0.5);
        this.pud.anchor.set(0.5);
        this.ved.anchor.set(0.5);

        this.ved2 = this.game.add.sprite(740, 60, 'ved2');
        this.ved2.anchor.set(0.5);
        this.ved2.visible = false;
        // this.vano.anchor.set(0.5);

        this.button = this.game.add.button(400, 300, 'button', this.actionOnClick, this, 1, 0, 2);
        this.button.anchor.set(0.5);

        this.strt2 = this.game.add.button(400, 300, 'start2');
        this.strt2.visible = false;
        this.strt2.anchor.set(0.5);

        this.button.onInputOver.add(over, this);
        this.button.onInputOut.add(out, this);
        this.button.onInputUp.add(up, this);
        this.strt2.onInputUp.add(up2, this);


        function up2() {
            this.music.stop();

            this.game.state.start('stage1');

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

            backGr.visible = !backGr.visible;



            var that = this;
            setTimeout(function() {
                that.strt2.visible = true;
                that.strt.visible = false;
            }, 2000);

            // this.music.stop();
            // this.game.state.start('stage1');
        };

        function out() {
            // onOver = false;
        };

        function over() {

            // this.font2.tint = Math.random() * 0xFFFFFF;
        };




        // function actionOnClick() {
        //   console.log(333333);
        //   this.music.stop();
        //   this.game.state.start('stage1');
        //
        // };


        // this.game.physics.arcade.enable(this.font2);
        // //	Then we tween it in from off the top of the game.
        // //	It will end up at the middle of the game, as it's tweening FROM the value given below to its current position.
        // this.game.add.tween(this.sprite).from({
        //   y: -150
        // }, 1100, Phaser.Easing.Bounce.Out, true);
        // this.game.add.tween(this.pud).from({
        //   y: -100
        // }, 1000, Phaser.Easing.Bounce.Out, true);
        // this.game.add.tween(this.ved).from({
        //   y: -150
        // }, 1100, Phaser.Easing.Bounce.Out, true);
        //this.game.add.tween(this.vano).from( { y: -100 }, 1000, Phaser.Easing.Bounce.Out, true);



        this.wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            spaseBar: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        this.crsr = this.game.input.keyboard.createCursorKeys();





        this.font2 = this.game.add.bitmapText(400, 100, 'desyrel', '  SIMONELLA \nADVENTURES', 64);
        this.font2.anchor.set(0.5);
        //
        // this.font2.body.velocity.setTo(200, 200);
        // this.font2.body.collideWorldBounds = true;
        // this.font2.body.bounce.set(1);

        // this.font2 = this.game.add.retroFont('bluePink', 32, 32, Phaser.RetroFont.TEXT_SET2, 10);
        // this.font2.setText("Simonov\n adventures", true, 0, 8, Phaser.RetroFont.ALIGN_CENTER);
        //
        // var image2 = this.game.add.image(this.game.world.centerX, 120, font2);
        //



    },

    // change: function() {
    //
    // },

    update: function() {

        if (this.onOver) {
            this.font2.tint = Math.random() * 0xFFFFFF;

        }



        // function t() {
        //   console.log(33);
        //   this.font2.tint = Math.random() * 0xFFFFFF;
        //
        // };
        //   this.font2.tint = Math.random() * 0xFFFFFF;
        // }

        //this.font2.rotation += (2 * this.game.time.physicsElapsed);

        this.sprite.rotation = this.game.physics.arcade.angleToPointer(this.sprite);
        this.pud.rotation = this.game.physics.arcade.angleToPointer(this.pud);
        this.ved.rotation = this.game.physics.arcade.angleToPointer(this.ved);
        this.ved2.rotation = this.game.physics.arcade.angleToPointer(this.ved2);



        //
        // if (this.crsr.left.isDown || this.crsr.right.isDown || this.crsr.up.isDown || this.wasd.up.isDown || this.wasd.left.isDown || this.wasd.right.isDown || this.wasd.spaseBar.isDown) {
        //   this.music.stop();
        //   this.game.state.start('stage1');
        // }
    }
}


//
// define the signal: game.events.onPlayerDamage = new Phaser.Signal();
// The listener: game.events.onPlayerDamage.add(SomeFunctionToCallWhenEventDispatches, this);
// Dispatch: game.events.onPlayerDamage.dispatch();
//
// var counter = 0;var update = function () {
//   other update method stuff up here if (conditionIsMet && counter === 0) { someFunction();
//   only call this function 1 time}};function someFunction () { ...your code....counter++;}
