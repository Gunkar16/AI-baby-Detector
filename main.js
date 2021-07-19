status = "";
alarm = "";
Objects = [];

function preload() {
    alarm = loadSound("astronaut.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    Video = createCapture(VIDEO);
    Video.size(380, 380)
    Video.hide();

    ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"



}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
        console.log(results);
        Objects = results;
}

function draw() {
    image(Video, 0, 0, 380, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        ObjectDetector.detect(Video, gotResult);
        for (i = 0; i < Objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects detected";
            fill(r, g, b)
            percent = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + percent + "%", Objects[i].x + 15, Objects[i].y + 15)
            noFill();
            stroke(r, g, b);
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);

            if (Objects[i].label == "person") {
                document.getElementById("baby").innerHTML = "Baby Found";
                console.log("stop");
                alarm.stop();
            }
            else {
                document.getElementById("baby").innerHTML = "Baby not found";
                console.log("play")
                alarm.play();
            }
        }
        if (Objects.length == 0) {
            document.getElementById("baby").innerHTML = "Baby not found";
            alarm.play();
        }
    }

}
