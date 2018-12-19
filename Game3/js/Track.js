var trackGrid =
 [4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
  4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,  	
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,	
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 	
  1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,  	
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 	
  1, 1, 5, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,	
  0, 3, 0, 0, 0, 0, 1, 4, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,	
  1, 1, 5, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG =5;

// sizing
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

function drawTracks(){
    let counter  = 0;
    for (let i = 0; i < TRACK_ROWS; i++){
        for (let j = 0; j < TRACK_COLS; j++, counter++){
            let useImg;
            switch(trackGrid[counter]){
                case TRACK_WALL:
                    useImg = trackPicWall;
                    break;
                case TRACK_ROAD:
                    useImg = trackPicRoad;
                    break;
                case TRACK_GOAL:
                    useImg = trackPicGoal;
                    break;
                case TRACK_TREE:
                    useImg = trackPicTree;
                    break;
                case TRACK_FLAG:
                    useImg = trackPicFlag;
                    break;
            }
            drawBitmapCenteredAtLocationWithRotation(useImg,
                 (j*TRACK_W)+TRACK_W/2, (i*TRACK_H)+TRACK_H/2, 0);
        }
    }
}

// COLLISION
function checkForTrackAtPixelCoord(pixelX, pixelY){
    let tileCol = Math.floor(pixelX/TRACK_W);
    let tileRow = Math.floor(pixelY/TRACK_H);

    // check if it is inside the track
    if (tileCol<0 || tileCol>=TRACK_COLS || tileRow<0 || tileRow>=TRACK_ROWS)
        return false;

    let trackIndex = trackTileToIndex(tileCol, tileRow);

    // if it's inside the road return true, else return false
    return (trackGrid[trackIndex] == TRACK_ROAD);
}

function trackTileToIndex(col, row){
    return (col + (TRACK_COLS*row));
}