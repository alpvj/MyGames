// VARIABLES
var canvas;
var canvasContext;
const FRAMES_PER_SECOND = 30;

var ballX = 300;
var ballY = 350;
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

var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var brickCounter = brickGrid.length;

// GET THE MOUSE.X & MOUSE.Y
function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x: mouseX,
        y: mouseY
    };
}

// GAME
window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    reset();    
    // MOVE PADDLE
    canvas.addEventListener('mousemove', function(evt){
        var mousePos = calculateMousePos(evt);
        paddleX = mousePos.x - (PADDLE_WIDTH/2);
        //ballX = mousePos.x;
        //ballY = mousePos.y;
    });

    // Game working
    setInterval(function(){
        drawEverything();
        moveEveryThing();
        }, 1000/FRAMES_PER_SECOND);
}

function ballAtTile(){
    // get the row and the collum of the ball
    let col = Math.floor(ballX/BRICK_W);
    let row = Math.floor(ballY/BRICK_H);
    // make it visable for debug purposes
    canvasContext.fillStyle = 'cyan';
    canvasContext.fillText('(row, col) = ('+row+', '+col+')', 715, 10);
    return {row: row, col: col}
}
function brickTileToIndex(tileCol, tileRow){
    return tileCol + (BRICK_COLS*tileRow);
}
// delete and bounce of brick function
function deleteBrick(){
    if (ballX < canvas.width && ballY < (BRICK_H*BRICK_ROWS) + BRICK_H){
        tile = ballAtTile();
        let index = brickTileToIndex(tile.col, tile.row);

        //pg 117
        let bothTestsFailed = true;

        if(brickGrid[index]){
            let prevTileCol = Math.floor((ballX-ballSpeedX)/BRICK_W);
            let prevTileRow = Math.floor((ballY-ballSpeedY)/BRICK_H);
            
            
            // bola mudou de coluna
            if (prevTileCol != tile.col){
            let adjacentBrickIndex = brickTileToIndex(prevTileCol, tile.row);
                // se o brick passado horizontalmente for false
            if (!brickGrid[adjacentBrickIndex]){
                    ballSpeedX *= -1;
                    bothTestsFailed = false;
                }
            }
            // bola mudou de fila
            if (prevTileRow != tile.row){
            let adjacentBrickIndex = brickTileToIndex(tile.col, prevTileRow);
                // se o brick passado verticalmenta for false
            if (!brickGrid[adjacentBrickIndex]){
                    ballSpeedY *= -1;
                    bothTestsFailed = false;
                }
            }

            if(bothTestsFailed){
                ballSpeedX *= -1;
                ballSpeedY *= -1;
            }
            
            brickCounter--;
            brickGrid[index] = false;
        }

    }
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
    // Delete brick
    deleteBrick();
    // desenhar quantos blocos tem
    canvasContext.fillStyle = 'cyan';
    canvasContext.fillText('Bricks remaining = ' + brickCounter, 10, 10);
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
    for (let i = 0; i < BRICK_ROWS; i++){
        for (let j = 0; j < BRICK_COLS; j++, counter++){
            //  choosing color according to the bricks status
            if (brickGrid[counter]){
                canvasContext.fillStyle = 'blue';
                canvasContext.fillRect((j*BRICK_W), (i*BRICK_H),
                                    BRICK_W-BRICK_GAP, BRICK_H-BRICK_GAP);
            }
            //  drawing
                        
        }
    }
}
// MOVE FUNTIONS
function moveEveryThing(){
    if (brickCounter <= 0)
        reset();

    ballMove();
}

function ballMove(){
    // rebater nas paredes
    if (ballX < 0 || ballX > canvas.width){
        ballSpeedX *= -1;
    }
    // rebater no teto
    if (ballY < 0 ){
        ballSpeedY *= -1;
    }
    // batendo no paddle
    if (ballY > canvas.height-PADDLE_THICKNESS-10){
        //esta entre as coord do paddle
        if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH){
            ballSpeedY *= -1;
            // controlling the speed according the where it hit
            //ballSpeedY = (ballX - (ballX + (PADDLE_WIDTH/2))) * 0.15;
            // wether it goes upwards or right or left
            if ((paddleX + PADDLE_WIDTH/2)+10 > ballX && (paddleX + PADDLE_WIDTH/2)-10 < ballX)
                ballSpeedX = 0;
            else if ((paddleX + PADDLE_WIDTH/2) < ballX)
                ballSpeedX = 5;
            else if ((paddleX + PADDLE_WIDTH/2) > ballX)
                ballSpeedX = -5;
        }
    }
    // passou do chao
    if (ballY > canvas.height){
        reset();
    }
    // fazer a bola andar
    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

// RESETING FUNCTIONS
function reset(){
    ballReset();
    resetBricks();
}
function ballReset(){
    ballX = 300;
    ballY = canvas.height - PADDLE_THICKNESS - 250;
    ballSpeedX = 5;
    ballSpeedY = 5;
}
function resetBricks(){
    brickCounter = brickGrid.length - 20; // -20 pois tirei duas filas
    for (let i = 0; i < brickGrid.length; i++){
        if(i >= 20)//as duas primeiras filas sao false
        brickGrid[i] = true;
        else
        brickGrid[i] = false;
    }
}