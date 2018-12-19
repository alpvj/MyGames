// how many images do i have
var picsToLoad = 0;

var carPic = document.createElement("img");
var trackPicRoad = document.createElement("img");
var trackPicWall = document.createElement("img");
var trackPicGoal = document.createElement("img");
var trackPicTree = document.createElement("img");
var trackPicFlag = document.createElement("img");

function loadImages(){
    var imageList = [
        {varName: carPic, theFile: "player1.png"},
        {varName: trackPicRoad, theFile: "track_road.png"},
        {varName: trackPicWall, theFile: "track_wall.png"},
        {varName: trackPicGoal, theFile: "track_goal.png"},
        {varName: trackPicTree, theFile: "track_tree.png"},
        {varName: trackPicFlag, theFile: "track_flag.png"}
    ];
    picsToLoad = imageList.length;

    for (let i = 0; i , imageList.length; i++)
        beginLoadingImage(imageList[i].varName, imageList[i].theFile);
}

function beginLoadingImage(pic, source){
    pic.onload = countLoadedImageAndLauchIfReady();
    pic.src = "images/"+source;
}

// make the game run if all images are loaded
function countLoadedImageAndLauchIfReady(){
    picsToLoad--;
    if (picsToLoad <= 0)
        loadingDoneSoStartGame();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, angle){
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(angle);
    canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2);
    canvasContext.restore();
}