/* images in this game come from:
1: house image:https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiosvP2qJbnAhXMY98KHcWRAzUQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.twinkl.com%2Fillustration%2Fcubby-wendy-shed-play-house-birds-eye-view-garden-room-furniture-eyfs-ks1&psig=AOvVaw39hT_1HFp00J4gJrWnmq5_&ust=1579751997042173
2: font:https://www.urbanfonts.com/free-fonts.htm
3: scope image:https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjy8qnRqZbnAhVLnOAKHW54BYAQjRx6BAgBEAQ&url=https%3A%2F%2Fpngio.com%2Fimages%2Fpng-34144.html&psig=AOvVaw2nwjoictEwQwyU61txch9K&ust=1579752137432987
4: zombe1 image:https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjjw_roqZbnAhXLJt8KHcN-DvsQjRx6BAgBEAQ&url=https%3A%2F%2Fclipartix.com%2Fzombie-clip-art-image-33952%2F&psig=AOvVaw1oyEhAEAh2zJMH6QxnXJVP&ust=1579752235350752
5: intro image:https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiY5fn7qZbnAhWmTN8KHdPRBC8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.ea.com%2Fgames%2Fplants-vs-zombies%2Fplants-vs-zombies-2&psig=AOvVaw2DLgAn9XTBr2tDyC0tO3Ct&ust=1579752273120084
*/

new p5();
var total = 5;
var total2 = 3;
var zombies = [];
var zombies2 = [];
var font = loadFont('images/font.otf'); 
var intro = {
    x:380,
    y:200,
    w:500,
    h:300,
    IMG: loadImage('images/intro.png')
}
var house = {
    x:550,
    y:50,
    IMG: loadImage('images/house.png')
}
var scopeIMG=loadImage('images/scope.png');
var score=0,
    lives=3;
var health = {
    x: -100,
    y: 200,
    size: 100,
    speed: 4,
    image: loadImage('images/powerup.png')
}
var screen=1;

function preload(){
  for (var i = 0; i < total; i++){
  zombies[i] = new Zombie();
  }
  for (var n = 0; n < total2; n++){
  zombies2[n] = new Zombie2();
  }
}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(117, 96, 62);  
  if(screen==1){
    introScreen();
  }else if(screen==2){
    playScreen();
  }else if(screen==3){
    endScreen();
  }
}

//introscreen was created collaboratively
function introScreen(){
  background(117, 96, 62);
  push();
  imageMode(CENTER);
  image(intro.IMG, intro.x,intro.y,intro.w,intro.h);
  pop();
  push();
  textFont(font);
  textSize(90);
  stroke('gray');
  textAlign(CENTER);
  text('Zombie Attack', 370,150);
  textSize(45);
  text('PRESS ANY KEY TO PLAY',400,350);
  pop();
}

//playScreen created by me
function playScreen(){
  backyardScene();
  for (var i = 0; i < zombies.length; i++){
  //zombies[i].display();
  zombies[i].displayImage();
  zombies[i].move();
  zombies[i].shoot();
  zombies[i].collisionDetection();
  }
  for (var n = 0; n < zombies2.length; n++){
  zombies2[n].displayImage();
  zombies2[n].move();
  zombies2[n].shoot(n);
  zombies2[n].collisionDetection();
  }
  if (lives<1){
  screen=3;
  }
}  

function endScreen(){
  push();
  fill('black');
  imageMode(CENTER);
  image(intro.IMG, intro.x,intro.y,intro.w,intro.h);
  textAlign(CENTER);
  textFont(font);
  textSize(100);
  stroke('grey');
  text('GAME OVER',400,200);
  text('Score:' +score, 400,300);
  textSize(30);
  text('Press Any Key to Play Again', 400, 350);
  pop();
}

function backyardScene(){
  fill('green');
  noStroke();
  rect(0,50,width,300);
  image(house.IMG,house.x,house.y);
  push();
  imageMode(CENTER);
  image(scopeIMG,mouseX,mouseY,50,50);
  pop();
  displayScore();
  healthPowerup();
}

function displayScore(){
  textSize(30);
  fill('black')
  text("Score:" +score, 50,35);
  text("Lives:" +lives, 600,35);
}

function healthPowerup(){
 if(lives<=1){
   drawHealthPowerup();
   moveHealthPowerup();
   shootHealthPowerup();
 }
}

//health powerup created by partner
function shootHealthPowerup(){
  if(mouseX>health.x && mouseX<health.x+health.size && mouseY>health.y && mouseY<health.y+health.size){
    lives++;
    health.speed=0;
    health.x=-health.size;
  }
}

function moveHealthPowerup(){
    health.x=health.x+health.speed;
}

function drawHealthPowerup(){
  image(health.image,health.x,health.y,health.size,health.size);
}

//first zombie created by me
class Zombie {
  constructor() {
    this.x = random(-100,-100);
    this.y = random(50,350-120);
    this.speed = random(1, 4);
    this.height = 120;
    this.width = 100; 
    this.image=loadImage('images/zombie1.png');
  }
  display(){
    noStroke();
    fill('black');
    rect(this.x,this.y, this.width, this.height);
  }
  
  
  displayImage(){
  image(this.image,this.x,this.y,this.width,this.height);
  }
  
  move(){
    this.x = this.x + this.speed;
    if(this.x>width){
      this.x=-40
      this.y=random(50,350-this.height);
    }
  }
  
  shoot(){
    if(mouseX>this.x && mouseX<this.x+this.width && mouseY>this.y && mouseY<this.y+this.height){
      this.x=-40;
      this.y=random(50,350-this.height);
      score=score+50;
    }
  }
    
  collisionDetection(){
    if(this.x+this.width>house.x+150){
      score=score-50;
      this.x=-40;
      lives--;
      this.y=random(50,350-this.height);
    }
  }
}

//second zombie coded by partner
class Zombie2 {
  constructor(){
  this.x=-100;
  this.y=random(50,350-100);
  this.speed=random(8,13);
  this.size=100;
  this.image=loadImage('images/zombie.png');
  }
    
  displayImage(){
  image(this.image,this.x,this.y,this.size,this.size);
  }
  
  move(){
  if (score>2500){
  this.x=this.x+this.speed;
    if(this.x>width){
      this.x=-this.size;
      this.y=random(50,350-this.size);
    }
  }
  }
  
  shoot(n){
  if(mouseX>this.x && mouseX<this.x+this.size && mouseY>this.y && mouseY<this.y+this.size){
    this.x=-this.size;
    score = score + 100;
    this.y=random(50,350-this.size);
  }
  }
  
  collisionDetection(){
    if(this.x+this.size>house.x+150){
      this.x=-this.size;
      lives--;
      this.y=random(50,350-this.size);
      score = score - 100;
    }
  }
}


function intializeZombies(){
  for (var i = 0; i < zombies.length; i++){
      zombies[i].x = random(-200,-100);
      zombies[i].y = random(50,350-120);
      zombies[i].speed = random(1, 4);
      zombies[i].height = 120;
      zombies[i].width = 100;
  }
  for (var n = 0; n < zombies2.length; n++){
      zombies2[n].x = -100;
      zombies2[n].y = random(50,350-100);
      zombies2[n].speed = random(4, 8);
      zombies2[n].size = 100;
}
}


function keyPressed(){
 if (screen==1){
   screen=2;
 }
   if (screen==3){
     screen=2;
     score=0;
     lives=3;
     intializeZombies(); 
     health.x=-100;
  }
 }
