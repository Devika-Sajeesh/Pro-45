var bg1;

var START = 0;
var PLAY = 1;
var END = 2;
var gamseState = START;

var bheem,bheemImg;
var iGround;
var score = 0;

var chutki,kalia,dholu,bholu,raju,jaggu,ladooImg;
var kimada,mangal,witch;

var eGroup,fGroup,lGroup;

var bgSnd,kSnd,wSnd;
var gOver,Over;
var win,winImg;

function preload(){

  //bg image
  bg1      = loadImage("kingdom.png");
  bheemImg = loadImage("bheem.png");

  //friens image 
  chutki = loadImage("chutki.png");
  kalia  = loadImage("kalia (1).png");
  bholu  = loadImage("bholu.png");
  raju   = loadImage("raju.png");
  jaggu  = loadImage("Jaggu.png");

  ladooImg = loadImage("laddu.png");

  //enemy images
  kimada = loadImage("kimada.png");
  mangal = loadImage("mangal.png");
  witch  = loadImage("witch.png");

  //loading sound
  bgSnd  = loadSound("bg.mp3");
  kSnd = loadSound("Kirmada sound.mp3");
  wSnd = loadSound("witch_laugh.mp3")
  
  gOver = loadImage("gameover.png");
  winImg = loadImage("win.png");
}
function setup() {
  createCanvas(700, 700);

  //bheem sprite
  bheem = createSprite(350,620,20,20);
  bheem.addImage(bheemImg);
  bheem.visible = false;
  bheem.scale = 0.3;
  //bheem.debug = true;

  //invisible ground sprite
  iGround = createSprite(100,700,1550,10);
  iGround.visible = false;

  //creating groups
  //Enemy group
  eGroup = createGroup();

  //friends group
  fGroup = createGroup();

  //laddu group
  lGroup = createGroup();
}

function draw() {
  background(bg1);
  drawSprites();

  bheem.velocityX = 0;
  
//gamestate start, displays at the very start of the game
if(gamseState === START){
  fill("#f70258");
  stroke("#f70258");
  textSize(21);
  text("Collect ladoos and his friends to earn points",130,260);
  text("Press space to start the game",200,310);
  text("Avoid Bheem's Enemies",230,360);
  text("Earn 50 Points to Win",240,410);


  //space button to change state
  if(keyDown("space")){
    gamseState = PLAY;
    bgSnd.play();
    bgSnd.play();
  }
  }

//gamsestate play, game starts
if(gamseState === PLAY){

 bheem.visible = true;
 //bheem.depth = bheem.depth+1;

 //scoring system
  textSize(30)
  fill("white")
  stroke("white")
  text("Score:"+score,525,50)

 //to collide bheem with ground
 bheem.collide(iGround);

 //bheem to movr
 if(keyDown("LEFT_ARROW")){
   bheem.velocityX = -6;
 }

 if(keyDown("RIGHT_ARROW")){
  bheem.velocityX = 6;
}

 if(keyDown("UP_ARROW") && bheem.y >=100){
   bheem.velocityY = -6;
  }

  //gravity
  bheem.velocityY = bheem.velocityY + 0.9;

  //display of functions
  spawnFriends();
  spawnLadoo();
  spawnEnemies();

  //earnimg points
  if(lGroup.isTouching(bheem)){

    lGroup.destroyEach();
    score = score + 1;
  } 
 
  //earnimng points by touching friends
  if(fGroup.isTouching(bheem)){

    fGroup.destroyEach();
    score = score + 3;
    //console.log();
  }

  //ending of game
  if(eGroup.isTouching(bheem)){

    eGroup.destroyEach();
    score = score - 5;
    kSnd.play();
    //wSnd.play();
    gamseState = END;
    
  }
  
  //gamestate end 
  if(gamseState === END){
   
    //game over img
    Over = createSprite(310,350);
    Over.addImage(gOver);
    
    //visible false
    bheem.visible = false;
    fGroup.destroyEach();
    lGroup.destroyEach();
    
    bgSnd.stop();
  
  }
  
  //game wins
  if(score >= 50){
    
    //visible false
    bheem.visible = false;
    fGroup.destroyEach();
    lGroup.destroyEach();
    eGroup.destroyEach();
    
    //img win
    win = createSprite(310,350);
    win.addImage(winImg);
    
    bgSnd.stop();
  }

}
}

//spawning of his friends 
function spawnFriends(){
  if(frameCount % 100 === 0){

    var friends = createSprite(300,50);
    friends.velocityY = 4;
     friends.scale = 0.8;

    friends.x = Math.round(random(50,690));

    var rand = Math.round(random(1,5));

    switch(rand){

      case 1: friends.addImage(chutki);
      break;

      case 2: friends.addImage(raju);
      break;

      case 3: friends.addImage(jaggu);
      break;

      case 4: friends.addImage(kalia);
      break;

      case 5: friends.addImage(bholu);
      break;

      default : break;

    }
      fGroup.add(friends);

    
    
  }
}

//spawning of ladoo
function spawnLadoo(){

if(frameCount % 80 === 0){
  var ladoo = createSprite(10,10);
  ladoo.velocityY = 4;

  ladoo.x = Math.round(random(50,690));

  ladoo.addImage(ladooImg);
  ladoo.scale = 0.6;

  ladoo.lifetime = -300;

  lGroup.add(ladoo);
  }
}

//spwning enemies
function spawnEnemies(){

  if(frameCount % 50 === 0){

    var enemies = createSprite(300,50);
    enemies.velocityY = 7;
    //enemies.debug = true;
    enemies.scale = 0.8;
    enemies.x = Math.round(random(50,690));

    var rand = Math.round(random(1,3));

    switch(rand){

      case 1: enemies.addImage(kimada);
      break;

      case 2: enemies.addImage(mangal);
      break;

      case 3: enemies.addImage(witch);
      break;

      default : break;
    }
      
      eGroup.add(enemies);
    

  }
}