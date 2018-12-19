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
    loadImages(); // load images    
}

function loadingDoneSoStartGame(){
    setInterval(function(){
        drawEverything();
        moveEveryThing();
        }, 1000/FRAMES_PER_SECOND);
}

// DRAW FUNCTIONS
function drawEverything(){
    // Draw tracks
    drawTracks();
    // Draw Car
    carDraw();
}
// MOVE FUNTIONS
function moveEveryThing(){
    carMove();
}