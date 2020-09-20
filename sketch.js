var trex, trex_animation, ground, invisibleGround, cloudimage, obstacle1, obstacle2, obstacle3,
    obstacle4, obstacle5, obstacle6, cloudsgrp, cactusgrp, score, PLAY, END, gamestate, restart_image, 
    restart, gameover_image, gameover, trex_collided,highscore;

function preload() {
  trex_animation = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground2 = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restart_image = loadImage("restart.png");
  gameover_image = loadImage("gameOver.png");
  trex_collided = loadAnimation("trex_collided.png");
}

function setup() {
  //creating the canvas
  createCanvas(600, 300);
  //giving properties to trex
  trex = createSprite(200, 260, 20, 50);
  trex.scale = 0.5;
  trex.x = 50;
  trex.addAnimation("t1", trex_animation);
  trex.addAnimation("t2", trex_collided);
  trex.setCollider("rectangle", 0, 0, 190, 100);

  //creating the ground
  ground = createSprite(200, 280, 400, 20);
  ground.addImage("g1", ground2);
  ground.x = ground.width / 2;


  //creating invisible ground
  invisibleGround = createSprite(300, 290, 600, 5);
  invisibleGround.visible = false;

  //creating groups
  cloudsgrp = new Group();
  cactusgrp = new Group();
  //creating restart
  restart = createSprite(300, 150);
  restart.addImage(restart_image);
  restart.visible = false;
  gameover = createSprite(300, 200);
  gameover.addImage(gameover_image);
  gameover.visible = false;

  //declaring initial value for score
  score = 0;
  //declaring initial value for highscore
  highscore = 0;
  //declaring constant values for gamestates
  PLAY = 1;
  END = 0;
  //declaring initial gamestate
  gamestate = PLAY;
}


function draw() {
  //setting a background colour
  background("white");
  //monitoring values in console log
  console.log(trex.y);

  //giving conditon and properties associated 
  //for when gamestate is "PLAY"
  if (gamestate === PLAY) {

    //reseting the ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //press spacebar to jump
    if (keyDown("space") && trex.y >= 260) {
      trex.velocityY = -20;
    }
    //adding a score
    score = score + Math.round(getFrameRate() / 60);
    //adding gravity 
    trex.velocityY = trex.velocityY + 0.8;
    //adding a velocity to the ground
    ground.velocityX = -9;


    spawnClouds();
    spawncactus();
    if (cactusgrp.isTouching(trex)) {
      gamestate = END;
    }
  }

  //giving conditon and properties associated 
  //for when gamestate is "END"
  else if (gamestate === END) {
    ground.velocityX = 0;
    cloudsgrp.setVelocityXEach(0);
    cactusgrp.setVelocityXEach(0);
    cloudsgrp.setLifetimeEach(-1);
    cactusgrp.setLifetimeEach(-1);
    restart.visible = true;
    gameover.visible = true;
    trex.changeAnimation("t2", trex_collided);
    if (score>highscore){
      highscore = score;
    }
  }
  if (mousePressedOver(restart)) {
    gameover.visible = false;
    restart.visible = false;
    gamestate = PLAY;
    cactusgrp.destroyEach();
    cloudsgrp.destroyEach();
    score = 0;
    trex.changeAnimation("t1",trex_animation);
  }
  //displaying the score
  text(score, 300, 100);
    //displaying the higscore
  text("highscore "+ highscore,100,100);
  //giving properties that we want throughout the whole game
  trex.collide(invisibleGround);
  drawSprites();
}




//create a function to spawn clouds
function spawnClouds() {

  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {

    var cloud = createSprite(600, 200, 40, 10);
    cloud.y = random(50, 220);
    cloud.addAnimation("t2", cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3 - score / 50;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsgrp.add(cloud);
  }
}
//create a function to spawn obstacles(cactus)
function spawncactus() {

  if (frameCount % 120 === 0) {

    var qwerty = Math.round(random(1, 6));

    var cactus = createSprite(600, 260, 20, 20);

    cactus.scale = 0.5;
    cactus.velocityX = -5 - score / 5;
    cactus.lifetime = 200;
    switch (qwerty) {
      case 1:
        cactus.addImage(obstacle1);
        break;
      case 2:
        cactus.addImage(obstacle2);
        break;
      case 3:
        cactus.addImage(obstacle3);
        break;
      case 4:
        cactus.addImage(obstacle4);
        break;
      case 5:
        cactus.addImage(obstacle5);
        break;
      case 6:
        cactus.addImage(obstacle6);
        break;
      default:
        break;
    }
    //adding cactus to cactus group
    cactusgrp.add(cactus);
  }

}
