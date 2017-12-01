


var speed=10;
var timer=1
var generation=0
var time_step=10
var fighters=[];
var height_=800;
var width_=1520
var h_divide=height_/2
var w_divide=width_/3
var obstacles=[]
var obstacle_count=10
var ob= new obstacle_object()

function setup(){
    createCanvas(width_, height_);    
}


function draw(){
    background(200); 
    ob.draw()
}

function tank(){
    background(200);
    
}


function fighters(){
    createCanvas(width_, height_);
}


function obstacle_object(){
    this.init=function(){
        obstacles=[]
        ///would make this one random later
       for (var index = 0; index < obstacle_count; index++) {
       var x=random(0,width)
       var y=random(0,height)
        obstacles = obstacles.concat(
            {
                x:x,
                y:y
            }
        )
       }
    }


    this.draw = function(){
        for (var i = 0; i < obstacles.length; i++) {
            rect_custom_learn(obstacles[i].x,obstacles[i].y,100,100,'O'+i)
        }
    }
}


function rect_custom_learn(x,y,l,b,id){
    this.x=x
    this.y=y
    this.l=l
    this.b=b
    this.id=id
    rect(this.x,this.y,this.l,this.b)
  }




setInterval(function() {
    ob.init()      
}, 1000* time_step);
  