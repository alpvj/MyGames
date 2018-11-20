// VARIABLES
var canvas;
var canvasContext;
const FRAMES_PER_SECOND = 30;
var showingWinScreen = false;

var ballY = 600/2;
var ballX = 800/2;
var ballSpeedX = 5;
var ballSpeedY = 5;

var pointsP1 = 0;
var pointsP2 = 0;
const WINNING_SCORE = 3;

var paddle1Y = 600/2;
var paddle2Y = 600/2;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
// GAME
window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    // Make the paddle move acording to the mouseY position
    canvas.addEventListener('mousemove', function(evt){
        // if (showingWinScreen) return;
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });

    // Make the 'Click to continue'
    canvas.addEventListener('mousedown', handleMouseClick);

    setInterval(function() {
        drawEverything();
        moveEveryThing();}, 1000/FRAMES_PER_SECOND);
}

function handleMouseClick(){
    if (showingWinScreen){
        pointsP1 = 0;
        pointsP2 = 0;
        showingWinScreen = false;
    }
}

function moveEveryThing(){
    movePaddle2();
    moveBall();
}

function moveBall(){
    if (ballY > canvas.height || ballY < 0){
        ballSpeedY *= -1;
    }
    //Bounce in collision with the paddle1
    if (ballX < 0){
        if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
            ballSpeedX *= -1;
            ballSpeedY = (ballY - (paddle1Y + PADDLE_HEIGHT/2)) * 0.35;            
        }
        else {
            pointsP2++;
            ballReset();
        }
    }
    else if (ballX > canvas.width){
        if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
            ballSpeedX *= -1;
            ballSpeedY = (ballY - (paddle2Y + PADDLE_HEIGHT/2)) * 0.35;
        }
        else {
            pointsP1++;
            ballReset();
        }
    }
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;

}

function ballReset(){
    if(pointsP1 >= WINNING_SCORE || pointsP2 >= WINNING_SCORE){
        showingWinScreen = true;
    }
    
    ballSpeedY = 5;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function movePaddle2(){
    //if(ballX < canvas.width/2) return;
    if ((paddle2Y + PADDLE_HEIGHT/2) < ballY-35){
        paddle2Y += 6;
    }
    else if ((paddle2Y + PADDLE_HEIGHT/2) > ballY+35){
        paddle2Y -= 6;
    }
}
// To get the mouseX & mouseY according to the scrolling of the page
function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    return{
        x: mouseX,
        y: mouseY
    };
}

function drawEverything(){
    if (showingWinScreen){
        // cover the game
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        // Display who won
        if (pointsP1 >= WINNING_SCORE){
            canvasContext.fillStyle = 'blue';
            canvasContext.fillText('Player 1 WON!!!', 350, 200);    
        }
        else if (pointsP2 >= WINNING_SCORE){
            canvasContext.fillStyle = 'red';
            canvasContext.fillText('Player 2 WON!!!', 350, 200);    
        }

        // Msg click to continue
        canvasContext.fillStyle = 'white';
        canvasContext.fillText('Click to Continue', 350, 500);
        
        ballSpeedX = Math.abs(ballSpeedX);
        return;
    }

    // Drawing the background
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // Drawing the net
    canvasContext.fillStyle = 'gray';
    for (let i = 0; i < canvas.height; i += 35){
        canvasContext.fillRect(canvas.width/2-1, i, 2, 20);
    }
    
    //Drawing the ball
    drawBall(ballX, ballY, 10, 'green');

    // Drawing the paddle1
    canvasContext.fillStyle = 'blue';
    canvasContext.fillRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT);

    // Drawing the paddle2
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect((canvas.width - PADDLE_THICKNESS), paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT);

    //Drawing the score text
    canvasContext.fillStyle = 'white';
    canvasContext.fillText('Player Score 1', 100, 100);
    canvasContext.fillText(pointsP1, 130, 120);
    canvasContext.fillText('Player Score 2', canvas.width - 150, 100);
    canvasContext.fillText(pointsP2, canvas.width - 120, 120);

}

function drawBall(ballX, ballY, radius, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY-radius, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}