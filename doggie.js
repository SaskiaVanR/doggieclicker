/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var treats = 0;
var dogposition = [300,300];
var dogs = [];
var sinceLastDog = 3000;

function Dog(dogs){
    this.dogposition = [300,300];
    this.d = document.createElement("IMG");
    this.d.src = "acecutout.jpg";
    this.d.style.position = "absolute";
    this.d.style.left = this.dogposition[0];
    this.d.style.top = this.dogposition[1];
    this.d.style.display = "inline";
    this.d.style.height = "50px";
    this.d.style.width = "50px";
    this.direction = 3;
    document.body.appendChild(this.d);
}

function newDog(){
    var newdog = new Dog();
    dogs.push(newdog);
}

function treatClick(number){
    treats = treats + number;
    document.getElementById("treats").innerHTML = Math.round(treats);
}

function treatDown(){
    document.getElementById("treatbutton").style.backgroundColor = "#ecccff";
}

function treatUp(){
    document.getElementById("treatbutton").style.backgroundColor = "#f6e6ff";
}


var clickers = [0,0,0];
var clickernames = ['ovens', 'bakeries', 'factories'];
var costnames = ['ovenCost', 'bakeryCost', 'factoryCost'];
var initcosts = [10,500,10000];

function buyFactory(type){
    var clickerCost = Math.floor(initcosts[type]*Math.pow(1.1,clickers[type]));
    if (treats>=clickerCost){
        clickers[type] = clickers[type]+1;
        treats = treats - clickerCost;
        document.getElementById(clickernames[type]).innerHTML = clickers[type];
        document.getElementById('treats').innerHTML = Math.round(treats);
        
        
    }
    var nextCost = Math.floor(initcosts[type]*Math.pow(1.1,clickers[type]));
    document.getElementById(costnames[type]).innerHTML = nextCost;
    updatePerSecond();
}

var perSecond = 0;

function updatePerSecond(){
    perSecond = clickers[0]*1+clickers[1]*50+clickers[2]*1000;
    document.getElementById('perSecond').innerHTML = perSecond;
}

function moveDog(dog){
    direct = Math.floor(Math.random()*3);
    console.log(direct+" "+dog.direction);
    if (direct===0){
        if (dog.direction===0){
            dog.dogposition = [dog.dogposition[0],dog.dogposition[1]+10];
            dog.direction = 3;
        } else if (dog.direction===1){
            dog.dogposition = [dog.dogposition[0]-10,dog.dogposition[1]];
            dog.direction = 0;
        } else if (dog.direction===2){
            dog.dogposition = [dog.dogposition[0],dog.dogposition[1]-10];
            dog.direction = 1;
        } else if (dog.direction===3){
            dog.dogposition = [dog.dogposition[0]+10,dog.dogposition[1]];
            dog.direction = 2;
        }
        
    } else if (direct===1){
        if (dog.direction===0){
            dog.dogposition = [dog.dogposition[0]-10,dog.dogposition[1]];
            dog.direction = 0;
        } else if (dog.direction===1){
            dog.dogposition = [dog.dogposition[0],dog.dogposition[1]-10];
            dog.direction = 1;
        } else if (dog.direction===2){
            dog.dogposition = [dog.dogposition[0]+10,dog.dogposition[1]];
            dog.direction = 2;
        } else if (dog.direction===3){
            dog.dogposition = [dog.dogposition[0],dog.dogposition[1]+10];
            dog.direction = 3;
        }
        
    } else if (direct===2){
        if (dog.direction===0){
            dog.dogposition = [dog.dogposition[0],dog.dogposition[1]-10];
            dog.direction = 1;
        } else if (dog.direction===1){
            dog.dogposition = [dog.dogposition[0]+10,dog.dogposition[1]];
            dog.direction = 2;
        } else if (dog.direction===2){
            dog.dogposition = [dog.dogposition[0],dog.dogposition[1]+10];
            dog.direction = 3;
        } else if (dog.direction===3){
            dog.dogposition = [dog.dogposition[0]-10,dog.dogposition[1]];
            dog.direction = 0;
        }
        
    }
    if (dog.dogposition[0]<300){
        dog.dogposition[0]=300;
    }
    if (dog.dogposition[1]<300){
        dog.dogposition[1]=300;
    }
    if (dog.dogposition[0]>600){
        dog.dogposition[0]=500;
    }
    if (dog.dogposition[1]>600){
        dog.dogposition[1]=600;
    }
    dog.d.style.left = dog.dogposition[0]+ 'px';
    dog.d.style.top = dog.dogposition[1]+'px';
}

var isdog = false;

window.setInterval(function(){
    treatClick(clickers[0]/10);
    treatClick(clickers[1]*50/10);
    treatClick(clickers[2]*1000/10);
    if (perSecond>=100000){
        
        var d= document.getElementById("doggo");
        var x_pos = 200;
        var y_pos = 300;
        d.style.display = "inline";
        d.style.position = "absolute";
        d.style.left = x_pos+ 'px';
        d.style.top = y_pos+'px';
        dogposition = [x_pos,y_pos];
    }
    if (perSecond>=3){
        moveDoggo(document.getElementById("doggo"));
    }
    if (perSecond>=5){
        if (sinceLastDog>=2000){
            newDog();
            console.log("new doggo");
            document.getElementById("numdogs").innerHTML = dogs.length;
            sinceLastDog = 0;
        } else {
            sinceLastDog +=100;
        }
    }
    for (i = 0; i<dogs.length;i++){
        moveDog(dogs[i]);
    }
    
    if (!isdog && perSecond>=5){
        isdog = true;
        document.getElementById("numdogstext").style.display = "inline";
        document.getElementById("numdogs").innerHTML = dogs.length;
    }
}, 100);
