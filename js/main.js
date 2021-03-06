console.log(Phaser);
//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;

//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){

//These four things sets the assets for the game. If you want to add music or images, there is where you would preload it.
  game.load.image('background', 'assets/background.png');
  game.load.image('player', 'assets/player.png');
  game.load.image('ground', 'assets/wallHorizontal.png');
  game.load.image('obstacle', 'assets/wallVertical.png');

  //If you'd like to load music files, the format would look like  game.load.audio('[name o
};

function create(){
  //This creates the player character at the bottom left side of the screen.
  player = game.add.sprite(game.width/8, game.world.height*(7/8), 'player');

  //This creates the first obstacle on the right side of the screen.
 
  obstacle = game.add.sprite(700,game.world.height, 'obstacle');
  obstacle.scale.setTo(1,0.2);
  obstacle.anchor.setTo(0,1);
  
  game.stage.backgroundColor = "#3498db";
  
  platforms = game.add.group();
  platforms.enableBody = true; 
  
  ground = platforms.create(0, GAME_HEIGHT, 'ground');
  ground.anchor.setTo(0,1); 
  ground.scale.setTo(4,1); 
  
  game.physics.startSystem(Phaser.Physics.ARCADE); 
  game.physics.arcade.enable(player); 
 
 game.physics.arcade.enable(ground);
  ground.body.immovable = true; 
  game.physics.arcade.enable(obstacle);
  obstacle.body.immovable = true; 

  spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 

  player.body.bounce.y = 0.2; 
  player.body.gravity.y = 600; 

  scoreText = game.add.text(16, 16, 'score: 0', { fontsize: '32px', fill: '#000'});


};

function update(){
	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(player, obstacle);
	if (spaceKey.isDown && player.body.touching.down) {
		player.body.velocity.y = -300;
	}

	if (obstacle.x > 600) {
		obstacle.x -= 0.05; 
	}
	if (obstacle.x < 0) {
		obstacle.kill();
		obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
		obstacle.scale.setTo(1,0.2);
		obstacle.anchor.setTo(0,1); 
		game.physics.arcade.enable(obstacle);
		obstacle.body.immovable = true; 
	}

	if (obstacle.x < 5 && player.x > 5){
		score++;
		scoreText.text = 'score: ' + score; 
	}
	if (player.x <0){
		scoreText = game.add.text(350,200, 'you Lose!', {fill: '#ff0000'}); 
		obstacle.kill();
		player.kill(); 

	};
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();

