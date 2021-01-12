PLAY=1;
gameState=PLAY;
END=0;

var monkey , monkey_running;
var banana ,bananaImage, Obstacle, obstacleImage;
var FoodGroup, rockGroup;
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(500,500);  


  
FoodGroup= new Group(); 
rockGroup= new Group();
  
monkey=createSprite(80,315,20,20);
monkey.addAnimation("monkey",monkey_running);
monkey.scale=0.1;
  
ground=createSprite(400,350,900,10)
ground.velocityX=4;  
ground.x=ground.width/2;
console.log(ground.x)  

score=0

  
}


function draw() {
background("white");
   
 
  
  if(gameState===PLAY){
    if(ground.x<0){
      ground.x=ground.width/2;
    }
     ground.velocityX=-4;
    
  if(keyDown("space")){
    monkey.velocityY=-10;
  }
  monkey.velocityY=monkey.velocityY+0.4;
  
    
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score = score+1;
    }
  
         
  Food();
  obstacle();
  
   if(monkey.isTouching(rockGroup)){
      gameState = END;
    }
    
    stroke("white");
    textSize(20);
    fill("white");
    text("Score:  "+ score,500,50);
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("survival time:  "+survivalTime,100,50);
 
  
  }
   
   if(gameState===END){
     ground.velocityX=0;
     rockGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     
     FoodGroup.setLifetimeEach(-1);
     rockGroup.setLifetimeEach(-1);
     
     
   }
  
  
  monkey.collide(ground);
  
  
 drawSprites(); 
  text("Score : " + score, 300, 50);
}    

function Food(){
  if(frameCount%80===0){
    var banana=createSprite(500,10,10,20);
    banana.addImage(bananaImage);
    banana.velocityX=-(5+2*score/100);
    banana.y=Math.round(random(120,200));
    banana.scale=0.1;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
    banana.setCollider("rectangle",0,0,400,400);
  }
}

function obstacle(){
  if(frameCount%300===0){
    var obstacle=createSprite(500,10,23,32);
    obstacle.addImage(rockImage);
    obstacle.velocityX=-(5+2*score/100);
    obstacle.y=Math.round(random(310,311));
    obstacle.scale=0.2;
    rockGroup.add(obstacle);
    rockGroup.setLifetimeEach(100);
    obstacle.setCollider("circle",0,0,200);
  }
}


