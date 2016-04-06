var win = function(game) {}

win.prototype = {

  preload: function() {
    this.game.load.audio('sound', 'assets/sound/menu.mp3');
    this.game.load.spritesheet('gameoverB', 'assets/restart.png', 223, 360);
  },
  init: function(score) {
    //alert("You scored: " + score)
  },
  create: function() {

    this.music = this.game.add.audio('sound');
    this.music.play();

    var gameOverTitle = this.game.add.text(270, 130, "повторить", {
     font: '50px Arial',
     fill: '#ffffff'
   });
    // gameOverTitle.anchor.setTo(0.5, 0.5);
    var restButton = this.game.add.button(400, 390, "gameoverB", this.playTheGame, this);
    restButton.scale.setTo(0.7, 0.7);

    restButton.anchor.setTo(0.5, 0.5);
     restButton.inputEnabled = true;
  },
  playTheGame: function() {
    this.music.stop();
    this.game.state.start("menu");
  }
}
