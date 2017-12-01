Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

var x, y,y1,x1;
var speed=5;
var timer=1
var generation=0
var time_step=1
var fighters=[];
var sequence=[10,10,10,10,10,10,10,10,10,10]
var layers =10
var output=1
var tank,tank1;
var sn=4
var height_=1000;
var number =200
var width_=1000
var nnn =1
var h_divide=height_/2
var w_divide=width_/3
var o,o1,o2,o3,o4,o5,o6
var obstacles
var pop
var control,control1///used  to hold values for a specific tank 
var segments=segmenter(height_,width_);
// f8:62:14:7e:71:ab
function setup() {
  createCanvas(width_, height_);
  // Starts in the middle
  //init at random positions
  x=random(0,width)
  y=random(0,height)
  x1=random(0,width)
  y1=random(0,height)
  pop =new population
  pop.init(3000)
  //print(fighters)
  init_obstacles()
  obstacles=[o,o1,o2,o3,o4,o5,o6]  
}

function draw() {
  background(200);
  init_obstacles()
   //////creating two tanks to battle out each other
    // Jiggling randomly on the horizontal axis
    //x = x + random(-1, 1);
    // Moving up at a constant speed
    // y = y - speed;
    // y1 = y1 + speed;
    
    // Reset to the bottom
    // if (y < 0) {
    //   y = height;
    // }

    // if(y1 > height){
    //   y1=0
    // }
    //for (var index = 0; index < 100; index++) {
    // tank.up();
    // tank1.down();
     // var rand=Math.floor((Math.random() * 4) + 1);     
      // control=tank1.net(weights,width_,height_,tank.pos1,tank.pos2,tank.pos3,tank.pos4,tank.closest_wall.angle,tank.closest_enemy.angle,tank.closest_wall.distance,tank.closest_enemy.distance,tank.boundcheck(control),sequence,layers,output); 
      // tank.controller(control);
      // control1=tank1.net(weights,width_,height_,tank1.pos1,tank1.pos2,tank1.pos3,tank1.pos4,tank1.closest_wall.angle,tank1.closest_enemy.angle,tank1.closest_wall.distance,tank1.closest_enemy.distance,tank1.boundcheck(control1),sequence,layers,output); 
      // tank1.controller(control1);
      for (var i = 0; i < pop.fighters.length; i++) {
        // control=pop.fighters[i].net(width_,height_,pop.fighters[i].pos1,pop.fighters[i].pos2,pop.fighters[i].pos3,pop.fighters[i].pos4,pop.fighters[i].closest_wall.angle,pop.fighters[i].closest_enemy.angle,pop.fighters[i].closest_wall.distance,pop.fighters[i].closest_enemy.distance,pop.fighters[i].boundcheck(control),sequence,layers,output); 
        // print(control)
        pop.fighters[i].move();

      }



  //    tank.opponents()
    //  tank1.opponents(ß)
      // console.log(rand)

    // tank1.right_();
    //console.log(index)
  //}
    }

function init_obstacles(){
  ///would make this one random later
  o  = new rect_custom_learn(100,150,100,100,'0')
  o1 = new rect_custom_learn(200,350,100,100,'01')    
  o2 = new rect_custom_learn(1000,200,100,100,'02')
  o3 = new rect_custom_learn(1200,30,100,100,'03')  
  o4 = new rect_custom_learn(400,100,100,100,'04')
  o5 = new rect_custom_learn(900,600,100,100,'05')    
  o6 = new rect_custom_learn(600,450,100,100,'06')
}

 
function rect_custom_learn(x,y,l,b,id){
  this.x=x
  this.y=y
  this.l=l
  this.b=b
  this.id=id
  rect(this.x,this.y,this.l,this.b)
}

///object to manage my lil tanks
function circle_tank(pos1,pos2,pos3,pos4,id){
        this.pos1=pos1;
        this.pos2=pos2;
        this.ini_x=pos1
        this.ini_y=pos2
        this.pos3=pos3;
        // f8:62:14:7e:71:ab
        this.control=5////default movement 5 isnt anything so d default movement is to stay put
        this.terminate=false
        this.pos4=pos4;
        this.id=id;
        this.weights=[
           math.random([sn,nnn],1/1),
           math.random([sn,sn]),
           math.random([4,sn],1/1)
        ]
        this.history=[0,0,0,0,0,0]
        this.closest_enemy={
          distance:height_*width_,//default distance has to be bigger than u can get on the canvas wanted to use a random number but i was like no need this should work(i hope)
          id:'',
          angle:0
        }
        this.closest_wall={
          distance:height_*width_,//default distance has to be bigger than u can get on the canvas wanted to use a random number but i was like no need this should work(i hope)
          id:'',
          angle:0
        }
        this.eyes=function(){
          var enemies=[];
          if(fighters.length>0){
            for(var i =0;i<=fighters.length-1;i++){
              //now i wanna check postions of other tanks except mine
          if (fighters[i]) {
            if(fighters[i].id!=this.id){
              var tmp={  
                distance:distance_straight_line(fighters[i].pos1,fighters[i].pos2,this),
                angle:angle_to_turn(fighters[i].pos1,fighters[i].pos2,this),
                id:fighters[i].id
            }
                 enemies=enemies.concat(tmp)
                if (tmp.distance<this.closest_enemy.distance) {
                //means its the closest
                this.closest_enemy=tmp
            }
            else if(this.closest_enemy.id==this.closest_enemy.id){
              ///here i wanna update it again thats if he is still d closest i mean distance
              this.closest_enemy=tmp
            }
          }
             
          }
          }
          return enemies
    }
  }
      //  this.enemydistances=this.eyes();
        /////draw a circle
        stroke(50);
        fill(100);
       // ellipse(this.pos1,this.pos2,this.pos3,this.pos4);

       this.up=function(){
        this.pos2=this.pos2-speed;
        ellipse(this.pos1,this.pos2,this.pos3,this.pos4);          
      }

      this.down=function(){
        this.pos2=this.pos2+speed;
        ellipse(this.pos1,this.pos2,this.pos3,this.pos4);          
      }

      this.left_=function(){
        this.pos1=this.pos1-speed
        ellipse(this.pos1,this.pos2,this.pos3,this.pos4);          
      }

      this.right_=function(){
        this.pos1=this.pos1+speed
        ellipse(this.pos1,this.pos2,this.pos3,this.pos4);          
      }

        //this lookes at the available tanks and knows wheir they are and their position
 

////a virtual controller to monitor all its movement


    


      this.controller=function(x){
        if(this.boundcheck(x)&&!this.terminate){
          var inculsion_=this.inculsion()
          for(var i =0;i<=inculsion_.length-1;i++){
           //
          }
          this.eyes()
          if(x==1)
          this.left_()

          if(x==2)
          this.right_()

          if(x==3)
            this.up()

          if(x==4)
            this.down()
          }
          else
          {
          //  ellipse(this.pos1,this.pos2,this.pos3,this.pos4);                       ///makes it stay same place
          }          
          this.create_history()///now i update its hostory
         }
///prevents my tank from going out of the word
      this.boundcheck=function(x){
        if (this.closest_wall.distance<100) {
        //  this.terminate=true/////means ive hit an obstacles
        }
        if(x==1){//checking the height 
          if(this.pos1<10){
            ellipse(this.pos1,this.pos2,this.pos3,this.pos4);                       
            ///it means its at the edge so i wont let the nigger take that step so he has to figgure something else out
            return 0
          }
         }

         else  if(x==2){//checking the height 
          if(this.pos1>width-10){
            ellipse(this.pos1,this.pos2,this.pos3,this.pos4);                       
            ///it means its at the edge so i wont let the nigger take that step so he has to figgure something else out
            return 0
          }
         }

         else if(x==3){//checking the height 
          if(this.pos2<10){
            ellipse(this.pos1,this.pos2,this.pos3,this.pos4);                      
            ///it means its at the edge so i wont let the nigger take that step so he has to figgure something else out
            return 0
          }
         }


         else { 
          if(this.pos2>height-10){
            ellipse(this.pos1,this.pos2,this.pos3,this.pos4);                      
            ///it means its at the edge so i wont let the nigger take that step so he has to figgure something else out
            return 0
          }
         }
        
        return 1;
      }

        //inculsion to see how far it it from any  obstacles and its angle from it 
      this.inculsion=function(){
        var obstacles_calc=[]
      
        
          for(var i =0;i<=obstacles.length-1;i++){
            var obstacle={
              distance:distance_straight_line(obstacles[i].x,obstacles[i].y,this),
              angle:angle_to_turn(obstacles[i].x,obstacles[i].y,this),
              id:obstacles[i].id
          }
              if (obstacle.distance<this.closest_wall.distance) {
                  //means its the closest
                  this.closest_wall=obstacle
              }
               else if(this.closest_enemy.id==this.closest_enemy.id){
              ///here i wanna update it again thats if he is still d closest i mean distance
              this.closest_enemy=obstacle
            }
              obstacles_calc=obstacles_calc.concat(obstacle)
        }
           return obstacles_calc
      }


      this.move = function(){
          var hnode1;
          var hnode2;
          var hnode3;
          var d=this.pos1-this.pos2
          if (d<0) {
            d=d*-1
          }
          // d=0
          // d = Math.exp(2 * d)
          
          
          var x1=[d]

          //x1= math.random([nnn,1])
          
          // var Q = size(x1, 2);
         //x1=math.divide(math.subtract(x1,math.mean(x1)),math.std(x1))
        
         //Input 1
         // x1=math.multiply(x1,0.01)
      //    this.weights=[
      //     math.random([20,nnn],1/100),
      //     math.random([nnn,20]),
      //     math.random([4,nnn],1/1)
      //  ]
          var W1 = this.weights[0]
          var W2 = this.weights[1]
          var W3 = this.weights[2]
          // print(W1)
          // print(W2)
          // print(W3)
          var output=math.multiply(W1,x1)////layer 1
          output=math.add(output,1)
          output=tansig_apply(output)


          output=math.multiply(W2,output)//////layer 2
          output=math.add(output,1)
          output=tansig_apply(output)

          
         
          output=math.multiply( math.random([sn,sn],(10)),output)//////random layer and layer 3
          output=math.add(output,1)
          output=tansig_apply(output)
          
          
          

          output=math.multiply(W3,output)///layer 4
          output=math.add(output,1)
          output=tansig_apply(output)
          
          if (this.boundcheck(this.control)) {
            print(x1)
            print(output+this.id)      
           } 
          if(output[0]>output[1]&&output[0]>output[2]&&output[0]>output[3]){
            //then node 1 must be the strongest
            control = 1
          }
          else  if(output[1]>output[0]&&output[1]>output[2]&&output[1]>output[3]){
            //then node 2 must be the strongest
            control = 2
          }
          else  if(output[2]>output[0]&&output[2]>output[1]&&output[2]>output[3]){
            //then node 3 must be the strongest
            control = 3
          }
          else{
          //then node 4 must be the strongest
            control=4
          }
          this.control=control
          this.controller(this.control)///for movement
          return control;
      }

      this.create_history=function(){
        ///i check were each one has been
        if ((this.pos1>0&&this.pos1<(w_divide))&&(this.pos2>0&&this.pos2<h_divide)) {
          ///box 1
          this.history[0]=1;
        }
        else if((this.pos1>w_divide&&this.pos1<(w_divide*2)) &&  (this.pos2>0&&this.pos2<h_divide) ){
          ///box 2
          this.history[1]=1;
        }
        else if((this.pos1>w_divide&&this.pos1<(w_divide*3)) &&  (this.pos2>0&&this.pos2<h_divide) ){
          ///box 3
          this.history[2]=1;
        }
        else if ((this.pos1>0&&this.pos1<(w_divide))&&(this.pos2>h_divide&&(this.pos2<h_divide*2))) {
          ///box 4
          this.history[3]=1;
        }
        else if((this.pos1>w_divide&&this.pos1<(w_divide*2)) &&  (this.pos2>h_divide&&(this.pos2<h_divide*2))) {
          ///box 5
          this.history[4]=1;
        }
        else {
          ///box 6
          this.history[5]=1;
        }
      }

      this.travel=function(){
        return distance_straight_line(this.ini_x,this.ini_y,this)
      }

      this.fitness=function(){
        var element = this;
        var sum =math.sum(element.history)
        sum=sum*(element.travel()/50)///fitness function
        sum=Math.round(sum)
        return sum
      }

}

// you can also use 'let print = console.log'
// you might also want to add semi-colons to your code
// don't forget to google 'variadic templates in Javascript'.
function print(x){
  console.log(x)
}

function distance_straight_line(x,y,z){
  var length
  //length is the shortest distance or slope between two points 
  //pythagorous theorem shortest distance between two points
  var x1 = z.pos1 - x
  var y1 = z.pos2 - y
  
   x1=Math.pow(x1, 2);
  
   y1=Math.pow(y1, 2);  

  var len=x1+y1
  length = Math.sqrt(len);
  
  return length
}

function angle_to_turn(x,y,z){
  var angle
  ///function to find the angle of an tank from another
  var x1 = z.pos1 - x
  var y1 = z.pos2 - y
  var angle=x1/y1
  angle=Math.atan(angle)
  angle=angle * 180/Math.PI
  return (angle)
}




function size(a, s) {
  return 1;
}

function tansig_apply(x) {
  var array = Array(x.length).fill(0);
  for (var i = 0; i < array.length; i++) {
    e = Math.exp(2 * x[i])
    array[i] = (e - 1) / (e + 1);
  }
  return array;
}

function logsig(x) {


  return 1 / (1 + Math.exp(-x))


}

function mapminmax_apply(x, a, b, c) {
  // var y = bsxfun("-", x, a);
  // y = bsxfun("*", y, b);
  // y = bsxfun("+", y, -1);
  return x;
}

function bsxfun(type, m1, m2) {
  var result = '';
  
  if (type == "-") {
    result = math.subtract(m1, m2);
  }
  else if (type == "+") {
    result = math.add(m1, m2);; 
  }


  else if (type == "*") {
    var array = Array(m1.length).fill(0);
    for (var i = 0; i < m1.length; i++) {
      array[i] = m1[i] * m2[i];
    }
    result = array;
  }
  return result;
}


function population(tankno){
  this.fighters=[]
  this.genepool=[]
  this.most_fit=[]
  this.kids=[]
  
  this.init=function(){
    x=random(0,width)
    y=random(0,height)
  for (var i = 0; i < number - 1; i++) {
    
   
    var element = new circle_tank(x, y, 24, 24,'tank'+i);
    this.fighters=this.fighters.concat(element)
  }
 }

 this.evaluate=function(){
   this.genepool=[]
  for (var i = 0; i < this.fighters.length-1; i++) {
    var element = this.fighters[i];
    var sum =math.sum(element.history)
    sum=sum*(element.travel()/50)///fitness function
    sum=Math.round(sum)
    for (var d = 0; d < sum-1; d++) {
      this.genepool=this.genepool.concat(element)      
    }
   }
   this.genepool.sort(function(a, b){return 0.5 - Math.random()});
   /////create an array of top 100 candidates
   for (var h = 0; h < 51; h++) {
    var rand=Math.floor((Math.random() * this.genepool.length) + 1);  
    if (this.genepool[rand]) {
      this.most_fit=this.most_fit.concat(this.genepool[rand])
    }
    else
      h=h-1 //////makes it go back  if the one selected was null
   } 
  //  this.most_fit this are the most fit parents selacted to reproduce
   this.kids=sex(this.most_fit)
   this.most_fit=[]
  }

  this.averagefitness = function(){
    var sum =0
    for (var i = 0; i < this.fighters.length-1; i++) {
      var element = this.fighters[i];
      sum = element.fitness() + sum
      }
    return sum/this.fighters.length-1
  }
  
}



// setInterval(function() {
//   var fitness_a=document.getElementById('average_fitness').innerHTML='average fitness ='+pop.averagefitness()
//   pop.fighters=[]
  
//   pop.init(3000)
  
//   ////killing generation and starting again
//   generation=generation+1
//   var gen=document.getElementById('generations').innerHTML=generation+'  generations'
//   }, 1000* time_step);



function sex(parents){
  ///this method gets two parents and mix them togetter and create two kids add a mutation to a mutation factor and outputs
    var kids=[]
    var child1,child2
    pop.fighters=[]
    x=random(0,width)
    y=random(0,height)
    
    for (var i = 0; i < parents.length - 1; i=i++) {
      var parent1 = parents[i].weights;
      i=i+1
      var parent2 = parents[i].weights;

      ///kid 1
      var kid1_weights=parent1
      for (var t = 0; t < kid1_weights.length; t++) {
       for (var d = 0; d < 2; d++) {///i just wanna get the 0 to 2 position
        kid1_weights[t][d]=parent2[t][d]
       }
      }
      ////new tank holding weights of the last two parents
      var e=i-1
      var element = new circle_tank(x, y, 24, 24,'tank'+e);
      element.weights=kid1_weights
      pop.fighters=pop.fighters.concat(element)

      ///kid 2
      var kid2_weights=parent1
      for (var t = 0; t < kid2_weights.length; t++) {
       for (var d = 0; d < 2; d++) {///i just wanna get the 0 to 2 position
        kid1_weights[t][d]=parent1[t][d]
       }
      }
       
      var element = new circle_tank(x, y, 24, 24,'tank'+i)
      element.weights=kid2_weights
      pop.fighters=pop.fighters.concat(element)
    }
}



function segmenter(height,width) {
  
}


// var Robot =
// {
//     metal: "Titanium",
//     killAllHumans: function()
//     {
//         alert("Exterminate!");
//     }
// };
// Robot.killAllHumans(); joking code



