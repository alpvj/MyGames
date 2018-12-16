// VARIABLES
var canvas;
var canvasContext;
const FRAMES_PER_SECOND = 30;
            //  y: 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19  x:
var bricksGrid = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//0
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//1
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],//2
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//3
                  [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//4
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//5
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//6
                  [1, 0, 0, 0, 5, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 5, 0, 0, 0, 1],//7
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//8
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//9
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//10
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],//11
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//12
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//13
                  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//14
                  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//15
                  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//16
                  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//17
                  [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],//18
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],];//19

const PORTAL_X1 = 18;
const PORTAL_Y1 = 8;
const PORTAL_X2 = 1;
const PORTAL_Y2 = 18;

const BRICK_HEIGHT = 50;
const BRICK_WIDTH = 50;

// GAME
window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    //randomizeGrid();

    document.addEventListener('keydown', moveBlock);

    setInterval(function() {
        drawEverything();
        }, 1000/FRAMES_PER_SECOND);
}

function drawEverything(){
    // Drawing the background
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // Building the level
    for (let i = 0; i < bricksGrid.length; i++){
        for (let j = 0; j < bricksGrid[0].length; j++){
            // chess
            // if (i%2 === 0){
            //     if (j%2 === 0)
            //     canvasContext.fillStyle = 'white';
            //     else
            //     canvasContext.fillStyle = 'grey';
            // }
            // else{
            //     if (j%2 === 0)
            //     canvasContext.fillStyle = 'grey';
            //     else
            //     canvasContext.fillStyle = 'white';
            // }
            
            // FIND OUT THE CORRECT COLOR & BUILD
            if (bricksGrid[i][j] === 0)
                canvasContext.fillStyle = 'grey';
            else if (bricksGrid[i][j] === 1)
                canvasContext.fillStyle = 'black';
            else if (bricksGrid[i][j] === 2)
                canvasContext.fillStyle = 'yellow';
            else if (bricksGrid[i][j] === 3)
                canvasContext.fillStyle = 'red';
            else if (bricksGrid[i][j] === 4)
                canvasContext.fillStyle = 'blue';
            else if (bricksGrid[i][j] === 5)
                canvasContext.fillStyle = 'green';

            canvasContext.fillRect(BRICK_WIDTH*j, BRICK_HEIGHT*i, BRICK_WIDTH, BRICK_HEIGHT);
        }
    }

    checkPortals();
     
}

function checkPortals(){
    //Draw the PORTALS
    const coord = findBlocks();

    canvasContext.fillStyle = 'blue';
    if ((coord.x1 !== PORTAL_X1)){
        if (coord.y1 !== PORTAL_Y1){
            bricksGrid[PORTAL_X1][PORTAL_Y1] = 4;
            bricksGrid[0][0] = 1;
        }
    }
    else{
        bricksGrid[0][0] = 3;
    }
    if (coord.x2 !== PORTAL_X2){
        if (coord.y2 !== PORTAL_Y2){
            bricksGrid[PORTAL_X2][PORTAL_Y2] = 4;
            bricksGrid[0][19] = 1;
        }
    }
    else{
        bricksGrid[0][19] = 3;
    }
}

function moveBlock(evt){
    const coord = findBlocks();

    switch(evt.keyCode){
        //arrow left
        case 37:
            moveLeft(coord.x1, coord.y1);
            moveLeft(coord.x2, coord.y2);
            break;
        //arrow up
        case 38:
            moveUp(coord.x1, coord.y1);
            moveUp(coord.x2, coord.y2);
            break;
        //arrow right
        case 39:
            moveRight(coord.x1, coord.y1);
            moveRight(coord.x2, coord.y2);
            break;
        //arrow down
        case 40:
            moveDown(coord.x1, coord.y1);
            moveDown(coord.x2, coord.y2);
            break;
    }
}
function findBlocks(){
    let x1 = 0;
    let y1 = 0;
    let x2 = 0;
    let y2 = 0;
    
    let contador = 1;
    let found = false;

    for (let i = 0; i < bricksGrid.length && !found; i++){
        for (let j = 0; j < bricksGrid[0].length && !found; j++){
            if (bricksGrid[i][j] === 5){
                if (contador === 1){
                    x1 = i;
                    y1 = j;
                    contador = 2;
                } else if (contador === 2){
                    x2 = i;
                    y2 = j;
                    found = true;
                }
            } 
        }
    }
    return { x1: x1, x2: x2, y1: y1, y2: y2};
}

function moveDown(x, y){
    // only moves if the block bellow is empty
    if (bricksGrid[x+1][y] === 0){
        bricksGrid[x+1][y] = 5;
        bricksGrid[x][y] = 0;
    }
    else if (bricksGrid[x+1][y] === 4){
        bricksGrid[x+1][y] = 5;
        bricksGrid[x][y] = 0;
    }
}

function moveUp(x, y){
    // only moves if the block above is empty
    if (bricksGrid[x-1][y] === 0){
        bricksGrid[x-1][y] = 5;
        bricksGrid[x][y] = 0;
    }
    else if (bricksGrid[x-1][y] === 4){
        bricksGrid[x-1][y] = 5;
        bricksGrid[x][y] = 0;
    }  
}

function moveRight(x, y){
    // only moves if the block to the right is empty
    if (bricksGrid[x][y+1] === 0){
        bricksGrid[x][y+1] = 5;
        bricksGrid[x][y] = 0;
    }
    else if (bricksGrid[x][y+1] === 4){
        bricksGrid[x][y+1] = 5;
        bricksGrid[x][y] = 0;
    }
}

function moveLeft(x, y){
    // only moves if the block to the left is empty
    if (bricksGrid[x][y-1] === 0){
        bricksGrid[x][y-1] = 5;
        bricksGrid[x][y] = 0;
    }   
    else if (bricksGrid[x][y-1] === 4){
        bricksGrid[x][y-1] = 5;
        bricksGrid[x][y] = 0;
    }
}
