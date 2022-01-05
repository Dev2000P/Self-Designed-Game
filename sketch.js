var score =0;
var bomb,zombie,ghost, fire, backBoard;

var blastImg, backBoardImg;

var zombieGroup, ghostGroup, fireGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  bombImg = loadImage("bomb.png")
  blastImg = loadImage("blast.png")
  fireImg = loadImage("fire.webp")
  zombieImg = loadImage("zombie.png")
  ghostImg = loadImage("ghost.png")
  backBoardImg= loadImage("back.jpg")
  bunnyImg = loadImage("bunny.png")
  explosionImg = loadImage("blast.png")
  
}
function setup() {
  createCanvas(1000,800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  bomb= createSprite(100, height/2, 50,50);
  bomb.addImage(bombImg)
  bomb.scale=0.1


  

  bunnyGroup = createGroup();
  fireGroup = createGroup();   
  zombieGroup = createGroup();   
  ghostGroup = createGroup();
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#808080");

  
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    bomb.y=mouseY  


    if (frameCount % 80 === 0) {
      drawZombie();
    }

    if (frameCount % 100 === 0) {
      drawGhost();
    }

    if(frameCount % 200 === 0){
      drawBunny();
    }



    if (zombieGroup.collide(backBoard)){
      handleGameover(zombieGroup);
    }
    
    if (ghostGroup.collide(backBoard)) {
      handleGameover(ghostGroup);
    }


    
   if(zombieGroup.collide(fireGroup)){
      handleMonsterCollision(zombieGroup);
    }

    if(ghostGroup.collide(fireGroup)){
      handleMonsterCollision(ghostGroup);
    }

    if(bunnyGroup.collide(fireGroup)){
      life=life-1;
      handleBunnyCollision(bunnyGroup)
    }

    drawSprites();
  }
    
  
}

function drawZombie(){
  zombie = createSprite(800,random(20,780),60,60);
  zombie.addImage(zombieImg);
  zombie.scale = 0.2;
  zombie.velocityX = -8;
  zombie.lifetime = 400;
  zombieGroup.add(zombie);
}
function drawGhost(){
  ghost = createSprite(800,random(20,780),40,40);
  ghost.addImage(ghostImg);
  ghost.scale = 0.06;
  ghost.velocityX = -8;
  ghost.lifetime = 400;
  ghostGroup.add(ghost);
}

function drawBunny(){
  bunny = createSprite(800,random(20,780),40,40);
  bunny.addImage(bunnyImg);
  bunny.scale = 0.2;
  bunny.velocityX = -8;
  bunny.lifetime = 400;
  bunnyGroup.add(bunny);
}

function mouseClicked(){
  fire= createSprite(150, width/2, 50,20)
  fire.y= bomb.y-20
  fire.addImage(fireImg)
  fire.scale=0.12
  fire.velocityX= 7
  fireGroup.add(fire)
}

function handleMonsterCollision(monsterGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(fire.x+60, fire.y, 50,50);
    blast.addImage(blastImg);
    
    blast.scale=0.3
    blast.life=20
    fireGroup.destroyEach()
    monsterGroup.destroyEach()
}

function handleBunnyCollision(bunnyGroup){

  explosion= createSprite(fire.x+60, fire.y, 50,50);
  explosion.addImage(explosionImg);

  explosion.scale=0.3
 explosion.life=20
  fireGroup.destroyEach()
 bunnyGroup.destroyEach()
}

function handleGameover(monsterGroup){
  
    life=life-1;
    monsterGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}