// VARIABLES
var canvas;
var canvasContext;
const FRAMES_PER_SECOND = 30;

var carPic = document.createElement("img");
var carPicLoaded = false;

var carX = 300;
var carY = 350;
var carAng = 0;

var ballSpeedX = 0;
var ballSpeedY = 0;

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

    reset();

    carPic.src = "player1.png";

    // Game working
    setInterval(function(){
        drawEverything();
        moveEveryThing();
        }, 1000/FRAMES_PER_SECOND);
}

function ballAtTile(){
    // get the row and the collum of the ball
    let col = Math.floor(carX/TRACK_W);
    let row = Math.floor(carY/TRACK_H);
    // make it visable for debug purposes
    canvasContext.fillStyle = 'yellow';
    canvasContext.fillText('(row, col) = ('+row+', '+col+')', 715, 10);
    return {row: row, col: col}
}
function trackTileToIndex(tileCol, tileRow){
    return tileCol + (TRACK_COLS*tileRow);
}
// delete and bounce of track function
function deletetrack(){
    if (carX < canvas.width && carY < (TRACK_H*TRACK_ROWS) + TRACK_H){
        tile = ballAtTile();
        let index = trackTileToIndex(tile.col, tile.row);

        //pg 117
        let bothTestsFailed = true;

        if(trackGrid[index]){
            let prevTileCol = Math.floor((carX-ballSpeedX)/TRACK_W);
            let prevTileRow = Math.floor((carY-ballSpeedY)/TRACK_H);
            
            
            // bola mudou de coluna
            if (prevTileCol != tile.col){
            let adjacentTrackIndex = trackTileToIndex(prevTileCol, tile.row);
                // se o track passado horizontalmente for false
            if (!trackGrid[adjacentTrackIndex]){
                    ballSpeedX *= -1;
                    bothTestsFailed = false;
                }
            }
            // bola mudou de fila
            if (prevTileRow != tile.row){
            let adjacentTrackIndex = trackTileToIndex(tile.col, prevTileRow);
                // se o track passado verticalmenta for false
            if (!trackGrid[adjacentTrackIndex]){
                    ballSpeedY *= -1;
                    bothTestsFailed = false;
                }
            }

            if(bothTestsFailed){
                ballSpeedX *= -1;
                ballSpeedY *= -1;
            }
        }

    }
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
    // Delete track
    deletetrack();
}

function carDraw(){
    carAng += 0.2;
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

        canvasContext.fillRect((j*TRACK_W), (i*TRACK_H), TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP);
            //  drawing
                        
        }
    }
}
// MOVE FUNTIONS
function moveEveryThing(){
    ballMove();
}

function ballMove(){
    // rebater nas paredes
    if (carX < 0 || carX > canvas.width){
        ballSpeedX *= -1;
    }
    // rebater no teto
    if (carY < 0 ){
        ballSpeedY *= -1;
    }
    // passou do chao
    if (carY > canvas.height){
        reset();
    }
    // fazer a bola andar
    carX += ballSpeedX;
    carY += ballSpeedY;
}

// RESETING FUNCTIONS
function reset(){
    ballReset();
}
function ballReset(){
    carX = 300;
    carY = 300;
    ballSpeedX = 6;
    ballSpeedY = 4;
}