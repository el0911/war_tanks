var time_step= 60;
var height_ = 1000;
var speed =5
var number = 200
var generation =0
var width_ = 1500
var points = pontgenerator(height_, width_);
var pop;

function setup() {
    drawPoints(points);
    createCanvas(width_, height_);
    pop =new population;    
    pop.init()
  }



function draw() {
    background(240);
    drawPoints(points);
    for (let index = 0; index < pop.fighters.length; index++) {
      const element = pop.fighters[index];
        element.think()
       element.move( getRandomIntInclusive(1, 4) )
    }
    
}



function tank(X,Y,id) {
  this.target=1//always start at 1 target
  this.id = id;
  this.Y=Y
  this.X=X
  this.size=30;
  this.weights = [
    {id:1,perceptron:math.random([1, 2], -1, 1),ans:1},
    {id:2,perceptron:math.random([1, 2], -1, 1),ans:1},
    {id:3,perceptron:math.random([1, 2], -1, 1),ans:1},
    {id:4,perceptron:math.random([1, 2], -1, 1),ans:1}
  ]

  this.randomDot = getRandomIntInclusive(0, 99)
  var point = points[this.randomDot]
  this.initialdistance = distance_straight_line(point[0], point[1], this)

  this.move =function(step){
    var point = points[this.randomDot]    
    if (distance_straight_line(point[0], point[1], this)<20) {///close enough
     //pick another point and inc pointcount 
     this.randomDot = getRandomIntInclusive(0, 99)     
     this.target=this.target+1
    }

    if(step==1){///move up
      this.up()
    }

    else if(step==2){///move down
      this.down()
    }


    else if(step==3){///move left
      this.left_()
    }

    else if(step==4){//move right
      this.right_()
    }
  }


  this.think =function () {
    var randomDot = points[this.randomDot];
    line(this.X, this.Y, randomDot[0], randomDot[1])
    var angleTo = angle_to_turn(randomDot[0], randomDot[1], this);
    var distance = distance_straight_line(randomDot[0], randomDot[1], this)
    var x1 = [[angleTo], [distance]]
    
    var heighest =0.0000000000000
    var descision;
    ////need 4 perceptrons for movement
      this.weights.forEach(element => {
      element.ans= math.tanh(math.multiply(element.perceptron,x1));
      if (element.ans[0]>heighest) {
        heighest=element.ans[0]
        descision=element.id
      }
    });
    
    this.move(descision)
  }


  this.up = function () {
    if ((this.Y - speed)>12) {
      this.Y = this.Y - speed;
      ellipse(this.X, this.Y, this.size, this.size);
      fill(0, 255, 0)
    }
    else{
      ellipse(this.X, this.Y, this.size, this.size);
      fill(0, 255, 0)
    }
  }

  this.down = function () {
    if ((this.Y + speed)<(height_-12)) {
      this.Y = this.Y + speed;
      ellipse(this.X, this.Y, this.size, this.size);
      fill(0, 255, 0)
    }
    else{
      ellipse(this.X, this.Y, this.size, this.size);
      fill(0, 255, 0)
    }
  }

  this.left_ = function () {
    if ((this.X - speed)>12) {
      this.X = this.X - speed
      ellipse(this.X, this.Y, this.size, this.size);
      fill(0, 255, 0)
    }
    else{
      ellipse(this.X, this.Y, this.size, this.size);
      fill(0, 255, 0) 
    }
  }

  this.right_ = function () {
    if ((this.X + speed)<(width_-12)) {
      this.X = this.X + speed
      ellipse(this.X, this.Y, this.size, this.size);
      fill(0, 255, 0)
    }
    else{
      ellipse(this.X, this.Y, this.size, this.size);
      fill(0, 255, 0)
    }
  }

}



function population(){
  this.fighters=[]///array to hold all fighters


  this.init=function(){
   var x = random(0, width)
     var   y = random(0, height)
     for (let index = 0; index < number; index++) {
      const element = new tank(x,y,index)
       this.fighters=this.fighters.concat(element)
    }
  }

  this.generalfitness =function(){
    var sum =0
    this.fighters.forEach(element => {
      var point=points[element.randomDot]
       var coverage=(distance_straight_line(point[0], point[1], element)/element.initialdistance )* 100
      var targets=element.target
      var fitness = coverage * targets
      sum = sum + fitness
    });

    return sum/this.fighters.length
  }

  this.evaluate =function(){
    var genepool = []////new geenpool
    this.fighters.forEach(element => {
      var point=points[element.randomDot]
      var coverage=(distance_straight_line(point[0], point[1], element)/element.initialdistance )* 100
      var targets=element.target
      var fitness = coverage * targets
      fitness=Math.floor(fitness)
      for (let i = 0; i <fitness; i++) {
        genepool=genepool.concat(element)
      }
    }); 
    
    genepool.sort(numRandomized);//sort randomly
    for (let a = 0; a < Math.floor(number/2); a++) {
      const parent1 = genepool[getRandomIntInclusive(0, genepool.length-1)]
      const parent2 = genepool[getRandomIntInclusive(0, genepool.length-1)]
    }
  }
  
}


function pontgenerator(height, width) {
    var starting_x = 0
    var starting_y = 0
    var pointsArray = []
    var count = 0
  
  
    for (let i = 0; i < 10; i++) {
      var x = []
      var y = []
      var point = []
  
      x = [i * (width / 10), ((i + 1) * (width / 10))]
  
      for (let a = 0; a < 10; a++) {
        y = [a * (height / 10), ((a + 1) * (height / 10))]
        point = [(x[0] + ((x[1] - x[0]) / 2)), (y[0] + ((y[1] - y[0]) / 2))]
        pointsArray[count] = point;
        count = count + 1
      }
    }
    return pointsArray;
  
  }


  function drawPoints(points) {
    for (let i = 0; i < points.length; i++) {
      ellipse(points[i][0], points[i][1], 10, 10);
      fill(255, 0, 0)
    }
  }


  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }
  
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  function distance_straight_line(x, y, position) {
    var length
    //length is the shortest distance or slope between two points 
    //pythagorous theorem shortest distance between two points
    var x1 = position.X - x
    var y1 = position.Y - y
  
    x1 = Math.pow(x1, 2);
  
    y1 = Math.pow(y1, 2);
  
    var len = x1 + y1
    length = Math.sqrt(len);
  
    return length
  }

  function angle_to_turn(x, y, position) {
    var angle
    ///function to find the angle of an tank from another
    var x1 = position.X - x
    var y1 = position.Y - y
    var angle = x1 / y1
    angle = Math.atan(angle)
    angle = angle * 180 / Math.PI
    return (angle)
  }


  function print(x) {
    console.log(x)
  }


  function numRandomized() {
    return 0.5 - Math.random();
}



  setInterval(function () {
    var fitness_a = document.getElementById('average_fitness').innerHTML = 'average fitness =' + pop.generalfitness()
    pop.evaluate()
  
    ////killing generation and starting again
    generation = generation + 1
    var gen = document.getElementById('generations').innerHTML = generation + '  generations'
  }, 1000 * time_step);
  