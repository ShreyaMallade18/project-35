//Create variables here
var dog, dog1, happyDog, database,foodS, foodStock;
var feed, addFood;
var feedTime, lastFed;
var foodObj;

function preload()
{
	//load images here
  dog1 = loadImage("images/dogImg.png");
  happyDog= loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 500);


  dog = createSprite(800,220,150,150);
  dog.addImage(dog1);
  dog.scale = 0.15;

  foodObj = new Food();

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock = database.ref("food");
  foodStock.on("value", readStock);

  
}


function draw() {  
  background(46,139,87);
  

  feedTime = database.ref("FeedTime");
  feedTime.on("value",function(data){
    lastFed = data.val();
  })

  fill(255);
  textSize(20);
  if(lastFed>=12){
    text("Last Feed : " + lastFed % 12 + "PM", 350, 30);
  }else if(lastFed == 0){
    text("Last Feed : 12 Am", 350, 30);
  }else{
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }


  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog)
  }


   foodObj.display();

  drawSprites();
  //add styles here
 
}

  function readStock(data){
   foodS = data.val();
   foodObj.updateFoodStock(FoodS);
  }

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })

}


  function addFoods(){
    FoodS ++;
    database.ref("/").update({
      Food:foodS
    })
  }








  function writeStock(x){
    if(x<=0){
      x=0;
    }else{
      x=x-1
    }
    database.ref("/").update({
      food:x
    })
  }


