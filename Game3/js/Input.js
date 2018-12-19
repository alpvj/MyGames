// consts for key pressing
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
// key beign held
var	keyHeld_Gas	= false;
var	keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight =	false;

function iniInput(){
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
}

// KEYBOARD FUNCTIONS
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