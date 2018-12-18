var carX = 0;
var carY = 0;
var carAng = 0;
var carSpeed = 1;

const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = -0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

function carInit(){
    // find the starting tile for the car
    for (let i = 0; i < trackGrid.length; i++){
        if (trackGrid[i] == TRACK_PLAYER){
            let tileRow = Math.floor(i/TRACK_COLS);
            let tileCol = i%TRACK_COLS;
            // setting the start value
            carX = tileCol * TRACK_W + 0.5*TRACK_W;
            carY = tileRow * TRACK_H + 0.5*TRACK_H;
            //  debug
            document.getElementById("debugText").innerHTML = 
                "Car starting at tile: ("+tileCol+", "+tileRow+")"+
                "Pixel coordinate: ("+carX+", "+carY+")";
            trackGrid[i] = 0;// apos achar nao precisa mais do numero especial
            break;
        }
    }
    // Make it point north
    carAng = -0.5*Math.PI;  
}

function carMove(){
    // handle the keyboard
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

    //  Only moves if the next position is not a wall
    let nextX = carX + Math.cos(carAng) * carSpeed;
    let nextY = carY + Math.sin(carAng) * carSpeed
    if (checkForTrackAtPixelCoord(nextX, nextY)){
        carX = nextX;
        carY = nextY;
    }else // hits the wall and bounces with 25% of the actaul speed
        carSpeed *= -0.25;
    
    carSpeed *= GROUNDSPEED_DECAY_MULT;// slows gradually
}

function carDraw(){
    drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, carAng);
}