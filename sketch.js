//creating the variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime, score;
var ground;

//creating the preload function
function preload(){
  //loading the image of the monkey_running
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  //loading the image of the bananaImage
  bananaImage = loadImage("banana.png");
  
  //creating the image of the obstaceImage
  obstacleImage = loadImage("obstacle.png");
 
}

//creating the seup function
function setup() {
  //creating the canvas
  createCanvas(600, 600);
  
  //creating the monkey
  monkey=createSprite(100,525,20,20);
  //adding the animation of the moneky
monkey.addAnimation("Monkey", monkey_running);
  //adding the scale of the monkey
  monkey.scale=0.1;
  
  //creating ground
  ground=createSprite(100, 550, 1200, 10);
  
  //creating the FoodGroup
  FoodGroup=createGroup();
  
  //creating the obstacleGroup
  obstacleGroup=createGroup();
  
  //assigning the score a value of 0
  score=0;
  
    //assigning the survivalTime a value of 0
  survivalTime=0;
  
    //giving the player an idea of what to do
  console.log("Try to survive for as long as possible and eat the bananas and score points!");
}

//creating the draw function
function draw() {
//making the background appear as lightGreen
  background("lightGreen")
  
  //giving the player an idea of what to do
  text("Try to survive for as long as possible and eat the bananas and score points!", 75, 130);
  //giving the stroke to the text
  stroke("black");
  //adding a textSize to the text
  textSize(20);
  //making a fill to the text
  fill("black");
  //showing the survivalTime
  text(survivalTime, 300, 200);
  //Making the Survival Time visible
  text("Survival Time: ", 160, 200)
  //showing the score
  text(score, 270, 170);
  //Making the score visible
  text("Score: ", 200, 170)
  //increasing the score
  if(FoodGroup.isTouching(monkey)){
  score=score+1;
  }
  //increasing the survivalTime 
  survivalTime=survivalTime + Math.round(frameCount%2);
  
  //giving a shapeColor to the ground
    ground.shapeColor="black";
  
   //making the ground move
  ground.velocityX=-4;
  
  //making the ground move properly
  if(ground.x<0){
  ground.x=ground.width/2;
  }
  
  //making the monkey jump
  if(keyDown("space") && monkey.y>=480){
    monkey.velocityY=-9;
  }
  
  //adding gravity to the monkey
  monkey.velocityY=monkey.velocityY + 0.8;
  
  //making the moneky collide with the ground
  monkey.collide(ground);
  
  //calling the food function
  food();
  
  //calling the reset function
  if(obstacleGroup.isTouching(monkey)){
reset();
    }
  
  //calling the obstacle function
  obstacles();
  
  //making the sprites visible
  drawSprites();
  
}

//creating the function banana
function food(){
  //making the bananas appear after every 80 frameCounts
  if(frameCount % 80===0){
    //creating the bananas
    banana=createSprite(500, Math.round(random(420, 450)), 20, 20);
    //adding the image of the bananas
    banana.addImage(bananaImage);
    //adding the scale to the bananas
    banana.scale=0.1;
    //giving a velocity to the bananas
    banana.velocityX=-9
    //adding a lifetime to the banana
    banana.lifetime=55;
    //adding the bananas to the FoodGroup
   FoodGroup.add(banana);
  }
}

//creating the function obstacle
function obstacles(){
  //making the obstacles appear after every 300 frameCounts
  if(frameCount % 300===0){
    //creating the obstacles
    obstacle=createSprite(500, 526, 20, 20);
    //adding the image of the obstacles
    obstacle.addImage(obstacleImage);
    //adding a scale to the obstacles
    obstacle.scale=0.1;
    //giving a velocity to the obstacles
    obstacle.velocityX=-10;
    //adding a lifetime to the obstacles
    obstacle.lifetime=55;
    //adding the obstacles to the obstacleGroup
    obstacleGroup.add(obstacle);    
  }
}

//creating the reset function
function reset(){
    //adding the text which indicates the user how to restart the game
    text("Game Over - Press 'CTRL + R' to restart the game", 80, 300);
  //stopping the monkey from moving
  monkey.velocityY=0;
  //stopping the ground from moving
  ground.velocityX=0;
        //setting lifetime of the bananas and the obstacles so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  //stopping the bananas from coming
  FoodGroup.setVelocityXEach(0);
    //stopping the obstacles from coming
  obstacleGroup.setVelocityXEach(0);
    //stopping the survivalTime from increasing
    survivalTime=survivalTime+0;
  //destroying the obstacles, monkey, ground and bananas
  obstacleGroup.destroyEach();
   FoodGroup.destroyEach();
    monkey.destroyEach();
    ground.destroyEach();
}