// VARIABLES
var canvas;
var canvasContext;
const FRAMES_PER_SECOND = 30;

var carPic = document.createElement("img");
var carPicLoaded = false;

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = -0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

// consts for key pressing
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var carX = 300;
var carY = 350;
var carAng = 0;
var carSpeed = 1;

// key beign held
var	keyHeld_Gas	= false;
var	keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight =	false;

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 1;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

var trackGrid =
 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,  	
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,	
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 	
  1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,  	
  1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 	
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,	
  1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,	
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// GAME
carPic.onload = function(){
    carPicLoaded = true;
}

window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    // functions
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

    carPic.src = "player1.png";

    // Game working
    setInterval(function(){
        drawEverything();
        moveEveryThing();
        }, 1000/FRAMES_PER_SECOND);
}

//carSpeed += 1.5; carAng += 0.25*Math.PI;
// keyboard functions
function keyPressed(evt){
    document.getElementById("debugText").innerHTML = "KeyCode Pushed: " + evt.keyCode;
    // If key is pressed make it true
    setKeyHoldState(evt.keyCode, true);
    evt.preventDefault();
}
function keyReleased(evt){
    document.getElementById("debugText").innerHTML = "KeyCode Released: " + evt.keyCode;
    // When a key pressed is released, make it false
    setKeyHoldState(evt.keyCode, false);
}

function setKeyHoldState(thisKey, boolean){
    if (thisKey == KEY_UP_ARROW)
        keyHeld_Gas = boolean;
    else if (thisKey == KEY_DOWN_ARROW)
        keyHeld_Reverse = boolean;
    else if (thisKey == KEY_LEFT_ARROW)
        keyHeld_TurnLeft = boolean;
    else if (thisKey == KEY_RIGHT_ARROW)
        keyHeld_TurnRight = boolean;
}

// DRAW FUNCTIONS
function drawEverything(){
    // Draw BG
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    // Draw tracks
    drawTracks();
    // Draw Car if loaded
    if(carPicLoaded)
    carDraw();
}
function carDraw(){
    drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, carAng);
}
function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, angle){
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(angle);
    canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2);
    canvasContext.restore();
}
function drawTracks(){
    let counter  = 0;
    for (let i = 0; i < TRACK_ROWS; i++){
        for (let j = 0; j < TRACK_COLS; j++, counter++){
            //  choosing color according to the tracks status
            if (trackGrid[counter] === 1)
                canvasContext.fillStyle = 'blue';    
            else if (trackGrid[counter] === 0)
                canvasContext.fillStyle = 'black';    

        //  drawing 
        canvasContext.fillRect((j*TRACK_W), (i*TRACK_H), TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP);
        }
    }
}

// MOVE FUNTIONS
function moveEveryThing(){
    if (keyHeld_Gas)
        carSpeed += DRIVE_POWER;
    if (keyHeld_Reverse)
        carSpeed += REVERSE_POWER;
    if (Math.abs(carSpeed) >= MIN_TURN_SPEED){
        if (keyHeld_TurnLeft)
            carAng += -TURN_RATE*Math.PI;
        if (keyHeld_TurnRight)
            carAng += TURN_RATE*Math.PI;
    }
    moveCar();
    carSpeed *= GROUNDSPEED_DECAY_MULT;
}

function moveCar(){
    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;
}