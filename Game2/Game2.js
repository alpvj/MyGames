// VARIABLES
var canvas;
var canvasContext;
const FRAMES_PER_SECOND = 30;

var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 5;

var paddleX = 400;
const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;

const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;

var brickGrid = [];


// GET THE MOUSEX & MOUSEY
function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    // console.log(mouseX, mouseY);
    return{
        x: mouseX,
        y: mouseY
    };
}

// GAME
window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    // MOVE PADDLE
    canvas.addEventListener('mousemove', function(evt){
        var mousePos = calculateMousePos(evt);
        paddleX = mousePos.x - (PADDLE_WIDTH/2);
    });

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
    // Draw bricks
    drawBricks();
    // Draw Ball
    drawBall(ballX, ballY, 10, 'white');
    // Draw Paddle
    drawPaddle(paddleX, canvas.height-PADDLE_THICKNESS-10, 'white');
}

function drawBall(ballX, ballY, radius, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY-radius, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function drawPaddle(paddleX, paddleY, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(paddleX, paddleY, PADDLE_WIDTH, PADDLE_THICKNESS);
}

function drawBricks(){
    let counter  = 0;
    for (let i = 0; i < BRICK_COLS; i++){
        for (let j = 0; j < BRICK_ROWS; j++){
            let boolean = false;
            if (Math.random() < 0.5)
                boolean = false;
            else
                boolean = true;
            
            brickGrid.push(boolean);
            
            if (brickGrid[counter]){
                canvasContext.fillStyle = 'blue';
                canvasContext.fillRect((i*BRICK_W), (j*BRICK_H), BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP);
            }
            else{
                canvasContext.fillStyle = 'grey';
                canvasContext.fillRect((i*BRICK_W), (j*BRICK_H), BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP);    
            }
            counter++;
        }
    }
}
// MOVE FUNTIONS
function moveEveryThing(){
    ballMove();
}

function ballMove(){
    if (ballX < 0 || ballX > canvas.width){
        ballSpeedX *= -1;
    }
    if (ballY < 0 ){
        ballSpeedY *= -1;
    }

    if (ballY > canvas.height-PADDLE_THICKNESS-10){
        //brickGrid[139] = false;
        if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH){
            ballSpeedY *= -1;
            // controlling the speed according the where it hit
            //ballSpeedY = (ballX - (ballX + (PADDLE_WIDTH/2))) * 0.15;
            // wether it goes right or left
            if ((paddleX + PADDLE_WIDTH/2) < ballX)
                ballSpeedX = 5;
            else if ((paddleX + PADDLE_WIDTH/2) > ballX)
                ballSpeedX = -5;
        }
    }
    if (ballY > canvas.height){
            ballReset();}
    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

function ballReset(){
    ballX = 50;
    ballY = 50;
    ballSpeedY = 5;
}