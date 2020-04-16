var trex,trex_running,trex_collided
var ground,groundimage,invisibleground
var obstaclegroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var cloudgroup
var cloudimage
var count = 0
var play = 1
var end = 0
var gamestate = play
var gameover,gameoverimage
var restart,restartimage

function preload(){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
trex_collided = loadAnimation ("trex_collided.png")
groundimage = loadImage ("ground2.png")
cloudimage = 
loadImage("cloud.png")
obstacle1 = loadImage("obstacle1.png")
 obstacle2 = loadImage("obstacle2.png") 
obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameoverimage = loadImage("gameOver.png")
  restartimage = loadImage("restart.png")
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collide",trex_collided)
  trex.scale = 0.5
  ground = createSprite(300,180,600,20)
  ground.addImage("ground",groundimage)
  ground.velocityX = -4
  invisibleground = createSprite(300,190,600,20)
  invisibleground.visible = false
  obstaclegroup = new Group()
  cloudgroup = new Group()
  gameover = createSprite(300,100)
  restart = createSprite(300,150)
  gameover.addImage(gameoverimage)
  restart.addImage(restartimage)
  gameover.scale = 0.5
  restart.scale = 0.5
  gameover.visible = false
  restart.visible = false
}
function draw() {
  background(180);
  text("Score:" + count, 500,50)
  trex.collide(invisibleground)
  
  if(gamestate == play){
  count = count + Math.round(getFrameRate()/30)
    if (keyDown("space")){
 trex.velocityY = -12
 }
  if(ground.x < 0){
  ground.x = ground.width/2
  }
  trex.velocityY = trex.velocityY + 0.8
    spawnClouds()
  spawnObstacles()
    if(trex.isTouching(obstaclegroup)){
    gamestate = end
    }
  }
  
  else if(gamestate == end){
  gameover.visible = true
  restart.visible = true
     //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collide",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    if (mousePressedOver(restart)) {
      reset();
   }
  }
  
  
  drawSprites()
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudgroup.add(cloud);
  }
}
  function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
        case 1:obstacle.addImage(obstacle1);
        break;
        case 2:obstacle.addImage(obstacle2);
        break;
        case 3:obstacle.addImage(obstacle3);
        break;
        case 4:obstacle.addImage(obstacle4);
        break;
        case 5:obstacle.addImage(obstacle5);
        break;
        case 6:obstacle.addImage(obstacle6);
        break;
        default:
        break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }
}
function reset(){
  gamestate = play; 
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  gameover.visible = false;
  restart.visible = false;
  trex.changeAnimation("running",trex_running);
  count = 0;
}
