// Graphics for car
var carPic = document.createElement("img");
var carPicLoaded = false;
carPic.onload = function(){
    carPicLoaded = true;
}

function imgSources(){
    carPic.src = "player1.png";
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, angle){
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(angle);
    canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2);
    canvasContext.restore();
}