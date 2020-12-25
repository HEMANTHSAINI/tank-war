
var canvas;
var gameState = "start";
var startImg;
var start;
var bg;
var bgImg;
var player;
var playerImg;
var t1Img , t2Img , t3Img , t4Img , t5Img , t6Img ;
var enemy;
var enemies;
var score1;
var score2;
var scoreImg;
var bullet;
var bulletsg;
var bulletImg;
var boomSound;
var scoreCount = 0;


function preload(){

  scr2Img = loadImage("Images/scr1.png");
  
  startImg = loadImage("Images/start.png");
  
  bgImg = loadImage("Images/grass.png");
  
  playerImg = loadImage("Images/player.png");
  
  t1Img = loadImage("Images/t1.png");
  t2Img = loadImage("Images/t2.png");
  t3Img = loadImage("Images/t3.png");
  t4Img = loadImage("Images/t4.png");
  t5Img = loadImage("Images/t5.png");
  t6Img = loadImage("Images/t6.png");
  
  bulletImg = loadImage("Images/bullet.png");
  
  ShootSound = loadSound("Sounds/shoot.mp3");
  
  boomSound = loadSound("Sounds/explo.mp3");
  
  overSound = loadSound("Sounds/over.mp3")
  
  resetButtonImg = loadImage("Images/restart.png");
  
  scoreImg = loadImage("Images/score.png");
  
  endImg = loadImage("Images/defeat.gif");

  victoryImg = loadImage("Images/Victory.gif");
}


function setup() {

  
  canvas =  createCanvas(displayWidth-20,displayHeight-30);

  
  screen = createSprite(displayWidth/2,displayHeight/2,20,20);
  screen.addImage(scr2Img);
  screen.scale = 1.5;

  
  start = createSprite(displayWidth/2, displayHeight/2+200,20,20);
  start.addImage(startImg);
  start.scale = 0.5;

  
  victory = createSprite(displayWidth/2,displayHeight/2,20,20);
  victory.addImage(victoryImg);
  victory.scale = 1;

  
  end = createSprite(displayWidth/2,displayHeight/2,20,20);
  end.addImage(endImg);
  end.scale = 1;

  
  player = createSprite(displayWidth/2,650,20,20);
  player.addImage(playerImg);
  player.scale = 0.5;

  
  enemies = new Group();
  
  bulletsg = new Group();


  score1 = createSprite(80,50, 20,20);
  score1.addImage(scoreImg);
  score1.scale = 0.5;

  score2 = createSprite(80,700, 20,20);
  score2.addImage(scoreImg);
  score2.scale = 0.5;

  
  resetButton = createSprite(displayWidth/2,displayHeight/2+200,20,20);
  resetButton.addImage(resetButtonImg);
  resetButton.scale = 0.5;
  //console.log()
}


function draw() {
  image(bgImg,0,-displayHeight*4,displayWidth,displayHeight*5);

if(gameState === "start"){
  
  screen.visible = true;
  start.visible = true;
  
  player.visible = false;
  score1.visible = false;
  score2.visible = false;
  enemies.visible = false;
  bulletsg.visible = false;
  victory.visible = false;
  resetButton.visible = false
  end.visible = false;

if(mousePressedOver(start) || keyWentDown(32))
{
gameState = "play";
}

}

if(gameState === "play"){
  screen.visible = false;
  start.visible = false;
  player.visible = true;
  score1.visible = true;
  score2.visible = true;
  enemies.visible = true;
  bulletsg.visible = true;
  victory.visible = false;
  resetButton.visible = false;
  end.visible = false;
 
player.x=World.mouseX;


if(keyWentDown(32) || mousePressedOver(player)){

ShootSound.play();
  
createBullet();
}


enemies1();

if(enemies.isTouching(player)){
gameState = "end";
overSound.play();
}

if(scoreCount === 500){
  gameState = "ending";
}

if(bulletsg.isTouching(enemies)){
  
  enemies.destroyEach();
  
  bulletsg.destroyEach();
  
  boomSound.play();
  
  scoreCount = scoreCount + 10;
 }

  }

if(gameState === "ending"){
victory.visible = true;
resetButton.visible = true;
end.visible = false;
player.visible = false;
score1.visible = false;
score2.visible = false;
enemies.visible = false;
bulletsg.visible = false;
screen.visible = false;
start.visible = false;

if(mousePressedOver(resetButton)){
  gameState = "start";
  scoreCount = 0;
}
}

if(gameState === "end"){

end.visible = true;
resetButton.visible = true;
victory.visible = false;
player.visible = false;
score1.visible = false;
score2.visible = false;
enemies.visible = false;
bulletsg.visible = false;
screen.visible = false;
start.visible = false;

if(mousePressedOver(resetButton)){
  gameState = "start";
  scoreCount = 0;
}
}

  drawSprites();

  
  fill("white");
  text(scoreCount,75,75);
  text(scoreCount,72,730);
  
}

function createBullet() {
 
 bullet = createSprite(200,600,20,20);
 
 bullet.addImage(bulletImg);

 bullet.scale = 0.2;
  
   bullet.y = 600;
   
   bullet.x = player.x;
   
   bullet.velocityY = -10;
 
   bullet.lifetime = 120;
   
   bulletsg.add(bullet);

   }
  


  function enemies1(){
    
  if(World.frameCount%60===0){
  
 enemy = createSprite(random(20,1300),0,10,10);
 
 enemy.scale = 0.5;

   enemy.velocityY = 5;     

   enemy.lifetime = 100;
   
  var rand = Math.round(random(1,6));
  
   enemy.velocityY = random(5,10);     

  switch(rand){
    case 1 : enemy.addImage(t1Img); 
    break;
    case 2 : enemy.addImage(t2Img); 
    break;
    case 3 : enemy.addImage(t3Img); 
    case 4 : enemy.addImage(t4Img); 
    break;
    case 5 : enemy.addImage(t5Img); 
    break;
    case 6 : enemy.addImage(t6Img); 
    break;
  }
   enemy.lifetime = 300;
  enemies.add(enemy);
  }  
    }
 