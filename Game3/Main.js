// VARIABLES
var canvas;
var canvasContext;
const FRAMES_PER_SECOND = 30;

// GAME
window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    carInit(); // set the initial position, rotation...
    iniInput(); // create the keyboard events
    imgSources(); // load images

    // Game working
    setInterval(function(){
        drawEverything();
        moveEveryThing();
        }, 1000/FRAMES_PER_SECOND);
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
// MOVE FUNTIONS
function moveEveryThing(){
    carMove();
}