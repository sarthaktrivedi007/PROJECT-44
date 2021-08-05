var fighterPlane1 , fighterPlaneImg;
var asteriod , asteriodImg;
var  background1 , backgroundImg;
var bullet , bulletImg;
var PLAY = 1
var END = 0
gameState = 1

var score = 0
var asteriodsDestroyed = 0




function preload(){
  asteriodImg = loadImage("images/asteriod.jpg")
  backgroundImg = loadImage("images/1.png")
  fighterPlaneImg = loadImage("images/fg3.png")
  bulletImg = loadImage("images/bullet1.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  fighterPlane1 = createSprite(800,800,50,50);
  fighterPlane1.addImage("fp", fighterPlaneImg)
  fighterPlane1.scale = 0.5

  asteriod = createSprite(100,100,20,20)
  asteriod.addImage("asteriod",asteriodImg)
  asteriod.scale = 0.1

  background1 = createSprite(windowWidth,windowHeight)
  background1.addImage("bg", backgroundImg)
  background1.scale = 6





  asteriodGroup = new Group()
  bulletsGroup = new Group()
}

function draw() {

  if(gameState === 1){
  background(0);  

  fighterPlane1.x = World.mouseX
  fighterPlane1.y = World.mouseY

  fighterPlane1.depth = background1.depth;
  fighterPlane1.depth += 1;

  background1.velocityY = 3

  if(background1.y > height ){
    background1.y = height/2;
  }


  if (bulletsGroup.isTouching(asteriod)) {
   asteriodGroup.destroyEach();
    bulletsGroup.destroyEach();
    asteriodsDestroyed = asteriodsDestroyed + 1
    
  }


  score = score + Math.round(getFrameRate()/60);

  if(asteriodGroup.isTouching(fighterPlane1)|| fighterPlane1.y>600){
    fighterPlane1.destroy();
    asteriodGroup.destroyEach();
    bulletsGroup.destroyEach();
    
    gameState = END;
    }

  makeAsteriods();

  makeBullets();

  drawSprites();
  textSize(20);
  fill("blue");
  text("Score: "+ score, 10,50);

  textSize(20);
  fill("red");
  text("asteriodsDestroyed : "+ asteriodsDestroyed, 10,100);
  
 

  }

  
  if(gameState === END){
  stroke("yellow");
  fill("yellow");
  textSize (30);
  text("GAMEOVER",430,250);
  }
}


function makeAsteriods(){
  if(frameCount%250=== 0){
  asteriod = createSprite(100,50);
  asteriod.addImage("asteriod",asteriodImg);
  asteriod.scale = 0.2;
  asteriod.x=Math.round(random(800,100));
  asteriod.velocityY = 2;
  asteriod.lifetime = 220;
  asteriodGroup.add(asteriod);
  
}
}

function makeBullets() {
  if (keyDown("space")) {
  var bullet = createSprite(400, 400, 60, 10);
  bullet.addImage("bullet",bulletImg);
  bullet.x = 360;
 bullet.x=fighterPlane1.x;
  bullet.velocityY = -4;
  bullet.lifetime = 100;
  bullet.scale = 0.2;
  bulletsGroup.add(bullet)
  }
}