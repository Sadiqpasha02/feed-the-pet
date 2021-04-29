//Create variables here
var dog , happyDog , nomdog ;
var food , foodstock

var database;

var food= 20
function preload()
{
  //load images here
  nomdog = loadImage("images/dog1.png")
  happyDog = loadImage("images/dog2.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(225,225,30,30)
  dog.addImage("normal",nomdog);
  dog.addImage("happy",happyDog)
  dog.scale = 0.1
  var foodstock = database.ref("food")
  foodstock.on("value",readstock)
  
}


function draw() {  
  background(46, 139, 87)
  if(keyDown(UP_ARROW)){
    
   dog.changeImage("happy",happyDog) 
    dog.scale = 0.1;
    food = food -1;
    writeStock(foods);
}


  drawSprites();

  fill("white");
  text("Food Remaining:"+ food ,140,400)

  fill("white");
  text("NOTE: PRESS UP_ARROW TO FEED FOOD TO DOG",140,50)
  //add styles here

}

function readstock(data){
  foods=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
  
}

