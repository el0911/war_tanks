

var x, y,y1,x1;
var speed=10;
var fighters;
var sequence=[10,10,10,10,10,10,10,10,10,10]
var layers =10
var output=1
var tank,tank1;
var height_=800;
var weights=[]
var width_=1520
var o,o1,o2,o3,o4,o5,o6
var obstacles
var control,control1///used  to hold values for a specific tank 
 
function setup() {
  createCanvas(width_, height_);
  // Starts in the middle
  //init at random positions
  x=random(0,width)
  y=random(0,height)
  x1=random(0,width)
  y1=random(0,height)
  tank=new circle_tank(x, y, 24, 24,'tank1');
  tank1=new circle_tank(x1, y1, 24, 24,'tank2');
  fighters=[tank,tank1]    
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
      control=recurrent(weights,width_,height_,tank.pos1,tank.pos2,tank.pos3,tank.pos4,tank.closest_wall.angle,tank.closest_enemy.angle,tank.closest_wall.distance,tank.closest_enemy.distance,tank.boundcheck(control),sequence,layers,output); 
      tank.controller(control1);
      control1=recurrent(weights,width_,height_,tank1.pos1,tank1.pos2,tank1.pos3,tank1.pos4,tank1.closest_wall.angle,tank1.closest_enemy.angle,tank1.closest_wall.distance,tank1.closest_enemy.distance,tank1.boundcheck(control1),sequence,layers,output); 
      tank1.controller(control1);
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
        this.pos3=pos3;
        this.pos4=pos4;
        this.id=id;
        this.closest_enemy={
          distance:height_*width_,//default distance has to be bigger than u can get on the canvas wanted to use a random number but i was like no need this should work(i hope)
          id:'',
          angle:''
        }
        this.closest_wall={
          distance:height_*width_,//default distance has to be bigger than u can get on the canvas wanted to use a random number but i was like no need this should work(i hope)
          id:'',
          angle:''
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
        if(this.boundcheck(x)){
          var inculsion_=this.inculsion()
          for(var i =0;i<=inculsion_.length-1;i++){
           //   print(inculsion_[i])
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
      }
///prevents my tank from going out of the word
      this.boundcheck=function(x){
        if(x==1||x==2){//checking the height 
          if(this.pos1>width-10||this.pos1<10){
            ellipse(this.pos1,this.pos2,this.pos3,this.pos4);                       
            ///it means its at the edge so i wont let the nigger take that step so he has to figgure something else out
            return 0
          }
         }

        else if(x==3||x==4){//checking the height 
          if(this.pos2>height-10||this.pos2<10){
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
}

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







function recurrent(wweights,idth_,height_,x,y,size1,size2,closest_wall_angle,closest_wall_distance,enemy_angle,enemy_distance,boundcheck,layers,sequence,output){
       var control=1
       var x1=[width_,height_,x,y,size1,size2,closest_wall_angle,closest_wall_distance,enemy_angle,enemy_distance,boundcheck]
       var memory=math.zeros(13);                  // returns [0, 0, 0]       
       for(var i=0;i<=layers-1;i++){
        if (i!=layers-1) {
          x1= math.add(softmax(x1,0,weights[i],0),memory)  
          memory=x1
          x1=tansig_apply(x1)          
        }
        else{//relu function
          x1= softmax(x1,0,weights[i],0)
          x1=tansig_apply(x1)  
        }
      }///RNN CALCULATIONS
       x1 = logsig(x1) 
       Math.round(value)
       print(x1)
       return control
}






function softmax(x,a,b,c){
  console.log(x);
  console.log(a);
  console.log(b);
  console.log(c);
  var y = bsxfun("-",x,a);
  y = bsxfun("*",y,b);
  y = bsxfun("+",y,0);
  return y;
  }
  
  function bsxfun(type,m1,m2){
  var result = '';
  console.log(type);
  console.log(m1);
  console.log(m2);
  if(type=="-"){
  result = math.subtract(m1, m2);
  }
  else if(type=="+") {
  result = math.add(m1, m2); ;
  }
  
  
  else if(type=="*") {
  var array=Array(m1.length).fill(0);
  for (var i = 0; i < m1.length; i++) {
  array[i]=m1[i]*m2[i];
  }
  result=array;
  }
  return result;
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














// var Robot =
// {
//     metal: "Titanium",
//     killAllHumans: function()
//     {
//         alert("Exterminate!");
//     }
// };
// Robot.killAllHumans(); joking code