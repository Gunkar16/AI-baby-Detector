status = "";
Img = "";
length = "";
var alarm;

var r;
var g;
var b;

Objects = [];

function preload(){
    alarm = loadSound("astronaut.mp3");
}

function setup(){
    canvas = createCanvas(600,450);
    canvas.center();

    Video = createCapture(VIDEO);
    Video.hide();

    ObjectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
    document.getElementById("baby").innerHTML = "Baby not found"


}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        Objects = results;
        console.log(Objects);
    }
}

function draw(){
    image(Video,0,0,600,450);
    if(status != ""){
        if(Objects[i].label == "person"){
            document.getElementById("baby").innerHTML = "Baby Found";
            alarm.stop();
        }
        else{
            document.getElementById("baby").innerHTML = "Baby not found";
            alarm.play();
        }
    }
    if(Objects.length == 0){
        document.getElementById("baby").innerHTML = "Baby not found";
        alarm.play();
    }
        r = random(255)
        g = random(255)
        b = random(255)
        ObjectDetector.detect(Video,gotResult);
        for(i = 0 ; i < Objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects detected";

            fill(r,g,b)
            noStroke();
            textSize(25)
            percent = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + percent + "%" , Objects[i].x , Objects[i].y)
            noFill();
            strokeWeight(4);
            stroke(r,g,b);
            rect(Objects[i].x , Objects[i].y , Objects[i].width , Objects[i].height);
    }
}
